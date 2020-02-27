# 🌬 Zephyr

_Light Zephryos blows the sweetest breeze._

_&mdash; <cite>The Anacreontea, Fragment 41 (trans. Campbell, Vol. Greek Lyric II) (Greek lyric C5th B.C.)</cite>_

## Project goals

Based on weather conditions, help a drone photography pilot answer the following questions:

- Can I fly at X location today?
- What about the next 7 days?
- How does Y location compare, better or worse?
- Which date/site combinations are best so I can plan my week?

Typically, the best conditions are:

- daylight
- light to no wind
- no precipitation
- low humidity
- moderate temperatures
  - too cold and batteries suffer
  - too hot and electronics overheat

## Roadmap

### Core

- [ ] get forecast for a given location (today)
  - [ ] sunrise / sunset time
  - [ ] wind speed (average during daylight)
  - [ ] temperature / humidity (average during daylight)
  - [ ] precipitation (average during daylight)
  - [ ] invent some kind of at-a-glance aggregate indicator
- [ ] get multi-day forecast for a given location / date
- [ ] show simple map of location

### Stretch

- [ ] allow multiple locations
- [ ] more in-depth data visualization

  - [ ] sunrise / sunset time
  - [ ] wind speed over time
  - [ ] temperature / humidity over time

- [ ] user authentication
- [ ] save multiple locations to user account

## Stack

| Tool                                                                                               | Purpose                                        |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)                    | component-driven development with static types |
| [Next.js](https://nextjs.org/)                                                                     | routing, SSR                                   |
| [isomorphic-unfetch](https://github.com/developit/unfetch/tree/master/packages/isomorphic-unfetch) | isomorphic async/await data fetching           |
| [Sunrise Sunset](https://sunrise-sunset.org/api)                                                   | sunrise/sunset times                           |
| [darksky-api](https://github.com/worldturtlemedia/darksky-api)                                     | TypeScript type defs for API response          |
| [DarkSky API](https://darksky.net/dev/docs)                                                        | weather data                                   |
| [Mapbox API](https://docs.mapbox.com/api/)                                                         | mapping / geocoding data                       |
| [Now](https://zeit.co/now)                                                                         | deployment                                     |

<!-- When looking for a code sample, we would like to see a webapp that:
1. Has strong modern web development fundamentals like:
    1. Component-driven development,
    2. State management & data flow, and
    3. Language fundamentals & effective patterns;
2. Includes CRUD interaction with data like:
    1. Accessing remote APIs,
    2. Consuming dynamic data, and
    3. Error handling; and
3. Presents well to both users and other developers with:
    1. Components that show dynamic data,
    2. Appropriate documentation, code legibility, code comments, etc., and
    3. A good, usable UI.
Note: Our preference is to have a code sample in Javascript that can be compiled and run. -->
