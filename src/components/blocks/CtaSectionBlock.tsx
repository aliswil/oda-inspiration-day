import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { Button } from '@/components/ui/Button'
import { SanityImage } from '@/components/ui/SanityImage'
import { BlobDecoration } from '@/components/ui/BlobDecoration'
import type { CtaSectionBlock as CtaSectionBlockType } from '@/sanity/types'

export function CtaSectionBlock({ block }: { block: CtaSectionBlockType }) {
  return (
    <SectionWrapper backgroundColor={block.backgroundColor} padding="xl">
      {block.backgroundImage && (
        <div className="absolute inset-0">
          <SanityImage image={block.backgroundImage} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-very-dark/60" />
        </div>
      )}

      <BlobDecoration color="lavender" size="lg" className="-top-20 -right-20 opacity-20" />
      <BlobDecoration color="mint" size="md" className="bottom-0 left-0 opacity-20" />

      <Container className="relative z-10">
        <AnimatedSection animation="fadeUp">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight">
              {block.heading}
            </h2>
            {block.body && (
              <p className="text-lg md:text-xl opacity-80 mb-10 max-w-2xl mx-auto">
                {block.body}
              </p>
            )}
            <div className="flex flex-wrap gap-4 justify-center">
              {block.cta && (
                <Button
                  href={block.cta.href}
                  isExternal={block.cta.isExternal}
                  size="lg"
                  variant={block.backgroundColor === 'red' ? 'secondary' : 'primary'}
                >
                  {block.cta.label}
                </Button>
              )}
              {block.secondaryCta && (
                <Button
                  href={block.secondaryCta.href}
                  isExternal={block.secondaryCta.isExternal}
                  size="lg"
                  variant="outline"
                  className={block.backgroundColor === 'red' || block.backgroundColor === 'dark-blue' ? 'border-white text-white hover:bg-white hover:text-dark-blue' : ''}
                >
                  {block.secondaryCta.label}
                </Button>
              )}
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </SectionWrapper>
  )
}
