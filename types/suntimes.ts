export type SunriseSunsetTimesStatus = "OK" | "INVALID_REQUEST" | "INVALID_DATE" | "UNKNOWN_ERROR"

export type SunriseSunsetTimesResults = {
  sunrise: string
  sunset: string
  solar_noon: string
  day_length: string | number
  civil_twilight_begin: string
  civil_twilight_end: string
  nautical_twilight_begin: string
  nautical_twilight_end: string
  astronomical_twilight_begin: string
  astronomical_twilight_end: string
}

export type SunriseSunsetTimes = {
  results: SunriseSunsetTimesResults,
  status: SunriseSunsetTimesStatus
}