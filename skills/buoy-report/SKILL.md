---
name: buoy-report
description: "Finds a NOAA buoy or coastal weather station and reads its latest measured wind, gusts, wave height, wave period, wave direction, water temperature, air temperature and pressure. Use when someone asks how big the waves or swell are right now, what the wind is doing on the water, the current water temperature at a beach, or for the latest report from a named buoy such as 46042."
---

# Buoy report

Find the right NOAA station, read its latest observation, and report what was measured, where, and how long ago.

## When to use

- "How big are the waves off Monterey right now?"
- "What is the water temperature at Cape May?"
- "Latest report from buoy 46042."

Use `tide-lookup` for tide times and `coastal-brief` for tides and sea state together. This skill reports measurements. It has no forecasts, no surf height at the beach, no rip current risk, no water quality, and no history beyond the latest report.

## Tools

Both are on the `buoys` server (Marine Conditions).

| Tool | Arguments that matter | Returns |
| --- | --- | --- |
| `find_buoys` | `query` (part of a station name or id), or `latitude` and `longitude`; `limit` 1 to 20, default 8 | Station names, NDBC station ids, the station kind (`buoy` or `fixed`), and distance in km for a coordinate search |
| `marine_observations` | `station_id`, for example `46026` or `FTPC1` | The latest value of each measurement the station reports, the report time in UTC, and a link to the station's NOAA page |

In Claude Code the full tool names follow the pattern `mcp__plugin_coastal-conditions_buoys__marine_observations`.

## Workflow

1. **Find stations.** If the person gave a station id, skip to step 3. Otherwise call `find_buoys` with the place's latitude and longitude. A coordinate search gives distances, which a name search does not.
2. **Choose by what was asked.**
   - Waves or swell: prefer a station of kind `buoy`. Fixed shore stations usually have no wave sensor.
   - Wind at the shore or in a harbor: a nearby `fixed` station is often more representative than an offshore buoy.
   - Water temperature: the nearest station that reports it.
3. **Read.** Call `marine_observations` with the id exactly as returned.
4. **Check that the measurement is there.** A missing sensor shows up as a missing line, not as a zero. If the line you need is absent, try the next nearest station of the right kind and say which station each value came from.
5. **Work out the age.** The report time is UTC. Convert it to the place's local time and compare it with now. Say how old it is.
6. **Report** in the shape below.

## Reading the results

- **Wind and wave directions** are where the wind or waves come from. `N 4 kt` is a wind from the north.
- **Wave height** from NDBC is significant wave height, roughly the average of the highest third of waves. Individual waves can be much higher.
- **Dominant period** is the period of the most energetic waves. Long periods, about 10 seconds and up, mean swell from distant weather. Short periods mean local wind chop.
- **Pressure** is in hPa with the change over three hours.
- **The footer** reads `Each value is the most recent one reported in the past few hours.` Values in one result can come from different observation times. Describe the report as recent readings, not as one instant.

Field definitions, units and station kinds are in [references/buoy-observations.md](references/buoy-observations.md).

## Edge cases

- **Report is old.** If the latest report is more than about an hour old, state its age. If it is six hours old or more, say the reading is stale and do not call it current. In Claude Code the plugin's hook adds a note with the age in that case.
- **No recent observations.** The tool returns `Station <id> has no recent observations at NOAA.` Try the next nearest station.
- **No name match.** `find_buoys` suggests latitude and longitude. Use them.
- **Station far offshore.** A buoy tens of kilometers out sees different wind and waves from a beach or harbor. Give the distance and say so.
- **Someone deciding whether to go out.** Give the measurements, then say that an observation is the past at one point, not a forecast, and point to the National Weather Service marine forecast and any active advisories. Do not give a go or no go call.

## Answer shape

```text
MONTEREY, 27 NM WNW of Monterey, CA (NDBC 46042), offshore buoy
Report time: 2026-11-22 20:50 UTC, 12:50 PM PST, about 40 minutes old
Waves: 9.8 ft (3 m) at 11 s from the NW (309 deg)
Wind: from the N at 4 kt, gusts 8 kt
Water 67 F (19.3 C), air 57 F (14.1 C)
Pressure: 1016.6 hPa, steady over 3 h
Not reported by this station: none
Source: NOAA NDBC, https://www.ndbc.noaa.gov/station_page.php?station=46042
```

Lead with the measurement the person asked about. Keep the units the tool returned and add the other unit only when it helps.

## Limits to state

These are measurements at the station, at the report time. Conditions at a beach, in a harbor or a few hours later can be very different. The plugin has no forecast, no warnings and no surf zone data. For those, use the National Weather Service at https://www.weather.gov/marine and local lifeguards or harbor staff.

## Examples

**"How big are the waves off Monterey?"** `find_buoys` near 36.60, -121.89 returns a fixed station 1 km away and wave buoys 18 km and farther out. Read the nearest `buoy`, report wave height, period and direction with the report time, and say how far offshore it is.

**"Water temperature at Cape May?"** `find_buoys` with `query: "Cape May"` returns a fixed station at Cape May and a buoy 26 nautical miles southeast. Read the fixed station for water temperature. It has no wave lines, so do not report waves from it.

**"Is it too windy to paddle out?"** Report the measured wind and gusts with their age and the station's distance from the launch. Say the plugin cannot judge safety and point to the marine forecast and any small craft advisory.
