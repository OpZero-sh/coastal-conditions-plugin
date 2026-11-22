---
name: use-tides
description: "Finds a NOAA tide station and returns predicted high and low tide times and heights for one to seven days with Tide Times. Use when someone asks when high or low tide is, for a tide table for a US beach or harbor, or for the lowest tide this week."
---

# Tide Times

1. Call `find_tide_stations` with part of the station name, a two letter state, or the place's latitude and longitude. A coordinate search also returns distance in km.
2. If one town has several stations, pick the one on the same water as the person's spot, ocean side or bay side. Ask if you cannot tell.
3. Call `tide_predictions` with the station id exactly as returned, `start_date` as the first local date, `days` from 1 to 7 and `units` of `feet` or `meters`.

Reading results:

- Times are local to the station on a 24 hour clock. The result does not name the time zone.
- Heights are above mean lower low water (MLLW). A negative height is a tide below that level.
- Some dates list three events and some four. Both are normal.
- These are astronomical predictions. Wind and pressure can shift actual water levels, and the tool does not return observed levels, currents or slack water.

If no station matches, try coordinates. If an id you typed by hand returns an error saying NOAA could not be reached, search again and use the id returned. Coverage is US coasts and territories. The Great Lakes have no tide predictions.

Answer with the station name and id, the date, each high and low with time and height, the words "predicted" and "above MLLW", and the source: NOAA CO-OPS. For navigation or safety decisions, point to official NOAA charts and the National Weather Service marine forecast.
