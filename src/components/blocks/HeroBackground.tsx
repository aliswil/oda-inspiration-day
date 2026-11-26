import Image from 'next/image'
import { SanityImage } from '@/components/ui/SanityImage'
import { BlobDecoration } from '@/components/ui/BlobDecoration'
import type { HeroBlock } from '@/sanity/types'
import { HeroBackgroundVideo } from './HeroBackgroundVideo'

type HeroBackgroundProps = Pick<HeroBlock, 'backgroundImage' | 'backgroundVideo' | 'backgroundVideoStart'>

const overlay = <div className="absolute inset-0 bg-very-dark/50" />

export function HeroBackground({ backgroundImage, backgroundVideo, backgroundVideoStart }: HeroBackgroundProps) {
  if (backgroundVideo) {
    return (
      <>
        {/* Mobile: background image (or fallback); desktop: the video */}
        <div className="absolute inset-0 md:hidden">
          {backgroundImage ? (
            <SanityImage image={backgroundImage} fill priority sizes="100vw" className="object-cover" />
          ) : (
            <Image src="/images/hero-mobile-bg.jpg" alt="" fill priority sizes="100vw" quality={90} className="object-cover" />
          )}
          {overlay}
        </div>
        <div className="absolute inset-0 hidden md:block">
          <HeroBackgroundVideo url={backgroundVideo} start={Math.max(0, Math.floor(backgroundVideoStart ?? 0))} />
          {overlay}
        </div>
      </>
    )
  }

  if (backgroundImage) {
    return (
      <div className="absolute inset-0">
        <SanityImage image={backgroundImage} fill priority sizes="100vw" className="object-cover" />
        {overlay}
      </div>
    )
  }

  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-dark-blue via-very-dark to-dark-blue" />
      <BlobDecoration color="lavender" size="lg" className="-top-20 -left-20" />
      <BlobDecoration color="mint" size="md" className="bottom-10 right-10" />
      <BlobDecoration color="red" size="sm" className="top-1/3 right-1/4" />
    </>
  )
}
