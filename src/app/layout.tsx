import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '🌤️ Clima App – El tiempo en tiempo real',
  description: 'Consulta el clima actual y la previsión de cualquier ciudad del mundo',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
