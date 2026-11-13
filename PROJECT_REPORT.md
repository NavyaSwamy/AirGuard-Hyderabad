# AirGuard: Hyderabad Air Pollution Intelligence Platform

**Tagline:** Breathe Smarter. Live Healthier.  
**Project type:** Environmental data analysis, machine learning, and public-information web application  
**Primary target:** Historical and forecast PM2.5 information from Hyderabad-area monitoring stations

> **Important status note:** The supplied pollutant files end at **2025-12-31 23:45 UTC**. The app is not connected to a live sensor feed. A map pin marks an approximate locality or named place, not the verified position of an air monitor. The ML output is an experimental forecast from the archived data, not a current air-quality alert or medical recommendation.

## 1. Abstract

AirGuard is a web-based air-pollution information platform for Hyderabad. It brings station measurements, a historical official-AQI archive, station comparisons, trends, a map, and experimental PM2.5 forecasts into one interface. The application processes OpenCity/CPCB station CSVs, preserves missing measurements as missing, and exposes the results through a Flask API to a responsive English/Telugu website.

The project has two distinct data tracks. The 2024–2025 files contain 15-minute pollutant concentrations, which are used for concentration views and PM2.5 forecasting. A separate 2017–2023 archive contains source-reported hourly AQI values. The tracks are deliberately not combined because AQI values are not pollutant concentrations and the archive does not provide a matching pollutant breakdown.

For forecasting, AirGuard uses a scikit-learn histogram gradient-boosting regressor to predict hourly mean PM2.5 up to 24 hours ahead. It compares recursive forecasts with a persistence baseline and withholds output when fewer than three complete 24-hour validation windows are available. Results vary by station; the forecast is presented as an estimate rather than a guarantee.

## 2. Problem and motivation

Air-quality information is difficult to use when measurements are distributed across files, stations, and time periods. People may not know which station to inspect, what pollutant values mean, whether a number is AQI or concentration, or whether the information is current.

AirGuard addresses this usability problem by organizing the available records into an explorable station view. It aims to help people understand historical patterns and compare recorded station measurements without implying that an old observation describes today's air.

## 3. Objectives

- Consolidate the available Hyderabad station files into a consistent, queryable application.
- Show available pollutant concentrations and their source observation times.
- Keep official archived AQI distinct from pollutant concentrations and from AirGuard's own risk score.
- Let users search and compare stations and explore historical trends.
- Provide a 24-hour PM2.5 forecast only when the forecast horizon has sufficient validation data.
- Make the interface usable on desktop and mobile, in English and Telugu.
- Clearly communicate gaps, uncertainty, approximate map locations, and data age.

## 4. Intended users and potential value

| User group | How AirGuard may help |
|---|---|
| Hyderabad residents | Browse recorded measurements at nearby named station areas and understand that values are historical. |
| People planning outdoor activities | Compare station trends and use the site's informational guidance as context, not as a medical decision. |
| Students and educators | Explore a real environmental dataset, time series, missing data, model validation, and map visualisation. |
| Researchers and civic groups | Quickly inspect station coverage, pollutant availability, historical changes, and model performance. |
| City/environment teams | Use the interface as a prototype for communicating monitoring data; operational decisions still require verified, current sources. |

AirGuard is informational. It is not a clinical tool, regulatory monitoring system, emergency warning service, or substitute for official current AQI guidance.

## 5. Technology stack

### Frontend

- **HTML5** for page structure and accessible controls.
- **CSS3** for styling, themes, and responsive layouts.
- **Vanilla JavaScript** for API requests, interactions, translations, and rendering. There is no configured React, Vue, Angular, or frontend build framework.
- **Jinja2 templates** (through Flask) to render the HTML page.
- **PWA manifest and service worker** are configured for an installable app shell and static-asset caching. API responses are fetched from the server and are not served from the service-worker cache.

### Backend

- **Python** and **Flask 3.1.3** serve the website and JSON API routes.
- Python standard-library modules such as `csv`, `json`, and `sqlite3` support file parsing, metadata, and local persistence.

### Machine learning and data science

- **pandas 3.1.1** for CSV/time-series handling and resampling.
- **NumPy 2.5.4** for numerical operations and cyclical time features.
- **scikit-learn 1.9.1** for `HistGradientBoostingRegressor` and MAE, RMSE, and R² evaluation.

These are the direct project dependencies pinned in [`requirements.txt`](requirements.txt); scikit-learn's transitive dependencies are not listed as direct project libraries.

### Database

- **SQLite**, accessed through Python's built-in `sqlite3`, stores the local `station_snapshots` table in `data/processed/airguard.db`.
- CSV files remain the source datasets. JSON files hold generated reports and map-reference metadata; CSV and JSON are files, not database technologies.

### Visualisation and maps

- **Chart.js** draws the time-series, comparison, and forecast charts. The template loads it from jsDelivr without an explicit version pin.
- **Leaflet 1.9.4** provides the interactive map and markers.
- **OpenStreetMap** supplies map tiles and attributed approximate place references. The OSM data is not a verified sensor-location source.

### Deployment

- The only configured server is **Flask's built-in development server**, started from `app.py` with host `0.0.0.0`, port `5001` by default (or the `PORT` environment variable), and `debug=True`.
- **No production deployment platform or server is configured**: there is no Docker setup, Gunicorn/uWSGI, Nginx configuration, hosting-provider configuration, or CI/CD pipeline in the project.
- The PWA manifest/service worker provide an offline-capable static shell; they do not constitute a hosted production deployment.

## 6. Datasets and source boundaries

### A. 15-minute pollutant concentration feed

- **Source:** [OpenCity — Hyderabad Hourly Air Quality Reports](https://data.opencity.in/dataset/hyderabad-hourly-air-quality-reports), with local station CSVs attributed to OpenCity/CPCB.
- **Local files:** `data/raw/fifteen_min_2024_25/`
- **Coverage:** 14 station files, **980,359 rows** in total, from **2024-01-01 00:00 UTC** through **2025-12-31 23:45 UTC**.
- **Sampling:** Nominally every 15 minutes.
- **Pollutant fields present in the source:** PM2.5, PM10, NO, NO2, NOx, NH3, SO2, CO, and ozone. Units are included in the CSV column names.
- **Valid source values across all rows:**

| Pollutant | Valid readings | Share of 980,359 rows |
|---|---:|---:|
| PM2.5 | 791,064 | 80.7% |
| PM10 | 712,355 | 72.7% |
| NO | 808,470 | 82.5% |
| NO2 | 808,669 | 82.5% |
| NOx | 803,725 | 82.0% |
| NH3 | 700,446 | 71.4% |
| SO2 | 781,224 | 79.7% |
| CO | 807,044 | 82.3% |
| Ozone | 802,266 | 81.8% |

The source has missing pollutant values. The application does not turn a missing value into zero. The data-quality report records **zero duplicate station/timestamp pairs** in the processed source.

### B. Historical official-AQI archive

- **Source:** The same OpenCity package's separate hourly AQI resources.
- **Local files:** `data/raw/hourly_2017_2023/`
- **Coverage:** 14 station files and **388,338 valid hourly AQI observations**, from **2017-02-02** through **2023-12-31**.
- These files contain AQI, not matching PM2.5 concentrations. Their timestamps have no documented timezone in the supplied archive, and no pollutant sub-index breakdown is available.
- The app displays this as archived AQI and does not combine it with the 2024–2025 concentration feed or infer an AQI pollutant breakdown.
- Category boundaries used by the app follow the encoded CPCB bands: Good 0–50, Satisfactory 51–100, Moderate 101–200, Poor 201–300, Very Poor 301–400, and Severe 401–500.

### C. Map reference locations

The source station CSVs do **not** contain verified monitor coordinates. For the interactive map, `data/processed/station_locations.json` records OpenStreetMap/Nominatim locality or named-place reference coordinates for 14 station areas. These are explicitly approximate, not device coordinates. Map colors represent the measured station's AirGuard Risk Index; they do not estimate pollution at every point or neighborhood between monitors. OpenStreetMap attribution is shown in the map.

### Data inventory

Machine-readable summaries are in [`reports/dataset_inventory.json`](reports/dataset_inventory.json), [`reports/data_quality_report.json`](reports/data_quality_report.json), [`reports/station_coverage.json`](reports/station_coverage.json), [`reports/data_dictionary.json`](reports/data_dictionary.json), and [`reports/preprocessing_report.json`](reports/preprocessing_report.json).

## 7. End-to-end workflow

```text
OpenCity/CPCB station CSVs (2024–2025) ──┐
                                         ├─> Flask data loading and APIs ─> AirGuard website
OpenCity/CPCB hourly AQI archive (2017–23)┘                              ├─> station dashboard
                                                                        ├─> trends / comparison
2024–25 PM2.5 -> hourly means -> lag/calendar features -> ML model       ├─> historical AQI view
                                    -> validation -> 24-hour estimate    └─> Leaflet map
OpenStreetMap locality references -------------------------------------> approximate map pins
```

### Data-to-screen steps

1. **Load:** `app.py` reads the 14 pollutant CSVs and separately parses the archived AQI files.
2. **Normalize:** Timestamps in the concentration dataset are parsed as UTC; rows without a valid timestamp are excluded. Pollutant values are handled as numeric readings, while unavailable values remain missing.
3. **Summarize:** The app builds station summaries, latest available readings, pollutant contributors, and station metadata. A SQLite `station_snapshots` table is refreshed during app initialization.
4. **Serve:** Flask endpoints return JSON for the station list, station details, trends, comparison, archived AQI, and forecasts.
5. **Present:** JavaScript fetches the data and renders the cards, charts, bilingual labels, map markers, and empty/error states.
6. **Forecast:** For a selected station with sufficient PM2.5 history, the model validates and produces 24 hourly predictions.

## 8. Machine-learning implementation

### Target and feature construction

- **Target:** Hourly mean PM2.5 concentration in µg/m³, computed from the available 15-minute PM2.5 observations for each station.
- **Lag features:** PM2.5 at 1, 2, 3, 6, 12, and 24 hours before the prediction time.
- **Cyclical time features:** Sine/cosine encodings for hour of day, weekday, and day of year. These let the model represent repeating calendar patterns without treating the start/end of a cycle as far apart.
- **Estimator:** scikit-learn `HistGradientBoostingRegressor`, configured with 160 boosting iterations, at most 15 leaf nodes, L2 regularization of 1.0, and random seed 42.

This is supervised regression on historical time-series features; it is not a neural network or a generative AI model.

### Training, validation, and forecast generation

1. The time series is resampled to hourly means and sorted chronologically.
2. Rows that lack target or required lag features are excluded from supervised training. Historical targets are not broadly imputed.
3. The supervised series is split chronologically: the first 80% is used to fit the evaluation model and the later 20% is held out.
4. The model is tested with **recursive 24-hour predictions** at daily rolling origins within the holdout. Each predicted hour is fed back as a lag for the next hour, matching how a 24-hour forecast is generated.
5. At least **three complete 24-hour windows** are required. The evaluator considers up to 20 daily origins per station. The persistence baseline repeats the last observed PM2.5 value through each forecast window.
6. MAE, RMSE, and R² are computed over the recursive horizon. The model is then refit on all eligible historical supervised rows and used to create 24 hourly predictions.
7. Predicted concentrations are constrained to be non-negative. The last 24-hour input history may forward-fill gaps of up to three hours; the count is exposed in the response. A station without enough usable history or validation windows does not get a forecast.

The implementation is in [`airguard_forecasting.py`](airguard_forecasting.py), the batch evaluator is [`scripts/train_forecasts.py`](scripts/train_forecasts.py), and saved per-station results are in [`reports/model_evaluation.json`](reports/model_evaluation.json).

### Saved validation results

The evaluation report contains 14 evaluated stations. The following table compares each station's recursive-horizon PM2.5 MAE with its persistence-baseline MAE. R² and origin counts are included to show that performance differs by station.

| Station | Model MAE (µg/m³) | Persistence MAE (µg/m³) | R² | 24-hour origins |
|---|---:|---:|---:|---:|
| Bollaram Industrial Area | 7.02 | 6.81 | 0.469 | 10 |
| Central University | 3.90 | 5.37 | 0.211 | 5 |
| ECIL Kapra | 2.75 | 2.33 | -0.499 | 14 |
| ICRISAT Patancheru | 8.71 | 10.61 | 0.486 | 14 |
| IDA Pashamylaram | 5.98 | 8.97 | 0.084 | 13 |
| IITH Kandi | 2.15 | 2.13 | 0.367 | 7 |
| Kokapet | 1.62 | 2.00 | 0.056 | 19 |
| Kompally Municipal Office | 0.86 | 3.86 | 0.883 | 3 |
| Nacharam TSIIC IALA | 2.52 | 2.81 | -0.035 | 12 |
| New Malakpet | 2.26 | 2.59 | -0.052 | 14 |
| Ramachandrapuram | 5.74 | 26.82 | -4.123 | 14 |
| Sanathnagar | 7.88 | 5.70 | -0.709 | 14 |
| Somajiguda | 7.85 | 11.26 | 0.110 | 7 |
| Zoo Park | 8.09 | 9.43 | 0.317 | 16 |

Across stations, the **unweighted mean** model MAE is **4.81 µg/m³**, mean RMSE is **6.90 µg/m³**, and mean R² is **-0.174**; the unweighted mean persistence MAE is **7.19 µg/m³**. The model has lower MAE than persistence at **10 of 14 stations**. These are averages of station-level metrics, not pooled citywide errors. Negative R² values and station-level regressions show that performance is not uniformly good; results must not be presented as a proven improvement for every location.

## 9. AirGuard Risk Index versus AQI

The dashboard and map include an AirGuard Risk Index, a custom 0–100 summary—not official AQI. In the current implementation it:

1. Divides each available pollutant measurement by the implementation's normalizing denominator: PM2.5/60, PM10/100, NO2/80, SO2/80, CO/2, and ozone/100 (units follow the source field).
2. Averages the available normalized components; missing pollutants are omitted rather than treated as zero.
3. Multiplies the mean by 100 and caps it at 100.

The highest normalized component may be shown as the largest contributor to this custom score; it is not an official AQI dominant-pollutant sub-index. Official AQI is shown only from the separate archived AQI source. A custom index category or map color must not be relabeled as CPCB AQI.

## 10. Application features

- **Home/AQI card:** Historical official AQI where the archive has a reading, with source period, station, and caveat.
- **Explore map:** 14 approximate locality/place pins. Each popup provides station name, reference locality, custom risk score (when available), PM2.5/PM10 values (when available), historical observation time, OpenStreetMap link, and a route to station details. Searching the station list filters the pins.
- **Station dashboard:** Latest source-recorded pollutant readings, timestamp, station context, and trend chart.
- **Insights:** Station summary and relative custom-risk comparisons.
- **Historical trends:** Monthly PM2.5/PM10 concentration trends and monthly archived AQI trends remain separate.
- **Forecast:** Historical PM2.5 and gated 24-hour predictions with validation metrics and a persistence comparison.
- **Compare:** Interactive PM2.5 series comparison for selected stations.
- **Personal AirGuard:** Historical time-of-day profile and informational activity guidance based on available station data.
- **Exposure estimator:** Concentration × selected duration as a simple proxy. It is **not** inhaled dose, a health-risk calculation, or a forecast.
- **Language and layout:** English/Telugu switch, responsive layout, light/dark theme, and loading/error/empty states.
- **Nature pause:** A short breathing exercise and local nature imagery; these are wellbeing/UX features, not air-quality evidence.

## 11. API and code map

| Endpoint / file | Purpose |
|---|---|
| `/api/summary` | Station summaries and dataset metadata. |
| `/api/station/<station>` | Station detail and recent readings. |
| `/api/insights` | Summary indicators across stations. |
| `/api/monthly-trends/<station>` | Monthly pollutant concentration summaries. |
| `/api/historical-aqi/<station>` | Separate hourly AQI archive and monthly values. |
| `/api/time-profile/<station>` | Historical time-of-day profile. |
| `/api/forecast/<station>` | Validated 24-hour PM2.5 forecast or a clear unavailable response. |
| `/api/compare?stations=...` | Recent station series for comparison. |
| `/api/model-metrics` | Model metric endpoint used by the interface. |
| `app.py` | Data loading, reports, SQLite snapshot, Flask APIs, and server entry point. |
| `airguard_forecasting.py` | Feature engineering, model fit, recursive validation, and prediction. |
| `templates/index.html` | Single-page structure and external Chart.js/Leaflet assets. |
| `static/app.js`, `static/styles.css` | Data fetching, interaction, charts, map, translation, and responsive styling. |
| `data/processed/station_locations.json` | Approximate locality map references and precision notes. |
| `tests/` | Focused data-quality, API, and forecasting regression tests. |

## 12. User workflow

1. Open **Explore Map** and search a station or area name.
2. Select a colored marker or station card. Read the popup's locality-reference caveat, source timestamp, and available pollutant values.
3. Open the station dashboard for the selected station's measured values and trends.
4. Use **Compare** to inspect recent station PM2.5 records or **Insights** for a city-level station summary.
5. Open **Forecast** only when a validated forecast is available; read its horizon, validation scores, source time, and baseline comparison.
6. Use **Personal AirGuard** or **Exposure** only as general informational context, keeping the historical-data and non-medical caveats in mind.

## 13. Development and execution workflow

From the project directory:

```bash
python3 -m venv .venv
./.venv/bin/python -m pip install -r requirements.txt
./.venv/bin/python app.py
```

The Flask development server defaults to port **5001**. To select a different port, set `PORT`, for example `PORT=5002 ./.venv/bin/python app.py`.

To regenerate all station evaluation results:

```bash
./.venv/bin/python -c 'import runpy; runpy.run_path("scripts/train_forecasts.py", run_name="__main__")'
```

To run focused project tests:

```bash
./.venv/bin/python -m unittest discover -s tests -p 'test_airguard_*.py'
node --check static/app.js
```

The application loads local CSV files and rebuilds its SQLite snapshot and data reports at initialization. Forecast evaluation is a separate batch step; the endpoint computes/caches station forecasts as requested.

## 14. Results and verification

- Dataset inventory confirms **14 stations** and **980,359** 15-minute source rows for 2024–2025.
- The distinct official-AQI archive contains **388,338** valid hourly readings for 2017–2023.
- The ML report contains results for **14/14 stations**, each meeting the three-origin minimum; validation uses 3–19 complete daily 24-hour windows per station.
- The focused automated suite passed **9 tests** in the latest run.
- Browser verification confirmed 14 map markers, station-search filtering, PM2.5/PM10 popups, marker-to-dashboard selection, Telugu map labels, no browser page errors, and no horizontal overflow at a 390-pixel viewport.

These are implementation and validation results, not evidence that the site provides current air readings or a certified forecasting service.

## 15. Limitations, safety, and future improvements

1. **Historical data only:** The concentration files stop in 2025. A live or regularly updated deployment needs a maintained, licensed feed, freshness monitoring, and clear outage behavior.
2. **Approximate map points:** OSM locality/place coordinates are not exact station coordinates. Obtain official monitor coordinates before labeling markers as precise.
3. **Coverage and missingness:** Pollutant completeness differs by station and pollutant. A latest station record can have no pollutant values; the interface should show “not reported,” not a fabricated zero.
4. **Forecast quality varies:** A 24-hour gate establishes a minimum amount of validation evidence, not forecast accuracy. Some model results underperform persistence and some station R² values are negative.
5. **No spatial interpolation:** AirGuard shows readings attached to named monitored stations only. It does not infer pollution for unmonitored Hyderabad locations.
6. **No medical claims:** Personal guidance is informational and based on historical records; exposure multiplication is not inhaled dose.
7. **Separate AQI archive:** The 2017–2023 source has unspecified timezone and no pollutant breakdown; do not merge it with 2024–2025 concentration series.
8. **Operational hardening:** A production release should use a production WSGI server, monitoring, data-refresh automation, security review, and explicit source-license/retention policies.

Recommended next steps are to obtain verified sensor coordinates, connect an authorized up-to-date feed, retrain and revalidate on refreshed data, test calibration and seasonal drift, and continue showing baseline comparisons and per-station uncertainty.

## 16. Short presentation summary

> AirGuard is a bilingual Hyderabad air-quality information website built with Flask, pandas, scikit-learn, JavaScript, Chart.js, and Leaflet. It processes 980,359 historical 15-minute pollutant records from 14 stations, keeps a separate 388,338-record historical AQI archive distinct, and adds a station-specific 24-hour PM2.5 model based on histogram gradient boosting. Forecast validation is chronological and recursive, and the model beats a persistence baseline at 10 of 14 stations—so performance is promising in some areas but not uniform. The map shows approximate OpenStreetMap locality references, not verified monitor coordinates, and all displayed source observations are historical rather than live.

## 17. Key questions and answers

**Is this live air quality?** No. The local pollutant data ends on 2025-12-31 UTC. It should not be used as today's reading.

**Is the map showing exact sensor locations?** No. It uses approximate OpenStreetMap locality or named-place references because the source datasets lack verified monitor coordinates.

**Is the AirGuard Risk Index official AQI?** No. It is a custom station summary. Archived official AQI is displayed separately from the 2017–2023 archive.

**Does the forecast work equally well everywhere?** No. The model has lower MAE than the persistence baseline on 10 of 14 stations, while performance and R² vary. The forecast should be treated as experimental.

**What does “place-by-place” mean in the map?** It means values measured at the listed monitoring stations, displayed near approximate named-place references. The app does not estimate conditions for every neighborhood.
