'use client'
import { useState } from 'react'
import SearchBar from './SearchBar'
import WeatherCard from './WeatherCard'
import ForecastRow from './ForecastRow'
import DarkModeToggle from './DarkModeToggle'
import { GeoResult, WeatherData } from '../types/weather.types'

const BASE = '/clima-app'

export default function WeatherApp() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [location, setLocation] = useState<GeoResult | null>(null)

  async function handleSelect(geo: GeoResult) {
    setLoading(true)
    setError(null)
    setWeather(null)
    setLocation(geo)
    try {
      const res = await fetch(`${BASE}/api/weather?lat=${geo.latitude}&lon=${geo.longitude}`)
      if (!res.ok) throw new Error('No se pudo obtener el clima')
      const data: WeatherData = await res.json()
      setWeather(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const isDay = weather ? weather.current.is_day === 1 : true
  const bg = weather ? getGradient(weather.current.weather_code, isDay) : 'from-slate-800 via-slate-700 to-slate-600'
  // En dark mode forzamos overlay oscuro adicional via clase en main, gestionado por DarkModeToggle en html

  return (
    <main className={`relative min-h-screen bg-gradient-to-br ${bg} dark:brightness-75 transition-all duration-1000 flex flex-col items-center px-4 py-10`}>
      <DarkModeToggle />
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg tracking-wide">🌍 Clima App</h1>
          <p className="text-white/70 mt-1 text-sm">Busca cualquier ciudad del mundo</p>
        </header>

        <SearchBar onSelect={handleSelect} base={BASE} />

        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-400/50 rounded-2xl p-4 text-red-200 text-center">
            ⚠️ {error}
          </div>
        )}

        {weather && location && !loading && (
          <>
            <WeatherCard weather={weather} location={location} />
            <ForecastRow weather={weather} />
            <footer className="text-center text-white/40 text-xs pb-4">
              Datos: Open-Meteo API · Actualizado ahora
            </footer>
          </>
        )}

        {!weather && !loading && !error && (
          <div className="flex flex-col items-center gap-4 py-16 text-white/50">
            <span className="text-7xl">🔍</span>
            <p className="text-lg">Busca una ciudad para empezar</p>
          </div>
        )}
      </div>
    </main>
  )
}

function getGradient(code: number, isDay = true): string {
  // Noche: siempre fondo oscuro azul/índigo independientemente del clima
  if (!isDay) {
    if (code <= 2)  return 'from-indigo-950 via-blue-950 to-slate-900'
    if (code <= 3)  return 'from-slate-900 via-indigo-950 to-slate-900'
    if (code <= 49) return 'from-slate-900 via-slate-800 to-gray-900'
    if (code <= 67) return 'from-blue-950 via-slate-900 to-slate-950'
    if (code <= 77) return 'from-slate-800 via-blue-950 to-slate-900'
    if (code <= 82) return 'from-blue-950 via-slate-900 to-slate-950'
    if (code <= 99) return 'from-slate-900 via-gray-900 to-slate-950'
    return 'from-slate-900 via-slate-800 to-slate-900'
  }
  // Día
  if (code === 0) return 'from-sky-400 via-blue-500 to-indigo-600'
  if (code <= 2) return 'from-sky-500 via-slate-500 to-slate-600'
  if (code <= 3) return 'from-slate-500 via-slate-600 to-slate-700'
  if (code <= 49) return 'from-slate-600 via-slate-700 to-gray-700'
  if (code <= 67) return 'from-blue-700 via-slate-700 to-slate-800'
  if (code <= 77) return 'from-slate-300 via-blue-300 to-slate-500'
  if (code <= 82) return 'from-blue-600 via-blue-800 to-slate-800'
  if (code <= 99) return 'from-slate-700 via-gray-800 to-slate-900'
  return 'from-slate-800 via-slate-700 to-slate-600'
}
