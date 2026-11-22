---
name: tide-lookup
description: "Finds a NOAA tide station and returns predicted high and low tide times and heights for one to seven days. Use when someone asks when high tide or low tide is, for a tide table or tide chart for a US beach, harbor or inlet, for the lowest tide this week for tidepooling or clamming, or for a negative or minus tide."
---

# Tide lookup

Resolve a place to a NOAA tide station, fetch the predictions, and report them with the station, the datum and the fact that they are predictions.

## When to use

- "When is low tide at Cape May tomorrow?"
- "Tide table for Monterey this weekend."
- "What is the lowest tide this week near Half Moon Bay?"

Use `buoy-report` for measured wind, waves and water temperature, and `coastal-brief` when the person wants tides and sea state together. This skill has no data on currents, slack water, observed water levels, storm surge, or tides outside the United States and its territories.

## Tools

Both are on the `tides` server (Tide Times).

| Tool | Arguments that matter | Returns |
| --- | --- | --- |
| `find_tide_stations` | `query` (part of a station name, or a two letter state such as `ME`), or `latitude` and `longitude`; `limit` 1 to 20, default 8 | Station names and 7 digit station ids. A coordinate search also gives distance in km |
| `tide_predictions` | `station_id` (required); `start_date` as `YYYY-MM-DD` in station local time, default today; `days` 1 to 7, default 2; `units` `feet` or `meters`, default `feet` | Each day's highs and lows with time and height |

In Claude Code the full tool names follow the pattern `mcp__plugin_coastal-conditions_tides__tide_predictions`.

## Workflow

1. **Find the station.** Search by name first. If the name returns nothing, or the place is a beach with no station of its own, search by the place's latitude and longitude and take the nearest suitable station.
2. **Choose among several.** One town can have stations on the ocean side, in the harbor and up a creek, and their tides differ in time and height. Pick the one on the same water as the person's spot. If you cannot tell, ask one question: ocean side or bay side.
3. **Fetch.** Call `tide_predictions` with the id exactly as returned. Set `start_date` to the first local date asked about and `days` to cover the span. Use `meters` when the person uses metric.
4. **Filter if asked.** For "lowest tide this week", fetch 7 days and pick the lowest low. For "low tides in daylight", keep lows between the local sunrise and sunset if you know them, otherwise list all lows and let the person choose.
5. **Report** in the shape below.

## Reading the results

- **Times** are station local time on a 24 hour clock. The result does not name the time zone, so say "local time at the station".
- **Heights** are above mean lower low water (MLLW). A negative height is a tide below that level and exposes more shore than usual.
- **Three or four events a day** are both normal. The tidal day is about 24 hours 50 minutes, so one event sometimes slips past midnight.
- **Unequal pairs.** On coasts with mixed tides, such as the US West Coast, the two lows of a day can differ by a meter or more. Name which low you mean.
- **Predictions only.** The server ends every result with `Predictions only; wind and pressure can shift actual water levels.` Keep that caveat in the answer.

What MLLW is, how a prediction differs from an observation, and why currents do not follow the tide table are in [references/tide-predictions.md](references/tide-predictions.md).

## Edge cases

- **No station matches.** The tool says so and suggests a nearby town or coordinates. Try coordinates before asking the person.
- **Upstream error after a hand typed id.** An unknown station id comes back as `NOAA Tides and Currents (CO-OPS) could not be reached just now`. Run `find_tide_stations` again and use the id it returns. If the id came from the tool, treat the error as a real outage and offer to retry.
- **Station far from the spot.** When the nearest station is many kilometers away or on different water, say that local times can differ and name the distance.
- **Great Lakes or a place outside the US.** There are no tide predictions here for them. Say so.
- **More than seven days.** Make a second call with a later `start_date`.
- **Navigation or safety decisions.** Give the predictions, then say they are not clearance for a bar, bridge or channel, and point to official NOAA charts and the National Weather Service marine forecast.

## Answer shape

```text
Cape May, ferry terminal, NJ (NOAA station 8536110)
Mon Nov 23, 2026, local time at the station, heights above MLLW
  Low   00:16   -0.2 ft
  High  06:49    5.9 ft
  Low   13:06   -0.2 ft
  High  19:16    4.7 ft
Astronomical predictions only. Wind and pressure can shift actual water levels.
Source: NOAA CO-OPS tide predictions
```

For a single question such as "when is low tide tomorrow", lead with the one answer, then give the day's other events in a line.

## Limits to state

Predictions cover the astronomical tide at the station. They do not include storm surge, wind setup, river flow, waves or swell. The plugin does not fetch observed water levels. For the measured level at a gauge, send the person to https://tidesandcurrents.noaa.gov/.

## Examples

**"When is low tide at Cape May tomorrow?"** `find_tide_stations` with `query: "Cape May"` returns five stations. Ask ocean side or bay side unless the context settles it, then call `tide_predictions` with tomorrow's date and `days: 1`.

**"Best low tide for tidepooling near Monterey this week?"** Search by coordinates, take the Monterey station, fetch 7 days, and list the lowest lows with their dates and times. Note which fall in the dark if the times make that obvious.

**"Is it safe to cross the bar at 3 pm?"** Give the predicted tide around 3 pm, say that this plugin has no current, swell or bar data, and point to the Coast Guard and the National Weather Service marine forecast for the decision.
