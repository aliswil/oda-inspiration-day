import { notFound } from 'next/navigation'
import { client } from '@/sanity/client'
import { themePageQuery } from '@/sanity/queries'
import { generatePageMetadata } from '@/lib/metadata'
import { ThemePageContent, type ThemeData } from '@/components/theme/ThemePageContent'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await client.fetch(themePageQuery)
    return generatePageMetadata(page?.seo, 'theme')
  } catch {
    return {}
  }
}

type SanityBlock = {
  _type: string
  _key: string
  enabled?: boolean
  heading?: string
  subheading?: string
  body?: string
  backgroundColor?: string
  content?: { _type?: string; style?: string; listItem?: string; children?: { _type?: string; text?: string; marks?: string[] }[] }[]
  stats?: { value: number; suffix: string; label: string }[]
  cards?: { title: string; description: string; accentColor: string }[]
  cta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

function extractPlainText(content?: SanityBlock['content']): string[] {
  return (content || [])
    .filter((block) => !block.listItem)
    .map((block) => block.children?.map((c) => c.text || '').join('') || '')
    .filter(Boolean)
}

type ManifestoBlock = {
  type: 'paragraph' | 'bullet' | 'number'
  style?: string
  text: string
}

function extractManifestoBlocks(content?: SanityBlock['content']): ManifestoBlock[] {
  return (content || [])
    .map((block) => {
      const text = block.children?.map((c) => c.text || '').join('') || ''
      if (!text) return null
      if (block.listItem) {
        return { type: block.listItem as 'bullet' | 'number', style: block.style, text }
      }
      return { type: 'paragraph' as const, style: block.style, text }
    })
    .filter(Boolean) as ManifestoBlock[]
}

function mapSanityToThemeData(blocks: SanityBlock[]): ThemeData {
  const enabled = blocks.filter((b) => b.enabled !== false)

  const hero = enabled.find((b) => b._key === 'hero1')
  const marquee = enabled.find((b) => b._key === 'marquee')
  const manifesto = enabled.find((b) => b._key === 'manifesto')
  const stats = enabled.find((b) => b._type === 'statsCounter')
  const cards = enabled.find((b) => b._type === 'cardGrid')
  const cta = enabled.find((b) => b._type === 'ctaSection')

  const marqueeSentences = extractPlainText(marquee?.content)

  return {
    heroTitle: hero?.heading || 'DIGITAL PARADOX',
    heroSubtitle: hero?.subheading || '',
    showHero: !!hero,
    marqueeHeading: marquee?.heading || 'The paradoxes we live in',
    marqueeSentences,
    showMarquee: !!marquee,
    manifestoBlocks: extractManifestoBlocks(manifesto?.content),
    showManifesto: !!manifesto,
    stats: stats?.stats?.map((s) => ({ value: s.value, suffix: s.suffix || '', label: s.label })) || [],
    showStats: !!stats,
    cardsHeading: cards?.heading || '',
    cards: cards?.cards?.map((c) => ({ title: c.title, description: c.description, accentColor: c.accentColor || 'red' })) || [],
    showCards: !!cards,
    ctaHeading: cta?.heading || '',
    ctaBody: cta?.body || '',
    cta: cta?.cta ? { label: cta.cta.label, href: cta.cta.href } : null,
    secondaryCta: cta?.secondaryCta ? { label: cta.secondaryCta.label, href: cta.secondaryCta.href } : null,
    showCta: !!cta,
  }
}

export default async function ThemePage() {
  let page: { blocks: SanityBlock[] } | null = null
  try {
    page = await client.fetch(themePageQuery)
  } catch { /* fall through */ }

  if (!page) notFound()

  const data = mapSanityToThemeData(page.blocks)
  return <ThemePageContent data={data} />
}
