import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get('city')
  if (!city) return NextResponse.json({ error: 'city param required' }, { status: 400 })

  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5&language=es&format=json`
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error('Geocoding API error')
    const data = await res.json()
    return NextResponse.json(data)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error al buscar la ciudad' }, { status: 500 })
  }
}
