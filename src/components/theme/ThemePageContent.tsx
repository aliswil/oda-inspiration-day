'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

/* ─── Glitch keyframes are defined in globals.css ─── */

function GlitchTitle() {
  return (
    <div className="relative inline-block">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glitch-text text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-black text-white leading-none tracking-tighter select-none"
        data-text="DIGITAL PARADOX"
      >
        DIGITAL
        <br />
        PARADOX
      </motion.h1>
    </div>
  )
}

const marqueeRows = [
  {
    phrases: [
      'It connects millions — yet amplifies the loneliest voices',
      'It promises equality — yet encodes who gets seen',
      'It builds bridges — yet deepens the divide',
    ],
    direction: 'left' as const,
    speed: 35,
    accent: 'text-red',
  },
  {
    phrases: [
      'It promises objectivity — yet automates our deepest biases',
      'It learns everything — yet understands nothing',
      'It predicts the future — yet repeats the past',
    ],
    direction: 'right' as const,
    speed: 28,
    accent: 'text-lavender',
  },
  {
    phrases: [
      'It democratises access — yet demands literacy only some have',
      'It moves us forward — yet leaves half the world behind',
      'It empowers everyone — yet serves the few',
    ],
    direction: 'left' as const,
    speed: 32,
    accent: 'text-mint',
  },
]

function MarqueeRow({ phrases, direction, speed, accent }: typeof marqueeRows[number]) {
  const items = [...phrases, ...phrases]
  const animClass = direction === 'left' ? 'marquee-left' : 'marquee-right'

  return (
    <div className="overflow-hidden py-4 md:py-6">
      <div
        className={`flex whitespace-nowrap gap-8 md:gap-16 ${animClass}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((phrase, i) => {
          const [before, after] = phrase.split(' — ')
          return (
            <span key={i} className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black uppercase tracking-tight shrink-0">
              <span className="text-white/30">{before}</span>
              <span className={`${accent} mx-3`}>&mdash;</span>
              <span className="text-white">{after}</span>
            </span>
          )
        })}
      </div>
    </div>
  )
}

function AnimatedCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
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
      <div className="text-5xl md:text-6xl lg:text-7xl font-black mb-2 tabular-nums text-white">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm md:text-base text-white/50 font-bold uppercase tracking-widest">
        {label}
      </div>
    </div>
  )
}

function ParadoxCard({
  title,
  description,
  accent,
  index,
}: {
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
      initial={{ opacity: 0, y: 60, rotateX: 10 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-very-dark/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10 hover:border-white/20 transition-colors duration-500 overflow-hidden"
    >
      <div className={`absolute top-0 left-0 w-full h-1 ${accent}`} />
      <div className={`absolute -bottom-20 -right-20 w-40 h-40 ${accent} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-700`} />
      <h3 className="text-2xl md:text-3xl font-black text-white mb-4">{title}</h3>
      <p className="text-white/60 leading-relaxed text-lg">{description}</p>
    </motion.div>
  )
}

export function ThemePageContent() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.4, 0.85])

  return (
    <article>
      {/* ─── HERO with parallax + glitch ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-16 md:-mt-20"
      >
        <motion.div
          className="absolute inset-0"
          style={{ scale: bgScale, y: bgY }}
        >
          <Image
            src="/images/theme-bg.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover theme-bg-animate"
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-very-dark"
          style={{ opacity: overlayOpacity }}
        />

        <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none noise-bg" aria-hidden="true" />

        <div className="relative z-10 text-center px-4">
          <GlitchTitle />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mt-8 font-light"
          >
            The same technology that promises to unite us — can divide us.
            <br className="hidden md:block" />
            This year, we confront the contradictions.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white/60 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* ─── PARADOX ROLLERCOASTER ─── */}
      <section className="bg-very-dark py-16 md:py-24">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-white/40 text-sm uppercase tracking-[0.3em] text-center mb-10 font-bold"
        >
          The paradoxes we live in
        </motion.h2>

        <div aria-hidden="true">
          {marqueeRows.map((row, i) => (
            <MarqueeRow key={i} {...row} />
          ))}
        </div>
      </section>

      {/* ─── MANIFESTO TEXT ─── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-very-dark via-dark-blue to-very-dark" />
        <div className="absolute inset-0 opacity-[0.03] noise-bg" aria-hidden="true" />

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed"
            >
              We live inside a paradox. The same algorithms that connect millions can{' '}
              <span className="text-red font-bold">reinforce the biases</span> of the few who build them.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed"
            >
              Artificial intelligence promises to remove human prejudice — yet it{' '}
              <span className="text-lavender font-bold">learns from data shaped by centuries of inequality</span>.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-white/60 leading-relaxed mt-12"
            >
              This is the Digital Paradox — the tension between what technology promises and what it
              delivers when the people building it don&apos;t reflect the world using it.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* ─── STATS ─── */}
      <section className="bg-very-dark py-20 md:py-28 border-t border-b border-white/5">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <AnimatedCounter value={28} suffix="%" label="of AI researchers are women" />
            <AnimatedCounter value={90} suffix="%" label="of data created in last 2 years" />
            <AnimatedCounter value={2700} suffix="M" label="people lack internet access" />
            <AnimatedCounter value={11000} suffix="+" label="ODA members driving change" />
          </div>
        </Container>
      </section>

      {/* ─── TOPIC CARDS ─── */}
      <section className="bg-very-dark py-24 md:py-32">
        <Container>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center mb-16"
          >
            Exploring the Paradox
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <ParadoxCard
              index={0}
              title="AI & Bias"
              description="When artificial intelligence learns from biased data, it doesn't eliminate prejudice — it automates it. How do we build AI that's fair by design?"
              accent="bg-red"
            />
            <ParadoxCard
              index={1}
              title="Access & Exclusion"
              description="Digital tools promise to democratise opportunity, but they require infrastructure, literacy, and trust. Who gets left behind in the digital leap?"
              accent="bg-lavender"
            />
            <ParadoxCard
              index={2}
              title="Connection & Isolation"
              description="We're more connected than ever, yet loneliness is rising. Social platforms connect billions but can fragment communities. How do we design for real belonging?"
              accent="bg-mint"
            />
          </div>
        </Container>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/theme-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-very-dark/80" />
        </div>

        <Container className="relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"
          >
            Be Part of the Conversation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10"
          >
            Join 11,000+ technologists, leaders, and changemakers at ODA Inspiration Day 2026 as
            we confront the Digital Paradox — together.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button href="/tickets" size="lg">
              Get Your Tickets
            </Button>
            <Button
              href="/program"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-dark-blue"
            >
              See the Program
            </Button>
          </motion.div>
        </Container>
      </section>
    </article>
  )
}
