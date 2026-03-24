import type { Block } from '@/sanity/types'
import { HeroBlock } from './HeroBlock'
import { RichTextBlock } from './RichTextBlock'
import { SpeakerGridBlock } from './SpeakerGridBlock'
import { ScheduleBlock } from './ScheduleBlock'
import { ImageGalleryBlock } from './ImageGalleryBlock'
import { VideoEmbedBlock } from './VideoEmbedBlock'
import { CtaSectionBlock } from './CtaSectionBlock'
import { StatsCounterBlock } from './StatsCounterBlock'
import { TeamGridBlock } from './TeamGridBlock'
import { PartnerGridBlock } from './PartnerGridBlock'
import { CardGridBlock } from './CardGridBlock'
import { FaqAccordionBlock } from './FaqAccordionBlock'
import { QuoteBlock } from './QuoteBlock'
import { VenueMapBlock } from './VenueMapBlock'
import { VideoCarouselBlock } from './VideoCarouselBlock'
import { ThemeTeaserBlock } from './ThemeTeaserBlock'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockComponents: Record<string, React.ComponentType<{ block: any }>> = {
  hero: HeroBlock,
  richText: RichTextBlock,
  speakerGrid: SpeakerGridBlock,
  schedule: ScheduleBlock,
  imageGallery: ImageGalleryBlock,
  videoEmbed: VideoEmbedBlock,
  ctaSection: CtaSectionBlock,
  statsCounter: StatsCounterBlock,
  teamGrid: TeamGridBlock,
  partnerGrid: PartnerGridBlock,
  cardGrid: CardGridBlock,
  faqAccordion: FaqAccordionBlock,
  quote: QuoteBlock,
  venueMap: VenueMapBlock,
  videoCarousel: VideoCarouselBlock,
  themeTeaser: ThemeTeaserBlock,
}

type BlockRendererProps = {
  blocks: Block[]
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block) => {
        if ('enabled' in block && block.enabled === false) return null
        const Component = blockComponents[block._type]
        if (!Component) {
          console.warn(`Unknown block type: ${block._type}`)
          return null
        }
        return <Component key={block._key} block={block} />
      })}
    </>
  )
}
