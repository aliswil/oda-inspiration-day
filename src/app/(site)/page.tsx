import { client } from '@/sanity/client'
import { homePageQuery } from '@/sanity/queries'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import { PageTransition } from '@/components/layout/PageTransition'
import { generatePageMetadata } from '@/lib/metadata'
import type { Page } from '@/sanity/types'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = await client.fetch<Page>(homePageQuery)
    return generatePageMetadata(page?.seo)
  } catch {
    return generatePageMetadata()
  }
}

export default async function HomePage() {
  let page: Page | null = null
  try {
    page = await client.fetch<Page>(homePageQuery)
  } catch {
    // Sanity not configured yet
  }

  if (!page) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-black text-dark-blue mb-4">ODA Inspiration Day</h1>
            <p className="text-lg text-very-dark/60 mb-8">Content is being set up. Visit /studio to add pages.</p>
            <a href="/studio" className="inline-flex items-center px-6 py-3 bg-red text-white rounded-full font-semibold hover:bg-red/90 transition-colors">
              Open Studio
            </a>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <BlockRenderer blocks={page.blocks} />
    </PageTransition>
  )
}
