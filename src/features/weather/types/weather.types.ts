export interface GeoResult {
  id?: number
  name: string
  latitude: number
  longitude: number
  country: string
  country_code?: string
  admin1?: string
  admin2?: string
}

export interface WeatherCurrent {
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
  weather_code: number
  wind_speed_10m: number
  wind_direction_10m: number
  /** 1 = día, 0 = noche — proporcionado por Open-Meteo */
  is_day: 0 | 1
}

export interface WeatherDaily {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  weather_code: number[]
}

export interface WeatherData {
  current: WeatherCurrent
  daily: WeatherDaily
  timezone: string
  timezone_abbreviation: string
}
