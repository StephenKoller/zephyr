import fetch from 'isomorphic-unfetch'
import { Forecast, ForecastError, HourlyDataBlock, MapboxData, SunriseSunsetTimes } from "../types"

export const MAPBOX_URL = (searchTerm: string) =>
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${process.env.MAPBOX_KEY}&exclude=alerts`

export const DARKSKY_URL = (latitude: number, longitude: number) =>
  `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${latitude},${longitude}`

export const SUNTIMES_URL = (latitude: number, longitude: number) => 
  `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=today`

// format metric to imperial units
const formatForecast = (forecast: Forecast): Forecast => {
  if (!forecast.hourly?.data) return forecast

  const formattedHourlyDataBlock: HourlyDataBlock = {
    ...forecast.hourly,
    data: forecast.hourly.data.map(hourlyDataPoint => ({
      ...hourlyDataPoint,
      formattedTime: (new Date(hourlyDataPoint.time * 1000)).toLocaleString(),
      precipProbability: parseInt((hourlyDataPoint.precipProbability * 100).toFixed(0)),
      humidity: parseInt((hourlyDataPoint.humidity * 100).toFixed(0)),
      temperature: parseInt(hourlyDataPoint.temperature.toFixed(0)),
      windSpeed: parseInt((hourlyDataPoint.windSpeed * 2.237).toFixed(0)),
      windGust: parseInt((hourlyDataPoint.windGust * 2.237).toFixed(0)),
    }))
  }
    
  return {...forecast, hourly: formattedHourlyDataBlock};
}

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
    return formatForecast(data as Forecast)
  }
}

export const fetchLocationData = async (searchTerm: string): Promise<MapboxData> => {
  const res = await fetch(MAPBOX_URL(searchTerm))
  const data = await res.json()
  console.log(data)
  return data
}

export const fetchSunriseSunsetTimes = async (latitude: number, longitude: number): Promise<SunriseSunsetTimes> => {
  const res = await fetch(SUNTIMES_URL(latitude, longitude))
  const data: SunriseSunsetTimes = await res.json()

  if (data.status !== "OK") {
    throw new Error("Could not fetch sunrise / sunset times.")
  }

  console.log(data)
  return data
}