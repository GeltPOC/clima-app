'use client'
import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false)

  // Inicializa según preferencia guardada o del sistema
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = saved ? saved === 'dark' : prefersDark
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggle}
      title={dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="
        absolute top-4 right-4
        flex items-center gap-2
        bg-white/20 hover:bg-white/30
        dark:bg-white/10 dark:hover:bg-white/20
        backdrop-blur-md border border-white/30
        text-white rounded-full px-4 py-2 text-sm font-medium
        shadow-lg transition-all duration-300
        select-none cursor-pointer
      "
    >
      <span className="text-lg transition-transform duration-500" style={{ transform: dark ? 'rotate(180deg)' : 'rotate(0deg)' }}>
        {dark ? '🌙' : '☀️'}
      </span>
      <span className="hidden sm:inline">{dark ? 'Oscuro' : 'Claro'}</span>
    </button>
  )
}
