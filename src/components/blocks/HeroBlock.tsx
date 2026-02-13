'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { SanityImage } from '@/components/ui/SanityImage'
import { BlobDecoration } from '@/components/ui/BlobDecoration'
import type { HeroBlock as HeroBlockType } from '@/sanity/types'

const heightMap = {
  fullscreen: 'min-h-screen',
  tall: 'min-h-[80vh]',
  medium: 'min-h-[60vh]',
}

export function HeroBlock({ block }: { block: HeroBlockType }) {
  const height = heightMap[block.style || 'fullscreen']

  return (
    <section className={cn('relative flex items-center justify-center overflow-hidden -mt-16 md:-mt-20', height)}>
      {block.backgroundImage && (
        <div className="absolute inset-0">
          <SanityImage image={block.backgroundImage} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-very-dark/50" />
        </div>
      )}

      {block.backgroundVideo && (
        <div className="absolute inset-0">
          {block.backgroundVideo.includes('youtube.com') || block.backgroundVideo.includes('youtu.be') ? (
            <iframe
              src={`https://www.youtube.com/embed/${block.backgroundVideo.includes('youtu.be/') ? block.backgroundVideo.split('youtu.be/')[1]?.split('?')[0] : new URL(block.backgroundVideo).searchParams.get('v')}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&modestbranding=1&playsinline=1&rel=0&playlist=${block.backgroundVideo.includes('youtu.be/') ? block.backgroundVideo.split('youtu.be/')[1]?.split('?')[0] : new URL(block.backgroundVideo).searchParams.get('v')}`}
              allow="autoplay"
              className="absolute inset-0 w-full h-full pointer-events-none scale-[4] md:scale-125"
              style={{ border: 0 }}
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

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
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
            className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto mb-10"
          >
            {block.subheading}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {block.cta && (
            <Button href={block.cta.href} isExternal={block.cta.isExternal} size="lg">
              {block.cta.label}
            </Button>
          )}
          {block.secondaryCta && (
            <Button
              href={block.secondaryCta.href}
              isExternal={block.secondaryCta.isExternal}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-dark-blue"
            >
              {block.secondaryCta.label}
            </Button>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
