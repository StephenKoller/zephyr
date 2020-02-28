import * as React from 'react'
import { useState, useEffect } from 'react'
import { NextPage } from 'next'

import { MapboxData, Forecast } from '../types'
import Layout from '../components/Layout'

import { fetchWeather, fetchLatLong } from '../utils/api'
import Table from '../components/Table'

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

  // trigger fetch of forecast data when geocoding is done
  useEffect(() => {
    // bail out if we don't have the lat / long yet
    if (!mapboxData?.features?.[0]?.center) return

    // need to create and call an async/await function within useEffect
    // rather than try to pass an async function to useEffect directly
    const getWeatherData = async () => {
      const [latitude, longitude] = mapboxData?.features?.[0]?.center
      const weatherData = await fetchWeather(latitude, longitude)
      setForecast(weatherData)
    }

    getWeatherData()
  }, [mapboxData])

  // trigger geocoding fetch of lat/long on search box submit
  const handleEnterKey = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.key === 'Enter') setMapboxData(await fetchLatLong(searchTerm))
  }

  return (
    <Layout>
      <h1>Zephyr</h1>
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
      <button id="search-button" onClick={async () => await fetchLatLong(searchTerm)}>
        Search
      </button>
      <br />

      <h2>{mapboxData?.features?.[0]?.place_name}</h2>
      <h2>{forecast?.hourly?.summary}</h2>

      <Table forecast={forecast} />
      <style jsx>{`
        h1 {
          color: #2e5689;
          font-family: 'Caesar Dressing', Arial, sans-serif;
          font-size: 4rem;
          font-weight: 500;
          letter-spacing: 0.5rem;
          margin: 2rem 0 1rem 0;
        }

        #location-search {
          align-items: center;
          border-radius: 5px;
          border: 1px solid rgb(216, 216, 216);
          display: inline-flex;
          font-size: 0.875rem;
          height: 2.25rem;
          outline: currentcolor none 0px;
          padding: 0;
          transition: border 0.2s ease 0s;
          width: 320px;
          background-color: #fff;
        }

        #location-search > input {
          font-size: 1rem;
          display: flex;
          height: 100%;
          width: 100%;
          border: medium none;
          outline: currentcolor none 0px;
          padding: 0 0.5rem 0 0.5rem;
          text-align: center;
        }

        #search-button {
          padding: 0.3em 1em;
          font-size: 1em;
          border-radius: 4px;
          margin: 0.5em;
        }

        .icon {
          font-size: 3rem;
        }

        .icon.reversed {
          -moz-transform: scale(-1, 1);
          -webkit-transform: scale(-1, 1);
          -o-transform: scale(-1, 1);
          -ms-transform: scale(-1, 1);
          transform: scale(-1, 1);
        }
      `}</style>
    </Layout>
  )
}

export default IndexPage
