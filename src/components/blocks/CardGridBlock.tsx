import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { PortableTextRenderer } from '@/components/portable-text/PortableTextRenderer'
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
              <CardWrapper link={card.link}>
                {card.accentColor && (
                  <div className={cn('h-1.5', accentMap[card.accentColor])} />
                )}
                <div className="p-6 md:p-8">
                  <h3 className="font-black text-xl md:text-2xl text-dark-blue mb-3">{card.title}</h3>
                  {card.description && (
                    <div className="text-very-dark/60 mb-5 leading-relaxed">
                      <PortableTextRenderer content={card.description} />
                    </div>
                  )}
                  {card.link && (
                    <span className="inline-block text-sm font-bold text-red group-hover:underline">
                      {card.link.label} &rarr;
                    </span>
                  )}
                </div>
              </CardWrapper>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}

function CardWrapper({ link, children }: { link?: { href: string; isExternal?: boolean }; children: React.ReactNode }) {
  const classes = 'group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2'

  if (link) {
    if (link.isExternal) {
      return <a href={link.href} target="_blank" rel="noopener noreferrer" className={cn(classes, 'block')}>{children}</a>
    }
    return <Link href={link.href} className={cn(classes, 'block')}>{children}</Link>
  }

  return <div className={classes}>{children}</div>
}
