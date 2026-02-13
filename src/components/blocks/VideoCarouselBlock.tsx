'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { cn } from '@/lib/utils'
import type { VideoCarouselBlock as VideoCarouselBlockType } from '@/sanity/types'

function getEmbedUrl(url: string): string {
  if (url.includes('youtube.com/watch')) { const id = new URL(url).searchParams.get('v'); return `https://www.youtube.com/embed/${id}` }
  if (url.includes('youtu.be/')) { const id = url.split('youtu.be/')[1]?.split('?')[0]; return `https://www.youtube.com/embed/${id}` }
  if (url.includes('vimeo.com/')) { const id = url.split('vimeo.com/')[1]?.split('?')[0]; return `https://player.vimeo.com/video/${id}` }
  return url
}

export function VideoCarouselBlock({ block }: { block: VideoCarouselBlockType }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const videos = block.videos || []

  if (!videos.length) return null

  const current = videos[activeIndex]

  return (
    <SectionWrapper backgroundColor={block.backgroundColor}>
      <Container>
        {block.heading && (
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-black text-dark-blue mb-10 text-center">{block.heading}</h2>
          </AnimatedSection>
        )}

        <AnimatedSection animation="scaleIn">
          <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl aspect-video">
            <iframe
              key={current.url}
              src={getEmbedUrl(current.url)}
              title={current.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </AnimatedSection>

        {videos.length > 1 && (
          <nav aria-label="Aftermovie navigation" className="flex flex-wrap justify-center gap-3 mt-6">
            {videos.map((video, index) => (
              <button
                key={video.url}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'px-5 py-2.5 rounded-full text-sm font-semibold transition-colors',
                  index === activeIndex
                    ? 'bg-red text-white'
                    : 'bg-dark-blue/10 text-dark-blue hover:bg-dark-blue/20'
                )}
                aria-current={index === activeIndex ? 'true' : undefined}
              >
                {video.title}
              </button>
            ))}
          </nav>
        )}
      </Container>
    </SectionWrapper>
  )
}
