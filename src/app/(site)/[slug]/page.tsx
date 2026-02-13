import { notFound } from 'next/navigation'
import { client } from '@/sanity/client'
import { pageBySlugQuery, allPageSlugsQuery } from '@/sanity/queries'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { PageTransition } from '@/components/layout/PageTransition'
import { generatePageMetadata } from '@/lib/metadata'
import type { Page } from '@/sanity/types'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params
    const page = await client.fetch<Page>(pageBySlugQuery, { slug })
    if (!page) return {}
    return generatePageMetadata(page.seo, slug)
  } catch {
    return {}
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(allPageSlugsQuery)
    return slugs
      .filter((slug) => slug !== 'home')
      .map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params
  let page: Page | null = null
  try {
    page = await client.fetch<Page>(pageBySlugQuery, { slug })
  } catch {
    notFound()
  }

  if (!page) notFound()

  return (
    <PageTransition>
      <BlockRenderer blocks={page.blocks} />
    </PageTransition>
  )
}
