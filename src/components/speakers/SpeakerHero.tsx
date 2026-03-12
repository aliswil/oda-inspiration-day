import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import type { Speaker } from '@/sanity/types'

export function SpeakerHero({ speaker }: { speaker: Speaker }) {
  return (
    <section className="relative text-cream overflow-hidden pt-32 pb-32 md:pb-44 min-h-[70vh]">
      {/* B&W background image */}
      <Image
        src="/images/speaker-hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover grayscale brightness-[0.3]"
      />

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-very-dark/40" aria-hidden="true" />

      <Container className="relative z-10">
        <div className="max-w-xl">
          <Link
            href="/speakers"
            className="inline-flex items-center gap-1 text-sm text-cream/60 hover:text-cream transition-colors mb-6"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All Speakers
          </Link>
          <h1 className="text-4xl md:text-6xl font-black mb-4">{speaker.name}</h1>
          {speaker.role && (
            <p className="text-lg md:text-xl text-cream/70 mb-1">{speaker.role}</p>
          )}
          {speaker.company && (
            <p className="text-lg md:text-xl font-semibold text-red mb-6">{speaker.company}</p>
          )}
          {speaker.topic && (
            <p className="text-base md:text-lg text-lavender italic mb-6">
              &ldquo;{speaker.topic}&rdquo;
            </p>
          )}
          {speaker.linkedin && (
            <a
              href={speaker.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-cream/80 hover:text-cream transition-colors"
              aria-label={`${speaker.name} on LinkedIn`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          )}
        </div>
      </Container>
    </section>
  )
}
