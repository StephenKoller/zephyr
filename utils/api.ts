import fetch from 'isomorphic-unfetch'
import { Forecast, MapboxData, ForecastError } from "../types"

export const MAPBOX_URL = (searchTerm: string) =>
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${process.env.MAPBOX_KEY}&exclude=alerts`

export const DARKSKY_URL = (latitude: number, longitude: number) =>
  `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${latitude},${longitude}`

export const fetchWeather = async (latitude: number, longitude: number): Promise<Forecast> => {
  const res = await fetch(DARKSKY_URL(latitude, longitude), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data: Forecast | ForecastError = await res.json()

  // TODO: figure out The Right Way™ to fix weird casting to types here.
  // this exists to catch weird errors like when you use 'foobar' as a search term - try it!
  const forecastError = data as ForecastError
  if (forecastError?.code) {
    throw new Error(forecastError?.error)
  } else {
    console.log(data)
    return data as Forecast
  }
}

export const fetchLocationData = async (searchTerm: string): Promise<MapboxData> => {
  const res = await fetch(MAPBOX_URL(searchTerm))
  const data = await res.json()
  console.log(data)
  return data
}