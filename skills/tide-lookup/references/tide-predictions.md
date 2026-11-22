# Tide predictions: what the numbers mean

## The datum: mean lower low water

Every height from `tide_predictions` is measured from mean lower low water, MLLW. The server states this in the header of each result.

- Most US coasts have two low tides a day, and one is usually lower than the other. MLLW is the average height of that lower low, taken over a 19 year period that NOAA calls the National Tidal Datum Epoch.
- A height of 0.0 means the water is at MLLW. A height of 5.6 ft means 5.6 ft above it. A height of minus 0.2 ft means 0.2 ft below it.
- Negative heights are often called minus tides. They uncover more shore than a typical low.
- MLLW is also the reference level for depths on US nautical charts. A tide height is not a water depth. Depth at a spot depends on the charted depth there.
- Results in meters round to one decimal, so a value just below zero can print as `-0.0 m`. Read it as zero.

## Prediction versus observation

| | Prediction | Observation |
| --- | --- | --- |
| What it is | The tide computed from the known motions of the moon and sun and the station's past response | The water level a gauge actually measured |
| Known in advance | Yes, years ahead | No |
| Includes weather | No | Yes |
| In this plugin | Yes, from `tide_predictions` | No |

The difference between the two can be small on a calm day and large in a storm. Onshore wind, low pressure and river flow raise the water. Offshore wind and high pressure lower it. The server's own footer says wind and pressure can shift actual water levels.

Consequences for answers:

- Call the values predicted tides. Do not say "the tide will be 5.6 ft".
- In stormy weather, say that actual levels may differ and point to the National Weather Service forecast and to observed levels at https://tidesandcurrents.noaa.gov/.
- Never describe a prediction as current conditions.

## Times

- Times are local to the station on a 24 hour clock, as the result header says. The result does not print a time zone name.
- `start_date` is read in station local time and defaults to today.
- The tide at a beach or inlet some distance from the station can run earlier or later than the station's. Inside bays and up rivers the delay can be large.

## How many tides a day

- Most stations show two highs and two lows in a tidal day of about 24 hours 50 minutes. Because that is longer than a calendar day, some dates list only three events.
- On mixed tide coasts the two highs differ and the two lows differ. Live results for Monterey showed lows of 0.7 m and about 0.0 m on the same day.
- For shore activities the lower low is usually the one that matters.

## Tides are not currents

The tide table gives water height. It does not give the flow of water.

- In inlets and narrow channels the current often keeps running after high or low water. Slack water can come well after the time in the tide table.
- This plugin has no current predictions. Do not infer slack water from the tide times. Send the person to NOAA current predictions at https://tidesandcurrents.noaa.gov/.

## Station search notes

- `find_tide_stations` searches NOAA tide prediction stations for US coasts and territories.
- A name search returns matching stations without distances. A coordinate search returns the nearest stations with distance in km.
- Station ids are 7 digits, for example 8536110. Pass the id exactly as returned.
- A two letter state code as the query lists stations in that state.
- No match returns `No stations match <query>. Try a nearby town, or search by latitude and longitude.`
- The Great Lakes are not tidal and have no tide predictions.

## Official sources for decisions

- NOAA Tides and Currents, for observed water levels, currents and the full station pages: https://tidesandcurrents.noaa.gov/
- National Weather Service marine and surf zone forecasts and coastal flood statements: https://www.weather.gov/marine
- US Coast Guard and the local harbor master for bar and channel conditions.

In an emergency on the water in the US, call 911 or hail the Coast Guard on VHF channel 16.
