export const SITE_NAME = 'ODA Inspiration Day'
export const SITE_DESCRIPTION = 'Join 11,000+ members of the Nordic tech community for ODA Inspiration Day — the largest diversity in tech conference in the Nordics.'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://inspirationday.odanettverk.no'

export const BRAND_COLORS = {
  cream: '#F8F2EA',
  lavender: '#D9CEF5',
  darkBlue: '#333366',
  red: '#EF3255',
  veryDark: '#16122D',
  mint: '#DDFFD9',
} as const

export const NAV_ITEMS = [
  { label: 'Theme', href: '/theme' },
  { label: 'Why Attend', href: '/why-attend' },
  { label: 'Program', href: '/program' },
  { label: 'Speakers', href: '/speakers' },
  { label: 'Tickets', href: '/tickets' },
  { label: 'Venue', href: '/venue' },
  { label: 'ODA Awards', href: '/oda-awards' },
  { label: 'Team', href: '/team' },
] as const
