from __future__ import annotations

from typing import Any

import numpy as np
import pandas as pd
from sklearn.ensemble import HistGradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

TARGET_COLUMN = "PM2.5 (µg/m³)"
LAGS = (1, 2, 3, 6, 12, 24)
FORECAST_HOURS = 24
MIN_TRAINING_ROWS = 100
MIN_HORIZON_ORIGINS = 3
MAX_HORIZON_ORIGINS = 20


def _time_features(index: pd.DatetimeIndex) -> pd.DataFrame:
    hour = index.hour.to_numpy()
    day_of_week = index.day_of_week.to_numpy()
    day_of_year = index.day_of_year.to_numpy()
    return pd.DataFrame(
        {
            "hour_sin": np.sin(2 * np.pi * hour / 24),
            "hour_cos": np.cos(2 * np.pi * hour / 24),
            "weekday_sin": np.sin(2 * np.pi * day_of_week / 7),
            "weekday_cos": np.cos(2 * np.pi * day_of_week / 7),
            "year_day_sin": np.sin(2 * np.pi * day_of_year / 365.25),
            "year_day_cos": np.cos(2 * np.pi * day_of_year / 365.25),
        },
        index=index,
    )


def _feature_frame(hourly_pm25: pd.Series) -> pd.DataFrame:
    features = pd.DataFrame(index=hourly_pm25.index)
    for lag in LAGS:
        features[f"lag_{lag}"] = hourly_pm25.shift(lag)
    return features.join(_time_features(hourly_pm25.index))


def _new_model() -> HistGradientBoostingRegressor:
    return HistGradientBoostingRegressor(
        max_iter=160,
        max_leaf_nodes=15,
        l2_regularization=1.0,
        random_state=42,
    )


def _score(actual: pd.Series, predicted: np.ndarray) -> dict[str, float]:
    return {
        "mae": round(float(mean_absolute_error(actual, predicted)), 2),
        "rmse": round(float(np.sqrt(mean_squared_error(actual, predicted))), 2),
        "r2": round(float(r2_score(actual, predicted)), 3),
    }


def _recursive_predictions(
    model: HistGradientBoostingRegressor,
    history: pd.Series,
    timestamps: pd.DatetimeIndex,
) -> np.ndarray:
    working_history = history.copy()
    predictions = []
    for timestamp in timestamps:
        row = {f"lag_{lag}": float(working_history.iloc[-lag]) for lag in LAGS}
        row.update(_time_features(pd.DatetimeIndex([timestamp])).iloc[0].to_dict())
        prediction = max(0.0, float(model.predict(pd.DataFrame([row]))[0]))
        predictions.append(prediction)
        working_history.loc[timestamp] = prediction
    return np.asarray(predictions)


def _evaluate_recursive_horizon(
    model: HistGradientBoostingRegressor,
    hourly: pd.Series,
    holdout: pd.DataFrame,
) -> tuple[dict[str, float], dict[str, float], int, int]:
    first_origin = holdout.index.min()
    last_origin = hourly.last_valid_index() - pd.Timedelta(hours=FORECAST_HOURS)
    if first_origin > last_origin:
        raise ValueError("Not enough holdout history to validate a 24-hour forecast.")

    all_actual = []
    all_predictions = []
    all_persistence = []
    origin_count = 0
    for origin in pd.date_range(first_origin, last_origin, freq="24h")[:MAX_HORIZON_ORIGINS]:
        history_index = pd.date_range(end=origin, periods=max(LAGS), freq="h")
        history = hourly.reindex(history_index).ffill(limit=3)
        target_index = pd.date_range(
            start=origin + pd.Timedelta(hours=1),
            periods=FORECAST_HOURS,
            freq="h",
        )
        actual = hourly.reindex(target_index)
        if history.isna().any() or actual.isna().any():
            continue

        predictions = _recursive_predictions(model, history, target_index)
        all_actual.extend(actual.to_numpy(dtype=float))
        all_predictions.extend(predictions)
        all_persistence.extend([float(history.iloc[-1])] * FORECAST_HOURS)
        origin_count += 1

    if origin_count < MIN_HORIZON_ORIGINS:
        raise ValueError(
            f"At least {MIN_HORIZON_ORIGINS} complete 24-hour holdout windows are required; "
            f"only {origin_count} were available."
        )

    actual_values = pd.Series(all_actual, dtype=float)
    return (
        _score(actual_values, np.asarray(all_predictions)),
        _score(actual_values, np.asarray(all_persistence)),
        origin_count,
        len(all_actual),
    )


def train_and_forecast(station_df: pd.DataFrame) -> dict[str, Any]:
    """Validate a recursive 24-hour horizon, then forecast 24 hours."""
    if "Timestamp" not in station_df or TARGET_COLUMN not in station_df:
        raise ValueError(f"Station data must contain Timestamp and {TARGET_COLUMN}.")

    observations = station_df[["Timestamp", TARGET_COLUMN]].copy()
    observations["Timestamp"] = pd.to_datetime(observations["Timestamp"], utc=True, errors="coerce")
    observations[TARGET_COLUMN] = pd.to_numeric(observations[TARGET_COLUMN], errors="coerce")
    observations = observations.dropna(subset=["Timestamp"]).sort_values("Timestamp")
    observations = observations.dropna(subset=[TARGET_COLUMN])
    if observations.empty:
        raise ValueError("No valid PM2.5 observations are available for this station.")

    hourly = (
        observations.set_index("Timestamp")[TARGET_COLUMN]
        .resample("h")
        .mean()
        .rename("pm25")
    )
    latest_source_observation = observations["Timestamp"].max()
    latest_valid_hour = hourly.last_valid_index()
    forecast_origin = None
    expected_history = None
    raw_history = None
    history = None
    for candidate in hourly.dropna().index[::-1]:
        if latest_valid_hour - candidate > pd.Timedelta(days=7):
            break
        candidate_history_index = pd.date_range(
            end=candidate,
            periods=max(LAGS),
            freq="h",
        )
        candidate_raw_history = hourly.reindex(candidate_history_index)
        candidate_history = candidate_raw_history.ffill(limit=3)
        if not candidate_history.isna().any():
            forecast_origin = candidate
            expected_history = candidate_history_index
            raw_history = candidate_raw_history
            history = candidate_history
            break
    if forecast_origin is None or expected_history is None or raw_history is None or history is None:
        raise ValueError(
            "No 24-hour PM2.5 input window with gaps of at most three hours was found in the last seven days."
        )

    model_hourly = hourly.loc[:forecast_origin]
    features = _feature_frame(model_hourly)
    supervised = features.join(model_hourly.rename("target")).dropna()
    if len(supervised) < MIN_TRAINING_ROWS:
        raise ValueError(
            f"At least {MIN_TRAINING_ROWS} hourly training rows are required; "
            f"only {len(supervised)} are available."
        )

    split_at = int(len(supervised) * 0.8)
    train = supervised.iloc[:split_at]
    holdout = supervised.iloc[split_at:]
    if len(holdout) < 2:
        raise ValueError("Not enough chronological holdout data to evaluate this model.")

    model = _new_model()
    model.fit(train.drop(columns="target"), train["target"])
    holdout_predictions = model.predict(holdout.drop(columns="target"))
    one_hour_metrics = _score(holdout["target"], holdout_predictions)
    one_hour_persistence = _score(holdout["target"], holdout["lag_1"].to_numpy())

    horizon_metrics, horizon_persistence, horizon_origin_count, horizon_sample_count = (
        _evaluate_recursive_horizon(model, model_hourly, holdout)
    )

    final_model = _new_model()
    final_model.fit(supervised.drop(columns="target"), supervised["target"])

    imputed_history_hours = int(raw_history.isna().sum())
    forecast_origin_end = forecast_origin + pd.Timedelta(hours=1)
    last_observation_time = observations.loc[
        (observations["Timestamp"] >= forecast_origin)
        & (observations["Timestamp"] < forecast_origin_end),
        "Timestamp",
    ].max()

    forecast_points: list[dict[str, Any]] = []
    for timestamp in pd.date_range(
        start=forecast_origin + pd.Timedelta(hours=1),
        periods=FORECAST_HOURS,
        freq="h",
    ):
        row = {
            f"lag_{lag}": float(history.iloc[-lag])
            for lag in LAGS
        }
        row.update(_time_features(pd.DatetimeIndex([timestamp])).iloc[0].to_dict())
        prediction = max(0.0, float(final_model.predict(pd.DataFrame([row]))[0]))
        forecast_points.append(
            {
                "timestamp": timestamp.isoformat(),
                "prediction": round(prediction, 2),
            }
        )
        history.loc[timestamp] = prediction

    actual_history = model_hourly.dropna().tail(48)
    return {
        "station_name": str(station_df["Station Name"].iloc[0])
        if "Station Name" in station_df and not station_df.empty
        else "",
        "target": "PM2.5",
        "unit": "µg/m³",
        "model": {
            "name": "HistGradientBoostingRegressor",
            "method": "Recursive hourly forecast using recent PM2.5 lags and time-of-week/year features",
            "training_samples": int(len(train)),
            "holdout_samples": int(len(holdout)),
            "training_start": train.index.min().isoformat(),
            "training_end": train.index.max().isoformat(),
            "holdout_start": holdout.index.min().isoformat(),
            "holdout_end": holdout.index.max().isoformat(),
            "evaluation": "Chronological 20% holdout; daily rolling origins; recursive 24-hour predictions",
            "validated_horizon_hours": FORECAST_HOURS,
            "validation_origins": horizon_origin_count,
            "validation_samples": horizon_sample_count,
            "metrics": horizon_metrics,
            "persistence_baseline": horizon_persistence,
            "model_beats_persistence_baseline": horizon_metrics["mae"] < horizon_persistence["mae"],
            "one_hour_holdout": {
                "metrics": one_hour_metrics,
                "persistence_baseline": one_hour_persistence,
            },
        },
        "last_observation": last_observation_time.isoformat(),
        "latest_source_observation": latest_source_observation.isoformat(),
        "forecast_origin_hour": forecast_origin.isoformat(),
        "hourly_history": [
            {"timestamp": timestamp.isoformat(), "actual": round(float(value), 2)}
            for timestamp, value in actual_history.items()
        ],
        "forecast": forecast_points,
        "feature_history_hours_filled_forward": imputed_history_hours,
        "forecast_horizon_hours": FORECAST_HOURS,
    }
