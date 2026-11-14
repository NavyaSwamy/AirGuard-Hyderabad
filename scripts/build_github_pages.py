from __future__ import annotations

import argparse
import json
import shutil
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import quote, urlencode
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from app import app


def get_json(client: Any, path: str, *, allow_unprocessable: bool = False) -> dict[str, Any]:
    response = client.get(path)
    if response.status_code != 200 and not (allow_unprocessable and response.status_code == 422):
        raise RuntimeError(f"Static snapshot request failed ({response.status_code}): {path}")
    body = response.get_json()
    if not isinstance(body, dict):
        raise RuntimeError(f"Static snapshot endpoint did not return a JSON object: {path}")
    return {"status": response.status_code, "body": body}


def main() -> None:
    parser = argparse.ArgumentParser(description="Build a GitHub Pages snapshot of AirGuard.")
    parser.add_argument("--output", default="_site", help="Output directory inside the repository.")
    args = parser.parse_args()
    output = (ROOT / args.output).resolve()
    if ROOT not in output.parents:
        raise ValueError("The output directory must be inside the repository.")

    client = app.test_client()
    summary_response = get_json(client, "/api/summary")
    summary = summary_response["body"]
    stations = summary.get("stations", [])
    if not stations:
        raise RuntimeError("The station summary is empty; refusing to publish an empty site.")
    generated_at = datetime.now(timezone.utc).isoformat()
    summary.setdefault("meta", {})["snapshot_generated_at"] = generated_at

    snapshot: dict[str, Any] = {
        "generated_at": generated_at,
        "summary": summary,
        "insights": get_json(client, "/api/insights")["body"],
        "stations": {},
        "historical_aqi": {},
        "monthly_trends": {},
        "forecasts": {},
        "time_profiles": {},
        "comparison": {},
        "model_metrics": {},
    }

    for station in stations:
        name = station["station_name"]
        encoded_name = quote(name, safe="")
        snapshot["stations"][name] = get_json(client, f"/api/station/{encoded_name}")["body"]
        snapshot["historical_aqi"][name] = get_json(
            client, f"/api/historical-aqi/{encoded_name}"
        )["body"]
        snapshot["monthly_trends"][name] = get_json(
            client, f"/api/monthly-trends/{encoded_name}"
        )["body"]
        snapshot["time_profiles"][name] = get_json(
            client, f"/api/time-profile/{encoded_name}"
        )["body"]
        snapshot["forecasts"][name] = get_json(
            client, f"/api/forecast/{encoded_name}", allow_unprocessable=True
        )

    compare_query = urlencode([("stations", station["station_name"]) for station in stations])
    snapshot["comparison"] = get_json(client, f"/api/compare?{compare_query}")["body"]
    snapshot["model_metrics"] = get_json(
        client, "/api/model-metrics", allow_unprocessable=True
    )

    output.mkdir(parents=True, exist_ok=True)
    shutil.copytree(ROOT / "static", output / "static", dirs_exist_ok=True)
    index = client.get("/").get_data(as_text=True)
    app_script_tag = '<script defer src="static/app.js"></script>'
    if app_script_tag not in index:
        raise RuntimeError("Unable to find the frontend script tag in the rendered page.")
    index = index.replace(
        app_script_tag,
        '<script>window.AIRGUARD_STATIC = true;</script>\n    ' + app_script_tag,
        1,
    )
    (output / "index.html").write_text(index, encoding="utf-8")
    shutil.copy2(ROOT / "static" / "manifest.webmanifest", output / "manifest.webmanifest")
    (output / "airguard-api.json").write_text(
        json.dumps(snapshot, ensure_ascii=False, separators=(",", ":"), allow_nan=False),
        encoding="utf-8",
    )
    (output / ".nojekyll").touch()

    forecast_count = sum(
        1
        for result in snapshot["forecasts"].values()
        if result["status"] == 200 and len(result["body"].get("forecast", [])) == 24
    )
    print(
        f"Built {output.relative_to(ROOT)} with {len(stations)} stations, "
        f"{forecast_count} validated 24-hour forecasts."
    )


if __name__ == "__main__":
    main()
