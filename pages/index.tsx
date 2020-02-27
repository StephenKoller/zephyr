import * as React from 'react'
import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import fetch from 'isomorphic-unfetch'
import { MapboxData, Forecast } from '../types'

const MAPBOX_URL = (searchTerm: string) =>
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${process.env.MAPBOX_KEY}&exclude=alerts`

const DARKSKY_URL = (latitude: number, longitude: number) =>
  `https://proxier-koller.now.sh/https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${latitude},${longitude}`

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

  useEffect(() => {
    if (!mapboxData?.features?.[0]?.center) return

    const fetchWeather = async () => {
      const [latitude, longitude] = mapboxData?.features?.[0]?.center
      const res = await fetch(DARKSKY_URL(latitude, longitude), { headers: { 'Access-Control-Allow-Origin': '*' } })
      const data: Forecast = await res.json()
      console.log(data)
      setForecast(data)
    }

    fetchWeather()
  }, [mapboxData])

  const handleEnterKey = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.key === 'Enter') {
      const res = await fetch(MAPBOX_URL(searchTerm))
      const data = await res.json()
      setMapboxData(data)
    }
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
      <div>{mapboxData?.features?.[0]?.center}</div>
      <div>{forecast?.currently?.windSpeed}</div>
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
