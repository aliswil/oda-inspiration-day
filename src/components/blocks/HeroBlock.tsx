'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { SanityImage } from '@/components/ui/SanityImage'
import { BlobDecoration } from '@/components/ui/BlobDecoration'
import { HeroLogoAnimation } from '@/components/ui/HeroLogoAnimation'
import { EVENT_DATE } from '@/lib/constants'
import type { HeroBlock as HeroBlockType } from '@/sanity/types'

const heightMap = { fullscreen: 'min-h-screen', tall: 'min-h-[80vh]', medium: 'min-h-[60vh]' }

function getYouTubeId(url: string): string | null {
  if (url.includes('youtu.be/')) return url.split('youtu.be/')[1]?.split('?')[0] || null
  if (url.includes('youtube.com/watch')) return new URL(url).searchParams.get('v')
  return null
}

function HeroCtas({ cta, secondaryCta }: Pick<HeroBlockType, 'cta' | 'secondaryCta'>) {
  return (
    <>
      {cta && (
        <Button href={cta.href} isExternal={cta.isExternal} size="lg">
          {cta.label}
        </Button>
      )}
      {secondaryCta && (
        <Button
          href={secondaryCta.href}
          isExternal={secondaryCta.isExternal}
          variant="outline"
          size="lg"
          className="border-white text-white hover:bg-white hover:text-dark-blue"
        >
          {secondaryCta.label}
        </Button>
      )}
    </>
  )
}

export function HeroBlock({ block }: { block: HeroBlockType }) {
  const height = heightMap[block.style || 'fullscreen']
  const ytId = block.backgroundVideo ? getYouTubeId(block.backgroundVideo) : null

  return (
    <section className={cn('relative flex items-center justify-center overflow-hidden -mt-16 md:-mt-20', height)}>
      {/* Mobile: show background image (or fallback); Desktop: show video if available */}
      {block.backgroundVideo && (
        <div className="absolute inset-0 md:hidden">
          {block.backgroundImage ? (
            <SanityImage image={block.backgroundImage} fill priority sizes="100vw" className="object-cover" />
          ) : (
            <Image src="/images/hero-mobile-bg.jpg" alt="" fill priority sizes="100vw" quality={90} className="object-cover" />
          )}
          <div className="absolute inset-0 bg-very-dark/50" />
        </div>
      )}

      {block.backgroundImage && !block.backgroundVideo && (
        <div className="absolute inset-0">
          <SanityImage image={block.backgroundImage} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-very-dark/50" />
        </div>
      )}

      {block.backgroundVideo && (
        <div className="absolute inset-0 hidden md:block">
          {ytId ? (
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0&playlist=${ytId}`}
              allow="autoplay"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ border: 0, width: '100vw', height: '100vh', minWidth: '177.78vh', minHeight: '56.25vw' }}
              tabIndex={-1}
              aria-hidden="true"
            />
          ) : (
            <video autoPlay muted loop playsInline className="w-full h-full object-cover">
              <source src={block.backgroundVideo} type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-very-dark/50" />
        </div>
      )}

      {!block.backgroundImage && !block.backgroundVideo && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-dark-blue via-very-dark to-dark-blue" />
          <BlobDecoration color="lavender" size="lg" className="-top-20 -left-20" />
          <BlobDecoration color="mint" size="md" className="bottom-10 right-10" />
          <BlobDecoration color="red" size="sm" className="top-1/3 right-1/4" />
        </>
      )}

      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto w-full">
        {block.style === 'fullscreen' && block.backgroundVideo ? (
          <>
            <h1 className="sr-only">ODA Inspiration Day</h1>
            <div className="hidden md:block">
              <HeroLogoAnimation />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="md:hidden"
            >
              <Image
                src="/logos/oda-id-logo-alt1.svg"
                alt="ODA Inspiration Day"
                width={400}
                height={100}
                className="mx-auto w-full max-w-xs brightness-0 invert"
                priority
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-white text-lg md:text-2xl font-medium mt-8 md:mt-12 tracking-wide"
            >
              {EVENT_DATE}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap gap-4 justify-center mt-10"
            >
              <HeroCtas cta={block.cta} secondaryCta={block.secondaryCta} />
            </motion.div>
          </>
        ) : (
          <>
            {block.heading && (
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-6 tracking-tight"
              >
                {block.heading}
              </motion.h1>
            )}
            {block.subheading && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto mb-4"
              >
                {block.subheading}
              </motion.p>
            )}
            {block.style === 'medium' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base md:text-lg text-white font-medium tracking-wide mb-10"
              >
                {EVENT_DATE}
              </motion.p>
            )}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <HeroCtas cta={block.cta} secondaryCta={block.secondaryCta} />
            </motion.div>
          </>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
