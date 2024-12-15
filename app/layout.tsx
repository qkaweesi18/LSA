import type { Metadata } from 'next'
import { Inconsolata } from 'next/font/google'
import './globals.css'

const inconsolata = Inconsolata({ 
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LSA',
  description: 'Local Services App'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inconsolata.className}>
      <body>{children}</body>
    </html>
  )
}
