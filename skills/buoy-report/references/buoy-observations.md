# Buoy observations: fields, units and station kinds

Every output line below was read from live results of the `buoys` server (Marine Conditions). The data comes from NOAA's National Data Buoy Center, NDBC.

## Lines in a `marine_observations` result

| Line | Example | Meaning |
| --- | --- | --- |
| Header | `MONTEREY - 27NM WNW of Monterey, CA (46042) (Latest report 2026-11-22 20:50 UTC)` | Station name, NDBC id, and the newest report time in UTC |
| `Wind` | `N 4 kt (2 m/s)` | Direction the wind comes from, and sustained speed in knots and meters per second |
| `Gusts` | `8 kt` | Peak gust |
| `Wave height` | `9.8 ft (3 m)` | Significant wave height |
| `Dominant period` | `11 s` | Period of the waves carrying the most energy |
| `Waves from` | `NW (309 deg)` | Direction the dominant waves come from |
| `Water temp` | `67 F (19.3 C)` | Sea surface temperature at the station |
| `Air temp` | `57 F (14.1 C)` | Air temperature at the station |
| `Pressure` | `1016.6 hPa, -2.4 over 3 h` | Sea level pressure and its change over three hours |
| Link | `https://www.ndbc.noaa.gov/station_page.php?station=46042` | The station's NOAA page |
| Footer | `Each value is the most recent one reported in the past few hours.` | Values may come from different observation times |

## Missing values

- A station reports only what its sensors measure. In this server's output a measurement the station lacks is simply not listed.
- Seen in live results: a fixed station at Cape May listed wind, gusts, water temperature, air temperature and pressure, with no wave lines. A wave buoy off Monterey listed waves and temperatures, with no wind or pressure.
- NDBC's own data files mark a missing value with `MM`. You will not see that marker here, but it explains why a line is absent.
- Never report a missing measurement as zero or calm. Say the station does not report it and, if it matters, read another station.

## What the wave numbers mean

- **Significant wave height** is the average height of the highest one third of waves over the sampling period. It matches what an experienced observer would call the wave height. Single waves well above it are normal.
- **Dominant period** separates swell from chop. Around 10 seconds and longer is swell that has traveled from distant weather and carries more energy at the same height. A few seconds is wind chop raised locally.
- **Wave direction** is the direction the waves come from, not where they are going.
- A buoy measures open water. Surf height on a beach depends on the seabed, the shape of the coast and the swell direction, and can be larger or smaller than the buoy figure.

## Wind and pressure

- Wind direction is where the wind comes from. Speeds are in knots. One knot is about 1.15 mph or 0.51 m/s.
- Gusts are short peaks above the sustained speed.
- Pressure is in hectopascals, which equal millibars. A fall of several hPa in three hours means weather is changing quickly. Leave forecasting to the National Weather Service.

## Report time and age

- `Latest report` is in UTC. Convert it to local time for the reader and state the age.
- The footer says each value is the most recent one reported in the past few hours, so a result can mix readings taken at different times.
- The server does not state how often stations report or how often it refreshes. Use the report time, not an assumed schedule.
- Nothing computes the age for you. After each `marine_observations` call, read the report time, work out the age, and say the reading is stale when the report is six hours old or more.

## Station kinds from `find_buoys`

| Kind | What it is | Typical strengths |
| --- | --- | --- |
| `buoy` | A moored buoy offshore | Waves, open water wind, sea temperature. Some report waves and temperatures only |
| `fixed` | A station on a pier, jetty, light or shore | Wind, pressure and temperatures near the coast. Usually no waves |

Other notes read from live results:

- A coordinate search returns the nearest stations with distance in km. A name search returns matches without distances.
- Some fixed stations are NOAA tide gauges. Their name begins with the 7 digit tide station id, for example `8536110 - Cape May, NJ (Station CMAN4)`. The same site appears in the tide station catalog under that 7 digit id, which makes a tide and weather pair at one spot easy to build.
- The station ids seen in live results are 5 characters: digits for buoys such as `46042`, letters and digits for fixed stations such as `MEYC1`.
- An id with no data returns `Station <id> has no recent observations at NOAA.`
- `find_buoys` lists stations that report weather. A listed station still may not report the one measurement you need.

## Official sources for decisions

- National Weather Service marine forecasts, small craft advisories and surf zone forecasts: https://www.weather.gov/marine
- NDBC station pages, for the full record of a station: https://www.ndbc.noaa.gov/
- Local lifeguards, harbor masters and the US Coast Guard for conditions on the day.

In an emergency on the water in the US, call 911 or hail the Coast Guard on VHF channel 16.
