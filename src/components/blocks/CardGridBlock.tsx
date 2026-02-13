import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SanityImage } from '@/components/ui/SanityImage'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { CardGridBlock as CardGridBlockType } from '@/sanity/types'

const colsMap: Record<number, string> = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

const accentMap: Record<string, string> = {
  lavender: 'bg-lavender',
  red: 'bg-red',
  mint: 'bg-mint',
  'dark-blue': 'bg-dark-blue',
}

export function CardGridBlock({ block }: { block: CardGridBlockType }) {
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

        <div className={cn('grid gap-6 md:gap-8', colsMap[cols])}>
          {block.cards?.map((card, i) => (
            <AnimatedSection key={card._key} delay={i * 0.1} animation="fadeUp">
              <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {card.accentColor && (
                  <div className={cn('h-1.5', accentMap[card.accentColor])} />
                )}
                {card.image && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <SanityImage
                      image={card.image}
                      fill
                      sizes={`(max-width: 768px) 100vw, ${Math.floor(100 / cols)}vw`}
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-very-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                )}
                <div className="p-6 md:p-8">
                  <h3 className="font-black text-xl md:text-2xl text-dark-blue mb-3">{card.title}</h3>
                  {card.description && (
                    <p className="text-very-dark/60 mb-5 line-clamp-3 leading-relaxed">{card.description}</p>
                  )}
                  {card.link && (
                    <Button href={card.link.href} isExternal={card.link.isExternal} variant="ghost" size="sm" className="text-red hover:text-dark-blue -ml-4 font-bold">
                      {card.link.label} &rarr;
                    </Button>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
