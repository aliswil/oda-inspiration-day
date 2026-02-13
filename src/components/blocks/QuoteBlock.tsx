import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SanityImage } from '@/components/ui/SanityImage'
import type { QuoteBlock as QuoteBlockType } from '@/sanity/types'

export function QuoteBlock({ block }: { block: QuoteBlockType }) {
  return (
    <SectionWrapper backgroundColor="lavender" padding="xl">
      <Container narrow>
        <AnimatedSection animation="fadeUp">
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-8 text-red opacity-30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote className="text-2xl md:text-4xl lg:text-5xl font-black text-dark-blue leading-tight mb-10">
              &ldquo;{block.text}&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              {block.authorImage && (
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-dark-blue/10">
                  <SanityImage image={block.authorImage} fill sizes="56px" className="object-cover" />
                </div>
              )}
              <div className="text-left">
                {block.author && <p className="font-bold text-dark-blue text-lg">{block.author}</p>}
                {block.authorRole && <p className="text-sm text-very-dark/60">{block.authorRole}</p>}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </SectionWrapper>
  )
}
