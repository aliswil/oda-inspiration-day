'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

type ThemeCtaProps = {
  heading: string
  body: string
  cta: { label: string; href: string } | null
  secondaryCta: { label: string; href: string } | null
}

export function ThemeCta({ heading, body, cta, secondaryCta }: ThemeCtaProps) {
  return (
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
          {heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10"
        >
          {body}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center"
        >
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
        </motion.div>
      </Container>
    </section>
  )
}
