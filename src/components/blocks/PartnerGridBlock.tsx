import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SanityImage } from '@/components/ui/SanityImage'
import { client } from '@/sanity/client'
import { allSponsorsQuery } from '@/sanity/queries'
import type { PartnerGridBlock as PartnerGridBlockType, Sponsor } from '@/sanity/types'

const tierOrder = ['platinum', 'gold', 'silver', 'bronze', 'partner'] as const
const tierLabels: Record<string, string> = {
  platinum: 'Platinum Partners',
  gold: 'Gold Partners',
  silver: 'Silver Partners',
  bronze: 'Bronze Partners',
  partner: 'Partners',
}

const tierSizes: Record<string, string> = {
  platinum: 'h-20 md:h-24',
  gold: 'h-16 md:h-20',
  silver: 'h-12 md:h-16',
  bronze: 'h-10 md:h-12',
  partner: 'h-10 md:h-12',
}

export async function PartnerGridBlock({ block }: { block: PartnerGridBlockType }) {
  let sponsors: Sponsor[] = []
  try {
    sponsors = await client.fetch<Sponsor[]>(allSponsorsQuery)
  } catch {
    // Sanity not configured
  }

  const grouped = tierOrder.reduce((acc, tier) => {
    const items = sponsors.filter((s) => s.tier === tier)
    if (items.length > 0) acc[tier] = items
    return acc
  }, {} as Record<string, Sponsor[]>)

  return (
    <SectionWrapper backgroundColor={block.backgroundColor}>
      <Container>
        {block.heading && (
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-black text-dark-blue mb-12 text-center">
              {block.heading}
            </h2>
          </AnimatedSection>
        )}

        {Object.entries(grouped).map(([tier, tierSponsors]) => (
          <div key={tier} className="mb-12 last:mb-0">
            {block.showTiers && (
              <AnimatedSection>
                <h3 className="text-sm font-bold text-dark-blue/50 text-center mb-8 uppercase tracking-[0.2em]">
                  {tierLabels[tier]}
                </h3>
              </AnimatedSection>
            )}
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
              {tierSponsors.map((sponsor, i) => (
                <AnimatedSection key={sponsor._id} delay={i * 0.1} animation="fadeIn">
                  {sponsor.url ? (
                    <a href={sponsor.url} target="_blank" rel="noopener noreferrer" className="block opacity-50 hover:opacity-100 transition-all duration-300 hover:scale-110">
                      {sponsor.logo ? (
                        <SanityImage image={sponsor.logo} alt={sponsor.name} height={80} width={200} className={tierSizes[tier]} />
                      ) : (
                        <span className="font-bold text-dark-blue text-lg">{sponsor.name}</span>
                      )}
                    </a>
                  ) : (
                    <div className="opacity-50">
                      {sponsor.logo ? (
                        <SanityImage image={sponsor.logo} alt={sponsor.name} height={80} width={200} className={tierSizes[tier]} />
                      ) : (
                        <span className="font-bold text-dark-blue text-lg">{sponsor.name}</span>
                      )}
                    </div>
                  )}
                </AnimatedSection>
              ))}
            </div>
          </div>
        ))}

        {sponsors.length === 0 && (
          <p className="text-center text-very-dark/50 text-lg py-12">
            Partners will be announced soon.
          </p>
        )}
      </Container>
    </SectionWrapper>
  )
}
