export interface WeatherInfo {
  icon: string
  label: string
  category: 'clear' | 'cloudy' | 'foggy' | 'drizzle' | 'rain' | 'snow' | 'storm'
}

/**
 * Devuelve icono y metadatos para un código WMO.
 * @param code  Código WMO del clima
 * @param isDay true = día (default), false = noche
 */
export function getWeatherInfo(code: number, isDay = true): WeatherInfo {
  // WMO Weather interpretation codes
  if (code === 0) return isDay
    ? { icon: '☀️',  label: 'Cielo despejado',       category: 'clear' }
    : { icon: '🌙',  label: 'Cielo despejado',        category: 'clear' }
  if (code === 1) return isDay
    ? { icon: '🌤️', label: 'Mayormente despejado',   category: 'clear' }
    : { icon: '🌙',  label: 'Mayormente despejado',   category: 'clear' }
  if (code === 2) return isDay
    ? { icon: '⛅',  label: 'Parcialmente nublado',   category: 'cloudy' }
    : { icon: '☁️',  label: 'Parcialmente nublado',   category: 'cloudy' }
  if (code === 3) return { icon: '☁️', label: 'Nublado', category: 'cloudy' }
  if (code === 45) return { icon: '🌫️', label: 'Niebla', category: 'foggy' }
  if (code === 48) return { icon: '🌫️', label: 'Niebla helada', category: 'foggy' }
  if (code === 51) return { icon: '🌦️', label: 'Llovizna ligera', category: 'drizzle' }
  if (code === 53) return { icon: '🌦️', label: 'Llovizna moderada', category: 'drizzle' }
  if (code === 55) return { icon: '🌦️', label: 'Llovizna intensa', category: 'drizzle' }
  if (code === 56) return { icon: '🌧️', label: 'Llovizna helada ligera', category: 'drizzle' }
  if (code === 57) return { icon: '🌧️', label: 'Llovizna helada intensa', category: 'drizzle' }
  if (code === 61) return { icon: '🌧️', label: 'Lluvia ligera', category: 'rain' }
  if (code === 63) return { icon: '🌧️', label: 'Lluvia moderada', category: 'rain' }
  if (code === 65) return { icon: '🌧️', label: 'Lluvia intensa', category: 'rain' }
  if (code === 66) return { icon: '🌨️', label: 'Lluvia helada ligera', category: 'rain' }
  if (code === 67) return { icon: '🌨️', label: 'Lluvia helada intensa', category: 'rain' }
  if (code === 71) return { icon: '🌨️', label: 'Nieve ligera', category: 'snow' }
  if (code === 73) return { icon: '🌨️', label: 'Nieve moderada', category: 'snow' }
  if (code === 75) return { icon: '❄️', label: 'Nieve intensa', category: 'snow' }
  if (code === 77) return { icon: '🌨️', label: 'Granizo', category: 'snow' }
  if (code === 80) return { icon: '🌦️', label: 'Chubascos ligeros', category: 'rain' }
  if (code === 81) return { icon: '🌧️', label: 'Chubascos moderados', category: 'rain' }
  if (code === 82) return { icon: '⛈️', label: 'Chubascos intensos', category: 'storm' }
  if (code === 85) return { icon: '🌨️', label: 'Chubascos de nieve', category: 'snow' }
  if (code === 86) return { icon: '❄️', label: 'Chubascos de nieve intensos', category: 'snow' }
  if (code === 95) return { icon: '⛈️', label: 'Tormenta', category: 'storm' }
  if (code === 96) return { icon: '⛈️', label: 'Tormenta con granizo', category: 'storm' }
  if (code === 99) return { icon: '⛈️', label: 'Tormenta con granizo intenso', category: 'storm' }
  return { icon: '🌡️', label: 'Desconocido', category: 'cloudy' }
}

export function getWindDirection(degrees: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO']
  const index = Math.round(degrees / 45) % 8
  return dirs[index]
}
