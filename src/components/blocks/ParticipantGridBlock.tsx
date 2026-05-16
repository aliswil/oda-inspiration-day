import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SanityImage } from '@/components/ui/SanityImage'
import { cn } from '@/lib/utils'
import type { ParticipantGridBlock as ParticipantGridBlockType, Participant } from '@/sanity/types'

const archUp = '9999px 9999px 0 0'
const archDown = '0 0 9999px 9999px'

export function ParticipantGridBlock({ block }: { block: ParticipantGridBlockType }) {
  const onDarkBg = block.backgroundColor === 'dark-blue'
  const headingColor = onDarkBg ? 'text-white' : 'text-dark-blue'
  const subheadingColor = onDarkBg ? 'text-white/80' : 'text-very-dark/70'
  const participants = block.participants ?? []
  const showPlaceholders = !!block.showPlaceholders && participants.length === 0
  const placeholderCount = 6

  return (
    <SectionWrapper backgroundColor={block.backgroundColor || 'cream'}>
      <Container>
        <AnimatedSection>
          {block.heading && (
            <h2 className={cn('text-3xl md:text-5xl font-black mb-4 text-center', headingColor)}>
              {block.heading}
            </h2>
          )}
          {block.subheading && (
            <p className={cn('text-lg text-center max-w-2xl mx-auto mb-12', subheadingColor)}>
              {block.subheading}
            </p>
          )}
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {participants.map((p, i) => (
            <AnimatedSection key={p._key} delay={i * 0.08} animation="fadeUp">
              <ParticipantCard participant={p} flipped={i % 2 === 1} onDarkBg={onDarkBg} />
            </AnimatedSection>
          ))}
          {showPlaceholders &&
            Array.from({ length: placeholderCount }).map((_, i) => (
              <AnimatedSection key={`placeholder-${i}`} delay={i * 0.08} animation="fadeUp">
                <PlaceholderCard flipped={i % 2 === 1} onDarkBg={onDarkBg} />
              </AnimatedSection>
            ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}

function ParticipantCard({ participant, flipped, onDarkBg }: { participant: Participant; flipped: boolean; onDarkBg: boolean }) {
  const radius = flipped ? archDown : archUp
  const nameColor = onDarkBg ? 'text-white' : 'text-dark-blue'
  const roleColor = onDarkBg ? 'text-white/70' : 'text-very-dark/70'
  const companyColor = onDarkBg ? 'text-mint' : 'text-red'
  const fallbackBg = onDarkBg ? 'bg-dark-blue/40' : 'bg-lavender'
  const fallbackText = onDarkBg ? 'text-white/30' : 'text-dark-blue/30'

  return (
    <div className="relative">
      <div className="relative aspect-[3/4] overflow-hidden mb-4" style={{ borderRadius: radius }}>
        {participant.image?.asset ? (
          <SanityImage
            image={participant.image}
            alt={participant.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className={cn('w-full h-full flex items-center justify-center', fallbackBg)}>
            <span className={cn('text-4xl font-bold', fallbackText)}>
              {participant.name?.charAt(0) || '?'}
            </span>
          </div>
        )}
      </div>
      <h3 className={cn('font-bold text-xl md:text-2xl', nameColor)}>{participant.name}</h3>
      {participant.role && <p className={cn('text-base', roleColor)}>{participant.role}</p>}
      {participant.company && <p className={cn('text-base font-medium', companyColor)}>{participant.company}</p>}
    </div>
  )
}

function PlaceholderCard({ flipped, onDarkBg }: { flipped: boolean; onDarkBg: boolean }) {
  const radius = flipped ? archDown : archUp
  const border = onDarkBg ? 'border-white/20 text-white/40' : 'border-dark-blue/20 text-dark-blue/40'
  return (
    <div className="relative">
      <div
        className={cn('relative aspect-[3/4] border-2 border-dashed flex items-center justify-center mb-4', border)}
        style={{ borderRadius: radius }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <circle cx="12" cy="9" r="3.5" />
          <path d="M5.5 19c1.2-3 3.7-4.5 6.5-4.5s5.3 1.5 6.5 4.5" />
        </svg>
      </div>
      <p className={cn('font-bold text-lg', onDarkBg ? 'text-white/60' : 'text-dark-blue/50')}>Participant</p>
      <p className={cn('text-sm', onDarkBg ? 'text-white/40' : 'text-very-dark/40')}>To be announced</p>
    </div>
  )
}
