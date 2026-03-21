'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { AnimatedCounter, ReasonCard, ManagerBox, accentMap } from './WhyAttendSubcomponents'
import { WhyAttendHero } from './WhyAttendHero'

export type WhyAttendData = {
  heroHeading: string
  heroSubheading: string
  heroDateLocation: string
  heroImageUrl: string | null
  stats: { value: number; suffix: string; label: string }[]
  reasonsHeading: string
  reasons: { title: string; description: unknown[]; accentColor: string }[]
  managerLabel: string
  managerHeading: string
  managerBody: string
  managerCta: { label: string; href: string } | null
  managerSecondaryCta: { label: string; href: string } | null
  managerEmailSubject: string
  managerEmailBody: string
  finalHeading: string
  finalBody: string
  finalCta: { label: string; href: string } | null
}

export function WhyAttendContent({ data }: { data: WhyAttendData }) {
  return (
    <article>
      <WhyAttendHero
        dateLocation={data.heroDateLocation}
        heading={data.heroHeading}
        subheading={data.heroSubheading}
        imageUrl={data.heroImageUrl}
      />

      {/* ─── STATS ─── */}
      <section className="bg-very-dark text-white py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {data.stats.map((stat, i) => (
              <AnimatedCounter key={i} value={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </Container>
      </section>

      {/* ─── REASONS ─── */}
      <section className="bg-cream py-24 md:py-32">
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-very-dark mb-20 max-w-4xl"
          >
            {data.reasonsHeading}
          </motion.h2>

          <div className="space-y-16">
            {data.reasons.map((reason, i) => (
              <ReasonCard
                key={i}
                index={i}
                number={String(i + 1).padStart(2, '0')}
                title={reason.title}
                description={reason.description}
                accent={accentMap[reason.accentColor] || 'bg-red'}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ─── CONVINCE YOUR MANAGER ─── */}
      <section className="bg-cream pt-8 md:pt-12 pb-24 md:pb-32">
        <Container>
          <ManagerBox
            label={data.managerLabel}
            heading={data.managerHeading}
            body={data.managerBody}
            cta={data.managerCta}
            secondaryCta={data.managerSecondaryCta}
            emailSubject={data.managerEmailSubject}
            emailBody={data.managerEmailBody}
          />
        </Container>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="bg-very-dark py-24 md:py-32">
        <Container className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"
          >
            {data.finalHeading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10"
          >
            {data.finalBody}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            {data.finalCta && (
              <Button href={data.finalCta.href} size="lg">
                {data.finalCta.label}
              </Button>
            )}
          </motion.div>
        </Container>
      </section>
    </article>
  )
}
