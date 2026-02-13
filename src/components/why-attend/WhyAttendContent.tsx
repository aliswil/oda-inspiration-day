'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export type WhyAttendData = {
  heroHeading: string
  heroSubheading: string
  heroImageUrl: string | null
  stats: { value: number; suffix: string; label: string }[]
  reasonsHeading: string
  reasons: { title: string; description: string; accentColor: string }[]
  managerHeading: string
  managerBody: string
  managerCta: { label: string; href: string } | null
  managerSecondaryCta: { label: string; href: string } | null
  finalHeading: string
  finalBody: string
  finalCta: { label: string; href: string } | null
}

const accentMap: Record<string, string> = {
  red: 'bg-red',
  lavender: 'bg-lavender',
  mint: 'bg-mint',
  'dark-blue': 'bg-dark-blue',
  cream: 'bg-cream',
}

function AnimatedCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl lg:text-7xl font-black mb-3 tabular-nums">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm md:text-base opacity-60 font-bold uppercase tracking-widest">
        {label}
      </div>
    </div>
  )
}

function ReasonCard({
  number,
  title,
  description,
  accent,
  index,
}: {
  number: string
  title: string
  description: string
  accent: string
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className={`absolute -left-4 top-0 w-1 h-full ${accent} rounded-full`} />
      <div className="pl-8">
        <span className={`text-sm font-black uppercase tracking-widest ${accent.replace('bg-', 'text-')} mb-2 block`}>
          {number}
        </span>
        <h3 className="text-2xl md:text-3xl font-black text-very-dark mb-3">{title}</h3>
        <p className="text-very-dark/60 text-lg leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

function ManagerBox({ heading, body, cta, secondaryCta }: {
  heading: string
  body: string
  cta: { label: string; href: string } | null
  secondaryCta: { label: string; href: string } | null
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-dark-blue text-white rounded-3xl p-10 md:p-14 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-lavender/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
      <div className="relative z-10 max-w-3xl">
        <p className="text-lavender text-sm font-bold uppercase tracking-widest mb-4">
          Share with your manager
        </p>
        <h3 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
          {heading}
        </h3>
        <p className="text-white/70 text-lg leading-relaxed mb-8">
          {body}
        </p>
        <div className="flex flex-wrap gap-4">
          {cta && (
            <Button href={cta.href} size="lg">
              {cta.label}
            </Button>
          )}
          {secondaryCta && (
            <Button
              href={secondaryCta.href}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-dark-blue"
            >
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function WhyAttendContent({ data }: { data: WhyAttendData }) {
  return (
    <article>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden -mt-16 md:-mt-20">
        <div className="absolute inset-0">
          {data.heroImageUrl ? (
            <Image
              src={data.heroImageUrl}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-dark-blue via-very-dark to-dark-blue" />
          )}
          <div className="absolute inset-0 bg-very-dark/70" />
        </div>

        <Container className="relative z-10 py-32 md:py-40">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-sm font-bold uppercase tracking-widest mb-6"
          >
            Oslo Concert Hall &middot; 29 May 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight mb-8"
          >
            {data.heroHeading}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed"
          >
            {data.heroSubheading}
          </motion.p>
        </Container>
      </section>

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
      <section className="bg-cream py-24 md:py-32">
        <Container>
          <ManagerBox
            heading={data.managerHeading}
            body={data.managerBody}
            cta={data.managerCta}
            secondaryCta={data.managerSecondaryCta}
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
