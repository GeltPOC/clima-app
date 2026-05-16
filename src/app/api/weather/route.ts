import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get('lat')
  const lon = req.nextUrl.searchParams.get('lon')
  if (!lat || !lon) return NextResponse.json({ error: 'lat and lon required' }, { status: 400 })

  try {
    const url = [
      `https://api.open-meteo.com/v1/forecast`,
      `?latitude=${lat}&longitude=${lon}`,
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m`,
      `&daily=temperature_2m_max,temperature_2m_min,weather_code`,
      `&timezone=auto&forecast_days=7`,
    ].join('')

    const res = await fetch(url, { next: { revalidate: 600 } })
    if (!res.ok) throw new Error('Weather API error')
    const data = await res.json()
    return NextResponse.json(data)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al obtener el clima' }, { status: 500 })
  }
}
