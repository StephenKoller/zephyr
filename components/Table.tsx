import React, { FC } from 'react'
import { Forecast, HourlyDataPoint } from '../types'

interface Props {
  forecast: Forecast
}

const getTemperatureClassName = (temperature: number) => {
  if (temperature > 104 || temperature < 14) return 'bg-error'
  if (temperature < 59 || temperature > 90) return 'bg-warning'
  return 'bg-success'
}

const getWindClassName = (windSpeed: number) => {
  if (windSpeed > 30) return 'bg-error'
  if (windSpeed > 15) return 'bg-warning'
  return 'bg-success'
}

const Table: FC<Props> = ({ forecast }) => (
  <>
    <table className="table table-striped">
      <thead>
        <tr style={{ backgroundColor: 'none' }}>
          <th>Time</th>
          <th>Wind Speed</th>
          <th>Wind Gusts</th>
          <th>Summary</th>
          <th>Temperature</th>
          <th>Humidity</th>
          <th>Precipitation</th>
        </tr>
      </thead>
      <tbody>
        {forecast.hourly?.data?.map((hour: HourlyDataPoint) => (
          <tr key={hour.time}>
            <td>{hour.formattedTime}</td>
            <td className={getWindClassName(hour.windSpeed)}>{hour.windSpeed} MPH</td>
            <td className={getWindClassName(hour.windGust)}>{hour.windGust} MPH</td>
            <td>{hour.summary}</td>
            <td className={getTemperatureClassName(hour.temperature)}>{hour.temperature}º F</td>
            <td>{hour.humidity}%</td>
            <td>{hour.precipProbability}%</td>
          </tr>
        ))}
      </tbody>
    </table>
    <style jsx>{`
      table tr:nth-of-type(2n) {
        background-color: #fff;
      }
      table tr:nth-of-type(2n + 1) {
         {
          /* background-color: rgba(0, 0, 0, 0.1); */
        }
        background-color: #efefef;
      }

      .table td,
      .table th {
        border-bottom: 0.05rem solid rgba(0, 0, 0, 0.2);
      }
    `}</style>
  </>
)

export default Table
