'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'

type WhyAttendHeroProps = {
  dateLocation: string
  heading: string
  subheading: string
  imageUrl: string | null
}

export function WhyAttendHero({ dateLocation, heading, subheading, imageUrl }: WhyAttendHeroProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden -mt-16 md:-mt-20">
      <div className="absolute inset-0">
        {imageUrl ? (
          <Image src={imageUrl} alt="" fill priority sizes="100vw" className="object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-dark-blue via-very-dark to-dark-blue" />
        )}
        <div className="absolute inset-0 bg-very-dark/70" />
      </div>

      <Container className="relative z-10 py-32 md:py-40">
        {dateLocation && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-sm font-bold uppercase tracking-widest mb-6"
          >
            {dateLocation}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight mb-8"
        >
          {heading}
        </motion.h1>
        {subheading && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed"
          >
            {subheading}
          </motion.p>
        )}
      </Container>
    </section>
  )
}
