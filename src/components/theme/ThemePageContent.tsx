'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import {
  MarqueeRow, AnimatedCounter,
  ParadoxCard, accentBgMap,
} from './ThemeSubcomponents'
import { ManifestoContent } from './ManifestoContent'
import { ThemeHero } from './ThemeHero'
import { ThemeCta } from './ThemeCta'

/* ─── Data types (populated from Sanity) ─── */

export type ManifestoBlock = {
  type: 'paragraph' | 'bullet' | 'number'
  style?: string
  text: string
}

export type ThemeData = {
  heroTitle: string
  heroSubtitle: string
  showHero: boolean
  marqueeHeading: string
  marqueeRows: { phrases: string[]; direction: 'left' | 'right'; speed: number; accent: string }[]
  showMarquee: boolean
  manifestoBlocks: ManifestoBlock[]
  showManifesto: boolean
  stats: { value: number; suffix: string; label: string }[]
  showStats: boolean
  cardsHeading: string
  cards: { title: string; description: string; accentColor: string }[]
  showCards: boolean
  ctaHeading: string
  ctaBody: string
  cta: { label: string; href: string } | null
  secondaryCta: { label: string; href: string } | null
  showCta: boolean
}

export function ThemePageContent({ data }: { data: ThemeData }) {
  return (
    <article>
      {data.showHero && <ThemeHero title={data.heroTitle} subtitle={data.heroSubtitle} />}

      {data.showMarquee && (
        <section className="bg-very-dark py-16 md:py-24">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-white/40 text-sm uppercase tracking-[0.3em] text-center mb-10 font-bold"
          >
            {data.marqueeHeading}
          </motion.h2>
          <div aria-hidden="true">
            {data.marqueeRows.map((row, i) => (
              <MarqueeRow key={i} {...row} />
            ))}
          </div>
        </section>
      )}

      {data.showManifesto && (
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-very-dark via-dark-blue to-very-dark" />
          <div className="absolute inset-0 opacity-[0.03] noise-bg" aria-hidden="true" />
          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto space-y-8">
              <ManifestoContent blocks={data.manifestoBlocks} />
            </div>
          </Container>
        </section>
      )}

      {data.showStats && (
        <section className="bg-very-dark py-20 md:py-28 border-t border-b border-white/5">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {data.stats.map((stat, i) => (
                <AnimatedCounter key={i} value={stat.value} suffix={stat.suffix} label={stat.label} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {data.showCards && (
        <section className="bg-very-dark py-24 md:py-32">
          <Container>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center mb-16"
            >
              {data.cardsHeading}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {data.cards.map((card, i) => (
                <ParadoxCard
                  key={i}
                  index={i}
                  title={card.title}
                  description={card.description}
                  accent={accentBgMap[card.accentColor] || 'bg-red'}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {data.showCta && (
        <ThemeCta
          heading={data.ctaHeading}
          body={data.ctaBody}
          cta={data.cta}
          secondaryCta={data.secondaryCta}
        />
      )}
    </article>
  )
}
