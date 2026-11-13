from __future__ import annotations

import unittest

import numpy as np
import pandas as pd

from airguard_forecasting import train_and_forecast


class ForecastingTests(unittest.TestCase):
    def setUp(self) -> None:
        self.timestamps = pd.date_range("2024-01-01", periods=600, freq="h", tz="UTC")
        hours = np.arange(len(self.timestamps))
        self.station_df = pd.DataFrame(
            {
                "Station Name": "Test Station",
                "Timestamp": self.timestamps,
                "PM2.5 (µg/m³)": 30 + 8 * np.sin(2 * np.pi * hours / 24) + hours / 100,
            }
        )

    def test_forecast_is_future_horizon_and_has_chronological_evaluation(self) -> None:
        result = train_and_forecast(self.station_df)

        self.assertEqual(len(result["forecast"]), 24)
        self.assertEqual(len(result["hourly_history"]), 48)
        self.assertEqual(result["station_name"], "Test Station")
        self.assertEqual(
            result["model"]["evaluation"],
            "Chronological 20% holdout; daily rolling origins; recursive 24-hour predictions",
        )
        self.assertGreater(result["model"]["holdout_samples"], 1)
        self.assertEqual(result["model"]["validated_horizon_hours"], 24)
        self.assertGreaterEqual(result["model"]["validation_origins"], 3)
        self.assertEqual(result["model"]["validation_samples"], result["model"]["validation_origins"] * 24)
        self.assertIn("mae", result["model"]["metrics"])
        self.assertIn("mae", result["model"]["persistence_baseline"])
        self.assertGreater(
            pd.Timestamp(result["forecast"][0]["timestamp"]),
            pd.Timestamp(result["last_observation"]),
        )

    def test_short_recent_gap_is_reported_when_filled_for_forecast_features(self) -> None:
        self.station_df.loc[597, "PM2.5 (µg/m³)"] = np.nan

        result = train_and_forecast(self.station_df)

        self.assertEqual(result["feature_history_hours_filled_forward"], 1)
        self.assertEqual(len(result["forecast"]), 24)

    def test_insufficient_history_returns_a_clear_error(self) -> None:
        with self.assertRaisesRegex(ValueError, "At least 100 hourly training rows"):
            train_and_forecast(self.station_df.head(60))

    def test_forecast_is_withheld_without_three_complete_horizon_windows(self) -> None:
        with self.assertRaisesRegex(ValueError, "At least 3 complete 24-hour holdout windows"):
            train_and_forecast(self.station_df.head(300))


if __name__ == "__main__":
    unittest.main()
