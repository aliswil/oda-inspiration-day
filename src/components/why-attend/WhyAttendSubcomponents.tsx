'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { PortableTextRenderer } from '@/components/portable-text/PortableTextRenderer'
import type { PortableTextBlock } from '@portabletext/types'

export const accentMap: Record<string, string> = {
  red: 'bg-red',
  lavender: 'bg-lavender',
  mint: 'bg-mint',
  'dark-blue': 'bg-dark-blue',
  cream: 'bg-cream',
}

export function AnimatedCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const prefersReduced = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (prefersReduced) { setCount(value); return }
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
  }, [inView, value, prefersReduced])

  return (
    <div ref={ref} className="text-center" aria-label={`${value.toLocaleString()}${suffix} ${label}`}>
      <div className="text-5xl md:text-6xl lg:text-7xl font-black mb-3 tabular-nums" aria-hidden="true">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm md:text-base opacity-60 font-bold uppercase tracking-widest">
        {label}
      </div>
    </div>
  )
}

export function ReasonCard({
  number, title, description, accent, index,
}: {
  number: string; title: string; description: PortableTextBlock[]; accent: string; index: number
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
        <div className="text-very-dark/60 text-lg leading-relaxed">
          <PortableTextRenderer content={description} />
        </div>
      </div>
    </motion.div>
  )
}

export function ManagerBox({ label, heading, body, cta, secondaryCta, emailSubject, emailBody }: {
  label: string; heading: string; body: string
  cta: { label: string; href: string } | null
  secondaryCta: { label: string; href: string } | null
  emailSubject: string; emailBody: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const mailtoHref = emailSubject || emailBody
    ? `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
    : null

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
        {label && (
          <p className="text-lavender text-sm font-bold uppercase tracking-widest mb-4">{label}</p>
        )}
        <h3 className="text-3xl md:text-4xl font-black mb-6 leading-tight">{heading}</h3>
        <p className="text-white/70 text-lg leading-relaxed mb-8">{body}</p>
        <div className="flex flex-wrap items-center gap-4">
          {mailtoHref && (
            <a
              href={mailtoHref}
              className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center group shrink-0"
              aria-label="Draft an email to share with your manager"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-lavender group-hover:text-white transition-colors" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          )}
          {cta && <Button href={cta.href} size="lg">{cta.label}</Button>}
          {secondaryCta && (
            <Button href={secondaryCta.href} variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-dark-blue">
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
