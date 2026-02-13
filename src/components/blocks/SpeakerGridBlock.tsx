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
              <div className="group relative">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4">
                  {speaker.photo ? (
                    <SanityImage
                      image={speaker.photo}
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
            </AnimatedSection>
          ))}
        </div>

        {speakers.length === 0 && (
          <p className="text-center text-very-dark/50 text-lg py-12">
            Speakers will be announced soon. Stay tuned!
          </p>
        )}
      </Container>
    </SectionWrapper>
  )
}
