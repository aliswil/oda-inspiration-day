import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SanityImage } from '@/components/ui/SanityImage'
import { client } from '@/sanity/client'
import { allSponsorsQuery } from '@/sanity/queries'
import type { PartnerGridBlock as PartnerGridBlockType, Sponsor } from '@/sanity/types'

type Size = 'xl' | 'lg' | 'md' | 'sm'

const SIZE_CLASSES: Record<Size, { logo: string; text: string; gap: string; px: number; py: number }> = {
  xl: { logo: 'h-12 md:h-20 max-w-[10rem] md:max-w-[16rem]', text: 'text-xl md:text-2xl', gap: 'gap-6 md:gap-8', px: 300, py: 96 },
  lg: { logo: 'h-8 md:h-10 max-w-[6rem] md:max-w-[9rem]',     text: 'text-base md:text-lg',  gap: 'gap-4 md:gap-6', px: 200, py: 64 },
  md: { logo: 'h-6 md:h-8 max-w-[5rem] md:max-w-[7rem]',      text: 'text-sm md:text-base', gap: 'gap-3 md:gap-5', px: 160, py: 48 },
  sm: { logo: 'h-5 md:h-7 max-w-[4rem] md:max-w-[6rem]',      text: 'text-xs md:text-sm',   gap: 'gap-2 md:gap-4', px: 140, py: 40 },
}

function SponsorItem({ sponsor, size }: { sponsor: Sponsor; size: Size }) {
  const s = SIZE_CLASSES[size]
  const content = (
    <div className="flex items-center justify-center p-4">
      {sponsor.logo ? (
        <SanityImage
          image={sponsor.logo}
          alt={sponsor.name}
          height={s.py}
          width={s.px}
          className={`${s.logo} w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300`}
        />
      ) : (
        <span className={`font-bold text-very-dark/70 ${s.text} text-center leading-tight`}>
          {sponsor.name}
        </span>
      )}
    </div>
  )

  if (sponsor.url) {
    return (
      <a href={sponsor.url} target="_blank" rel="noopener noreferrer" className="block hover:scale-105 transition-transform duration-300">
        {content}
      </a>
    )
  }
  return content
}

function TierSection({ title, sponsors, size, showTier }: { title: string; sponsors: Sponsor[]; size: Size; showTier?: boolean }) {
  if (sponsors.length === 0) return null
  const s = SIZE_CLASSES[size]
  return (
    <div className="mb-16 last:mb-0">
      {showTier && (
        <AnimatedSection>
          <h3 className="text-sm font-bold text-dark-blue/50 text-center mb-8 uppercase tracking-[0.2em]">
            {title}
          </h3>
        </AnimatedSection>
      )}
      <AnimatedSection delay={0.1}>
        <div className={`flex flex-wrap justify-center ${s.gap}`}>
          {sponsors.map((sp) => <SponsorItem key={sp._id} sponsor={sp} size={size} />)}
        </div>
      </AnimatedSection>
    </div>
  )
}

export async function PartnerGridBlock({ block }: { block: PartnerGridBlockType }) {
  let sponsors: Sponsor[] = []
  try {
    sponsors = await client.fetch<Sponsor[]>(allSponsorsQuery)
  } catch { /* Sanity not configured */ }

  const platinum = sponsors.filter((s) => s.tier === 'platinum')
  const gold = sponsors.filter((s) => s.tier === 'gold')
  const silver = sponsors.filter((s) => s.tier === 'silver')
  const associate = sponsors.filter((s) => s.tier === 'associate')

  return (
    <SectionWrapper backgroundColor={block.backgroundColor}>
      <Container>
        {block.heading && (
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-black text-dark-blue mb-16 text-center">
              {block.heading}
            </h2>
          </AnimatedSection>
        )}

        <TierSection title="Platinum Partners" sponsors={platinum} size="xl" showTier={block.showTiers} />
        <TierSection title="Gold Partners" sponsors={gold} size="lg" showTier={block.showTiers} />
        <TierSection title="Silver Partners" sponsors={silver} size="md" showTier={block.showTiers} />
        <TierSection title="Associate Partners" sponsors={associate} size="sm" showTier={block.showTiers} />

        {sponsors.length === 0 && (
          <p className="text-center text-very-dark/50 text-lg py-12">
            Partners will be announced soon.
          </p>
        )}
      </Container>
    </SectionWrapper>
  )
}
