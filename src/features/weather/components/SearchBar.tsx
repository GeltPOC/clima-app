'use client'
import { useState, useRef, useEffect } from 'react'
import { GeoResult } from '../types/weather.types'

interface Props {
  onSelect: (geo: GeoResult) => void
  base: string
}

export default function SearchBar({ onSelect, base }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<GeoResult[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  function handleChange(val: string) {
    setQuery(val)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (val.trim().length < 2) { setResults([]); setOpen(false); return }
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`${base}/api/geocode?city=${encodeURIComponent(val.trim())}`)
        const data = await res.json()
        const list: GeoResult[] = data.results ?? []
        setResults(list)
        setOpen(list.length > 0)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 400)
  }

  function select(geo: GeoResult) {
    setQuery(`${geo.name}, ${geo.country}`)
    setOpen(false)
    setResults([])
    onSelect(geo)
  }

  return (
    <div ref={wrapRef} className="relative w-full">
      <div className="flex items-center bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-white/10 rounded-2xl px-4 py-3 gap-3 shadow-lg focus-within:border-white/60 dark:focus-within:border-white/30 transition-all">
        {loading
          ? <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin flex-shrink-0" />
          : <span className="text-white/70 text-xl flex-shrink-0">🔍</span>
        }
        <input
          type="text"
          value={query}
          onChange={e => handleChange(e.target.value)}
          placeholder="Buscar ciudad... (ej: Madrid, Tokyo, Buenos Aires)"
          className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-base"
          onFocus={() => results.length > 0 && setOpen(true)}
        />
        {query && (
          <button onClick={() => { setQuery(''); setResults([]); setOpen(false) }} className="text-white/50 hover:text-white text-xl leading-none">
            ×
          </button>
        )}
      </div>

      {open && (
        <ul className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 dark:bg-slate-950/98 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50">
          {results.map((r, i) => (
            <li key={`${r.id ?? i}`}>
              <button
                onClick={() => select(r)}
                className="w-full text-left px-4 py-3 text-white hover:bg-white/10 transition-colors flex items-center gap-3 border-b border-white/5 last:border-0"
              >
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-medium">{r.name}</p>
                  <p className="text-white/50 text-sm">{[r.admin1, r.country].filter(Boolean).join(', ')}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
