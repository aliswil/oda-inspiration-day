import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SanityImage } from '@/components/ui/SanityImage'
import { Button } from '@/components/ui/Button'
import { PortableTextRenderer } from '@/components/portable-text/PortableTextRenderer'
import type { VenueMapBlock as VenueMapBlockType } from '@/sanity/types'

export function VenueMapBlock({ block }: { block: VenueMapBlockType }) {
  return (
    <SectionWrapper>
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <AnimatedSection animation="slideLeft">
            {block.heading && (
              <h2 className="text-3xl md:text-5xl font-black text-dark-blue mb-6">
                {block.heading}
              </h2>
            )}
            {block.description && (
              <p className="text-lg text-very-dark/70 mb-6 leading-relaxed">{block.description}</p>
            )}
            {block.address && (
              <p className="text-dark-blue font-medium mb-6 flex items-start gap-3">
                <svg className="w-5 h-5 mt-1 text-red flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                {block.address}
              </p>
            )}
            {block.details && <PortableTextRenderer content={block.details} />}
            {block.googleMapsUrl && (
              <Button href={block.googleMapsUrl} isExternal variant="outline" className="mt-6">
                Open in Google Maps
              </Button>
            )}
          </AnimatedSection>

          <AnimatedSection animation="slideRight">
            {block.venueImage && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <SanityImage image={block.venueImage} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
            )}
          </AnimatedSection>
        </div>
      </Container>
    </SectionWrapper>
  )
}
