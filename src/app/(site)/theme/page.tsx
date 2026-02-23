import { notFound } from 'next/navigation'
import { client } from '@/sanity/client'
import { ThemePageContent, type ThemeData } from '@/components/theme/ThemePageContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Digital Paradox — ODA Inspiration Day 2026',
  description:
    'Technology promises to unite us — yet it can divide. At ODA Inspiration Day 2026, we confront the Digital Paradox: the tension between what technology promises and what it delivers.',
  openGraph: {
    title: 'Digital Paradox — ODA Inspiration Day 2026',
    description:
      'The tension between what technology promises and what it delivers when the people building it don\'t reflect the world using it.',
  },
}

type SanityBlock = {
  _type: string
  _key: string
  heading?: string
  subheading?: string
  body?: string
  backgroundColor?: string
  content?: { children?: { text?: string }[] }[]
  stats?: { value: number; suffix: string; label: string }[]
  cards?: { title: string; description: string; accentColor: string }[]
  cta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

const ROW_CONFIG = [
  { direction: 'left' as const, speed: 35, accent: 'text-red' },
  { direction: 'right' as const, speed: 28, accent: 'text-lavender' },
  { direction: 'left' as const, speed: 32, accent: 'text-mint' },
]

function extractText(content?: { children?: { text?: string }[] }[]): string[] {
  return (content || [])
    .map((block) => block.children?.map((c) => c.text || '').join('') || '')
    .filter(Boolean)
}

function mapSanityToThemeData(blocks: SanityBlock[]): ThemeData {
  const hero = blocks.find((b) => b._key === 'hero1')
  const marquee = blocks.find((b) => b._key === 'marquee')
  const manifesto = blocks.find((b) => b._key === 'manifesto')
  const stats = blocks.find((b) => b._type === 'statsCounter')
  const cards = blocks.find((b) => b._type === 'cardGrid')
  const cta = blocks.find((b) => b._type === 'ctaSection')

  // Split marquee phrases into groups of 3 for the 3 rows
  const allPhrases = extractText(marquee?.content)
  const marqueeRows = ROW_CONFIG.map((config, i) => ({
    ...config,
    phrases: allPhrases.slice(i * 3, i * 3 + 3),
  })).filter((row) => row.phrases.length > 0)

  return {
    heroTitle: hero?.heading || 'DIGITAL PARADOX',
    heroSubtitle: hero?.subheading || '',
    marqueeHeading: marquee?.heading || 'The paradoxes we live in',
    marqueeRows,
    manifestoParagraphs: extractText(manifesto?.content),
    stats: stats?.stats?.map((s) => ({ value: s.value, suffix: s.suffix || '', label: s.label })) || [],
    cardsHeading: cards?.heading || '',
    cards: cards?.cards?.map((c) => ({ title: c.title, description: c.description, accentColor: c.accentColor || 'red' })) || [],
    ctaHeading: cta?.heading || '',
    ctaBody: cta?.body || '',
    cta: cta?.cta ? { label: cta.cta.label, href: cta.cta.href } : null,
    secondaryCta: cta?.secondaryCta ? { label: cta.secondaryCta.label, href: cta.secondaryCta.href } : null,
  }
}

export default async function ThemePage() {
  let page: { blocks: SanityBlock[] } | null = null
  try {
    page = await client.fetch(
      `*[_type == "page" && slug.current == "theme"][0]{ blocks[] { ... } }`
    )
  } catch { /* fall through */ }

  if (!page) notFound()

  const data = mapSanityToThemeData(page.blocks)
  return <ThemePageContent data={data} />
}
