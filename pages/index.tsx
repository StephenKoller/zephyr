import * as React from 'react'
import { useState, useEffect } from 'react'
import { NextPage } from 'next'

import { MapboxData, Forecast } from '../types'
import Layout from '../components/Layout'

import { fetchWeather, fetchLatLong } from '../utils/api'
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
  const [error, setError] = useState('')

  // reset error state when user types in the search bar
  useEffect(() => {
    if (error) setError('')
  }, [searchTerm])

  // trigger fetch of forecast data when geocoding is done
  useEffect(() => {
    if (mapboxData?.features?.length === 0) {
      setError('Could not find a result for that search term.')
      return
    }

    // bail out if we don't have the lat / long yet
    if (!mapboxData?.features?.[0]?.center) return

    // need to create and call an async/await function within useEffect
    // rather than try to pass an async function to useEffect directly
    const getWeatherData = async () => {
      const [latitude, longitude] = mapboxData?.features?.[0]?.center
      try {
        const weatherData = await fetchWeather(latitude, longitude)
        setForecast(weatherData)
        // clear error message if successful
        setError('')
      } catch (error) {
        setError(error.message)
      }
    }

    getWeatherData()
  }, [mapboxData])

  const fetchWeatherOrShowErrors = async () => {
    try {
      const latLong = await fetchLatLong(searchTerm)
      setMapboxData(latLong)
      // clear error message if successful
      setError('')
    } catch (error) {
      setError(error.message)
    }
  }

  // trigger geocoding fetch of lat/long on search box submit
  const handleEnterKey = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.key === 'Enter') {
      fetchWeatherOrShowErrors()
    }
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

      <div>{error}</div>
      <h2>{mapboxData?.features?.[0]?.place_name}</h2>
      <h2>{forecast?.hourly?.summary}</h2>

      <Table forecast={forecast} />

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
