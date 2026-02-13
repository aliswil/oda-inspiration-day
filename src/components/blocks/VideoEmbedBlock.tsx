import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { cn } from '@/lib/utils'
import type { VideoEmbedBlock as VideoEmbedBlockType } from '@/sanity/types'

function getEmbedUrl(url: string): string {
  if (url.includes('youtube.com/watch')) { const id = new URL(url).searchParams.get('v'); return `https://www.youtube.com/embed/${id}` }
  if (url.includes('youtu.be/')) { const id = url.split('youtu.be/')[1]?.split('?')[0]; return `https://www.youtube.com/embed/${id}` }
  if (url.includes('vimeo.com/')) { const id = url.split('vimeo.com/')[1]?.split('?')[0]; return `https://player.vimeo.com/video/${id}` }
  return url
}

const aspectRatioMap: Record<string, string> = { '16:9': 'aspect-video', '4:3': 'aspect-[4/3]', '1:1': 'aspect-square' }

export function VideoEmbedBlock({ block }: { block: VideoEmbedBlockType }) {
  const embedUrl = getEmbedUrl(block.url)
  return (
    <SectionWrapper>
      <Container>
        {block.heading && <AnimatedSection><h2 className="text-3xl md:text-5xl font-black text-dark-blue mb-10 text-center">{block.heading}</h2></AnimatedSection>}
        <AnimatedSection animation="scaleIn">
          <div className={cn('relative w-full overflow-hidden rounded-2xl shadow-2xl', aspectRatioMap[block.aspectRatio || '16:9'])}>
            <iframe src={embedUrl} title={block.heading || 'Video'} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full" />
          </div>
        </AnimatedSection>
        {block.caption && <p className="text-center text-very-dark/60 mt-4 text-sm">{block.caption}</p>}
      </Container>
    </SectionWrapper>
  )
}
