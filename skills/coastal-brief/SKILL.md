---
name: coastal-brief
description: "Compare predicted high and low tides with measured wind, waves, and water temperature for a coastal location."
---

# Coastal Conditions

Start with the place and the question. A tide-only lookup needs a tide station. A surf or wind question needs a buoy or coastal weather station. Use both for a combined brief.

1. Use `find_tide_stations` and/or `find_buoys` by station name or coordinates. Reuse the ID returned by the matching service. Prefer a station representing the requested shore, bay, or inlet. If two same-name places remain ambiguous, ask which one.
2. For tides, call `tide_predictions` with the station ID, first local calendar date, requested units, and up to seven days. Report high or low, station-local time, and height above MLLW. Label the predictions as astronomical.
3. For the sea state, call `marine_observations` with the NDBC ID. Include the latest report time and its timezone. Work out the age before describing a report as current. Fields can come from several recent observations. When a sensor is absent, state which measurement is unavailable.
4. Give the answer in the order the user asked. Include both station names or IDs, their location or distance when returned, and source links. An offshore buoy, a sheltered harbor, and a surf beach can have different wind and waves. A request for a forecast, navigation clearance, or an official marine warning needs a separate official product.
