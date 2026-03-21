'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { GlitchTitle } from './ThemeSubcomponents'

export function ThemeHero({ title, subtitle }: { title: string; subtitle: string }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const prefersReduced = useReducedMotion()
  const bgScale = useTransform(scrollYProgress, [0, 1], prefersReduced ? [1, 1] : [1, 1.2])
  const bgY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ['0%', '0%'] : ['0%', '30%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.4, 0.85])

  return (
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
        <GlitchTitle title={title} />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mt-8 font-light"
        >
          {subtitle}
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
  )
}
