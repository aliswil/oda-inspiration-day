import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { PortableTextRenderer } from '@/components/portable-text/PortableTextRenderer'
import type { RichTextBlock as RichTextBlockType } from '@/sanity/types'

export function RichTextBlock({ block }: { block: RichTextBlockType }) {
  return (
    <SectionWrapper backgroundColor={block.backgroundColor}>
      <Container narrow={block.narrowWidth}>
        <AnimatedSection>
          {block.heading && (
            <h2 className="text-3xl md:text-5xl font-black text-dark-blue mb-8">
              {block.heading}
            </h2>
          )}
          {block.content && <PortableTextRenderer content={block.content} />}
        </AnimatedSection>
      </Container>
    </SectionWrapper>
  )
}
