import type { Metadata } from 'next'
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from './constants'

type SeoData = {
  title?: string
  description?: string
  ogImage?: string
}

export function generatePageMetadata(seo?: SeoData, slug?: string): Metadata {
  const title = seo?.title ? `${seo.title} | ${SITE_NAME}` : SITE_NAME
  const description = seo?.description || SITE_DESCRIPTION
  const url = slug ? `${SITE_URL}/${slug}` : SITE_URL

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: 'website',
      ...(seo?.ogImage && { images: [{ url: seo.ogImage }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
