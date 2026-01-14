import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Marketing Ads Creative Agent',
  description: 'AI-powered marketing ads creative generation platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
