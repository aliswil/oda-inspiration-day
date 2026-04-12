import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { PortableTextRenderer } from '@/components/portable-text/PortableTextRenderer'
import type { RichTextBlock as RichTextBlockType } from '@/sanity/types'

const DARK_BG = new Set(['dark-blue', 'red', 'very-dark'])

export function RichTextBlock({ block }: { block: RichTextBlockType }) {
  const onDark = DARK_BG.has(block.backgroundColor || '')
  const headingColor = onDark ? 'text-white' : 'text-dark-blue'
  const headingSize = onDark ? 'text-4xl md:text-6xl lg:text-7xl' : 'text-3xl md:text-5xl'

  return (
    <SectionWrapper backgroundColor={block.backgroundColor} padding={block.padding}>
      <Container narrow={block.narrowWidth}>
        <AnimatedSection>
          {block.heading && (
            <h2 className={`${headingSize} font-black ${headingColor} mb-8 ${onDark ? 'text-center' : ''}`}>
              {block.heading}
            </h2>
          )}
          {block.content && (
            <div className={onDark ? 'text-center max-w-3xl mx-auto' : ''}>
              <PortableTextRenderer content={block.content} onDark={onDark} />
            </div>
          )}
        </AnimatedSection>
      </Container>
    </SectionWrapper>
  )
}
