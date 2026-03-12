import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SanityImage } from '@/components/ui/SanityImage'
import { client } from '@/sanity/client'
import { allSpeakersQuery, keynoteSpeakersQuery, lightningSpeakersQuery } from '@/sanity/queries'
import type { SpeakerGridBlock as SpeakerGridBlockType, Speaker } from '@/sanity/types'

const queryMap = {
  all: allSpeakersQuery,
  keynote: keynoteSpeakersQuery,
  lightning: lightningSpeakersQuery,
}

export async function SpeakerGridBlock({ block }: { block: SpeakerGridBlockType }) {
  const query = queryMap[block.filter || 'all']
  let speakers: Speaker[] = []
  try {
    speakers = await client.fetch<Speaker[]>(query)
  } catch {
    // Sanity not configured
  }

  return (
    <SectionWrapper backgroundColor={block.backgroundColor}>
      <Container>
        <AnimatedSection>
          {block.heading && (
            <h2 className="text-3xl md:text-5xl font-black text-dark-blue mb-4 text-center">
              {block.heading}
            </h2>
          )}
          {block.subheading && (
            <p className="text-lg text-very-dark/70 text-center max-w-2xl mx-auto mb-12">
              {block.subheading}
            </p>
          )}
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {speakers.map((speaker, i) => (
            <AnimatedSection key={speaker._id} delay={i * 0.1} animation="fadeUp">
              <SpeakerCard speaker={speaker} flipped={i % 2 === 1} />
            </AnimatedSection>
          ))}
          {block.showComingSoon !== false && (
            <AnimatedSection delay={speakers.length * 0.1} animation="fadeUp">
              <ComingSoonCard flipped={speakers.length % 2 === 1} />
            </AnimatedSection>
          )}
        </div>

        {speakers.length === 0 && block.showComingSoon === false && (
          <p className="text-center text-very-dark/50 text-lg py-12">
            Speakers will be announced soon. Stay tuned!
          </p>
        )}
      </Container>
    </SectionWrapper>
  )
}

const archUp = '9999px 9999px 0 0'
const archDown = '0 0 9999px 9999px'

function SpeakerCard({ speaker, flipped }: { speaker: Speaker; flipped: boolean }) {
  const radius = flipped ? archDown : archUp

  const content = (
    <div className="group relative">
      <div
        className="relative aspect-[3/4] overflow-hidden mb-4"
        style={{ borderRadius: radius }}
      >
        {speaker.photo ? (
          <SanityImage
            image={speaker.photo}
            alt={speaker.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-lavender flex items-center justify-center">
            <span className="text-4xl font-bold text-dark-blue/30">
              {speaker.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-very-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <h3 className="font-bold text-lg text-dark-blue">{speaker.name}</h3>
      {speaker.role && <p className="text-sm text-very-dark/60">{speaker.role}</p>}
      {speaker.company && <p className="text-sm font-medium text-red">{speaker.company}</p>}
      {speaker.topic && <p className="text-sm text-very-dark/50 mt-1 italic">{speaker.topic}</p>}
    </div>
  )

  if (speaker.slug) {
    return (
      <Link href={`/speakers/${speaker.slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-dark-blue" style={{ borderRadius: radius }}>
        {content}
      </Link>
    )
  }

  return content
}

function ComingSoonCard({ flipped }: { flipped: boolean }) {
  return (
    <div
      className="relative aspect-[3/4] border-2 border-dashed border-dark-blue/20 flex flex-col items-center justify-center gap-3 text-dark-blue/40"
      style={{ borderRadius: flipped ? archDown : archUp }}
    >
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
      <p className="font-bold text-lg">More to come</p>
      <p className="text-sm">Stay tuned for announcements</p>
    </div>
  )
}
