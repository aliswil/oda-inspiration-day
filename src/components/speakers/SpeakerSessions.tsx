import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Chip } from '@/components/blocks/schedule/Chip'
import type { SpeakerSessionRef } from '@/sanity/types'

export function SpeakerSessions({ sessions }: { sessions: SpeakerSessionRef[] | undefined }) {
  if (!sessions || sessions.length === 0) return null

  return (
    <section aria-labelledby="speaking-at-heading" className="py-12 md:py-16 bg-cream">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h2 id="speaking-at-heading" className="text-2xl md:text-3xl font-black text-dark-blue mb-6">
            Speaking at Inspiration Day
          </h2>
          <ul className="space-y-3">
            {sessions.map((session) => (
              <li key={session._key}>
                <Link
                  href="/program"
                  className="group flex flex-wrap items-center gap-3 md:gap-4 p-4 bg-white rounded-xl border border-dark-blue/10 hover:border-dark-blue/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-blue transition-colors"
                >
                  {session.time && (
                    <time className="text-base font-bold text-red w-16 shrink-0">
                      {session.time}
                    </time>
                  )}
                  <span className="font-semibold text-dark-blue flex-1 min-w-0 group-hover:underline">
                    {session.title}
                  </span>
                  {session.format && (
                    <Chip
                      variant="format"
                      color={session.format.color}
                      label={session.format.title}
                      ariaLabel={`Format: ${session.format.title}`}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
