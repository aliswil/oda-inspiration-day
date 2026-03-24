'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { GlitchTitle } from '@/components/theme/ThemeSubcomponents'

type ThemeTeaserBlockType = {
  _type: 'themeTeaser'
  _key: string
  heading?: string
  buttonLabel?: string
  buttonHref?: string
}

export function ThemeTeaserBlock({ block }: { block: ThemeTeaserBlockType }) {
  const heading = block.heading || 'Digital Paradox'
  const label = block.buttonLabel || 'Explore this years theme'
  const href = block.buttonHref || '/theme'

  return (
    <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
      <Image
        src="/images/theme-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-very-dark/50" />
      <div className="absolute inset-0 opacity-[0.05] noise-bg" aria-hidden="true" />

      <div className="relative z-10 text-center px-4">
        <GlitchTitle title={heading.toUpperCase()} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Link
            href={href}
            className="inline-block px-8 py-4 bg-red text-white font-bold text-lg rounded-full hover:bg-red/90 transition-colors mt-10"
          >
            {label}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
