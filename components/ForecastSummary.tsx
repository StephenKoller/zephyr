import React from 'react'
import { SunriseSunsetTimes, Forecast } from '../types'

interface Props {
  suntimes: SunriseSunsetTimes
  forecast: Forecast
}

const ForecastSummary: React.FC<Props> = ({ suntimes, forecast }) => (
  <div className="container">
    {forecast?.currently?.summary && (
      <div className="columns">
        <div className="column col-2">
          <h5>Currently:</h5>
        </div>
        <div className="column col-10">
          <h5>{forecast?.currently?.summary}</h5>
        </div>
      </div>
    )}

    {forecast?.hourly?.summary && (
      <div className="columns">
        <div className="column col-2">
          <h5>Today:</h5>
        </div>
        <div className="column col-10">
          <h5>{forecast?.hourly?.summary}</h5>
        </div>
      </div>
    )}

    {forecast?.daily?.summary && (
      <div className="columns">
        <div className="column col-2">
          <h5>This week:</h5>
        </div>
        <div className="column col-10">
          <h5>{forecast?.daily?.summary}</h5>
        </div>
      </div>
    )}

    {suntimes?.results?.sunrise && (
      <div className="columns">
        <div className="column col-2">
          <h5>Sunrise:</h5>
        </div>
        <div className="column col-10">
          <h5>{suntimes?.results?.sunrise}</h5>
        </div>
      </div>
    )}

    {suntimes?.results?.sunset && (
      <div className="columns">
        <div className="column col-2">
          <h5>Sunset:</h5>
        </div>
        <div className="column col-10">
          <h5>{suntimes?.results?.sunset}</h5>
        </div>
      </div>
    )}
  </div>
)

export default ForecastSummary
