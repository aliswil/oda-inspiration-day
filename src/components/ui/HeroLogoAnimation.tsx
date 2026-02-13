'use client'

import { motion } from 'framer-motion'

const maskStyle = {
  maskImage: 'url(/logos/oda-id-logo-short.png)',
  maskSize: 'contain',
  maskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskImage: 'url(/logos/oda-id-logo-short.png)',
  WebkitMaskSize: 'contain',
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
} as const

export function HeroLogoAnimation({ color = 'bg-cream' }: { color?: string }) {
  return (
    <div className="relative flex items-center justify-center w-full" aria-label="ODA Inspiration Day — Digital Paradox">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`w-[320px] sm:w-[500px] md:w-[700px] lg:w-[900px] xl:w-[1080px] ${color}`}
          style={{ ...maskStyle, aspectRatio: '2711 / 724' }}
        />
      </motion.div>
    </div>
  )
}
