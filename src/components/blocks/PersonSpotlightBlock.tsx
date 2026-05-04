import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SanityImage } from '@/components/ui/SanityImage'
import { cn } from '@/lib/utils'
import type { PersonSpotlightBlock as PersonSpotlightBlockType } from '@/sanity/types'

const archUp = '9999px 9999px 0 0'
const archDown = '0 0 9999px 9999px'

export function PersonSpotlightBlock({ block }: { block: PersonSpotlightBlockType }) {
  const { label, heading, name, role, company, bio, image, imagePosition = 'left', backgroundColor = 'cream' } = block
  const onDarkBg = backgroundColor === 'dark-blue'
  const labelColor = onDarkBg ? 'bg-mint text-very-dark' : 'bg-dark-blue text-white'
  const headingColor = onDarkBg ? 'text-white' : 'text-dark-blue'
  const nameColor = onDarkBg ? 'text-mint' : 'text-red'
  const roleColor = onDarkBg ? 'text-white/80' : 'text-very-dark/70'
  const bioColor = onDarkBg ? 'text-white/85' : 'text-very-dark/85'

  return (
    <SectionWrapper backgroundColor={backgroundColor}>
      <Container>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl mx-auto">
          <AnimatedSection
            animation={imagePosition === 'left' ? 'slideLeft' : 'slideRight'}
            className={cn(imagePosition === 'right' && 'md:order-last')}
          >
            <div
              className="relative aspect-[3/4] overflow-hidden"
              style={{ borderRadius: imagePosition === 'left' ? archUp : archDown }}
            >
              <SanityImage
                image={image}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeUp">
            <div>
              {label && (
                <span className={cn('inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4', labelColor)}>
                  {label}
                </span>
              )}
              {heading && (
                <h2 className={cn('text-3xl md:text-5xl font-black leading-tight mb-4', headingColor)}>
                  {heading}
                </h2>
              )}
              <p className={cn('text-2xl md:text-3xl font-bold mb-1', nameColor)}>{name}</p>
              {(role || company) && (
                <p className={cn('text-base md:text-lg mb-6', roleColor)}>
                  {role}
                  {role && company && <span className={roleColor}> · </span>}
                  {company}
                </p>
              )}
              {bio && (
                <div className={cn('text-base md:text-lg leading-relaxed whitespace-pre-line max-w-prose', bioColor)}>
                  {bio}
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </SectionWrapper>
  )
}
