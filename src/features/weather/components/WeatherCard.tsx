import { GeoResult, WeatherData } from '../types/weather.types'
import { getWeatherInfo, getWindDirection } from '../utils/weather.utils'

interface Props {
  weather: WeatherData
  location: GeoResult
}

export default function WeatherCard({ weather, location }: Props) {
  const { current } = weather
  const isDay = current.is_day === 1
  const info = getWeatherInfo(current.weather_code, isDay)
  const windDir = getWindDirection(current.wind_direction_10m)
  const maxTemp = weather.daily.temperature_2m_max[0]
  const minTemp = weather.daily.temperature_2m_min[0]

  return (
    <div className="bg-white/15 dark:bg-black/30 backdrop-blur-md border border-white/25 dark:border-white/10 rounded-3xl p-6 shadow-2xl text-white">
      {/* Location */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold">{location.name}</h2>
        <p className="text-white/60 text-sm">{[location.admin1, location.country].filter(Boolean).join(', ')}</p>
      </div>

      {/* Main temp + icon */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-8xl font-thin leading-none">
            {Math.round(current.temperature_2m)}°
          </div>
          <p className="text-white/70 mt-2 text-lg">{info.label}</p>
          <p className="text-white/50 text-sm mt-1">
            Sensación: {Math.round(current.apparent_temperature)}°C
          </p>
          <p className="text-white/50 text-sm">
            ↑{Math.round(maxTemp)}° ↓{Math.round(minTemp)}°
          </p>
        </div>
        <div className="text-8xl select-none" title={info.label}>
          {info.icon}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon="💧" label="Humedad" value={`${current.relative_humidity_2m}%`} />
        <StatCard icon="💨" label="Viento" value={`${Math.round(current.wind_speed_10m)} km/h ${windDir}`} />
        <StatCard icon="🌡️" label="Temp. real" value={`${Math.round(current.temperature_2m)}°C`} />
        <StatCard icon="🤔" label="Sensación" value={`${Math.round(current.apparent_temperature)}°C`} />
      </div>
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-white/10 dark:bg-black/20 rounded-2xl px-4 py-3 flex items-center gap-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-white/50 text-xs">{label}</p>
        <p className="text-white font-semibold text-sm">{value}</p>
      </div>
    </div>
  )
}
