import { Container } from '@/components/ui/Container'
import { SanityImage } from '@/components/ui/SanityImage'
import type { Speaker } from '@/sanity/types'

export function SpeakerBio({ speaker }: { speaker: Speaker }) {
  const hasContent = speaker.bio || speaker.presentationDescription || speaker.secondaryPhoto
  if (!hasContent) return null

  return (
    <section className="py-16 md:py-24 bg-cream">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {speaker.presentationDescription && (
            <div className="relative order-first md:order-last">
              {/* Portrait cutout — bottom hidden behind the box, top extends into hero */}
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
            </div>
          )}

          <div>
            {speaker.bio && (
              <>
                <h2 className="text-2xl md:text-3xl font-black text-dark-blue mb-6">About</h2>
                <p className="text-very-dark/80 leading-relaxed whitespace-pre-line">{speaker.bio}</p>
              </>
            )}

            {speaker.secondaryPhoto && (
              <div className="mt-10 -rotate-2 hover:rotate-0 transition-transform duration-500 overflow-hidden rounded-xl">
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
          </div>
        </div>
      </Container>
    </section>
  )
}
