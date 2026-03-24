'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { ThemeData } from './ThemePageContent'

/* ─── Accent mapping ─── */

export const accentBgMap: Record<string, string> = {
  red: 'bg-red', lavender: 'bg-lavender', mint: 'bg-mint', 'dark-blue': 'bg-dark-blue',
}

/* ─── GlitchTitle ─── */

export function GlitchTitle({ title }: { title: string }) {
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

/* ─── AnimatedCounter ─── */

export function AnimatedCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
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
      <div className="text-5xl md:text-6xl lg:text-7xl font-black mb-2 tabular-nums text-white" aria-hidden="true">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm md:text-base text-white/50 font-bold uppercase tracking-widest">
        {label}
      </div>
    </div>
  )
}

/* ─── ParadoxCard ─── */

export function ParadoxCard({
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

/* ─── ManifestoContent — see ManifestoContent.tsx ─── */
