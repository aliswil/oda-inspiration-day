import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SanityImage } from '@/components/ui/SanityImage'
import { cn } from '@/lib/utils'
import type { ImageGalleryBlock as ImageGalleryBlockType } from '@/sanity/types'

const colsMap: Record<number, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

export function ImageGalleryBlock({ block }: { block: ImageGalleryBlockType }) {
  const cols = block.columns || 3

  return (
    <SectionWrapper>
      <Container>
        {block.heading && (
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-black text-dark-blue mb-12 text-center">
              {block.heading}
            </h2>
          </AnimatedSection>
        )}

        {block.layout === 'masonry' ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {block.images?.map((image, i) => (
              <AnimatedSection key={i} delay={i * 0.1} animation="scaleIn">
                <div className="break-inside-avoid overflow-hidden rounded-2xl group">
                  <SanityImage
                    image={image}
                    alt={image.alt || ''}
                    width={600}
                    height={400}
                    className="w-full group-hover:scale-105 transition-transform duration-500"
                  />
                  {image.caption && (
                    <p className="text-sm text-very-dark/60 mt-2 px-1">{image.caption}</p>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <div className={cn('grid gap-4', colsMap[cols])}>
            {block.images?.map((image, i) => (
              <AnimatedSection key={i} delay={i * 0.1} animation="scaleIn">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl group">
                  <SanityImage
                    image={image}
                    fill
                    sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${Math.floor(100 / cols)}vw`}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {image.caption && (
                  <p className="text-sm text-very-dark/60 mt-2 px-1">{image.caption}</p>
                )}
              </AnimatedSection>
            ))}
          </div>
        )}
      </Container>
    </SectionWrapper>
  )
}
