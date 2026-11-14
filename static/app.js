const translations = {
  en: {
    'nav.primary': 'Primary navigation',
    'lang.switcher': 'Language switcher',
    'theme.toggle': 'Toggle light or dark theme',
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.pause': 'Pause',
    'nav.explore': 'Explore Map',
    'nav.forecast': 'Forecast',
    'nav.insights': 'Insights',
    'nav.compare': 'Compare',
    'nav.personal': 'Personal AirGuard',
    'nav.exposure': 'Exposure',
    'nav.about': 'About',
    'hero.eyebrow': 'Hyderabad air intelligence',
    'hero.title': 'Understand the air around you.',
    'hero.subtitle': 'Explore Hyderabad’s pollution patterns, understand air quality conditions and make informed decisions for a healthier day outdoors.',
    'hero.primary': 'Explore Air Quality',
    'hero.secondary': 'Explore Hyderabad Map',
    'hero.stations': 'Stations monitored',
    'hero.samples': 'Source readings',
    'hero.source': 'Data source',
    'hero.dataCount': 'Readings in source files',
    'hero.aqiTitle': 'Archived official AQI',
    'hero.aqiLabel': 'CPCB AQI · archive',
    'hero.aqiStation': 'Monitoring station',
    'hero.aqiNote': 'Historical source-reported AQI, not current conditions. The archive has no pollutant breakdown.',
    'hero.aqiObserved': 'Observed (source-local time, timezone unspecified): {timestamp}',
    'hero.aqiUnavailable': 'No archived AQI reading is available for this station.',
    'hero.aqiAria': 'Historical official AQI {value}, {category}',
    'aqi.good': 'Good',
    'aqi.satisfactory': 'Satisfactory',
    'aqi.moderate': 'Moderate',
    'aqi.poor': 'Poor',
    'aqi.veryPoor': 'Very Poor',
    'aqi.severe': 'Severe',
    'feature.pm25': 'PM2.5 insights',
    'feature.forecast': 'AI forecasts',
    'feature.compare': 'Station comparison',
    'feature.exposure': 'Exposure guidance',
    'nature.eyebrow': 'A little space to breathe',
    'nature.title': 'Take a mindful minute',
    'nature.description': 'Choose a calming nature scene, then follow a gentle one-minute breathing rhythm. This is a relaxation pause, not air-quality guidance.',
    'nature.photoKicker': 'A moment of calm',
    'nature.forest': 'Forest path',
    'nature.lake': 'Mountain lake',
    'nature.canopy': 'Green canopy',
    'nature.previous': 'Previous nature photo',
    'nature.next': 'Next nature photo',
    'nature.choosePhoto': 'Choose a nature photograph',
    'nature.credit': 'Nature photography for reflection, not local air-quality evidence.',
    'nature.practice': 'Guided breathing',
    'nature.practiceTitle': 'A softer pace, one breath at a time',
    'nature.ready': 'Ready when you are',
    'nature.inhale': 'Breathe in · {seconds}s',
    'nature.exhale': 'Breathe out · {seconds}s',
    'nature.complete': 'Minute complete · well done',
    'nature.paused': 'Paused · resume when ready',
    'nature.instruction': 'Inhale gently for 4 seconds, then exhale for 6. Follow your own comfort.',
    'nature.start': 'Start one-minute pause',
    'nature.pause': 'Pause',
    'nature.resume': 'Resume',
    'nature.restart': 'Begin again',
    'nature.reset': 'Reset',
    'nature.timerLabel': '{time} remaining',
    'explore.eyebrow': 'Explore map',
    'explore.title': 'Hyderabad air quality map',
    'explore.description': 'See approximate neighborhood locations for Hyderabad monitoring stations and compare each station’s latest recorded readings. Pins are locality references, not exact monitor positions; readings are historical, not live or city-wide AQI.',
    'explore.loading': 'Loading Hyderabad station data…',
    'explore.mapUnavailable': 'The interactive map could not be loaded. Station readings are still available in the list below.',
    'explore.mapReady': 'Approximate station-area pins · colored by latest recorded AirGuard Risk Index (custom 0–100), not official AQI.',
    'explore.noCoordinates': 'No approximate map locations are available for this search.',
    'explore.locationNote': 'Pins show approximate OpenStreetMap locality references—not verified monitor locations. Only readings from the named stations are shown; no values are estimated for other places.',
    'explore.legendNote': 'Color = AirGuard Risk Index (custom 0–100), not official AQI. Values are historical; see each pin for its observation time.',
    'explore.search': 'Search monitoring stations',
    'explore.searchPlaceholder': 'Search station name',
    'explore.noMatches': 'No stations match your search.',
    'explore.mapLabel': 'Hyderabad map with approximate neighborhood reference points for air-quality monitoring stations',
    'explore.legendLabel': 'AirGuard Risk Index map legend',
    'explore.legendLow': 'Lower · under 35',
    'explore.legendModerate': 'Moderate · 35–74.9',
    'explore.legendElevated': 'Elevated · 75 or higher',
    'risk.good': 'Good',
    'risk.moderate': 'Moderate',
    'risk.elevated': 'Elevated',
    'risk.unhealthySensitive': 'Unhealthy for sensitive groups',
    'risk.unhealthy': 'Unhealthy',
    'risk.veryUnhealthy': 'Very unhealthy',
    'map.pm25': 'PM2.5',
    'map.pm10': 'PM10',
    'map.notReported': 'Not reported',
    'map.approximate': 'Approximate locality marker · not monitor coordinates',
    'map.risk': 'AirGuard Risk Index (not AQI)',
    'map.observed': 'Historical source observation',
    'map.locationLink': 'Open approximate place in OpenStreetMap',
    'map.openStation': 'Open station details',
    'map.locationUnavailable': 'Approximate place unavailable',
    'map.noPollutantReading': 'No pollutant reading',
    'dashboard.eyebrow': 'The main experience',
    'dashboard.title': 'Hyderabad air quality dashboard',
    'dashboard.stationLabel': 'Selected station',
    'dashboard.currentStatus': 'Latest recorded reading',
    'dashboard.riskIndex': 'AirGuard Risk Index',
    'dashboard.dominant': 'Largest AirGuard index component',
    'dashboard.componentNote': 'Largest normalized contributor to AirGuard’s custom score; not an AQI pollutant sub-index.',
    'dashboard.pm25': 'PM2.5',
    'dashboard.no2': 'NO₂',
    'dashboard.pm25Note': 'Fine particles that can travel deep into the respiratory system.',
    'dashboard.no2Note': 'Nitrogen dioxide released from traffic and combustion sources.',
    'dashboard.riskNarrative': 'This AirGuard Risk Index comes from measured station pollutants.',
    'dashboard.riskNarrativeDate': 'This station-based index was calculated from its latest available source reading on {date}. It is modelled, not official AQI or live conditions.',
    'dashboard.noReading': 'No pollutant values were reported in this station’s latest source record. No AirGuard Risk Index is available.',
    'dashboard.pollutantTitle': 'Available pollutant measurements',
    'dashboard.pollutantCaption': 'Latest source record · not official AQI',
    'dashboard.pollutantNote': 'Only measurements present in the selected station’s latest source record are shown; unavailable values remain blank.',
    'dashboard.noComponent': 'Not available',
    'insights.eyebrow': 'Insights',
    'insights.title': 'City-wide air intelligence',
    'insights.best': 'Lowest recorded score',
    'insights.lowestRecorded': 'Lowest recorded score: {score}/100',
    'insights.worst': 'Highest recorded score',
    'insights.highestRecorded': 'Highest recorded score: {score}/100',
    'insights.average': 'City average',
    'insights.averageNote': 'Average index across stations with reported readings in this snapshot',
    'insights.alerts': 'High-risk stations',
    'insights.alertsNote': 'Stations with higher-risk readings in this snapshot',
    'insights.summary': 'City summary',
    'insights.monthlyConcentrations': 'Monthly pollutant concentrations',
    'insights.concentrationSource': 'OpenCity / CPCB observations, 2024–2025; monthly means in source timestamps (UTC).',
    'insights.historicalAqi': 'Historical official AQI',
    'insights.aqiSource': 'OpenCity / CPCB hourly AQI archive, 2017–2023. Source-local timezone is unspecified; it is separate from concentration data.',
    'insights.monthlyStatus': '{count} months available for {station}.',
    'insights.aqiStatus': '{count} monthly averages from {station}’s archived hourly AQI.',
    'insights.noMonthlyData': 'No monthly concentration measurements are available for this station.',
    'insights.noAqiData': 'No archived AQI measurements are available for this station.',
    'forecast.eyebrow': 'Forecasting',
    'forecast.title': 'AI prediction view',
    'forecast.history': 'Recent history and next 24 hours',
    'forecast.model': 'Model evaluation',
    'forecast.modelTitle': 'Prediction quality',
    'forecast.baseline': 'Persistence baseline MAE',
    'forecast.comparisonBetter': 'On the holdout, the ML model outperformed the persistence baseline (MAE {model} vs {baseline} µg/m³).',
    'forecast.comparisonWorse': 'On the holdout, the persistence baseline was more accurate (MAE {baseline} µg/m³) than the ML model (MAE {model} µg/m³).',
    'forecast.fromDate': 'Forecast is anchored at {date}, the latest usable hourly PM2.5 window. Newest PM2.5 source measurement: {latest}. This is not live air quality.',
    'forecast.note': 'The model is evaluated on a chronological holdout and compared with a simple persistence baseline. Forecasts are estimates, not official AQI.',
    'forecast.validatedHorizon': 'Validated recursive horizon',
    'forecast.validationOrigins': 'Complete validation windows',
    'forecast.evaluationDetails': 'Recursive 24-hour validation across {origins} daily rolling origins ({samples} hourly measurements); metrics are reported over that exact horizon.',
    'forecast.error': 'Forecast unavailable: {message}',
    'dashboard.error': 'Station data could not be loaded: {message}',
    'app.error': 'AirGuard data could not be loaded: {message}',
    'app.snapshot': 'Static data snapshot generated {date} UTC. Measurements are historical, not live.',
    'compare.eyebrow': 'Comparison',
    'compare.title': 'Compare monitoring stations',
    'compare.first': 'Station 1',
    'compare.second': 'Station 2',
    'personal.eyebrow': 'Personal AirGuard',
    'personal.title': 'Outdoor planning and exposure guidance',
    'personal.station': 'Location',
    'personal.activity': 'Activity',
    'personal.duration': 'Duration',
    'personal.preferredTime': 'Preferred time (IST)',
    'personal.generate': 'Generate guidance',
    'personal.result': 'Recommendation',
    'personal.disclaimer': 'This recommendation is informational only and is not medical advice.',
    'personal.resultTitle': 'A thoughtful plan starts with the latest reading',
    'personal.resultPrompt': 'Choose a monitored location, activity and duration to see a data-aware suggestion.',
    'personal.latestReading': 'At {station}, the latest recorded AirGuard Risk Index was {score}/100 ({label}) on {date}. This describes that past reading, not current air.',
    'personal.noReadingTitle': 'No pollutant reading is available',
    'personal.noReading': 'The latest source record for {station} did not include pollutant values. No station score or outdoor suggestion can be calculated from it.',
    'personal.highTitle': 'Consider a lower-exposure plan',
    'personal.highPoint': 'The historical score was elevated. Consider a shorter or lower-intensity outing, or an indoor alternative if practical.',
    'personal.mediumTitle': 'Keep the plan flexible',
    'personal.mediumPoint': 'The recorded score was moderate. You could shorten the session and check a current source before heading out.',
    'personal.lowTitle': 'A lower recorded score at this station',
    'personal.lowPoint': 'The last recorded score at this station was in a lower AirGuard index band. This past reading does not guarantee cleaner air along a route or at a park.',
    'personal.intensePoint': 'Your selected activity can be strenuous; consider reducing intensity if conditions concern you.',
    'personal.longPoint': 'For a longer session, consider breaks or a shorter duration.',
    'personal.alternative': 'Another monitored station had a lower recorded score: {station} ({score}/100). This is a monitor comparison, not a travel recommendation.',
    'personal.noAlternative': 'There is no other monitored station to compare in this snapshot.',
    'personal.chooseActivity': 'Selected activity: {activity} · planned duration: {duration} minutes.',
    'personal.timeProfile': 'Historical 30-day mean PM2.5 for {hour}:00 IST: {value} µg/m³ from {count} hourly source observations, ending {date}. This describes source history only, not a forecast.',
    'personal.noTimeProfile': 'No historical hourly PM2.5 measurement is available for {hour}:00 IST in this station’s source period.',
    'personal.profileUnavailable': 'Historical time-of-day guidance is unavailable: {message}',
    'exposure.eyebrow': 'Exposure estimator',
    'exposure.title': 'Concentration × planned duration',
    'exposure.prompt': 'Choose a station and duration to calculate an informational concentration-duration proxy.',
    'exposure.disclaimer': 'This is not inhaled dose or a forecast. It assumes the selected station’s past concentration stays unchanged for the full duration.',
    'exposure.value': '{value} µg·h/m³',
    'exposure.noReading': 'No PM2.5 reading is available to calculate this proxy.',
    'exposure.calculationNote': 'Calculated from the station’s PM2.5 source record at {date} for {duration} minutes.',
    'activity.minuteOption': '{minutes} minutes',
    'activity.hourOption': '{hours} hour',
    'activity.15minutes': '15 minutes',
    'activity.30minutes': '30 minutes',
    'activity.1hour': '1 hour',
    'activity.2hours': '2 hours',
    'about.eyebrow': 'Data transparency',
    'about.title': 'About AirGuard',
    'about.project': 'Project purpose',
    'about.projectText': 'AirGuard is designed to make Hyderabad air quality easier to understand for students, families, professionals and outdoor enthusiasts.',
    'about.sources': 'Source data',
    'about.sourceText': 'AirGuard uses 14 OpenCity / CPCB station feeds from 2024–2025 and a separate hourly AQI archive from 2017–2023. The AQI archive has no pollutant breakdown or stated timezone; neither source is live.',
    'about.risk': 'AirGuard Risk Index',
    'about.riskText': 'The Risk Index is a user-facing interpretation derived from measured pollutants. It is not an official AQI issued by a regulatory body.',
    'activity.walking': 'Walking',
    'activity.running': 'Running',
    'activity.cycling': 'Cycling',
    'activity.sports': 'Outdoor sports',
    'activity.travel': 'Travelling'
  },
  te: {
    'nav.primary': 'ప్రధాన నావిగేషన్',
    'lang.switcher': 'భాష ఎంపిక',
    'theme.toggle': 'లైట్ లేదా డార్క్ థీమ్ మార్చండి',
    'nav.home': 'హోమ్',
    'nav.dashboard': 'డాష్‌బోర్డ్',
    'nav.pause': 'విరామం',
    'nav.explore': 'మ్యాప్‌ను చూడండి',
    'nav.forecast': 'ఫోర్కాస్ట్',
    'nav.insights': 'ఇన్‌సైట్ల్స్',
    'nav.compare': 'పోలిక',
    'nav.personal': 'పర్సనల్ ఎయిర్‌గార్డ్',
    'nav.exposure': 'ఎక్స్పోజర్',
    'nav.about': 'గురించి',
    'hero.eyebrow': 'హైదరాబాదు గాలి సమాచార వ్యవస్థ',
    'hero.title': 'మీ చుట్టూ ఉన్న గాలిని అర్థం చేసుకోండి.',
    'hero.subtitle': 'హైదరాబాదులో గాలి కాలుష్యం, గాలి నాణ్యత మరియు ఆరోగ్యకరమైన బయటకు వెళ్లే నిర్ణయాలు గురించి తెలుసుకోండి.',
    'hero.primary': 'గాలిని చూడండి',
    'hero.secondary': 'హైదరాబాదు మ్యాప్‌ను చూడండి',
    'hero.stations': 'మానిటర్ చేసిన స్టేషన్‌లు',
    'hero.samples': 'సోర్స్ రీడింగ్స్',
    'hero.source': 'డేటా సోర్స్',
    'hero.dataCount': 'సోర్స్ ఫైళ్లలో రీడింగ్‌లు',
    'hero.aqiTitle': 'ఆర్కైవ్‌లోని అధికారిక AQI',
    'hero.aqiLabel': 'CPCB AQI · ఆర్కైవ్',
    'hero.aqiStation': 'మానిటరింగ్ స్టేషన్',
    'hero.aqiNote': 'ఇది గత సోర్స్ AQI మాత్రమే; ప్రస్తుత పరిస్థితి కాదు. ఆర్కైవ్‌లో కాలుష్య కారకాల వివరాలు లేవు.',
    'hero.aqiObserved': 'నమోదైన సమయం (సోర్స్ స్థానిక సమయం; టైమ్‌జోన్ తెలియదు): {timestamp}',
    'hero.aqiUnavailable': 'ఈ స్టేషన్‌కు ఆర్కైవ్ AQI రీడింగ్ అందుబాటులో లేదు.',
    'hero.aqiAria': 'చారిత్రక అధికారిక AQI {value}, {category}',
    'aqi.good': 'మంచి',
    'aqi.satisfactory': 'సంతృప్తికరమైనది',
    'aqi.moderate': 'మధ్యస్థం',
    'aqi.poor': 'పేలవం',
    'aqi.veryPoor': 'చాలా పేలవం',
    'aqi.severe': 'తీవ్రమైనది',
    'feature.pm25': 'PM2.5 సమాచారం',
    'feature.forecast': 'AI అంచనాలు',
    'feature.compare': 'స్టేషన్ పోలిక',
    'feature.exposure': 'ఎక్స్పోజర్ గైడ్',
    'nature.eyebrow': 'ఒక చిన్న శ్వాస విరామం',
    'nature.title': 'ఒక నిమిషం ప్రశాంతంగా ఉండండి',
    'nature.description': 'ప్రకృతి చిత్రాన్ని ఎంచుకుని, ఒక నిమిషం నెమ్మదైన శ్వాస వ్యాయామాన్ని అనుసరించండి. ఇది విశ్రాంతి కోసం మాత్రమే; గాలి నాణ్యత సూచన కాదు.',
    'nature.photoKicker': 'ప్రశాంతమైన క్షణం',
    'nature.forest': 'అడవి దారి',
    'nature.lake': 'పర్వత సరస్సు',
    'nature.canopy': 'పచ్చని చెట్ల నీడ',
    'nature.previous': 'మునుపటి ప్రకృతి చిత్రం',
    'nature.next': 'తదుపరి ప్రకృతి చిత్రం',
    'nature.choosePhoto': 'ప్రకృతి చిత్రాన్ని ఎంచుకోండి',
    'nature.credit': 'ప్రశాంతత కోసం ప్రకృతి ఫోటోలు మాత్రమే; స్థానిక గాలి నాణ్యతకు ఆధారం కావు.',
    'nature.practice': 'మార్గదర్శక శ్వాస',
    'nature.practiceTitle': 'ప్రతి శ్వాసతో నెమ్మదించండి',
    'nature.ready': 'మీరు సిద్ధమైనప్పుడు ప్రారంభించండి',
    'nature.inhale': 'లోపలికి శ్వాస · {seconds}సె',
    'nature.exhale': 'బయటకు శ్వాస · {seconds}సె',
    'nature.complete': 'నిమిషం పూర్తైంది · బాగా చేశారు',
    'nature.paused': 'విరామంలో ఉంది · సిద్ధమైనప్పుడు కొనసాగించండి',
    'nature.instruction': '4 సెకన్లు మెల్లగా లోపలికి శ్వాస తీసుకుని, 6 సెకన్లు బయటకు వదలండి. మీకు సౌకర్యంగా ఉండే వేగాన్ని అనుసరించండి.',
    'nature.start': 'ఒక నిమిషం విరామం ప్రారంభించండి',
    'nature.pause': 'విరామం',
    'nature.resume': 'కొనసాగించండి',
    'nature.restart': 'మళ్లీ ప్రారంభించండి',
    'nature.reset': 'రీసెట్',
    'nature.timerLabel': 'మిగిలిన సమయం {time}',
    'explore.eyebrow': 'మ్యాప్‌ను చూడండి',
    'explore.title': 'హైదరాబాదు గాలి నాణ్యత మ్యాప్',
    'explore.description': 'హైదరాబాదు మానిటరింగ్ స్టేషన్‌లకు సుమారు ప్రాంత స్థానాలను మ్యాప్‌లో చూడండి, ప్రతి స్టేషన్ తాజా నమోదు చేసిన రీడింగ్‌లను పోల్చండి. పిన్‌లు ప్రాంత సూచనలు మాత్రమే; ఖచ్చితమైన మానిటర్ స్థానాలు కావు. రీడింగ్‌లు చారిత్రకమైనవి, ప్రత్యక్షం లేదా నగరం మొత్తానికి వర్తించే AQI కావు.',
    'explore.loading': 'హైదరాబాదు స్టేషన్ డేటా లోడ్ అవుతోంది…',
    'explore.mapUnavailable': 'ఇంటరాక్టివ్ మ్యాప్ లోడ్ కాలేదు. క్రింది జాబితాలో స్టేషన్ రీడింగ్‌లు అందుబాటులో ఉన్నాయి.',
    'explore.mapReady': 'సుమారు స్టేషన్ ప్రాంత పిన్‌లు · తాజా నమోదైన AirGuard Risk Index (కస్టమ్ 0–100) రంగులతో, అధికారిక AQI కాదు.',
    'explore.noCoordinates': 'ఈ శోధనకు సుమారు మ్యాప్ స్థానాలు అందుబాటులో లేవు.',
    'explore.locationNote': 'పిన్‌లు OpenStreetMap ప్రాంత సూచనలు మాత్రమే; ధృవీకరించిన మానిటర్ స్థానాలు కావు. పేర్కొన్న స్టేషన్ రీడింగ్‌లే చూపిస్తాం; ఇతర ప్రాంతాలకు విలువలు అంచనా వేయము.',
    'explore.legendNote': 'రంగు = AirGuard Risk Index (కస్టమ్ 0–100), అధికారిక AQI కాదు. విలువలు చారిత్రకమైనవి; గమనించిన సమయానికి ప్రతి పిన్ చూడండి.',
    'explore.search': 'మానిటరింగ్ స్టేషన్‌లను వెతకండి',
    'explore.searchPlaceholder': 'స్టేషన్ పేరును వెతకండి',
    'explore.noMatches': 'మీ శోధనకు స్టేషన్‌లు సరిపోలలేదు.',
    'explore.mapLabel': 'గాలి నాణ్యత మానిటరింగ్ స్టేషన్‌లకు సుమారు ప్రాంత సూచనలతో హైదరాబాదు మ్యాప్',
    'explore.legendLabel': 'ఎయిర్‌గార్డ్ రిస్క్ ఇండెక్స్ మ్యాప్ లెజెండ్',
    'explore.legendLow': 'తక్కువ · 35 కంటే తక్కువ',
    'explore.legendModerate': 'మధ్యస్థం · 35–74.9',
    'explore.legendElevated': 'ఎక్కువ · 75 లేదా అంతకంటే ఎక్కువ',
    'risk.good': 'మంచి',
    'risk.moderate': 'మధ్యస్థం',
    'risk.elevated': 'పెరిగిన స్థాయి',
    'risk.unhealthySensitive': 'సున్నితమైన వారికి అనారోగ్యకరమైన స్థాయి',
    'risk.unhealthy': 'అనారోగ్యకరమైన స్థాయి',
    'risk.veryUnhealthy': 'చాలా అనారోగ్యకరమైన స్థాయి',
    'map.pm25': 'PM2.5',
    'map.pm10': 'PM10',
    'map.notReported': 'నివేదించలేదు',
    'map.approximate': 'సుమారు ప్రాంత పిన్ · మానిటర్ కోఆర్డినేట్‌లు కావు',
    'map.risk': 'AirGuard Risk Index (AQI కాదు)',
    'map.observed': 'చారిత్రక సోర్స్ రీడింగ్',
    'map.locationLink': 'OpenStreetMapలో సుమారు స్థానాన్ని చూడండి',
    'map.openStation': 'స్టేషన్ వివరాలు తెరవండి',
    'map.locationUnavailable': 'సుమారు స్థానం అందుబాటులో లేదు',
    'map.noPollutantReading': 'కాలుష్య రీడింగ్ లేదు',
    'dashboard.eyebrow': 'ప్రధాన అనుభవం',
    'dashboard.title': 'హైదరాబాదు గాలి డాష్‌బోర్డ్',
    'dashboard.stationLabel': 'ఎంచుకున్న స్టేషన్',
    'dashboard.currentStatus': 'చివరి నమోదైన రీడింగ్',
    'dashboard.riskIndex': 'ఎయిర్‌గార్డ్ రిస్క్ ఇండెక్స్',
    'dashboard.dominant': 'ఎయిర్‌గార్డ్ ఇండెక్స్‌లో అతిపెద్ద భాగం',
    'dashboard.componentNote': 'AirGuard స్వంత స్కోరులో అత్యధిక సాధారణీకరించిన భాగం మాత్రమే; ఇది AQI కాలుష్య ఉపసూచిక కాదు.',
    'dashboard.pm25': 'PM2.5',
    'dashboard.no2': 'NO₂',
    'dashboard.pm25Note': 'చిన్న కణాలు శ్వాస నాళాలలో లోపలికి వెళతాయి.',
    'dashboard.no2Note': 'ట్రాఫిక్ మరియు దహన శక్తి వలన NO₂ ఉత్పత్తి అవుతుంది.',
    'dashboard.riskNarrative': 'ఈ AirGuard రిస్క్ ఇండెక్స్ స్టేషన్ కాలుష్య కొలతల ఆధారంగా రూపొందించబడింది.',
    'dashboard.riskNarrativeDate': 'ఈ స్టేషన్ ఇండెక్స్ {date}న అందుబాటులో ఉన్న చివరి సోర్స్ రీడింగ్ ఆధారంగా లెక్కించబడింది. ఇది మోడల్ చేసిన సూచిక మాత్రమే; అధికారిక AQI లేదా ప్రత్యక్ష పరిస్థితి కాదు.',
    'dashboard.noReading': 'ఈ స్టేషన్ తాజా సోర్స్ రికార్డులో కాలుష్య విలువలు లేవు. AirGuard రిస్క్ ఇండెక్స్ అందుబాటులో లేదు.',
    'dashboard.pollutantTitle': 'అందుబాటులో ఉన్న కాలుష్య కొలతలు',
    'dashboard.pollutantCaption': 'తాజా సోర్స్ రికార్డు · అధికారిక AQI కాదు',
    'dashboard.pollutantNote': 'ఎంచుకున్న స్టేషన్ తాజా సోర్స్ రికార్డులో ఉన్న కొలతలు మాత్రమే చూపుతాం; లేని విలువలు ఖాళీగా ఉంటాయి.',
    'dashboard.noComponent': 'అందుబాటులో లేదు',
    'insights.eyebrow': 'ఇన్‌సైట్ల్స్',
    'insights.title': 'నగరవ్యాప్త గాలి సమాచార విశ్లేషణ',
    'insights.best': 'తక్కువగా నమోదైన స్కోరు',
    'insights.lowestRecorded': 'తక్కువగా నమోదైన స్కోరు: {score}/100',
    'insights.worst': 'ఎక్కువగా నమోదైన స్కోరు',
    'insights.highestRecorded': 'ఎక్కువగా నమోదైన స్కోరు: {score}/100',
    'insights.average': 'నగర సగటు',
    'insights.averageNote': 'ఈ స్నాప్‌షాట్‌లో రీడింగ్‌లు ఉన్న స్టేషన్‌ల సగటు ఇండెక్స్',
    'insights.alerts': 'అత్యంత ప్రమాదకర స్టేషన్‌లు',
    'insights.alertsNote': 'ఈ స్నాప్‌షాట్‌లో ఎక్కువ రిస్క్ రీడింగ్‌లు ఉన్న స్టేషన్‌లు',
    'insights.summary': 'నగర సారాంశం',
    'insights.monthlyConcentrations': 'నెలవారీ కాలుష్య సాంద్రతలు',
    'insights.concentrationSource': 'OpenCity / CPCB కొలతలు, 2024–2025; సోర్స్ టైమ్‌స్టాంప్‌ల (UTC) నెలవారీ సగటులు.',
    'insights.historicalAqi': 'గత అధికారిక AQI',
    'insights.aqiSource': 'OpenCity / CPCB గంటవారీ AQI ఆర్కైవ్, 2017–2023. సోర్స్ స్థానిక టైమ్‌జోన్ తెలియదు; ఈ డేటా సాంద్రతల డేటా నుండి వేరు.',
    'insights.monthlyStatus': '{station}కు {count} నెలల డేటా అందుబాటులో ఉంది.',
    'insights.aqiStatus': '{station} ఆర్కైవ్ గంటవారీ AQIలో {count} నెలవారీ సగటులు ఉన్నాయి.',
    'insights.noMonthlyData': 'ఈ స్టేషన్‌కు నెలవారీ సాంద్రత కొలతలు లేవు.',
    'insights.noAqiData': 'ఈ స్టేషన్‌కు ఆర్కైవ్ AQI కొలతలు లేవు.',
    'forecast.eyebrow': 'అంచనా',
    'forecast.title': 'AI అంచనా వీక్షణ',
    'forecast.history': 'ఇటీవలి చరిత్ర మరియు తదుపరి 24 గంటలు',
    'forecast.model': 'మోడల్ మూల్యాంకనం',
    'forecast.modelTitle': 'అంచనా నాణ్యత',
    'forecast.baseline': 'సాధారణ అంచనా MAE',
    'forecast.comparisonBetter': 'హోల్డ్‌అవుట్‌లో ML మోడల్ సాధారణ అంచనాకంటే మెరుగ్గా పనిచేసింది (MAE {model} vs {baseline} µg/m³).',
    'forecast.comparisonWorse': 'హోల్డ్‌అవుట్‌లో ML మోడల్ కంటే సాధారణ అంచనా మెరుగ్గా ఉంది (MAE {baseline} µg/m³; ML MAE {model} µg/m³).',
    'forecast.fromDate': 'ఉపయోగించగల తాజా గంటవారీ PM2.5 ఆధారంగా అంచనా ప్రారంభం: {date}. తాజా PM2.5 సోర్స్ కొలత: {latest}. ఇది ప్రత్యక్ష గాలి సమాచారం కాదు.',
    'forecast.note': 'మోడల్‌ను కాలక్రమ హోల్డ్‌అవుట్‌లో పరీక్షించి సాధారణ అంచనాతో పోల్చాం. ఇవి అంచనాలు మాత్రమే; అధికారిక AQI కాదు.',
    'forecast.validatedHorizon': 'ధృవీకరించిన పునరావృత అంచనా వ్యవధి',
    'forecast.validationOrigins': 'పూర్తి ధృవీకరణ విండోలు',
    'forecast.evaluationDetails': '{origins} రోజువారీ అంచనా ప్రారంభాల్లో (మొత్తం {samples} గంటవారీ కొలతలు) 24 గంటల పునరావృత ధృవీకరణ చేశాం; ఈ వ్యవధి కొలమానాలే చూపించబడ్డాయి.',
    'forecast.error': 'అంచనా అందుబాటులో లేదు: {message}',
    'dashboard.error': 'స్టేషన్ డేటా లోడ్ కాలేదు: {message}',
    'app.error': 'ఎయిర్‌గార్డ్ డేటా లోడ్ కాలేదు: {message}',
    'app.snapshot': 'స్టాటిక్ డేటా స్నాప్‌షాట్ {date} UTCన రూపొందించబడింది. కొలతలు గత డేటా మాత్రమే, ప్రత్యక్షం కాదు.',
    'compare.eyebrow': 'పోలిక',
    'compare.title': 'స్టేషన్‌లను పోలిక చేయండి',
    'compare.first': 'స్టేషన్ 1',
    'compare.second': 'స్టేషన్ 2',
    'personal.eyebrow': 'పర్సనల్ ఎయిర్‌గార్డ్',
    'personal.title': 'బయట కార్యకలాపాల కోసం సూచనలు',
    'personal.station': 'స్థానం',
    'personal.activity': 'కార్యకలాపం',
    'personal.duration': 'వ్యవధి',
    'personal.preferredTime': 'మీకు అనుకూల సమయం (IST)',
    'personal.generate': 'సూచనలు రూపొందించండి',
    'personal.result': 'సూచన',
    'personal.disclaimer': 'ఈ సూచనలు సమాచారం మాత్రమే, వైద్య సలహాగా పరిగణించబడవు.',
    'personal.resultTitle': 'మంచి ప్రణాళిక తాజా రీడింగ్‌తో మొదలవుతుంది',
    'personal.resultPrompt': 'డేటా ఆధారిత సూచన కోసం స్థానం, కార్యకలాపం, వ్యవధి ఎంచుకోండి.',
    'personal.latestReading': '{station} వద్ద చివరిగా నమోదైన AirGuard రిస్క్ ఇండెక్స్ {date}న {score}/100 ({label}). ఇది గత రీడింగ్ మాత్రమే, ప్రస్తుత గాలి కాదు.',
    'personal.noReadingTitle': 'కాలుష్య రీడింగ్ అందుబాటులో లేదు',
    'personal.noReading': '{station} తాజా సోర్స్ రికార్డులో కాలుష్య విలువలు లేవు. దాని ఆధారంగా స్టేషన్ స్కోరు లేదా బయట కార్యకలాప సూచనను లెక్కించలేము.',
    'personal.highTitle': 'తక్కువ ఎక్స్పోజర్ ప్రణాళికను పరిగణించండి',
    'personal.highPoint': 'గత స్కోరు ఎక్కువగా ఉంది. సాధ్యమైతే తక్కువ వ్యవధి లేదా తక్కువ తీవ్రతతో బయటకు వెళ్లండి, లేదా ఇంటి లోపల ప్రత్యామ్నాయాన్ని పరిగణించండి.',
    'personal.mediumTitle': 'ప్రణాళికను అనువుగా ఉంచండి',
    'personal.mediumPoint': 'నమోదైన స్కోరు మధ్యస్థంగా ఉంది. బయటకు వెళ్లే ముందు ప్రస్తుత సోర్స్‌ను చూసి, సమయాన్ని తగ్గించవచ్చు.',
    'personal.lowTitle': 'ఈ స్టేషన్‌లో తక్కువగా నమోదైన స్కోరు',
    'personal.lowPoint': 'ఈ స్టేషన్‌లో చివరిగా నమోదైన స్కోరు తక్కువ AirGuard ఇండెక్స్ స్థాయిలో ఉంది. ఈ గత రీడింగ్ మార్గం లేదా పార్కులో గాలి శుభ్రంగా ఉంటుందని హామీ కాదు.',
    'personal.intensePoint': 'ఎంచుకున్న కార్యకలాపం శ్రమతో కూడుకున్నది కావచ్చు; పరిస్థితులపై ఆందోళన ఉంటే తీవ్రతను తగ్గించండి.',
    'personal.longPoint': 'ఎక్కువసేపు చేయాలనుకుంటే మధ్యలో విరామం లేదా తక్కువ వ్యవధిని పరిగణించండి.',
    'personal.alternative': 'మరో స్టేషన్‌లో తక్కువగా నమోదైన స్కోరు: {station} ({score}/100). ఇది స్టేషన్ పోలిక మాత్రమే; ప్రయాణ సూచన కాదు.',
    'personal.noAlternative': 'ఈ స్నాప్‌షాట్‌లో పోల్చడానికి మరొక మానిటర్ స్టేషన్ లేదు.',
    'personal.chooseActivity': 'ఎంచుకున్న పని: {activity} · వ్యవధి: {duration} నిమిషాలు.',
    'personal.timeProfile': '{hour}:00 IST సమయంలో గత 30 రోజుల PM2.5 సగటు {value} µg/m³; {count} గంటవారీ సోర్స్ కొలతలు, {date} వరకు. ఇది గత డేటా మాత్రమే, అంచనా కాదు.',
    'personal.noTimeProfile': 'ఈ స్టేషన్ సోర్స్ కాలంలో {hour}:00 IST సమయానికి గత గంటవారీ PM2.5 కొలత లేదు.',
    'personal.profileUnavailable': 'గత సమయవారీ సమాచారం అందుబాటులో లేదు: {message}',
    'exposure.eyebrow': 'ఎక్స్పోజర్ అంచనా',
    'exposure.title': 'సాంద్రత × ప్రణాళిక చేసిన వ్యవధి',
    'exposure.prompt': 'సమాచార ప్రయోజనంతో సాంద్రత-వ్యవధి అంచనా కోసం స్టేషన్, వ్యవధి ఎంచుకోండి.',
    'exposure.disclaimer': 'ఇది శ్వాస ద్వారా తీసుకునే మోతాదు లేదా భవిష్యత్ అంచనా కాదు. మొత్తం వ్యవధిలో గత స్టేషన్ సాంద్రత మారదని భావిస్తుంది.',
    'exposure.value': '{value} µg·h/m³',
    'exposure.noReading': 'ఈ అంచనాకు PM2.5 రీడింగ్ అందుబాటులో లేదు.',
    'exposure.calculationNote': '{date}నాటి స్టేషన్ PM2.5 సోర్స్ రికార్డు ఆధారంగా {duration} నిమిషాలకు లెక్కించబడింది.',
    'activity.minuteOption': '{minutes} నిమిషాలు',
    'activity.hourOption': '{hours} గంట',
    'activity.15minutes': '15 నిమిషాలు',
    'activity.30minutes': '30 నిమిషాలు',
    'activity.1hour': '1 గంట',
    'activity.2hours': '2 గంటలు',
    'about.eyebrow': 'డేటా పారదర్శకత',
    'about.title': 'ఎయిర్‌గార్డ్ గురించి',
    'about.project': 'ప్లాట్‌ఫారమ్ ఉద్దేశ్యం',
    'about.projectText': 'ఎయిర్‌గార్డ్ విద్యార్థులు, కుటుంబాలు, ఉద్యోగులు మరియు బయట వ్యాయామం చేసే వారు గాలివాతాన్ని అర్థం చేసుకోవడంలో సహాయపడుతుంది.',
    'about.sources': 'మూల డేటా',
    'about.sourceText': 'AirGuard 2024–2025 నాటి 14 OpenCity / CPCB స్టేషన్ ఫీడ్‌లను, 2017–2023 వేరు గంటవారీ AQI ఆర్కైవ్‌ను ఉపయోగిస్తుంది. AQI ఆర్కైవ్‌లో కాలుష్య కారకాల వివరాలు లేదా టైమ్‌జోన్ లేదు; ఏ సోర్స్ ప్రత్యక్ష డేటా కాదు.',
    'about.risk': 'ఎయిర్‌గార్డ్ రిస్క్ ఇండెక్స్',
    'about.riskText': 'ఈ రిస్క్ ఇండెక్స్ ఉపయోగించే గాలి నాణ్యత వివరణ కణాలలో కొలిచిన గాలికి చెందినది. ఇది అధికారిక AQI కాదు.',
    'activity.walking': 'పదవడం',
    'activity.running': 'పరుగుదల',
    'activity.cycling': 'సైకిల్',
    'activity.sports': 'బయట క్రీడలు',
    'activity.travel': 'ప్రయాణం'
  }
};

const state = {
  lang: 'en',
  theme: 'dark',
  summaryMeta: null,
  stations: [],
  insights: null,
  currentStationSummary: null,
  selectedStation: null,
  trendChart: null,
  forecastChart: null,
  compareChart: null,
  monthlyTrendChart: null,
  historicalAqiChart: null,
  lastForecastObservation: null,
  latestSourceObservation: null,
  historicalAqi: null,
  monthlyTrendData: null,
  forecastModel: null,
  timeProfileError: null,
  timeProfile: null,
  airMap: null,
  mapMarkers: [],
  mapState: 'loading',
  mapLatestDate: '',
  naturePhotoIndex: 0,
  breathTimerId: null,
  breathRemaining: 60,
  recommendationSelection: null
};

const naturePhotos = [
  {
    src: 'static/images/nature-forest.jpg',
    alt: { en: 'Sunlight filtering through a green forest path, a nature photograph for a mindful pause', te: 'ప్రశాంత విరామం కోసం పచ్చని అడవి దారిపై పడుతున్న సూర్యకాంతి చిత్రం' },
    title: 'nature.forest'
  },
  {
    src: 'static/images/nature-lake.jpg',
    alt: { en: 'A quiet mountain lake surrounded by green hills', te: 'పచ్చని కొండల మధ్య నిశ్శబ్దమైన పర్వత సరస్సు' },
    title: 'nature.lake'
  },
  {
    src: 'static/images/nature-canopy.jpg',
    alt: { en: 'Looking up through a canopy of green trees', te: 'పచ్చని చెట్ల కొమ్మల మధ్య నుంచి కనిపించే ఆకాశం' },
    title: 'nature.canopy'
  }
];

let staticApiData;

async function fetchApi(endpoint) {
  if (!window.AIRGUARD_STATIC) return fetch(endpoint);

  if (!staticApiData) {
    staticApiData = fetch('airguard-api.json').then(response => {
      if (!response.ok) throw new Error('The published AirGuard data snapshot is unavailable.');
      return response.json();
    });
  }

  const url = new URL(endpoint, window.location.href);
  const apiPath = url.pathname.slice(url.pathname.indexOf('/api/') + 5).split('/');
  const route = apiPath.shift();
  const stationName = decodeURIComponent(apiPath.join('/'));
  const data = await staticApiData;
  let status = 200;
  let body;

  switch (route) {
    case 'summary':
      body = {
        ...data.summary,
        meta: {
          ...data.summary.meta,
          snapshot_generated_at: data.generated_at
        }
      };
      break;
    case 'insights':
      body = data.insights;
      break;
    case 'station':
      body = data.stations[stationName];
      break;
    case 'historical-aqi':
      body = data.historical_aqi[stationName];
      break;
    case 'monthly-trends':
      body = data.monthly_trends[stationName];
      break;
    case 'forecast': {
      const forecast = data.forecasts[stationName];
      status = forecast?.status || 404;
      body = forecast?.body || { error: 'Forecast data is unavailable for this station.' };
      break;
    }
    case 'time-profile':
      body = data.time_profiles[stationName];
      break;
    case 'compare': {
      const selected = url.searchParams.getAll('stations');
      const names = selected.length ? selected : [data.summary.stations[0]?.station_name].filter(Boolean);
      body = { stations: data.comparison.stations.filter(station => names.includes(station.station_name)) };
      break;
    }
    case 'model-metrics':
      status = data.model_metrics.status;
      body = data.model_metrics.body;
      break;
    default:
      status = 404;
      body = { error: 'Static API endpoint not found.' };
  }

  if (!body && status === 200) {
    status = 404;
    body = { error: 'Station data is unavailable in this published snapshot.' };
  }

  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body
  };
}

function applyTranslations(lang) {
  document.documentElement.lang = lang;
  const keys = Object.keys(translations[lang]);
  for (const key of keys) {
    const nodes = document.querySelectorAll('[data-i18n="' + key + '"]');
    nodes.forEach(node => {
      node.textContent = translations[lang][key];
    });
  }
  document.querySelectorAll('[data-i18n-placeholder]').forEach(node => {
    const key = node.dataset.i18nPlaceholder;
    if (translations[lang][key]) node.setAttribute('placeholder', translations[lang][key]);
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.lang === lang);
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach(node => {
    const key = node.dataset.i18nAriaLabel;
    if (translations[lang][key]) node.setAttribute('aria-label', translations[lang][key]);
  });
  renderNaturePhoto(state.naturePhotoIndex);
  renderBreathingState();
  if (state.currentStationSummary) renderDashboard(state.currentStationSummary);
  if (state.recommendationSelection) renderPersonalRecommendation();
  if (state.insights) renderInsights(state.insights);
  if (state.historicalAqi) renderHistoricalAqi(state.historicalAqi);
  if (state.historicalAqi) renderHistoricalAqiChart(state.historicalAqi);
  if (state.monthlyTrendData) renderMonthlyTrends(state.monthlyTrendData);
  if (state.forecastModel) renderForecastEvaluation(state.forecastModel);
  renderStationMap(state.stations);
  if (state.lastForecastObservation && state.latestSourceObservation) {
    document.getElementById('forecastFreshness').textContent = translations[lang]['forecast.fromDate'].replace(
      '{date}',
      new Date(state.lastForecastObservation).toLocaleString()
    ).replace('{latest}', new Date(state.latestSourceObservation).toLocaleString());
  }
  const mapStatus = document.getElementById('mapDataStatus');
  if (mapStatus) {
    if (state.mapState === 'ready') {
      mapStatus.textContent = `${translations[lang]['explore.mapReady']} (${state.mapMarkers.length})`;
    } else if (state.mapState === 'unavailable') {
      mapStatus.textContent = translations[lang]['explore.mapUnavailable'];
    } else if (state.mapState === 'empty') {
      mapStatus.textContent = translations[lang]['explore.noCoordinates'];
    }
  }
}

function setTheme(mode) {
  document.body.classList.toggle('light', mode === 'light');
  const btn = document.getElementById('themeToggle');
  btn.textContent = mode === 'light' ? '🌙' : '☀️';
  state.theme = mode;
}

function setStationOptions() {
  const stationSelect = document.getElementById('stationSelect');
  const compareA = document.getElementById('compareA');
  const compareB = document.getElementById('compareB');
  const personalStation = document.getElementById('personalStation');
  const aqiStation = document.getElementById('aqiStationSelect');
  const stations = state.stations;
  const stationOptions = stations.map(station => {
    const option = document.createElement('option');
    option.value = station.station_name;
    option.textContent = station.station_display;
    return option;
  });
  [stationSelect, compareA, compareB, personalStation, aqiStation].forEach(select => {
    select.replaceChildren(...stationOptions.map(option => option.cloneNode(true)));
  });
  if (stations.length > 1) {
    compareA.value = stations[0].station_name;
    compareB.value = stations[1].station_name;
    personalStation.value = stations[0].station_name;
  }
  if (state.selectedStation) {
    stationSelect.value = state.selectedStation;
    aqiStation.value = state.selectedStation;
  } else {
    state.selectedStation = stations[0]?.station_name;
    stationSelect.value = state.selectedStation;
    aqiStation.value = state.selectedStation;
  }
}

function setPreferredTimeOptions() {
  const select = document.getElementById('personalPreferredTime');
  select.replaceChildren(...Array.from({ length: 24 }, (_, hour) => {
    const option = document.createElement('option');
    option.value = String(hour);
    option.textContent = `${String(hour).padStart(2, '0')}:00`;
    return option;
  }));
  select.value = '9';
}

function riskColor(score) {
  if (score < 35) return '#43b97d';
  if (score < 75) return '#f7c75d';
  if (score < 125) return '#ef8f45';
  return '#d75b5b';
}

function hasRiskScore(station) {
  return station.risk_score !== null && station.risk_score !== undefined &&
    Number.isFinite(Number(station.risk_score));
}

function stationRiskColor(station) {
  return hasRiskScore(station) ? riskColor(Number(station.risk_score)) : '#8792a2';
}

function renderSummary(meta) {
  state.summaryMeta = meta;
  document.getElementById('stationCount').textContent = meta.station_count || 0;
  document.getElementById('sampleCount').textContent = new Intl.NumberFormat().format(meta.sample_count || 0);
  document.getElementById('sourceLabel').textContent = 'OpenCity / CPCB';
  const snapshotStatus = document.getElementById('snapshotStatus');
  if (snapshotStatus) {
    snapshotStatus.textContent = meta.snapshot_generated_at
      ? translations[state.lang]['app.snapshot'].replace(
        '{date}',
        new Date(meta.snapshot_generated_at).toLocaleString(
          state.lang === 'te' ? 'te-IN' : 'en-GB',
          { timeZone: 'UTC' }
        )
      )
      : '';
  }
}

function localizedAqiCategory(category) {
  const keys = {
    Good: 'aqi.good',
    Satisfactory: 'aqi.satisfactory',
    Moderate: 'aqi.moderate',
    Poor: 'aqi.poor',
    'Very Poor': 'aqi.veryPoor',
    Severe: 'aqi.severe'
  };
  return translations[state.lang][keys[category]] || category;
}

function aqiColor(value) {
  if (value <= 50) return '#43b97d';
  if (value <= 100) return '#8ac66d';
  if (value <= 200) return '#f7c75d';
  if (value <= 300) return '#ef8f45';
  if (value <= 400) return '#d75b5b';
  return '#8b3f69';
}

function renderHistoricalAqi(data) {
  state.historicalAqi = data;
  const latest = data.latest;
  const gauge = document.getElementById('aqiGauge');
  document.getElementById('heroAqiStation').textContent = data.station_display || '—';
  document.getElementById('heroAqiDataSource').textContent = `${data.source} · ${data.source_period}`;
  if (!latest || !Number.isFinite(Number(latest.aqi))) {
    document.getElementById('heroAqiValue').textContent = '—';
    document.getElementById('heroAqiCategory').textContent = translations[state.lang]['hero.aqiUnavailable'];
    document.getElementById('heroAqiDate').textContent = '';
    gauge.setAttribute('role', 'status');
    gauge.removeAttribute('aria-valuenow');
    gauge.setAttribute('aria-label', translations[state.lang]['hero.aqiUnavailable']);
    gauge.style.setProperty('--gauge-value', '0%');
    gauge.style.setProperty('--ring-color', '#8792a2');
    return;
  }
  const value = Number(latest.aqi);
  const color = aqiColor(value);
  document.getElementById('heroAqiValue').textContent = Number.isInteger(value) ? String(value) : value.toFixed(1);
  document.getElementById('heroAqiCategory').textContent = localizedAqiCategory(latest.category);
  document.getElementById('heroAqiDate').textContent =
    translations[state.lang]['hero.aqiObserved'].replace('{timestamp}', latest.timestamp.replace('T', ' '));
  gauge.setAttribute('role', 'meter');
  gauge.setAttribute('aria-valuenow', String(value));
  gauge.setAttribute('aria-label', translations[state.lang]['hero.aqiAria']
    .replace('{value}', String(value))
    .replace('{category}', localizedAqiCategory(latest.category)));
  gauge.style.setProperty('--gauge-value', `${Math.min(100, value / 5)}%`);
  gauge.style.setProperty('--ring-color', color);
}

function renderForecastEvaluation(model) {
  const metrics = model.metrics || {};
  const baseline = model.persistence_baseline || {};
  document.getElementById('modelComparison').textContent = translations[state.lang][
    model.model_beats_persistence_baseline ? 'forecast.comparisonBetter' : 'forecast.comparisonWorse'
  ].replace('{model}', metrics.mae ?? '—').replace('{baseline}', baseline.mae ?? '—');
  document.getElementById('forecastEvaluation').textContent =
    translations[state.lang]['forecast.evaluationDetails']
      .replace('{origins}', model.validation_origins ?? '—')
      .replace('{samples}', model.validation_samples ?? '—');
}

function renderNaturePhoto(index) {
  state.naturePhotoIndex = (index + naturePhotos.length) % naturePhotos.length;
  const photo = naturePhotos[state.naturePhotoIndex];
  const image = document.getElementById('naturePhoto');
  if (!image) return;
  image.src = photo.src;
  image.alt = photo.alt[state.lang];
  document.getElementById('naturePhotoTitle').textContent = translations[state.lang][photo.title];
  document.querySelectorAll('.nature-thumb').forEach((button, buttonIndex) => {
    const isActive = buttonIndex === state.naturePhotoIndex;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function renderBreathingState() {
  const phaseLabel = document.getElementById('breathPhase');
  if (!phaseLabel) return;
  const elapsed = 60 - state.breathRemaining;
  const cyclePosition = elapsed % 10;
  const isInhaling = state.breathTimerId !== null && cyclePosition < 4;
  const phaseKey = state.breathRemaining === 0
    ? 'nature.complete'
    : state.breathTimerId === null
      ? state.breathRemaining < 60
        ? 'nature.paused'
        : 'nature.ready'
      : isInhaling
        ? 'nature.inhale'
        : 'nature.exhale';
  const phaseSeconds = isInhaling ? 4 - cyclePosition : 10 - cyclePosition;
  phaseLabel.textContent = phaseKey === 'nature.inhale' || phaseKey === 'nature.exhale'
    ? translations[state.lang][phaseKey].replace('{seconds}', phaseSeconds)
    : translations[state.lang][phaseKey];
  document.getElementById('breathClock').textContent =
    `${String(Math.floor(state.breathRemaining / 60)).padStart(2, '0')}:${String(state.breathRemaining % 60).padStart(2, '0')}`;
  document.getElementById('breathClock').setAttribute(
    'aria-label',
    translations[state.lang]['nature.timerLabel'].replace(
      '{time}',
      `${Math.floor(state.breathRemaining / 60)}:${String(state.breathRemaining % 60).padStart(2, '0')}`
    )
  );
  const orbit = document.getElementById('breathOrbit');
  orbit.classList.toggle('is-active', state.breathTimerId !== null);
  orbit.classList.toggle('is-inhaling', isInhaling);
  const toggleButton = document.getElementById('breathToggle');
  const buttonKey = state.breathRemaining === 0
    ? 'nature.restart'
    : state.breathTimerId !== null
      ? 'nature.pause'
      : state.breathRemaining < 60
        ? 'nature.resume'
        : 'nature.start';
  toggleButton.textContent = translations[state.lang][buttonKey];
}

function toggleBreathing() {
  if (state.breathTimerId !== null) {
    window.clearInterval(state.breathTimerId);
    state.breathTimerId = null;
    renderBreathingState();
    return;
  }
  if (state.breathRemaining === 0) state.breathRemaining = 60;
  renderBreathingState();
  state.breathTimerId = window.setInterval(() => {
    state.breathRemaining = Math.max(0, state.breathRemaining - 1);
    if (state.breathRemaining === 0) {
      window.clearInterval(state.breathTimerId);
      state.breathTimerId = null;
    }
    renderBreathingState();
  }, 1000);
  renderBreathingState();
}

function resetBreathing() {
  if (state.breathTimerId !== null) window.clearInterval(state.breathTimerId);
  state.breathTimerId = null;
  state.breathRemaining = 60;
  renderBreathingState();
}

function renderStationMap(stations) {
  const container = document.getElementById('stationMap');
  if (!container) return;
  const search = document.getElementById('stationSearch')?.value.trim().toLocaleLowerCase() || '';
  const matches = (stations || []).filter(station =>
    `${station.station_display || ''} ${station.station_name || ''}`.toLocaleLowerCase().includes(search)
  );
  if (!matches.length) {
    container.innerHTML = `<p class="empty-state">${escapeHtml(translations[state.lang]['explore.noMatches'])}</p>`;
    renderAirMap([]);
    return;
  }
  container.innerHTML = matches.map(station => `
    <button type="button" class="map-node" data-station="${escapeHtml(station.station_name)}" style="--node-color: ${stationRiskColor(station)};" aria-pressed="${station.station_name === state.selectedStation}">
      <span class="map-station">${escapeHtml(station.station_display || station.station_name)}</span>
      <strong>${hasRiskScore(station) ? `${Number(station.risk_score).toFixed(1)} / 100` : escapeHtml(translations[state.lang]['map.notReported'])}</strong>
      <span class="map-station">${escapeHtml(station.map_location?.reference || translations[state.lang]['map.locationUnavailable'])} · ${escapeHtml(translations[state.lang]['map.approximate'])}</span>
      <span class="map-station">${escapeHtml(translations[state.lang]['map.pm25'])}: ${escapeHtml(formatMapValue(station['PM2.5'], 'µg/m³'))} · ${escapeHtml(translations[state.lang]['map.pm10'])}: ${escapeHtml(formatMapValue(station.PM10, 'µg/m³'))}</span>
      <span class="map-station">${escapeHtml(translations[state.lang]['map.observed'])}: ${escapeHtml(new Date(station.timestamp).toLocaleString())}</span>
      <span class="map-station">${escapeHtml(translations[state.lang]['map.risk'])}</span>
    </button>
  `).join('');
  container.querySelectorAll('.map-node').forEach(node => {
    node.addEventListener('click', () => {
      selectMapStation(node.dataset.station);
    });
  });
  renderAirMap(matches);
}

function selectMapStation(stationName) {
  state.selectedStation = stationName;
  document.getElementById('stationSelect').value = stationName;
  renderStationMap(state.stations);
  updateDashboard();
  document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function formatMapValue(value, unit) {
  return value == null ? translations[state.lang]['map.notReported'] : `${Number(value).toFixed(1)} ${unit}`;
}

function localizedRiskLabel(label) {
  const keys = {
    Good: 'risk.good',
    Moderate: 'risk.moderate',
    'Unhealthy for sensitive groups': 'risk.unhealthySensitive',
    Unhealthy: 'risk.unhealthy',
    'Very unhealthy': 'risk.veryUnhealthy'
  };
  return translations[state.lang][keys[label]] || label;
}

function renderAirMap(stations) {
  const status = document.getElementById('mapDataStatus');
  if (typeof L === 'undefined') {
    state.mapState = 'unavailable';
    status.classList.remove('loading-skeleton');
    status.textContent = translations[state.lang]['explore.mapUnavailable'];
    return;
  }

  if (!state.airMap) {
    state.airMap = L.map('hyderabadAirMap', { scrollWheelZoom: false }).setView([17.385, 78.4867], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(state.airMap);
  }

  state.mapMarkers.forEach(marker => marker.remove());
  state.mapMarkers = (stations || []).flatMap(station => {
    const location = station.map_location;
    if (!location || !Number.isFinite(Number(location.latitude)) || !Number.isFinite(Number(location.longitude))) return [];

    const marker = L.circleMarker([Number(location.latitude), Number(location.longitude)], {
      radius: station.station_name === state.selectedStation ? 11 : 9,
      color: '#ffffff',
      weight: station.station_name === state.selectedStation ? 4 : 2,
      fillColor: stationRiskColor(station),
      fillOpacity: 0.95
    }).addTo(state.airMap);
    const score = hasRiskScore(station)
      ? `${translations[state.lang]['map.risk']}: ${Number(station.risk_score).toFixed(1)} / 100`
      : translations[state.lang]['map.noPollutantReading'];
    const osmUrl = `https://www.openstreetmap.org/?mlat=${Number(location.latitude)}&mlon=${Number(location.longitude)}#map=15/${Number(location.latitude)}/${Number(location.longitude)}`;
    marker.bindTooltip(escapeHtml(station.station_display || station.station_name));
    marker.bindPopup(`
      <div class="map-popup">
        <strong>${escapeHtml(station.station_display || station.station_name)}</strong>
        <span>${escapeHtml(location.reference)} · ${escapeHtml(translations[state.lang]['map.approximate'])}</span>
        <span class="map-popup-risk">${escapeHtml(score)}</span>
        <span>${escapeHtml(translations[state.lang]['map.pm25'])}: ${escapeHtml(formatMapValue(station['PM2.5'], 'µg/m³'))} · ${escapeHtml(translations[state.lang]['map.pm10'])}: ${escapeHtml(formatMapValue(station.PM10, 'µg/m³'))}</span>
        <small>${escapeHtml(translations[state.lang]['map.observed'])}: ${escapeHtml(new Date(station.timestamp).toLocaleString())}</small>
        <a href="${osmUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(translations[state.lang]['map.locationLink'])} · © OpenStreetMap</a>
        <button type="button" class="map-popup-button" data-station="${escapeHtml(station.station_name)}">${escapeHtml(translations[state.lang]['map.openStation'])}</button>
      </div>
    `);
    marker.on('popupopen', event => {
      event.popup.getElement().querySelector('[data-station]')?.addEventListener('click', () => {
        state.airMap.closePopup();
        selectMapStation(station.station_name);
      });
    });
    return [marker];
  });
  if (state.mapMarkers.length > 1) {
    state.airMap.fitBounds(L.featureGroup(state.mapMarkers).getBounds(), { padding: [24, 24], maxZoom: 11 });
  } else if (state.mapMarkers.length === 1) {
    state.airMap.setView(state.mapMarkers[0].getLatLng(), 12);
  }
  state.mapState = 'ready';
  status.classList.remove('loading-skeleton');
  status.textContent = `${translations[state.lang]['explore.mapReady']} (${state.mapMarkers.length})`;
  if (!state.mapMarkers.length) status.textContent = translations[state.lang]['explore.noCoordinates'];
  window.setTimeout(() => state.airMap.invalidateSize(), 100);
}

function renderInsights(insights) {
  state.insights = insights;
  const best = insights.best_station || {};
  const worst = insights.worst_station || {};
  document.getElementById('bestStation').textContent = best.station_display || '—';
  document.getElementById('bestStationText').textContent = best.risk_score == null
    ? '—'
    : translations[state.lang]['insights.lowestRecorded'].replace('{score}', Number(best.risk_score).toFixed(1));
  document.getElementById('worstStation').textContent = worst.station_display || '—';
  document.getElementById('worstStationText').textContent = worst.risk_score == null
    ? '—'
    : translations[state.lang]['insights.highestRecorded'].replace('{score}', Number(worst.risk_score).toFixed(1));
  document.getElementById('averageRisk').textContent = insights.average_risk == null ? '—' : `${Number(insights.average_risk).toFixed(1)}`;
  document.getElementById('alertCount').textContent = `${insights.alert_count || 0}`;
  document.getElementById('insightSummaryText').textContent = insights.summary || 'No insights are available yet.';
}

async function loadInsights() {
  const response = await fetchApi('/api/insights');
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'City insights are unavailable.');
  renderInsights(data.insights || {});
}

function renderDashboard(station) {
  state.currentStationSummary = station;
  const hasScore = hasRiskScore(station);
  const riskScore = hasScore ? Number(station.risk_score) : null;
  const color = stationRiskColor(station);
  const riskBadge = document.getElementById('statusBadge');
  riskBadge.textContent = station.risk_label ? localizedRiskLabel(station.risk_label) : translations[state.lang]['map.notReported'];
  riskBadge.style.background = `${color}22`;
  riskBadge.style.color = color;

  document.getElementById('stationName').textContent = station.station_display || station.station_name;
  document.getElementById('riskScore').textContent = hasScore ? `${riskScore.toFixed(1)}` : '—';
  document.getElementById('lastUpdated').textContent = new Date(station.timestamp).toLocaleString();
  document.getElementById('dominantPollutant').textContent = station.dominant_pollutant || translations[state.lang]['dashboard.noComponent'];
  const dominantUnit = station.dominant_pollutant === 'CO' ? 'mg/m³' : 'µg/m³';
  document.getElementById('dominantValue').textContent = station.dominant_pollutant
    ? formatMapValue(station.dominant_pollutant_value, dominantUnit)
    : translations[state.lang]['dashboard.noComponent'];
  document.getElementById('pm25Value').textContent = formatMapValue(station['PM2.5'], 'µg/m³');
  document.getElementById('no2Value').textContent = formatMapValue(station.NO2, 'µg/m³');
  document.getElementById('pollutantObservedAt').textContent =
    `${translations[state.lang]['map.observed']}: ${new Date(station.timestamp).toLocaleString()}`;
  const pollutantEntries = [
    ['PM2.5', station['PM2.5'], 'µg/m³'],
    ['PM10', station.PM10, 'µg/m³'],
    ['NO₂', station.NO2, 'µg/m³'],
    ['SO₂', station.SO2, 'µg/m³'],
    ['CO', station.CO, 'mg/m³'],
    ['O₃', station.O3, 'µg/m³']
  ];
  const readings = pollutantEntries.map(([label, value, unit]) => {
    const item = document.createElement('div');
    item.className = 'pollutant-reading';
    const name = document.createElement('span');
    name.textContent = label;
    const reading = document.createElement('strong');
    reading.textContent = formatMapValue(value, unit);
    item.append(name, reading);
    return item;
  });
  document.getElementById('pollutantReadings').replaceChildren(...readings);
  document.getElementById('riskNarrative').textContent = hasScore
    ? translations[state.lang]['dashboard.riskNarrativeDate'].replace(
      '{date}',
      new Date(station.timestamp).toLocaleString()
    )
    : translations[state.lang]['dashboard.noReading'];
}

async function fetchStation(stationName) {
  const response = await fetchApi(`/api/station/${encodeURIComponent(stationName)}`);
  const data = await response.json();
  return data;
}

function renderTrendChart(station) {
  const ctx = document.getElementById('trendChart');
  const labels = (station.trend || []).map(point => new Date(point.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const values = (station.trend || []).map(point => point.pm25 ?? null);
  if (state.trendChart) state.trendChart.destroy();
  state.trendChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'PM2.5 (µg/m³)',
        data: values,
        borderColor: '#54d3b1',
        backgroundColor: 'rgba(84,211,177,0.15)',
        borderWidth: 2,
        tension: 0.28,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: true }, tooltip: { enabled: true } },
      scales: { y: { beginAtZero: false }, x: { display: false } }
    }
  });
}

function renderMonthlyTrends(data) {
  state.monthlyTrendData = data;
  document.getElementById('monthlyTrendTitle').textContent =
    `${data.station_display} · PM2.5 / PM10`;
  const months = data.monthly || [];
  const status = document.getElementById('monthlyTrendStatus');
  status.classList.remove('loading-skeleton');
  if (!months.some(month => month.pm25 != null || month.pm10 != null)) {
    status.textContent = translations[state.lang]['insights.noMonthlyData'];
    if (state.monthlyTrendChart) {
      state.monthlyTrendChart.destroy();
      state.monthlyTrendChart = null;
    }
    return;
  }
  status.textContent = translations[state.lang]['insights.monthlyStatus']
    .replace('{count}', months.length)
    .replace('{station}', data.station_display);
  if (state.monthlyTrendChart) state.monthlyTrendChart.destroy();
  state.monthlyTrendChart = new Chart(document.getElementById('monthlyTrendChart'), {
    type: 'line',
    data: {
      labels: months.map(point => point.month),
      datasets: [
        {
          label: 'PM2.5 (µg/m³)',
          data: months.map(point => point.pm25),
          borderColor: '#54d3b1',
          backgroundColor: 'rgba(84,211,177,.12)',
          tension: .25,
          spanGaps: false
        },
        {
          label: 'PM10 (µg/m³)',
          data: months.map(point => point.pm10),
          borderColor: '#ef8f45',
          backgroundColor: 'rgba(239,143,69,.1)',
          tension: .25,
          spanGaps: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: { legend: { display: true } },
      scales: { y: { beginAtZero: true, title: { display: true, text: 'µg/m³' } } }
    }
  });
}

function renderHistoricalAqiChart(data) {
  const monthly = data.monthly || [];
  const status = document.getElementById('historicalAqiStatus');
  status.classList.remove('loading-skeleton');
  document.getElementById('historicalAqiTitle').textContent =
    `${data.station_display} · official AQI archive`;
  if (!monthly.length) {
    status.textContent = translations[state.lang]['insights.noAqiData'];
    if (state.historicalAqiChart) {
      state.historicalAqiChart.destroy();
      state.historicalAqiChart = null;
    }
    return;
  }
  status.textContent = translations[state.lang]['insights.aqiStatus']
    .replace('{count}', monthly.length)
    .replace('{station}', data.station_display);
  if (state.historicalAqiChart) state.historicalAqiChart.destroy();
  state.historicalAqiChart = new Chart(document.getElementById('historicalAqiChart'), {
    type: 'line',
    data: {
      labels: monthly.map(point => point.month),
      datasets: [{
        label: 'Monthly mean of hourly AQI',
        data: monthly.map(point => point.aqi),
        borderColor: '#54d3b1',
        backgroundColor: 'rgba(84,211,177,.14)',
        borderWidth: 2,
        tension: .25,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: { legend: { display: true } },
      scales: { y: { min: 0, max: 500, title: { display: true, text: 'CPCB AQI' } } }
    }
  });
}

async function loadStationInsights(stationName) {
  document.getElementById('monthlyTrendStatus').classList.add('loading-skeleton');
  document.getElementById('historicalAqiStatus').classList.add('loading-skeleton');
  const [trendResponse, aqiResponse] = await Promise.all([
    fetchApi(`/api/monthly-trends/${encodeURIComponent(stationName)}`),
    fetchApi(`/api/historical-aqi/${encodeURIComponent(stationName)}`)
  ]);
  const [trendData, aqiData] = await Promise.all([trendResponse.json(), aqiResponse.json()]);
  if (!trendResponse.ok) throw new Error(trendData.error || 'Monthly concentration data is unavailable.');
  if (!aqiResponse.ok) throw new Error(aqiData.error || 'Historical AQI data is unavailable.');
  renderMonthlyTrends(trendData);
  renderHistoricalAqi(aqiData);
  renderHistoricalAqiChart(aqiData);
}

async function renderForecast(stationName) {
  const freshness = document.getElementById('forecastFreshness');
  freshness.classList.add('loading-skeleton');
  try {
    const response = await fetchApi(`/api/forecast/${encodeURIComponent(stationName)}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'The forecast service returned an error.');

    const history = data.hourly_history || [];
    const forecast = data.forecast || [];
    const points = [
      ...history.map(point => ({ timestamp: point.timestamp })),
      ...forecast.map(point => ({ timestamp: point.timestamp }))
    ];
    const labels = points.map(point => new Date(point.timestamp).toLocaleString([], {
      month: 'short', day: 'numeric', hour: 'numeric'
    }));
    const model = data.model || {};
    if (model.validated_horizon_hours !== 24 || forecast.length !== 24 ||
        !Number.isInteger(model.validation_origins) || model.validation_origins < 3) {
      throw new Error('The recursive 24-hour horizon has not passed validation.');
    }
    state.forecastModel = model;
    const metrics = model.metrics || {};
    state.lastForecastObservation = data.last_observation;
    state.latestSourceObservation = data.latest_source_observation;
    document.getElementById('forecastHeader').textContent = `${data.station_name} · PM2.5 (µg/m³)`;
    document.getElementById('modelMae').textContent = metrics.mae ?? '—';
    document.getElementById('modelRmse').textContent = metrics.rmse ?? '—';
    document.getElementById('modelR2').textContent = metrics.r2 ?? '—';
    document.getElementById('baselineMae').textContent = model.persistence_baseline?.mae ?? '—';
    renderForecastEvaluation(model);
    document.getElementById('validatedHorizon').textContent = `${model.validated_horizon_hours ?? '—'} h`;
    document.getElementById('validationOrigins').textContent = model.validation_origins ?? '—';
    freshness.classList.remove('loading-skeleton');
    freshness.textContent = translations[state.lang]['forecast.fromDate'].replace(
      '{date}',
      new Date(data.last_observation).toLocaleString()
    ).replace('{latest}', new Date(data.latest_source_observation).toLocaleString());

    if (state.forecastChart) state.forecastChart.destroy();
    state.forecastChart = new Chart(document.getElementById('forecastChart'), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Observed PM2.5 (µg/m³)',
            data: [...history.map(point => point.actual), ...forecast.map(() => null)],
            borderColor: '#54d3b1',
            backgroundColor: 'rgba(84,211,177,0.12)',
            borderWidth: 2,
            tension: 0.25,
            pointRadius: 0
          },
          {
            label: '24-hour model forecast (µg/m³)',
            data: [...history.map(() => null), ...forecast.map(point => point.prediction)],
            borderColor: '#ef8f45',
            backgroundColor: 'rgba(239,143,69,0.12)',
            borderWidth: 2,
            borderDash: [6, 4],
            tension: 0.25,
            pointRadius: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        plugins: { legend: { display: true } },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'PM2.5 (µg/m³)' } },
          x: { ticks: { maxTicksLimit: 8 } }
        }
      }
    });
  } catch (error) {
    freshness.classList.remove('loading-skeleton');
    freshness.textContent = translations[state.lang]['forecast.error'].replace('{message}', error.message);
    state.forecastModel = null;
    document.getElementById('modelMae').textContent = '—';
    document.getElementById('modelRmse').textContent = '—';
    document.getElementById('modelR2').textContent = '—';
    document.getElementById('baselineMae').textContent = '—';
    document.getElementById('validatedHorizon').textContent = '—';
    document.getElementById('validationOrigins').textContent = '—';
    document.getElementById('forecastEvaluation').textContent = '';
    document.getElementById('modelComparison').textContent = '';
    if (state.forecastChart) {
      state.forecastChart.destroy();
      state.forecastChart = null;
    }
  }
}

async function renderComparison() {
  const query = new URLSearchParams();
  query.append('stations', document.getElementById('compareA').value);
  query.append('stations', document.getElementById('compareB').value);
  try {
    const response = await fetchApi(`/api/compare?${query}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Station comparison is unavailable.');
    document.getElementById('compareStatus').textContent = '';
    const series = data.stations || [];
    const timestamps = [...new Set(
      series.flatMap(station => (station.points || []).map(point => point.timestamp))
    )].sort().slice(-48);
    const labels = timestamps.map(timestamp => new Date(timestamp).toLocaleString([], {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }));
    const datasets = series.map((station, index) => {
      const byTimestamp = new Map((station.points || []).map(point => [point.timestamp, point.pm25]));
      return {
        label: station.station_display,
        data: timestamps.map(timestamp => byTimestamp.get(timestamp) ?? null),
        borderColor: index === 0 ? '#54d3b1' : '#ef8f45',
        backgroundColor: index === 0 ? 'rgba(84,211,177,.15)' : 'rgba(239,143,69,.12)',
        spanGaps: false,
        fill: false,
        tension: 0.3
      };
    });
    if (state.compareChart) state.compareChart.destroy();
    state.compareChart = new Chart(document.getElementById('compareChart'), {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: 'index' },
        plugins: { legend: { display: true } },
        scales: { y: { beginAtZero: false, title: { display: true, text: 'PM2.5 (µg/m³)' } } }
      }
    });
  } catch (error) {
    const status = document.getElementById('compareStatus');
    status.textContent = error.message;
    if (state.compareChart) {
      state.compareChart.destroy();
      state.compareChart = null;
    }
  }
}

function buildRecommendation(station, activity, duration, allStations, timeProfile, preferredTime) {
  if (!hasRiskScore(station)) {
    return {
      title: translations[state.lang]['personal.noReadingTitle'],
      readings: [
        translations[state.lang]['personal.noReading'].replace(
          '{station}',
          station.station_display || station.station_name
        ),
        ...buildTimeProfileReading(timeProfile, preferredTime)
      ],
      suggestions: []
    };
  }
  const score = Number(station.risk_score);
  const titleKey = score >= 75
    ? 'personal.highTitle'
    : score >= 35
      ? 'personal.mediumTitle'
      : 'personal.lowTitle';
  const basePointKey = score >= 75
    ? 'personal.highPoint'
    : score >= 35
      ? 'personal.mediumPoint'
      : 'personal.lowPoint';
  const activityLabel = translations[state.lang][`activity.${activity}`];
  const readings = [
    translations[state.lang]['personal.latestReading']
      .replace('{station}', station.station_display || station.station_name)
      .replace('{score}', score.toFixed(1))
      .replace('{label}', localizedRiskLabel(station.risk_label))
      .replace('{date}', new Date(station.timestamp).toLocaleString()),
    translations[state.lang]['personal.chooseActivity']
      .replace('{activity}', activityLabel)
      .replace('{duration}', duration),
    ...buildTimeProfileReading(timeProfile, preferredTime)
  ];
  const suggestions = [translations[state.lang][basePointKey]];
  if (activity === 'running' || activity === 'sports' || activity === 'cycling') {
    suggestions.push(translations[state.lang]['personal.intensePoint']);
  }
  if (Number(duration) >= 60) {
    suggestions.push(translations[state.lang]['personal.longPoint']);
  }
  const alternative = allStations
    .filter(candidate => candidate.station_name !== station.station_name && hasRiskScore(candidate))
    .sort((left, right) => left.risk_score - right.risk_score)[0];
  suggestions.push(
    alternative
      ? translations[state.lang]['personal.alternative']
          .replace('{station}', alternative.station_display)
          .replace('{score}', Number(alternative.risk_score).toFixed(1))
      : translations[state.lang]['personal.noAlternative']
  );
  return { title: translations[state.lang][titleKey], readings, suggestions };
}

function buildTimeProfileReading(timeProfile, preferredTime) {
  if (!timeProfile) return [];
  const hour = Number(preferredTime);
  const entry = (timeProfile.hours || []).find(item => item.hour === hour);
  if (!entry) {
    return [translations[state.lang]['personal.noTimeProfile'].replace('{hour}', String(hour).padStart(2, '0'))];
  }
  return [
    translations[state.lang]['personal.timeProfile']
      .replace('{hour}', String(hour).padStart(2, '0'))
      .replace('{value}', Number(entry.pm25_mean).toFixed(1))
      .replace('{count}', entry.sample_count)
      .replace('{date}', timeProfile.period_end.replace('T', ' ').replace('+00:00', ' UTC'))
  ];
}

function renderExposureEstimate(station, duration) {
  const estimate = document.getElementById('exposureEstimate');
  const note = document.getElementById('exposureEstimateNote');
  const rawConcentration = station['PM2.5'];
  const concentration = Number(rawConcentration);
  if (rawConcentration == null || !Number.isFinite(concentration)) {
    estimate.textContent = '—';
    note.textContent = translations[state.lang]['exposure.noReading'];
    return;
  }
  const value = concentration * Number(duration) / 60;
  estimate.textContent = translations[state.lang]['exposure.value'].replace('{value}', value.toFixed(2));
  note.textContent = translations[state.lang]['exposure.calculationNote']
    .replace('{date}', new Date(station.timestamp).toLocaleString())
    .replace('{duration}', duration);
}

function renderPersonalRecommendation() {
  const selection = state.recommendationSelection;
  const station = state.stations.find(item => item.station_name === selection.stationName);
  if (!station) return;
  const recommendation = buildRecommendation(
    station,
    selection.activity,
    selection.duration,
    state.stations,
    state.timeProfile,
    selection.preferredTime
  );
  document.getElementById('recommendationTitle').textContent = recommendation.title;
  document.getElementById('recommendationText').textContent = recommendation.readings.join(' ');
  if (state.timeProfileError) {
    document.getElementById('recommendationText').textContent += ` ${translations[state.lang]['personal.profileUnavailable'].replace('{message}', state.timeProfileError)}`;
  }
  const points = document.getElementById('recommendationPoints');
  points.replaceChildren(...recommendation.suggestions.map(text => {
    const item = document.createElement('li');
    item.textContent = text;
    return item;
  }));
  renderExposureEstimate(station, selection.duration);
}

async function updateDashboard() {
  const stationName = document.getElementById('stationSelect').value;
  state.selectedStation = stationName;
  document.getElementById('aqiStationSelect').value = stationName;
  try {
    const station = await fetchStation(stationName);
    if (station.error) throw new Error(station.error);
    renderDashboard(station.station_summary || station);
    renderTrendChart(station);
    document.getElementById('dashboardError').textContent = '';
    renderForecast(stationName);
    loadStationInsights(stationName).catch(error => {
      document.getElementById('monthlyTrendStatus').textContent = translations[state.lang]['insights.noMonthlyData'];
      document.getElementById('historicalAqiStatus').textContent = translations[state.lang]['insights.noAqiData'];
      document.getElementById('dashboardError').textContent =
        translations[state.lang]['dashboard.error'].replace('{message}', error.message);
    });
  } catch (error) {
    document.getElementById('dashboardError').textContent =
      translations[state.lang]['dashboard.error'].replace('{message}', error.message);
  }
}

async function populateData() {
  setPreferredTimeOptions();
  try {
    const summaryResponse = await fetchApi('/api/summary');
    const summary = await summaryResponse.json();
    if (!summaryResponse.ok) throw new Error(summary.error || 'Station summary is unavailable.');
    state.stations = summary.stations || [];
    setStationOptions();
    renderSummary(summary.meta || {});
    renderStationMap(state.stations);
    await loadInsights();
    if (state.stations.length) {
      document.getElementById('stationSelect').value = state.selectedStation;
      await updateDashboard();
      await renderComparison();
    }
    document.getElementById('appStatus').hidden = true;
  } catch (error) {
    const status = document.getElementById('appStatus');
    status.hidden = false;
    status.textContent = translations[state.lang]['app.error'].replace('{message}', error.message);
  }
}

document.getElementById('stationSelect').addEventListener('change', () => {
  state.selectedStation = document.getElementById('stationSelect').value;
  renderStationMap(state.stations);
  updateDashboard();
});
document.getElementById('aqiStationSelect').addEventListener('change', event => {
  document.getElementById('stationSelect').value = event.target.value;
  state.selectedStation = event.target.value;
  renderStationMap(state.stations);
  updateDashboard();
});
document.getElementById('stationSearch').addEventListener('input', () => renderStationMap(state.stations));
document.getElementById('compareA').addEventListener('change', renderComparison);
document.getElementById('compareB').addEventListener('change', renderComparison);
document.getElementById('themeToggle').addEventListener('click', () => setTheme(state.theme === 'dark' ? 'light' : 'dark'));
document.querySelectorAll('.lang-btn').forEach(btn => btn.addEventListener('click', () => {
  state.lang = btn.dataset.lang;
  applyTranslations(state.lang);
  if (state.summaryMeta) renderSummary(state.summaryMeta);
}));
document.querySelectorAll('.nature-thumb').forEach(button => button.addEventListener('click', () => {
  renderNaturePhoto(Number(button.dataset.natureIndex));
}));
document.getElementById('naturePrev').addEventListener('click', () => renderNaturePhoto(state.naturePhotoIndex - 1));
document.getElementById('natureNext').addEventListener('click', () => renderNaturePhoto(state.naturePhotoIndex + 1));
document.getElementById('naturePhoto').addEventListener('error', event => {
  event.currentTarget.closest('.nature-photo-wrap').classList.add('image-unavailable');
});
document.getElementById('naturePhoto').addEventListener('load', event => {
  event.currentTarget.closest('.nature-photo-wrap').classList.remove('image-unavailable');
});
document.getElementById('breathToggle').addEventListener('click', toggleBreathing);
document.getElementById('breathReset').addEventListener('click', resetBreathing);
document.getElementById('recommendationForm').addEventListener('submit', async event => {
  event.preventDefault();
  state.recommendationSelection = {
    stationName: document.getElementById('personalStation').value,
    activity: document.getElementById('personalActivity').value,
    duration: document.getElementById('personalDuration').value,
    preferredTime: document.getElementById('personalPreferredTime').value
  };
  state.timeProfile = null;
  state.timeProfileError = null;
  try {
    const stationName = encodeURIComponent(state.recommendationSelection.stationName);
    const response = await fetchApi(`/api/time-profile/${stationName}`);
    const profile = await response.json();
    if (!response.ok) throw new Error(profile.error || 'Historical time-of-day data is unavailable.');
    state.timeProfile = profile;
  } catch (error) {
    state.timeProfileError = error.message;
  }
  renderPersonalRecommendation();
});

if (!window.AIRGUARD_STATIC && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/static/sw.js').catch(() => {});
  });
}

applyTranslations(state.lang);
setTheme('dark');
populateData();
