from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

import pandas as pd

from airguard_forecasting import train_and_forecast
from app import DATA, REPORTS_DIR


def main() -> None:
    results: list[dict[str, Any]] = []
    failures: list[str] = []
    for station_name, station_df in DATA.groupby("Station Name", sort=True):
        try:
            forecast_result = train_and_forecast(station_df)
        except ValueError as exc:
            failures.append(f"{station_name}: {exc}")
            results.append({"station_name": station_name, "status": "failed", "error": str(exc)})
            continue
        results.append(
            {
                "station_name": station_name,
                "status": "evaluated",
                "last_observation": forecast_result["last_observation"],
                "model": forecast_result["model"],
                "forecast_horizon_hours": forecast_result["forecast_horizon_hours"],
            }
        )

    report = {
        "generated_at": pd.Timestamp.now(tz="UTC").isoformat(),
        "source": "OpenCity / CPCB local Hyderabad station CSVs, 2024-2025",
        "target": "Hourly mean PM2.5 (µg/m³)",
        "evaluation_design": "Chronological 20% holdout; daily rolling origins; recursive 24-hour validation",
        "forecast_design": "Recursive 24-hour forecast from each station's latest source observation",
        "stations": results,
    }
    report_path = REPORTS_DIR / "model_evaluation.json"
    report_path.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(f"Wrote {report_path.relative_to(ROOT)} for {len(results)} stations.")
    if failures:
        raise SystemExit("Some stations could not be evaluated:\n" + "\n".join(failures))


if __name__ == "__main__":
    main()
