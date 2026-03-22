import { notFound } from 'next/navigation'
import { client } from '@/sanity/client'
import { pageBySlugQuery, allPageSlugsQuery } from '@/sanity/queries'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { PageTransition } from '@/components/layout/PageTransition'
import { generatePageMetadata } from '@/lib/metadata'
import { Container } from '@/components/ui/Container'
import type { Page } from '@/sanity/types'
import type { Metadata } from 'next'

const TBA_SLUGS = ['bergen', 'trondheim']

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params
    const page = await client.fetch<Page>(pageBySlugQuery, { slug })
    if (!page) {
      if (TBA_SLUGS.includes(slug)) {
        return generatePageMetadata({ title: 'Coming Soon' }, slug)
      }
      return {}
    }
    return generatePageMetadata(page.seo, slug)
  } catch {
    return {}
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(allPageSlugsQuery)
    const allSlugs = [...slugs.filter((s) => s !== 'home'), ...TBA_SLUGS]
    return allSlugs.map((slug) => ({ slug }))
  } catch {
    return TBA_SLUGS.map((slug) => ({ slug }))
  }
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params
  let page: Page | null = null
  try {
    page = await client.fetch<Page>(pageBySlugQuery, { slug })
  } catch {
    if (!TBA_SLUGS.includes(slug)) notFound()
  }

  if (!page) {
    if (TBA_SLUGS.includes(slug)) {
      const title = slug.charAt(0).toUpperCase() + slug.slice(1)
      return (
        <PageTransition>
          <section className="min-h-[60vh] flex items-center justify-center bg-cream -mt-16 md:-mt-20 pt-16 md:pt-20">
            <Container>
              <div className="text-center py-24">
                <h1 className="text-4xl md:text-6xl font-black text-dark-blue mb-6">{title}</h1>
                <p className="text-xl text-very-dark/60 max-w-md mx-auto">
                  To be announced. Stay tuned for updates!
                </p>
              </div>
            </Container>
          </section>
        </PageTransition>
      )
    }
    notFound()
  }

  return (
    <PageTransition>
      <BlockRenderer blocks={page.blocks} />
    </PageTransition>
  )
}
