import type { Metadata } from 'next'
import { nunitoSans } from '@/lib/fonts'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://inspirationday.odanettverk.no'),
  robots: { index: true, follow: true },
  other: { 'theme-color': '#F8F2EA' },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F8F2EA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={nunitoSans.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
