'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

/* ─── Data types (populated from Sanity) ─── */

type ManifestoBlock = {
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

/* ─── Accent mapping ─── */

const accentBgMap: Record<string, string> = {
  red: 'bg-red', lavender: 'bg-lavender', mint: 'bg-mint', 'dark-blue': 'bg-dark-blue',
}

/* ─── Glitch keyframes are defined in globals.css ─── */

function GlitchTitle({ title }: { title: string }) {
  const lines = title.split(' ')
  const mid = Math.ceil(lines.length / 2)

  return (
    <div className="relative inline-block">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="glitch-text text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-black text-white leading-none tracking-tighter select-none"
        data-text={title}
      >
        {lines.slice(0, mid).join(' ')}
        <br />
        {lines.slice(mid).join(' ')}
      </motion.h1>
    </div>
  )
}

function MarqueeRow({ phrases, direction, speed, accent }: ThemeData['marqueeRows'][number]) {
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

const styleClassMap: Record<string, string> = {
  normal: 'text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed',
  h2: 'text-3xl md:text-4xl lg:text-5xl text-white font-black leading-tight',
  h3: 'text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-tight',
  h4: 'text-xl md:text-2xl lg:text-3xl text-white font-bold leading-snug',
  blockquote: 'text-xl md:text-2xl text-white/60 leading-relaxed italic border-l-4 border-lavender pl-6',
}

function ManifestoContent({ blocks }: { blocks: ManifestoBlock[] }) {
  const elements: React.ReactNode[] = []
  let listBuffer: ManifestoBlock[] = []
  let animIndex = 0

  function flushList() {
    if (listBuffer.length === 0) return
    const isNumbered = listBuffer[0].type === 'number'
    const Tag = isNumbered ? 'ol' : 'ul'
    const idx = animIndex++
    elements.push(
      <motion.div
        key={`list-${idx}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: idx * 0.1 }}
      >
        <Tag className={`space-y-3 text-xl md:text-2xl text-white/80 leading-relaxed ${isNumbered ? 'list-decimal' : 'list-disc'} list-outside ml-6`}>
          {listBuffer.map((item, i) => (
            <li key={i}>{item.text}</li>
          ))}
        </Tag>
      </motion.div>
    )
    listBuffer = []
  }

  for (const block of blocks) {
    if (block.type === 'bullet' || block.type === 'number') {
      if (listBuffer.length > 0 && listBuffer[0].type !== block.type) {
        flushList()
      }
      listBuffer.push(block)
    } else {
      flushList()
      const idx = animIndex++
      const style = block.style || 'normal'
      const className = styleClassMap[style] || styleClassMap.normal
      const Tag = style === 'h2' ? 'h2' : style === 'h3' ? 'h3' : style === 'h4' ? 'h4' : 'p'
      elements.push(
        <motion.div
          key={`p-${idx}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: idx * 0.1 }}
        >
          <Tag className={className}>{block.text}</Tag>
        </motion.div>
      )
    }
  }
  flushList()

  return <>{elements}</>
}

export function ThemePageContent({ data }: { data: ThemeData }) {
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
      {data.showHero && (
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
            <GlitchTitle title={data.heroTitle} />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mt-8 font-light"
            >
              {data.heroSubtitle}
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
      )}

      {/* ─── PARADOX ROLLERCOASTER ─── */}
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

      {/* ─── MANIFESTO TEXT ─── */}
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

      {/* ─── STATS ─── */}
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

      {/* ─── TOPIC CARDS ─── */}
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

      {/* ─── CTA ─── */}
      {data.showCta && (
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
              {data.ctaHeading}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10"
            >
              {data.ctaBody}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              {data.cta && (
                <Button href={data.cta.href} size="lg">
                  {data.cta.label}
                </Button>
              )}
              {data.secondaryCta && (
                <Button
                  href={data.secondaryCta.href}
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-dark-blue"
                >
                  {data.secondaryCta.label}
                </Button>
              )}
            </motion.div>
          </Container>
        </section>
      )}
    </article>
  )
}
