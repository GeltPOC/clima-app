import { WeatherData } from '../types/weather.types'
import { getWeatherInfo } from '../utils/weather.utils'

interface Props {
  weather: WeatherData
}

const DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

export default function ForecastRow({ weather }: Props) {
  const { daily } = weather

  return (
    <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-3xl p-5 shadow-2xl text-white">
      <h3 className="text-white/70 text-sm font-semibold mb-4 uppercase tracking-widest">Próximos 7 días</h3>
      <div className="grid grid-cols-7 gap-1">
        {daily.time.map((dateStr, i) => {
          const date = new Date(dateStr + 'T12:00:00')
          const dayName = i === 0 ? 'Hoy' : DAYS[date.getDay()]
          const info = getWeatherInfo(daily.weather_code[i])
          return (
            <div key={dateStr} className={`flex flex-col items-center gap-1 rounded-2xl py-3 px-1 transition-colors ${
              i === 0 ? 'bg-white/20 border border-white/30' : 'hover:bg-white/10'
            }`}>
              <span className="text-white/60 text-xs font-medium">{dayName}</span>
              <span className="text-2xl" title={info.label}>{info.icon}</span>
              <span className="text-white font-bold text-sm">{Math.round(daily.temperature_2m_max[i])}°</span>
              <span className="text-white/50 text-xs">{Math.round(daily.temperature_2m_min[i])}°</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
