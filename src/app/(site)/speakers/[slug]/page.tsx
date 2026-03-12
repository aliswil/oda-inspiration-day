import { notFound } from 'next/navigation'
import { client } from '@/sanity/client'
import { speakerBySlugQuery, allSpeakerSlugsQuery } from '@/sanity/queries'
import { PageTransition } from '@/components/layout/PageTransition'
import { SpeakerDetail } from '@/components/speakers/SpeakerDetail'
import { SITE_NAME, SITE_URL } from '@/lib/constants'
import type { Speaker } from '@/sanity/types'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const speaker = await client.fetch<Speaker | null>(speakerBySlugQuery, { slug })
  if (!speaker) return {}
  const title = `${speaker.name} | ${SITE_NAME}`
  const description = speaker.topic
    ? `${speaker.name} on "${speaker.topic}" at ${SITE_NAME}`
    : `${speaker.name} at ${SITE_NAME}`
  return {
    title,
    description,
    openGraph: { title, description, url: `${SITE_URL}/speakers/${slug}`, siteName: SITE_NAME, type: 'profile' },
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<string[]>(allSpeakerSlugsQuery)
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export default async function SpeakerPage({ params }: Props) {
  const { slug } = await params
  let speaker: Speaker | null = null
  try {
    speaker = await client.fetch<Speaker | null>(speakerBySlugQuery, { slug })
  } catch {
    notFound()
  }
  if (!speaker) notFound()

  return (
    <PageTransition>
      <SpeakerDetail speaker={speaker} />
    </PageTransition>
  )
}
