import React, { FC } from 'react'
import { Forecast, HourlyDataPoint } from '../types'

interface Props {
  forecast: Forecast
}

const Table: FC<Props> = ({ forecast }) => (
  <table className="table table-striped">
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
          <td>{hour.formattedTime}</td>
          <td>{hour.summary}</td>
          <td>{hour.precipProbability}%</td>
          <td>{hour.temperature}º F</td>
          <td>{hour.humidity}%</td>
          <td>{hour.windSpeed} MPH</td>
          <td>{hour.windGust} MPH</td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default Table
