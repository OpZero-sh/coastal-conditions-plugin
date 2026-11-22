---
name: coastal-brief
description: "Builds a combined coastal briefing for a beach, inlet or harbor: predicted high and low tides from the nearest NOAA tide station together with the latest measured wind, waves and water temperature from a nearby NOAA buoy or shore station. Use when someone asks about conditions at the coast, plans a beach day, surf session, paddle, fishing or tidepooling trip, or asks for tides and waves together."
---

# Coastal brief

Pair one tide station with one or two weather stations for the same stretch of coast, and report predictions and measurements side by side without blurring them.

## When to use

- "What are conditions like at Cape May tomorrow morning?"
- "Low tide and swell for a surf check near Monterey."
- "Compare two spots for a paddle on Saturday."

For a tide only question use `tide-lookup`. For a waves, wind or water temperature only question use `buoy-report`. Those skills carry the detail for each service. This skill is about combining them.

## Tools

| Server key | Tool | Use it for |
| --- | --- | --- |
| `tides` | `find_tide_stations` | NOAA tide prediction stations by name, state or coordinates |
| `tides` | `tide_predictions` | Predicted highs and lows for 1 to 7 days, heights above MLLW, station local time |
| `buoys` | `find_buoys` | NOAA buoys and shore stations by name, id or coordinates, with kind and distance |
| `buoys` | `marine_observations` | Latest measured wind, gusts, waves, period, temperatures and pressure, report time in UTC |

In Claude Code the full tool names follow the pattern `mcp__plugin_coastal-conditions_tides__tide_predictions` and `mcp__plugin_coastal-conditions_buoys__marine_observations`.

## Workflow

1. **Pin the spot.** Work out latitude and longitude for the beach, inlet or harbor. Note whether it faces open ocean or sits inside a bay. Ask one question if the name is ambiguous.
2. **Search both catalogs by coordinates.** Call `find_tide_stations` and `find_buoys` with the same latitude and longitude. The two services use different ids. Keep the 7 digit tide station id and the NDBC id apart.
3. **Pick the tide station** on the same water as the spot. Ocean side and bay side stations in one town can differ in time and height.
4. **Pick the weather station by need.** Use a `buoy` for waves. Use a nearby `fixed` station for wind at the shore and for water temperature. Using two stations is fine. Say which value came from which.
5. **Fetch.** Call `tide_predictions` for the local date or dates asked about. Call `marine_observations` for each chosen station.
6. **Check the observation.** Convert the report time from UTC to local time and state its age. Confirm the measurements you need are present. Missing sensors are missing lines.
7. **Write the brief** in the shape below. For three or more spots, or when the station choice is not obvious, hand the comparison to the `station-pairing` agent.

## Keep these apart

- **Tides are predictions for a date. Buoy readings are measurements from the past.** A brief for tomorrow can give tomorrow's predicted tides, but the buoy reading is only today's starting point. Say so, and point to the marine forecast for tomorrow's wind and waves.
- **Station local time and UTC.** Tide times are local to the tide station. The buoy report time is UTC. Put both in local time in the answer and keep the UTC time for the observation.
- **Different places.** Give each station's name, id and distance from the spot. An offshore buoy, a sheltered harbor gauge and a surf beach can show very different wind and waves at the same moment.

How to choose and describe a station pair, and the limits to state for anyone going on the water, are in [references/pairing-and-limits.md](references/pairing-and-limits.md).

## Edge cases

- **No tide station nearby.** The catalog covers US coasts and territories. For the Great Lakes or a place abroad, say there are no tide predictions and give the buoy data alone if any exists.
- **No wave data nearby.** Say that no nearby station reports waves, name the nearest one that does and its distance, and let the person decide whether it is representative.
- **Stale observation.** If the report is six hours old or more, label it stale and do not describe present conditions from it.
- **One service fails.** Give the half that worked, name the half that failed, and offer to retry.
- **A request for a forecast, a warning, or a go or no go decision.** State what the plugin can show, then point to the National Weather Service marine forecast, local lifeguards or the harbor master. Do not make the safety call.

## Answer shape

```text
Spot: <place>, <ocean side or bay side>

Tides (predicted): <station name>, NOAA <7 digit id>, <distance> away
  <weekday date>, local time at the station, heights above MLLW
  Low 00:16 -0.2 ft · High 06:49 5.9 ft · Low 13:06 -0.2 ft · High 19:16 4.7 ft

Sea state (measured): <station name>, NDBC <id>, <kind>, <distance> away
  Report time <UTC time>, <local time>, <age>
  Waves <height> at <period> from <direction>
  Wind from <direction> at <speed>, gusts <speed>
  Water <temp>

Not available: <any measurement no nearby station reports>
Limits: tides are astronomical predictions; readings are past measurements at the station, not a forecast.
Sources: NOAA CO-OPS tide predictions, NOAA NDBC observations, with the station page link
```

Answer in the order the person asked. If they asked about low tide first, lead with it.

## Examples

**"Low tide at Cape May tomorrow, and what are the waves doing?"** Search both catalogs near Cape May. Use the ocean side tide station for a beach question. The fixed station at Cape May has no wave sensor, so read the buoy 26 nautical miles southeast for waves and say how far out it is.

**"Compare conditions at two spots on Monterey Bay."** Pair each spot with its nearest tide station and the nearest station that reports the measurement in question. Present the two spots in one table with station ids, distances and report times.

**"Can I take the kids to the beach at 2 pm Saturday?"** Give Saturday's predicted tides around 2 pm and the latest measured conditions with their age. Say that Saturday's wind, surf and rip current risk need the National Weather Service forecast and the lifeguards on the day.
