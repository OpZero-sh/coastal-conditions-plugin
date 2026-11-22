# Pairing stations and stating limits

## Why pairing takes care

The plugin reads two separate NOAA networks.

| | Tide stations | Weather stations |
| --- | --- | --- |
| Run by | NOAA CO-OPS (Tides and Currents) | NOAA NDBC and partners |
| Server key | `tides` | `buoys` |
| Id form | 7 digits, such as 9413450 | 5 characters, such as 46042 or MEYC1 |
| Gives | Predicted highs and lows | Latest measured wind, waves, temperatures, pressure |
| Time | Station local time | UTC |

An id from one service does not work in the other. Carry both and label each.

## A shared site

Some shore weather stations are NOAA tide gauges that also carry weather sensors. `find_buoys` shows these with the tide station id at the start of the name, for example `9413450 - Monterey, CA (Station MEYC1, fixed, 1 km away)`. The tide catalog lists the same site as station 9413450. When the spot is near such a site, use it for both tides and shore wind. It will usually not report waves.

## Choosing the tide station

1. Same body of water as the spot: open coast, bay, harbor, or river.
2. Then nearest by distance.
3. If the only station is on different water, use it and say that times and heights at the spot can differ.

## Choosing the weather station

| The person cares about | Prefer | Because |
| --- | --- | --- |
| Swell or surf | Nearest `buoy` facing the same open water | Fixed stations rarely measure waves |
| Wind for sailing, paddling, fishing inshore | Nearest `fixed` station on that shore | An offshore buoy often reads stronger, steadier wind |
| Water temperature for swimming | Nearest station of either kind that reports it | Shallow bays run warmer or colder than open water |

Check the result, not the catalog. A station can be listed and still lack the measurement you need, or have no recent report.

## Describing exposure

Say where each station sits in relation to the spot, in plain words:

- "an offshore buoy 18 km west, in open ocean swell"
- "a pier station inside the harbor, sheltered from swell"
- "the same site as the tide gauge"

Mention when a headland, island or bay mouth lies between the station and the spot. Do not estimate what the conditions are at the spot. Say that they can differ.

## What the plugin cannot tell anyone

- **The future.** There is no wind, wave or weather forecast here. Tide predictions are the only forward looking data, and they leave out weather.
- **Warnings.** No small craft advisories, gale warnings, high surf advisories, rip current statements, coastal flood statements or tsunami alerts.
- **The surf zone.** No breaking wave height, rip currents, shore break or longshore current.
- **Currents.** No tidal current or slack water times.
- **Observed water level.** No gauge readings and no storm surge.
- **Visibility, fog, lightning, water quality.** None.

## Wording for safety questions

Keep it short and plain. Give the data, state the limit, name the official source.

- "These are the latest measurements and the predicted tides. They are not a forecast. Check the National Weather Service marine forecast for your zone before going out."
- "I cannot tell you whether it is safe. The lifeguards or the harbor master can, and the marine forecast lists any active advisories."

Official sources:

- National Weather Service marine and surf zone forecasts and advisories: https://www.weather.gov/marine
- NOAA Tides and Currents, for observed water levels and current predictions: https://tidesandcurrents.noaa.gov/
- NOAA NDBC station pages: https://www.ndbc.noaa.gov/
- Tsunami alerts for the US: https://www.tsunami.gov/

In an emergency on the water in the US, call 911 or hail the Coast Guard on VHF channel 16.
