import React, { FC } from 'react'
import { Forecast, HourlyDataPoint } from '../types'

interface Props {
  forecast: Forecast
}

const formatPercentage = (num: number) => (num * 100).toFixed(0)

const formatTime = (time: number) => {
  const t = new Date(time * 1000)
  return t.toLocaleString()
}

const formatTemperature = (temp: number) => ((temp * 9) / 5 + 32).toFixed(0)
const formatSpeed = (speed: number) => (speed * 2.237).toFixed(0)

const Table: FC<Props> = ({ forecast }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Summary</th>
            <th>Chance of Precipitation</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Wind Speed</th>
            <th>Wind Gusts</th>
          </tr>
        </thead>
        <tbody>
          {forecast.hourly?.data?.map((hour: HourlyDataPoint) => (
            <tr key={hour.time}>
              <td>{formatTime(hour.time)}</td>
              <td>{hour.summary}</td>
              <td>{formatPercentage(hour.precipProbability)}%</td>
              <td>{formatTemperature(hour.temperature)}º F</td>
              <td>{formatPercentage(hour.humidity)}%</td>
              <td>{formatSpeed(hour.windSpeed)} MPH</td>
              <td>{formatSpeed(hour.windGust)} MPH</td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        table {
          border-spacing: 0;
        }

        tr {
          background-color: #eee;
        }

        tr:nth-of-type(2n) {
          background-color: #ddd;
        }

        tr :last-child td {
          border-bottom: 0;
        }

        th,
        td {
          margin: 0;
          padding: 0.5rem;
        }

        td:last-child {
          border-right: 0;
        }
      `}</style>
    </>
  )
}

export default Table
