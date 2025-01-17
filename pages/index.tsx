import * as React from 'react'
import { useState, useEffect } from 'react'
import { NextPage } from 'next'

import { MapboxData, Forecast, SunriseSunsetTimes } from '../types'
import Layout from '../components/Layout'

import { fetchWeather, fetchLocationData, fetchSunriseSunsetTimes } from '../utils/api'
import Table from '../components/Table'

import Searchbar from '../components/Searchbar'
import ForecastSummary from '../components/ForecastSummary'

type Props = {}

const IndexPage: NextPage<Props> = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [mapboxData, setMapboxData] = useState({} as MapboxData)
  const [forecast, setForecast] = useState({} as Forecast)
  const [suntimes, setSuntimes] = useState({} as SunriseSunsetTimes)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const resetData = () => {
    setSuntimes({} as SunriseSunsetTimes)
    setForecast({} as Forecast)
    setMapboxData({} as MapboxData)
    setLoading(false)
  }

  // reset results if user clears text field
  useEffect(() => {
    if (searchTerm === '') resetData()
  }, [searchTerm])

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

  // bit of a hack: {} aka empty object will have an Object.keys.length of 0
  const hasForecastData = Object.keys(forecast).length > 0

  return (
    <Layout>
      <h1 className={hasForecastData ? 'headline-sm' : 'headline'}>Zephyr</h1>
      {!hasForecastData && <h2>weather forecasts for drone pilots</h2>}
      <Searchbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleEnterKey={handleEnterKey}
        setError={setError}
      />
      <br />

      {error && <div className="text-error text-center">{error}</div>}
      {loading && <div className="loading loading-lg"></div>}

      <h2>{mapboxData?.features?.[0]?.place_name}</h2>

      <ForecastSummary forecast={forecast} suntimes={suntimes} />

      {hasForecastData && <Table forecast={forecast} />}

      <style jsx>{`
        h1,
        h2 {
          text-align: center;
        }

        h1 {
          color: #2e5689;
          font-family: 'Caesar Dressing', Arial, sans-serif;
          font-size: 4rem;
          letter-spacing: 0.5rem;
          margin: 2rem 0 1rem 0;
        }

        h2 {
          font-weight: 100;
        }

        .headline {
          margin-top: 25vh;
        }

        .headline-sm {
          font-size: 3rem;
          letter-spacing: 0.2rem;
        }

        #search-button {
          padding: 0.3em 1em;
          font-size: 1em;
          border-radius: 4px;
          margin: 0.5em;
        }
      `}</style>
    </Layout>
  )
}

export default IndexPage
