import { Container } from '@/components/ui/Container'
import { SanityImage } from '@/components/ui/SanityImage'
import { SpeakerVideo } from './SpeakerVideo'
import type { Speaker } from '@/sanity/types'

function MediaBlock({ speaker }: { speaker: Speaker }) {
  const hasMedia = speaker.secondaryPhoto || speaker.videoUrl
  if (!hasMedia) return null

  return (
    <div className="space-y-6">
      {speaker.secondaryPhoto && (
        <div className="overflow-hidden rounded-2xl">
          <SanityImage
            image={speaker.secondaryPhoto}
            alt={`${speaker.name} candid`}
            width={600}
            height={400}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full"
          />
        </div>
      )}
      {speaker.videoUrl && (
        <SpeakerVideo url={speaker.videoUrl} name={speaker.name} />
      )}
    </div>
  )
}

export function SpeakerBio({ speaker }: { speaker: Speaker }) {
  const hasContent = speaker.bio || speaker.presentationDescription || speaker.secondaryPhoto || speaker.videoUrl
  if (!hasContent) return null

  const bioLength = speaker.bio?.length || 0
  const presentationLength = speaker.presentationDescription?.length || 0
  const mediaInAbout = bioLength <= presentationLength

  return (
    <section className="py-16 md:py-24 bg-cream">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {speaker.presentationDescription && (
            <div className="relative order-first md:order-last space-y-8">
              {speaker.portraitCutout && (
                <div className="absolute bottom-full left-0 right-0 mb-[-4rem] pointer-events-none">
                  <SanityImage
                    image={speaker.portraitCutout}
                    alt={speaker.name}
                    width={800}
                    height={1000}
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-auto"
                  />
                </div>
              )}

              <div className="relative z-10 bg-lavender rounded-2xl p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-black text-dark-blue mb-4">
                  What to Expect on Stage
                </h2>
                <p className="text-very-dark/80 leading-relaxed whitespace-pre-line">
                  {speaker.presentationDescription}
                </p>
              </div>

              {!mediaInAbout && <MediaBlock speaker={speaker} />}
            </div>
          )}

          <div className="space-y-8">
            {speaker.bio && (
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-dark-blue mb-6">About</h2>
                <p className="text-very-dark/80 leading-relaxed whitespace-pre-line">{speaker.bio}</p>
              </div>
            )}

            {mediaInAbout && <MediaBlock speaker={speaker} />}
          </div>
        </div>
      </Container>
    </section>
  )
}
