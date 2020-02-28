import * as React from 'react'
import { useState, useEffect } from 'react'
import { NextPage } from 'next'
import fetch from 'isomorphic-unfetch'

import { MapboxData, Forecast } from '../types'
import Layout from '../components/Layout'

import { MAPBOX_URL, DARKSKY_URL } from './utils'

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
    if (!mapboxData?.features?.[0]?.center) return

    const fetchWeather = async () => {
      const [latitude, longitude] = mapboxData?.features?.[0]?.center
      const res = await fetch(DARKSKY_URL(latitude, longitude), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data: Forecast = await res.json()
      console.log(data)
      setForecast(data)
    }

    fetchWeather()
  }, [mapboxData])

  const fetchLatLong = async () => {
    const res = await fetch(MAPBOX_URL(searchTerm))
    const data = await res.json()
    setMapboxData(data)
  }

  // trigger geocoding fetch of lat/long on search box submit
  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.key === 'Enter') fetchLatLong()
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
      <button onClick={() => fetchLatLong()}>Search</button>
      <br />


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
          width: calc(100% - 2px);
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
