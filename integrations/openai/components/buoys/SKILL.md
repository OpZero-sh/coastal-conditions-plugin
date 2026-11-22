---
name: use-buoys
description: "Finds a NOAA buoy or coastal weather station and reads its latest measured wind, waves, water temperature and pressure with Marine Conditions. Use when someone asks how big the waves are right now, what the wind is on the water, or the water temperature at a beach."
---

# Marine Conditions

1. Call `find_buoys` with the place's latitude and longitude, or with part of a station name or id. A coordinate search returns each station's kind (`buoy` or `fixed`) and distance in km.
2. Choose by need. For waves use a `buoy`. For wind at the shore or water temperature a nearby `fixed` station often fits better. Fixed stations usually have no wave sensor.
3. Call `marine_observations` with the station id exactly as returned.
4. If the line you need is absent, the station does not measure it. Read the next nearest station of the right kind and say which value came from which station.

Reading results:

- The report time is UTC. Convert it to local time and state how old the report is. Do not call a report current when it is hours old.
- Wind and wave directions are where they come from.
- Wave height is significant wave height. Single waves can be much higher.
- Each value is the most recent one reported in the past few hours, so values can come from different observation times.
- A missing measurement is never zero. Say it is not reported.

Answer with the station name, id and distance, the report time and age, the measurements with their units, and the source: NOAA NDBC with the station page link. These are measurements at the station, not a forecast. For a decision about going on the water, point to the National Weather Service marine forecast and local lifeguards or harbor staff.
