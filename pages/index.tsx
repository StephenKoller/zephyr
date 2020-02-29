import * as React from 'react'
import { useState, useEffect } from 'react'
import { NextPage } from 'next'

import { MapboxData, Forecast, SunriseSunsetTimes } from '../types'
import Layout from '../components/Layout'

import { fetchWeather, fetchLocationData, fetchSunriseSunsetTimes } from '../utils/api'
import Table from '../components/Table'

import indexStyles from './index.styles.js'

type Props = {
  suntimes: {
    sunrise: string
    sunset: string
  }
}

const IndexPage: NextPage<Props> = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [mapboxData, setMapboxData] = useState({} as MapboxData)
  const [forecast, setForecast] = useState({} as Forecast)
  const [suntimes, setSuntimes] = useState({} as SunriseSunsetTimes)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // reset error state when user types in the search bar
  useEffect(() => {
    if (error) setError('')
    if (searchTerm === '') resetData()
  }, [searchTerm])

  const resetData = () => {
    setSuntimes({} as SunriseSunsetTimes)
    setForecast({} as Forecast)
    setMapboxData({} as MapboxData)
    setLoading(false)
  }

  // trigger fetch of sunrise, forecast data when geocoding is done
  useEffect(() => {
    if (mapboxData?.features?.length === 0) {
      setError('Could not find a result for that search term.')
      resetData()
      return
    }

    // bail out if we don't have the lat / long yet
    if (!mapboxData?.features?.[0]?.center) return

    // need to create and call async/await functions within useEffect
    // rather than try to pass an async callback to useEffect directly
    const [longitude, latitude] = mapboxData.features[0].center

    const getWeatherData = async () => {
      try {
        const weatherData = await fetchWeather(latitude, longitude)
        setForecast(weatherData)
        setError('')
      } catch (error) {
        setError(error.message)
        resetData()
      }
    }

    const getSuntimes = async () => {
      try {
        const sunriseSunsetTimes = await fetchSunriseSunsetTimes(latitude, longitude)
        setSuntimes(sunriseSunsetTimes)
        setError('')
      } catch (error) {
        setError(error.message)
        resetData()
      }
    }

    // TODO: Investigate using Promise.all to wait until all have resolved before displaying data.
    // Bonus: could possibly reduce duplication, allow me to use just a single try/catch for error handling
    getWeatherData()
    getSuntimes()
    setLoading(false)
  }, [mapboxData])

  const fetchWeatherOrShowErrors = async () => {
    setLoading(true)
    try {
      const locationData = await fetchLocationData(searchTerm)
      setMapboxData(locationData)
      setError('')
    } catch (error) {
      setError(error.message)
      resetData()
    }
  }

  // trigger geocoding fetch of lat/long on search box submit
  const handleEnterKey = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.key === 'Enter') fetchWeatherOrShowErrors()
  }
  const handleClickSearch = async () => fetchWeatherOrShowErrors()

  return (
    <Layout>
      <h1>Zephyr</h1>
      {/* extract to search bar component? */}
      <div id="location-search">
        <span className="icon">🌬</span>
        <input
          type="text"
          placeholder="Search for a location..."
          name="location-search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onKeyPress={handleEnterKey}
        />
        <span className="icon reversed">🌬</span>
      </div>
      <br />
      <button id="search-button" onClick={handleClickSearch}>
        Search
      </button>
      <br />
      {/* </searchbar> */}

      {error && <div>{error}</div>}
      {loading && <div>Loading...</div>}

      <h2>{mapboxData?.features?.[0]?.place_name}</h2>

      {forecast?.currently?.summary && <h3>Currently: {forecast?.currently?.summary}</h3>}
      {forecast?.hourly?.summary && <h3>Today: {forecast?.hourly?.summary}</h3>}
      {forecast?.daily?.summary && <h3>This week: {forecast?.daily?.summary}</h3>}
      {suntimes?.results?.sunrise && <h3>Sunrise: {suntimes?.results?.sunrise}</h3>}
      {suntimes?.results?.sunset && <h3>Sunset: {suntimes?.results?.sunset}</h3>}

      {Object.keys(forecast).length > 0 && <Table forecast={forecast} />}

      <style jsx>{indexStyles}</style>
      <style jsx>{`
        #location-search {
          background-color: ${error ? 'red' : '#fff'};
        }
      `}</style>
    </Layout>
  )
}

export default IndexPage
