from __future__ import annotations

import json
import csv
import calendar
import re
import sqlite3
from datetime import datetime
from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd
from flask import Flask, jsonify, render_template, request

from airguard_forecasting import train_and_forecast

app = Flask(__name__, template_folder="templates", static_folder="static")
ROOT = Path(__file__).resolve().parent
RAW_DIR = ROOT / "data" / "raw" / "fifteen_min_2024_25"
HISTORICAL_AQI_DIR = ROOT / "data" / "raw" / "hourly_2017_2023"
PROC_DIR = ROOT / "data" / "processed"
REPORTS_DIR = ROOT / "reports"
DB_PATH = PROC_DIR / "airguard.db"
STATION_MAP_LOCATIONS_PATH = PROC_DIR / "station_locations.json"
STATION_MAP_DATA = json.loads(STATION_MAP_LOCATIONS_PATH.read_text(encoding="utf-8"))
STATION_MAP_LOCATIONS = STATION_MAP_DATA["locations"]

POLLUTANTS = ["PM2.5 (µg/m³)", "PM10 (µg/m³)", "NO2 (µg/m³)", "SO2 (µg/m³)", "CO (mg/m³)", "Ozone (µg/m³)"]
INDEX_COMPONENTS = {
    "PM2.5": ("PM2.5 (µg/m³)", 60.0),
    "PM10": ("PM10 (µg/m³)", 100.0),
    "NO2": ("NO2 (µg/m³)", 80.0),
    "SO2": ("SO2 (µg/m³)", 80.0),
    "CO": ("CO (mg/m³)", 2.0),
    "O3": ("Ozone (µg/m³)", 100.0),
}
AQI_CATEGORIES = [
    (0, 51, "Good"),
    (51, 101, "Satisfactory"),
    (101, 201, "Moderate"),
    (201, 301, "Poor"),
    (301, 401, "Very Poor"),
    (401, 501, "Severe"),
]
RISK_THRESHOLDS = [
    (0, 35, "Good"),
    (35, 75, "Moderate"),
    (75, 125, "Unhealthy for sensitive groups"),
    (125, 200, "Unhealthy"),
    (200, 1000, "Very unhealthy"),
]


def ensure_dirs() -> None:
    PROC_DIR.mkdir(parents=True, exist_ok=True)
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)


def safe_float(value: Any) -> float | None:
    if value is None:
        return None
    try:
        number = float(value)
    except (TypeError, ValueError, OverflowError):
        return None
    return number if np.isfinite(number) else None


def risk_category(score: float) -> str:
    for low, high, label in RISK_THRESHOLDS:
        if low <= score < high:
            return label
    return "Very unhealthy"


def risk_index(row: pd.Series) -> float:
    components = [
        value / denominator
        for column, denominator in INDEX_COMPONENTS.values()
        if (value := safe_float(row.get(column))) is not None
    ]
    if not components:
        return 0.0
    score = min(100.0, np.mean(components) * 100.0)
    return float(score)


def dominant_index_component(row: pd.Series) -> tuple[str | None, float | None]:
    contributions = [
        (name, value / denominator, value)
        for name, (column, denominator) in INDEX_COMPONENTS.items()
        if (value := safe_float(row.get(column))) is not None
    ]
    if not contributions:
        return None, None
    name, _, value = max(contributions, key=lambda contribution: contribution[1])
    return name, value


def normalize_archive_station_name(name: str) -> str:
    normalized = re.sub(r"\s+", " ", name.replace("_", " ").strip()).casefold()
    return re.sub(r",?\s*hyderabad$", "", normalized).strip()


def parse_aqi_archive_file(path: Path, station_display: str) -> list[dict[str, Any]]:
    observations: list[dict[str, Any]] = []
    current_year: int | None = None
    current_month: int | None = None
    with path.open(newline="", encoding="utf-8-sig") as source:
        for row in csv.reader(source):
            if not row:
                continue
            first = row[0].strip()
            if first.casefold() == "year":
                try:
                    current_year = int(row[1].strip())
                except (IndexError, ValueError):
                    current_year = None
                continue
            month_match = re.fullmatch(r"([A-Za-z]+)-(\d{4})", first)
            if month_match:
                month_name, year_text = month_match.groups()
                month_number = next(
                    (number for number in range(1, 13) if calendar.month_name[number].casefold() == month_name.casefold()),
                    None,
                )
                current_year = int(year_text)
                current_month = month_number
                continue
            if current_year is None or current_month is None or not first.isdigit() or len(row) < 25:
                continue
            day = int(first)
            if not 1 <= day <= 31:
                continue
            for hour, raw_value in enumerate(row[1:25]):
                try:
                    timestamp = datetime(current_year, current_month, day, hour)
                    value = float(raw_value.strip())
                except (ValueError, TypeError):
                    continue
                if 0 <= value <= 500:
                    observations.append({
                        "timestamp": timestamp.isoformat(),
                        "aqi": value,
                        "station_display": station_display,
                    })
    return observations


def load_historical_aqi(df: pd.DataFrame) -> dict[str, dict[str, Any]]:
    station_names = {
        normalize_archive_station_name(normalize_station_name(name)): normalize_station_name(name)
        for name in df["Station Name"].drop_duplicates()
    }
    archive: dict[str, dict[str, Any]] = {}
    for path in sorted(HISTORICAL_AQI_DIR.glob("*.csv")):
        if path.name.startswith("_"):
            continue
        station_slug = path.name.removesuffix("_tspcb_aqi_data_2017-2023.csv")
        display = station_names.get(normalize_archive_station_name(station_slug))
        if display is None:
            raise ValueError(f"Unable to match historical AQI archive to a source station: {path.name}")
        observations = parse_aqi_archive_file(path, display)
        monthly_buckets: dict[str, list[float]] = {}
        for observation in observations:
            month = observation["timestamp"][:7]
            monthly_buckets.setdefault(month, []).append(observation["aqi"])
        archive[display] = {
            "latest": max(observations, key=lambda item: item["timestamp"], default=None),
            "first_observation": min((item["timestamp"] for item in observations), default=None),
            "observation_count": len(observations),
            "monthly": [
                {
                    "month": month,
                    "aqi": round(float(np.mean(values)), 1),
                    "sample_count": len(values),
                }
                for month, values in sorted(monthly_buckets.items())
            ],
        }
    if not archive:
        raise FileNotFoundError(f"No historical AQI archive CSVs found in {HISTORICAL_AQI_DIR}")
    return archive


def official_aqi_category(value: float) -> str | None:
    for lower, upper_exclusive, category in AQI_CATEGORIES:
        if lower <= value < upper_exclusive:
            return category
    return None


def has_pollutant_reading(row: pd.Series) -> bool:
    return any(safe_float(row.get(column)) is not None for column in POLLUTANTS)


def load_station_data() -> pd.DataFrame:
    frames = []
    for csv_path in sorted(RAW_DIR.glob("*.csv")):
        df = pd.read_csv(csv_path)
        if df.empty:
            continue
        df["Timestamp"] = pd.to_datetime(df["Timestamp"], errors="coerce", utc=True)
        df["Station Name"] = df["Station Name"].astype(str).str.strip()
        frames.append(df)
    if not frames:
        raise FileNotFoundError(f"No station CSVs found in {RAW_DIR}")
    df = pd.concat(frames, ignore_index=True)
    return df.dropna(subset=["Timestamp"]).sort_values("Timestamp").reset_index(drop=True)


def normalize_station_name(name: str) -> str:
    return name.replace(" - TSPCB", "").strip()


def collect_station_summary(df: pd.DataFrame) -> list[dict[str, Any]]:
    latest_frames = df.sort_values("Timestamp").groupby("Station Name", as_index=False).tail(1).copy()
    latest_frames["has_reading"] = latest_frames.apply(has_pollutant_reading, axis=1)
    latest_frames["risk_score"] = latest_frames.apply(risk_index, axis=1)
    latest_frames["risk_label"] = latest_frames.apply(
        lambda row: risk_category(row["risk_score"]) if row["has_reading"] else None,
        axis=1,
    )
    latest_frames["station_display"] = latest_frames["Station Name"].apply(normalize_station_name)
    station_records = []
    for row in latest_frames.to_dict(orient="records"):
        dominant_pollutant, dominant_value = dominant_index_component(pd.Series(row))
        station_records.append(
            {
                "station_name": row["Station Name"],
                "station_display": row["station_display"],
                "timestamp": row["Timestamp"].isoformat(),
                "risk_score": round(float(row["risk_score"]), 1) if row["has_reading"] else None,
                "risk_label": row["risk_label"] if row["has_reading"] else None,
                "dominant_pollutant": dominant_pollutant,
                "dominant_pollutant_value": dominant_value,
                "PM2.5": safe_float(row.get("PM2.5 (µg/m³)")),
                "PM10": safe_float(row.get("PM10 (µg/m³)")),
                "NO2": safe_float(row.get("NO2 (µg/m³)")),
                "SO2": safe_float(row.get("SO2 (µg/m³)")),
                "CO": safe_float(row.get("CO (mg/m³)")),
                "O3": safe_float(row.get("Ozone (µg/m³)")),
                "map_location": (
                    {
                        **STATION_MAP_LOCATIONS[row["station_display"]],
                        "precision": STATION_MAP_DATA["precision"],
                    }
                    if row["station_display"] in STATION_MAP_LOCATIONS
                    else None
                ),
                "data_source": "OpenCity / CPCB station feed",
                "data_note": "AirGuard Risk Index is a modelled exposure indicator. It is not an official AQI value.",
            }
        )
    return sorted(
        station_records,
        key=lambda record: (record["risk_score"] is None, -(record["risk_score"] or 0)),
    )


def build_airguard_insights(stations: list[dict[str, Any]]) -> dict[str, Any]:
    measured_stations = [station for station in stations if station.get("risk_score") is not None]
    if not measured_stations:
        return {
            "average_risk": None,
            "best_station": {"station_display": "—", "risk_score": None},
            "worst_station": {"station_display": "—", "risk_score": None},
            "alert_count": 0,
            "summary": "No pollutant readings are available in this snapshot.",
        }
    average_risk = round(float(np.mean([s["risk_score"] for s in measured_stations])), 1)
    best_station = min(measured_stations, key=lambda s: s["risk_score"])
    worst_station = max(measured_stations, key=lambda s: s["risk_score"])
    alert_count = sum(1 for s in measured_stations if s["risk_score"] >= 75)
    best_label = best_station["station_display"]
    worst_label = worst_station["station_display"]
    summary = (
        f"The city-wide average exposure is {average_risk}/100, with {best_label} performing best "
        f"and {worst_label} having the highest recorded score. {alert_count} stations had "
        "higher-risk readings in this snapshot."
    )
    return {
        "average_risk": average_risk,
        "best_station": {"station_display": best_label, "risk_score": best_station["risk_score"]},
        "worst_station": {"station_display": worst_label, "risk_score": worst_station["risk_score"]},
        "alert_count": alert_count,
        "summary": summary,
    }


def hourly_station_data(df: pd.DataFrame) -> pd.DataFrame:
    subset = df[["Station Name", "Timestamp"] + [col for col in df.columns if col.startswith(("PM2.5", "PM10", "NO2", "SO2", "CO", "Ozone"))]].copy()
    subset = subset.assign(Timestamp=subset["Timestamp"].dt.floor("H"))
    hourly = subset.groupby(["Station Name", "Timestamp"], as_index=False).mean(numeric_only=True)
    hourly["risk_score"] = hourly.apply(risk_index, axis=1)
    hourly["risk_label"] = hourly["risk_score"].apply(risk_category)
    return hourly.sort_values(["Station Name", "Timestamp"]).reset_index(drop=True)


def build_station_view(station_name: str, df: pd.DataFrame) -> dict[str, Any]:
    station_df = df[df["Station Name"] == station_name].sort_values("Timestamp").copy()
    if station_df.empty:
        return {}
    latest = station_df.iloc[-1]
    recent = station_df.tail(48).copy()
    recent["hour"] = recent["Timestamp"].dt.strftime("%Y-%m-%d %H:%M")
    recent['risk_score'] = recent.apply(risk_index, axis=1)
    has_reading = has_pollutant_reading(latest)
    latest_risk = risk_index(latest) if has_reading else None
    dominant_pollutant, dominant_value = dominant_index_component(latest)
    return {
        "station_name": station_name,
        "station_display": normalize_station_name(station_name),
        "timestamp": latest["Timestamp"].isoformat(),
        "risk_score": round(float(latest_risk), 1) if latest_risk is not None else None,
        "risk_label": risk_category(float(latest_risk)) if latest_risk is not None else None,
        "dominant_pollutant": dominant_pollutant,
        "dominant_pollutant_value": dominant_value,
        "PM2.5": safe_float(latest.get("PM2.5 (µg/m³)")),
        "PM10": safe_float(latest.get("PM10 (µg/m³)")),
        "NO2": safe_float(latest.get("NO2 (µg/m³)")),
        "SO2": safe_float(latest.get("SO2 (µg/m³)")),
        "CO": safe_float(latest.get("CO (mg/m³)")),
        "O3": safe_float(latest.get("Ozone (µg/m³)")),
        "trend": [{
            "timestamp": ts.isoformat(),
            "pm25": safe_float(value),
            "risk": round(float(risk_index(row)), 1),
        } for ts, value, row in zip(recent["Timestamp"], recent["PM2.5 (µg/m³)"], recent.to_dict(orient="records"))],
    }


def write_reports(df: pd.DataFrame, historical_aqi: dict[str, dict[str, Any]]) -> None:
    station_summary = collect_station_summary(df)
    pollutant_columns = [
        "PM2.5 (µg/m³)",
        "PM10 (µg/m³)",
        "NO (µg/m³)",
        "NO2 (µg/m³)",
        "NOx (ppb)",
        "NH3 (µg/m³)",
        "SO2 (µg/m³)",
        "CO (mg/m³)",
        "Ozone (µg/m³)",
    ]
    station_coverage = {}
    for station_name, station_df in df.groupby("Station Name", sort=True):
        station_coverage[normalize_station_name(station_name)] = {
            "rows": int(len(station_df)),
            "first_timestamp": station_df["Timestamp"].min().isoformat(),
            "last_timestamp": station_df["Timestamp"].max().isoformat(),
            "pm25_valid_rows": int(station_df["PM2.5 (µg/m³)"].notna().sum()),
            "pm25_missing_rows": int(station_df["PM2.5 (µg/m³)"].isna().sum()),
            "pollutant_valid_rows": {
                column: int(station_df[column].notna().sum())
                for column in pollutant_columns
                if column in station_df.columns
            },
            "duplicate_timestamps": int(station_df["Timestamp"].duplicated().sum()),
        }

    historical_resources = [
        {
            "file": path.name,
            "bytes": path.stat().st_size,
            "format": "monthly grid with day rows and 24 hourly AQI columns",
            "integration": "preserved separately; not combined with 2024-2025 pollutant concentrations",
        }
        for path in sorted(HISTORICAL_AQI_DIR.glob("*.csv"))
        if path.name != "_test.csv"
    ]
    aqi_observation_count = sum(station["observation_count"] for station in historical_aqi.values())
    aqi_first_observations = [
        station["first_observation"]
        for station in historical_aqi.values()
        if station["first_observation"] is not None
    ]
    aqi_latest_observations = [
        station["latest"]["timestamp"]
        for station in historical_aqi.values()
        if station["latest"] is not None
    ]
    dataset_report = {
        "dataset_name": "Hyderabad Air Quality Station Feed",
        "source": "OpenCity / CPCB",
        "generated_on": pd.Timestamp.now(tz="UTC").isoformat(),
        "station_count": len(station_summary),
        "sample_count": int(len(df)),
        "raw_resources": [
            {
                "file": path.name,
                "bytes": path.stat().st_size,
                "sampling_frequency": "15 minutes",
            }
            for path in sorted(RAW_DIR.glob("*.csv"))
        ],
        "legacy_aqi_resources": historical_resources,
        "official_aqi_archive": {
            "station_count": len(historical_aqi),
            "observation_count": aqi_observation_count,
            "first_observation": min(aqi_first_observations, default=None),
            "last_observation": max(aqi_latest_observations, default=None),
            "timestamps_are_local_unspecified_timezone": True,
            "pollutant_breakdown_included": False,
        },
        "station_map_locations": {
            "source": STATION_MAP_DATA["source"],
            "mapped_stations": len(STATION_MAP_LOCATIONS),
            "precision": STATION_MAP_DATA["precision"],
            "attribution": STATION_MAP_DATA["attribution"],
        },
        "time_range": {
            "start": df["Timestamp"].min().isoformat(),
            "end": df["Timestamp"].max().isoformat(),
        },
        "station_names": [entry["station_display"] for entry in station_summary],
        "notes": [
            "Source CSVs are 15-minute station feeds for Hyderabad from 2024-2025.",
            "The older 2017-2023 files contain hourly AQI in a monthly grid format; they are preserved separately and not mixed with pollutant concentrations.",
            "Historical AQI archive timestamps have no stated timezone and are displayed as source-local timestamps without timezone conversion.",
            "The AQI archive does not include pollutant sub-index values, so no dominant pollutant is inferred from its AQI values.",
            "Map markers use OpenStreetMap locality or named-place reference coordinates, not verified monitoring-device coordinates.",
            "Map pollutant readings are each station's latest historical source observations, not live conditions or official place-wide AQI.",
            "AirGuard Risk Index is a modelled exposure score for experience design; it is not an official AQI value."
        ]
    }
    quality_report = {
        "missing_values": {
            col: int(df[col].isna().sum())
            for col in pollutant_columns
            if col in df.columns
        },
        "valid_pollutant_rows": {
            column: int(df[column].notna().sum())
            for column in pollutant_columns
            if column in df.columns
        },
        "duplicate_station_timestamps": int(df.duplicated(["Station Name", "Timestamp"]).sum()),
        "coverage_by_station": {
            station["station_display"]: {
                "rows": int((df["Station Name"] == station["station_name"]).sum()),
                "last_update": station["timestamp"],
                "latest_risk": station["risk_score"],
                "pollutant_valid_rows": {
                    column: int(
                        df.loc[df["Station Name"] == station["station_name"], column].notna().sum()
                    )
                    for column in pollutant_columns
                    if column in df.columns
                },
            }
            for station in station_summary
        },
        "warnings": [
            "The 2024-2025 station files report pollutant concentrations, not official AQI. The AirGuard Risk Index is a separate modelled interpretation.",
            "The 2017-2023 hourly AQI archive remains a distinct source and is not merged into PM2.5 model training.",
            "The latest local source measurement is historical; the website's forecasts are projections from that observation, not live conditions."
        ],
    }
    data_dictionary = {
        "source": "OpenCity / CPCB Hyderabad 15-minute station CSVs",
        "location_data_note": (
            "The supplied OpenCity / CPCB source records do not include verified monitoring-station coordinates. "
            "Map pins use approximate OpenStreetMap locality or named-place references and must not be interpreted "
            "as the air monitor's exact position."
        ),
        "fields": [
            {
                "name": column,
                "meaning": (
                    "Station observation timestamp (source timezone is normalized to UTC)"
                    if column == "Timestamp"
                    else "Monitoring station name"
                    if column == "Station Name"
                    else "Monitoring station identifier"
                    if column == "Station ID"
                    else "Pollutant or meteorological reading; unit is included in the source column name when supplied"
                    if column in pollutant_columns or "(" in column
                    else "Source metadata field"
                ),
                "unit": column.rsplit("(", 1)[-1].rstrip(")") if "(" in column else None,
            }
            for column in df.columns
        ],
    }
    preprocessing_report = {
        "source_resolution": "15-minute observations",
        "model_resolution": "Hourly mean PM2.5",
        "steps": [
            "Load each station CSV without changing the original files.",
            "Parse Timestamp as UTC; rows without a valid timestamp are excluded from app analytics.",
            "Convert station readings to numeric values and retain missing measurements as missing.",
            "Aggregate available 15-minute PM2.5 observations to hourly means for model training.",
            "Create lag and calendar features; supervised rows with unavailable lag/target values are excluded.",
            "Keep the hourly 2017-2023 AQI grid separate because it contains AQI, not matching PM2.5 concentration targets.",
        ],
        "imputation": "No historical targets are filled. Up to three missing hours in the final 24-hour forecast input window are forward-filled and counted in the forecast response.",
    }
    (REPORTS_DIR / "dataset_inventory.json").write_text(json.dumps(dataset_report, indent=2), encoding="utf-8")
    (REPORTS_DIR / "data_quality_report.json").write_text(json.dumps(quality_report, indent=2), encoding="utf-8")
    (REPORTS_DIR / "data_dictionary.json").write_text(json.dumps(data_dictionary, indent=2), encoding="utf-8")
    (REPORTS_DIR / "station_coverage.json").write_text(json.dumps(station_coverage, indent=2), encoding="utf-8")
    (REPORTS_DIR / "preprocessing_report.json").write_text(json.dumps(preprocessing_report, indent=2), encoding="utf-8")


def init_database() -> pd.DataFrame:
    global HISTORICAL_AQI
    ensure_dirs()
    df = load_station_data()
    HISTORICAL_AQI = load_historical_aqi(df)
    conn = sqlite3.connect(DB_PATH)
    conn.execute("CREATE TABLE IF NOT EXISTS station_snapshots (station_name TEXT, station_display TEXT, timestamp TEXT, risk_score REAL, risk_label TEXT, pm25 REAL, pm10 REAL, no2 REAL, so2 REAL, co REAL, o3 REAL)")
    conn.execute("DELETE FROM station_snapshots")
    for entry in collect_station_summary(df):
        conn.execute(
            "INSERT INTO station_snapshots VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (
                entry["station_name"],
                entry["station_display"],
                entry["timestamp"],
                entry["risk_score"],
                entry["risk_label"],
                entry["PM2.5"],
                entry["PM10"],
                entry["NO2"],
                entry["SO2"],
                entry["CO"],
                entry["O3"],
            ),
        )
    conn.commit()
    conn.close()
    write_reports(df, HISTORICAL_AQI)
    return df


HISTORICAL_AQI: dict[str, dict[str, Any]] = {}
DATA = init_database()
FORECAST_CACHE: dict[tuple[str, str], dict[str, Any]] = {}


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/summary")
def api_summary():
    df = DATA
    stations = collect_station_summary(df)
    measured_stations = [station for station in stations if station["risk_score"] is not None]
    latest = max(measured_stations, key=lambda station: station["risk_score"], default={})
    return jsonify({
        "stations": stations,
        "meta": {
            "station_count": len(stations),
            "sample_count": int(len(df)),
            "last_updated": max([s["timestamp"] for s in stations], default=""),
            "source_note": "Local 15-minute OpenCity / CPCB station CSV observations, 2024-2025; not a live feed",
            "highest_risk_station": latest.get("station_display"),
        },
    })


@app.route("/api/insights")
def api_insights():
    df = DATA
    stations = collect_station_summary(df)
    return jsonify({"insights": build_airguard_insights(stations)})


@app.route("/api/station/<station_name>")
def api_station(station_name: str):
    df = DATA
    normalized_name = station_name.replace("%20", " ")
    station = next((s for s in collect_station_summary(df) if s["station_name"] == normalized_name or s["station_display"] == normalized_name), None)
    if station is None:
        return jsonify({"error": "Station not found"}), 404
    station_data = build_station_view(station["station_name"], df)
    station_data["station_summary"] = station
    return jsonify(station_data)


@app.route("/api/historical-aqi/<station_name>")
def api_historical_aqi(station_name: str):
    requested = normalize_archive_station_name(normalize_station_name(station_name))
    station_display = next(
        (name for name in HISTORICAL_AQI if normalize_archive_station_name(name) == requested),
        None,
    )
    if station_display is None:
        return jsonify({"error": "Station not found"}), 404
    data = HISTORICAL_AQI[station_display]
    latest = data["latest"]
    return jsonify({
        "station_display": station_display,
        "source": "OpenCity / CPCB hourly AQI archive",
        "source_period": "2017-2023",
        "latest": {
            **latest,
            "category": official_aqi_category(latest["aqi"]),
        } if latest else None,
        "first_observation": data["first_observation"],
        "observation_count": data["observation_count"],
        "timestamp_note": "Source-local timestamp; timezone is not specified in the archive.",
        "pollutant_breakdown": None,
        "monthly": data["monthly"],
    })


@app.route("/api/monthly-trends/<station_name>")
def api_monthly_trends(station_name: str):
    requested = station_name.replace("%20", " ")
    matched_name = next(
        (
            name for name in DATA["Station Name"].drop_duplicates()
            if name == requested or normalize_station_name(name) == requested
        ),
        None,
    )
    if matched_name is None:
        return jsonify({"error": "Station not found"}), 404

    station_df = DATA.loc[
        DATA["Station Name"] == matched_name,
        ["Timestamp", "PM2.5 (µg/m³)", "PM10 (µg/m³)"],
    ].copy()
    station_df["month"] = station_df["Timestamp"].dt.strftime("%Y-%m")
    monthly = []
    for month, rows in station_df.groupby("month", sort=True):
        monthly.append({
            "month": month,
            "pm25": safe_float(rows["PM2.5 (µg/m³)"].mean()),
            "pm25_sample_count": int(rows["PM2.5 (µg/m³)"].count()),
            "pm10": safe_float(rows["PM10 (µg/m³)"].mean()),
            "pm10_sample_count": int(rows["PM10 (µg/m³)"].count()),
        })
    return jsonify({
        "station_display": normalize_station_name(matched_name),
        "source": "OpenCity / CPCB 15-minute pollutant concentration feed",
        "timestamp_note": "Monthly groups use source timestamps normalized to UTC.",
        "monthly": monthly,
    })


@app.route("/api/time-profile/<station_name>")
def api_time_profile(station_name: str):
    requested = station_name.replace("%20", " ")
    matched_name = next(
        (
            name for name in DATA["Station Name"].drop_duplicates()
            if name == requested or normalize_station_name(name) == requested
        ),
        None,
    )
    if matched_name is None:
        return jsonify({"error": "Station not found"}), 404

    station_df = DATA.loc[
        DATA["Station Name"] == matched_name,
        ["Timestamp", "PM2.5 (µg/m³)"],
    ].dropna(subset=["PM2.5 (µg/m³)"])
    if station_df.empty:
        return jsonify({
            "station_display": normalize_station_name(matched_name),
            "period_start": None,
            "period_end": None,
            "timezone": "Asia/Kolkata",
            "hours": [],
        })
    period_end = station_df["Timestamp"].max()
    period_start = period_end - pd.Timedelta(days=30)
    recent = station_df.loc[station_df["Timestamp"] >= period_start].set_index("Timestamp")
    hourly = recent["PM2.5 (µg/m³)"].resample("h").mean().dropna()
    local_hours = hourly.index.tz_convert("Asia/Kolkata").hour
    profile = pd.DataFrame({"hour": local_hours, "pm25": hourly.to_numpy()})
    hours = [
        {
            "hour": int(hour),
            "pm25_mean": round(float(values["pm25"].mean()), 2),
            "sample_count": int(values["pm25"].count()),
        }
        for hour, values in profile.groupby("hour", sort=True)
    ]
    return jsonify({
        "station_display": normalize_station_name(matched_name),
        "period_start": period_start.isoformat(),
        "period_end": period_end.isoformat(),
        "timezone": "Asia/Kolkata",
        "hours": hours,
    })


@app.route("/api/forecast/<station_name>")
def api_forecast(station_name: str):
    df = DATA
    requested_name = station_name.replace("%20", " ")
    station_names = df["Station Name"].drop_duplicates()
    matched_name = next(
        (
            name for name in station_names
            if name == requested_name or normalize_station_name(name) == requested_name
        ),
        None,
    )
    if matched_name is None:
        return jsonify({"error": "Station not found"}), 404

    cache_key = (matched_name, df["Timestamp"].max().isoformat())
    if cache_key not in FORECAST_CACHE:
        station_df = df[df["Station Name"] == matched_name].sort_values("Timestamp")
        try:
            result = train_and_forecast(station_df)
        except ValueError as exc:
            return jsonify({"error": str(exc), "station_name": matched_name}), 422
        result["station_name"] = matched_name
        for point in result["forecast"]:
            projected_risk = min(100.0, point["prediction"] / 60.0 * 100.0)
            point["risk_score"] = round(projected_risk, 1)
            point["label"] = risk_category(projected_risk)
        FORECAST_CACHE[cache_key] = result
    return jsonify(FORECAST_CACHE[cache_key])


@app.route("/api/compare")
def api_compare():
    df = DATA
    selected = [name.strip() for name in request.args.getlist("stations") if name.strip()]
    if len(selected) == 1 and "|" in selected[0]:
        selected = [name.strip() for name in selected[0].split("|") if name.strip()]
    if not selected:
        selected = [df["Station Name"].drop_duplicates().iloc[0]]
    results = []
    for station in selected:
        station_df = df[df["Station Name"] == station].sort_values("Timestamp")
        if station_df.empty:
            continue
        recent = station_df.tail(48).copy()
        recent["risk_score"] = recent.apply(risk_index, axis=1)
        results.append({
            "station_name": station,
            "station_display": normalize_station_name(station),
            "points": [{
                "timestamp": ts.isoformat(),
                "pm25": safe_float(val),
                "risk_score": round(float(risk_index(row)), 1),
            } for ts, val, row in zip(recent["Timestamp"], recent["PM2.5 (µg/m³)"], recent.to_dict(orient="records"))],
        })
    return jsonify({"stations": results})


@app.route("/api/model-metrics")
def api_model_metrics():
    df = DATA
    station_name = df["Station Name"].drop_duplicates().iloc[0]
    station_df = df[df["Station Name"] == station_name].sort_values("Timestamp")
    cache_key = (station_name, df["Timestamp"].max().isoformat())
    if cache_key not in FORECAST_CACHE:
        try:
            FORECAST_CACHE[cache_key] = train_and_forecast(station_df)
        except ValueError as exc:
            return jsonify({"error": str(exc), "station_name": station_name}), 422
    return jsonify(
        {
            "station_name": station_name,
            "model": FORECAST_CACHE[cache_key]["model"],
        }
    )


@app.route("/manifest.webmanifest")
def manifest():
    return app.send_static_file("manifest.webmanifest")


if __name__ == "__main__":
    port = int(__import__('os').environ.get('PORT', '5001'))
    app.run(host="0.0.0.0", port=port, debug=True)
