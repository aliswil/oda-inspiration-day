import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SanityImage } from '@/components/ui/SanityImage'
import { client } from '@/sanity/client'
import { allSponsorsQuery } from '@/sanity/queries'
import type { PartnerGridBlock as PartnerGridBlockType, Sponsor } from '@/sanity/types'

function SponsorItem({ sponsor, size }: { sponsor: Sponsor; size: 'lg' | 'sm' }) {
  const logoClass = size === 'lg' ? 'h-12 md:h-16' : 'h-8 md:h-10'
  const boxClass = size === 'lg'
    ? 'w-40 h-24 md:w-52 md:h-32'
    : 'w-32 h-20 md:w-40 md:h-24'
  const textClass = size === 'lg' ? 'text-xl md:text-2xl' : 'text-base md:text-lg'

  const content = (
    <div className={`${boxClass} flex items-center justify-center p-4 rounded-xl bg-white/60 border border-black/5`}>
      {sponsor.logo ? (
        <SanityImage
          image={sponsor.logo}
          alt={sponsor.name}
          height={64}
          width={200}
          className={`${logoClass} w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300`}
        />
      ) : (
        <span className={`font-bold text-very-dark/70 ${textClass} text-center leading-tight`}>
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

export async function PartnerGridBlock({ block }: { block: PartnerGridBlockType }) {
  let sponsors: Sponsor[] = []
  try {
    sponsors = await client.fetch<Sponsor[]>(allSponsorsQuery)
  } catch { /* Sanity not configured */ }

  const platinum = sponsors.filter((s) => s.tier === 'platinum')
  const gold = sponsors.filter((s) => s.tier === 'gold')

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

        {platinum.length > 0 && (
          <div className="mb-16">
            {block.showTiers && (
              <AnimatedSection>
                <h3 className="text-sm font-bold text-dark-blue/50 text-center mb-8 uppercase tracking-[0.2em]">
                  Platinum Partners
                </h3>
              </AnimatedSection>
            )}
            <AnimatedSection delay={0.1}>
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                {platinum.map((s) => <SponsorItem key={s._id} sponsor={s} size="lg" />)}
              </div>
            </AnimatedSection>
          </div>
        )}

        {gold.length > 0 && (
          <div>
            {block.showTiers && (
              <AnimatedSection>
                <h3 className="text-sm font-bold text-dark-blue/50 text-center mb-8 uppercase tracking-[0.2em]">
                  Gold Partners
                </h3>
              </AnimatedSection>
            )}
            <AnimatedSection delay={0.1}>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {gold.map((s) => <SponsorItem key={s._id} sponsor={s} size="sm" />)}
              </div>
            </AnimatedSection>
          </div>
        )}

        {sponsors.length === 0 && (
          <p className="text-center text-very-dark/50 text-lg py-12">
            Partners will be announced soon.
          </p>
        )}
      </Container>
    </SectionWrapper>
  )
}
