import { notFound } from 'next/navigation'
import { client } from '@/sanity/client'
import { whyAttendPageQuery } from '@/sanity/queries'
import { generatePageMetadata } from '@/lib/metadata'
import { urlFor } from '@/sanity/image'
import { WhyAttendContent, type WhyAttendData } from '@/components/why-attend/WhyAttendContent'
import type { PortableTextBlock } from '@portabletext/types'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await client.fetch(whyAttendPageQuery)
    return generatePageMetadata(page?.seo, 'why-attend')
  } catch {
    return {}
  }
}

type SanityBlock = {
  _type: string
  heading?: string
  subheading?: string
  body?: string
  backgroundImage?: { asset: { _ref: string } }
  backgroundColor?: string
  stats?: { value: number; suffix: string; label: string }[]
  cards?: { title: string; description: PortableTextBlock[]; accentColor: string }[]
  cta?: { label: string; href: string; isExternal?: boolean }
  secondaryCta?: { label: string; href: string; isExternal?: boolean }
  emailSubject?: string
  emailBody?: string
}

function mapSanityToProps(blocks: SanityBlock[]): WhyAttendData {
  const hero = blocks.find((b) => b._type === 'hero')
  const stats = blocks.find((b) => b._type === 'statsCounter')
  const cards = blocks.find((b) => b._type === 'cardGrid')
  const ctaBlocks = blocks.filter((b) => b._type === 'ctaSection')
  const managerCta = ctaBlocks.find((b) => b.backgroundColor === 'dark-blue')
  const finalCta = ctaBlocks.find((b) => b.backgroundColor === 'very-dark') || ctaBlocks[ctaBlocks.length - 1]

  let heroImageUrl: string | null = null
  if (hero?.backgroundImage?.asset) {
    heroImageUrl = urlFor(hero.backgroundImage).auto('format').quality(85).width(1920).url()
  }

  return {
    heroHeading: hero?.heading || 'Why Attend',
    heroSubheading: hero?.subheading || '',
    heroDateLocation: hero?.body || '',
    heroImageUrl,
    stats: stats?.stats?.map((s) => ({
      value: s.value,
      suffix: s.suffix || '',
      label: s.label,
    })) || [],
    reasonsHeading: cards?.heading || '',
    reasons: cards?.cards?.map((c) => ({
      title: c.title,
      description: Array.isArray(c.description) ? c.description : [],
      accentColor: c.accentColor || 'red',
    })) || [],
    managerLabel: managerCta?.subheading || '',
    managerHeading: managerCta?.heading || '',
    managerBody: managerCta?.body || '',
    managerCta: managerCta?.cta ? { label: managerCta.cta.label, href: managerCta.cta.href } : null,
    managerSecondaryCta: managerCta?.secondaryCta ? { label: managerCta.secondaryCta.label, href: managerCta.secondaryCta.href } : null,
    managerEmailSubject: managerCta?.emailSubject || '',
    managerEmailBody: managerCta?.emailBody || '',
    finalHeading: finalCta?.heading || '',
    finalBody: finalCta?.body || '',
    finalCta: finalCta?.cta ? { label: finalCta.cta.label, href: finalCta.cta.href } : null,
  }
}

export default async function WhyAttendPage() {
  let page: { blocks: SanityBlock[] } | null = null
  try {
    page = await client.fetch(whyAttendPageQuery)
  } catch { /* fall through */ }

  if (!page) notFound()

  const data = mapSanityToProps(page.blocks)
  return <WhyAttendContent data={data} />
}
