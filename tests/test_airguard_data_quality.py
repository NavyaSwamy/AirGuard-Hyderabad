from __future__ import annotations

import csv
import tempfile
import unittest
from pathlib import Path

import pandas as pd

from app import (
    app,
    build_airguard_insights,
    collect_station_summary,
    official_aqi_category,
    parse_aqi_archive_file,
)


class StationDataQualityTests(unittest.TestCase):
    def test_missing_latest_pollutants_are_not_reported_as_zero_exposure(self) -> None:
        timestamp = pd.Timestamp("2025-12-31T23:45:00Z")
        stations = collect_station_summary(pd.DataFrame([
            {
                "Station Name": "Measured Station",
                "Timestamp": timestamp,
                "PM2.5 (µg/m³)": 30.0,
            },
            {
                "Station Name": "Missing Station",
                "Timestamp": timestamp,
                "PM2.5 (µg/m³)": None,
            },
        ]))

        measured, missing = stations
        self.assertEqual(measured["station_display"], "Measured Station")
        self.assertEqual(measured["risk_score"], 50.0)
        self.assertEqual(measured["dominant_pollutant"], "PM2.5")
        self.assertNotIn("latitude", measured)
        self.assertNotIn("longitude", measured)
        self.assertIsNone(missing["risk_score"])
        self.assertIsNone(missing["risk_label"])

        insights = build_airguard_insights(stations)
        self.assertEqual(insights["average_risk"], 50.0)
        self.assertEqual(insights["best_station"]["station_display"], "Measured Station")

    def test_insights_handle_a_snapshot_without_any_pollutant_readings(self) -> None:
        insights = build_airguard_insights([
            {"station_display": "Missing Station", "risk_score": None},
        ])

        self.assertIsNone(insights["average_risk"])
        self.assertIsNone(insights["best_station"]["risk_score"])
        self.assertIn("No pollutant readings", insights["summary"])

    def test_archive_parser_preserves_hourly_source_values(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "station.csv"
            with path.open("w", newline="", encoding="utf-8") as source:
                writer = csv.writer(source)
                writer.writerow(["Year", "2022"])
                writer.writerow(["January-2022", *[f"{hour:02d}:00:00" for hour in range(24)]])
                writer.writerow(["1", *range(1, 25)])
                writer.writerow(["2", *("" for _ in range(24))])
            records = parse_aqi_archive_file(path, "Test Station")

        self.assertEqual(len(records), 24)
        self.assertEqual(records[0]["timestamp"], "2022-01-01T00:00:00")
        self.assertEqual(records[-1]["aqi"], 24)
        self.assertEqual(records[0]["station_display"], "Test Station")

    def test_official_aqi_categories_follow_cpcb_breakpoints(self) -> None:
        self.assertEqual(official_aqi_category(50), "Good")
        self.assertEqual(official_aqi_category(51), "Satisfactory")
        self.assertEqual(official_aqi_category(400), "Very Poor")
        self.assertEqual(official_aqi_category(401), "Severe")
        self.assertIsNone(official_aqi_category(501))

    def test_source_apis_separate_archived_aqi_from_pollutant_concentrations(self) -> None:
        client = app.test_client()
        station_path = "Somajiguda%2C%20Hyderabad%20-%20TSPCB"
        aqi = client.get(f"/api/historical-aqi/{station_path}").get_json()
        trends = client.get(f"/api/monthly-trends/{station_path}").get_json()
        profile = client.get(f"/api/time-profile/{station_path}").get_json()
        summary = client.get("/api/summary").get_json()

        self.assertEqual(aqi["source_period"], "2017-2023")
        self.assertIn(aqi["latest"]["category"], {"Good", "Satisfactory", "Moderate", "Poor", "Very Poor", "Severe"})
        self.assertIsNone(aqi["pollutant_breakdown"])
        self.assertTrue(trends["monthly"])
        self.assertIn("pm25", trends["monthly"][0])
        self.assertEqual(profile["timezone"], "Asia/Kolkata")
        self.assertTrue(profile["hours"])
        self.assertEqual(summary["meta"]["sample_count"], 980359)
        self.assertIn("not a live feed", summary["meta"]["source_note"])
        self.assertTrue(all("latitude" not in station and "longitude" not in station for station in summary["stations"]))
        map_locations = [station["map_location"] for station in summary["stations"]]
        self.assertEqual(len(map_locations), 14)
        self.assertTrue(all(location and "approximate" in location["precision"].lower() for location in map_locations))
        self.assertTrue(all(-90 <= location["latitude"] <= 90 for location in map_locations))
        self.assertTrue(all(-180 <= location["longitude"] <= 180 for location in map_locations))


if __name__ == "__main__":
    unittest.main()
