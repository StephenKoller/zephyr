import fetch from 'isomorphic-unfetch'
import { Forecast } from "../types"

export const MAPBOX_URL = (searchTerm: string) =>
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${process.env.MAPBOX_KEY}&exclude=alerts`

export const DARKSKY_URL = (latitude: number, longitude: number) =>
  `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${latitude},${longitude}?time=America/Detroit`

export const fetchWeather = async (latitude: number, longitude: number) => {
  console.log('fetching weather data...')

  const res = await fetch(DARKSKY_URL(latitude, longitude), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data: Forecast = await res.json()
  console.log(data)
  return data
}

export const fetchLatLong = async (searchTerm: string) => {
  console.log('fetching geocoding data...')

  const res = await fetch(MAPBOX_URL(searchTerm))
  const data = await res.json()
  console.log(data)
  return data
}