import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SanityImage } from '@/components/ui/SanityImage'
import { client } from '@/sanity/client'
import { allTeamMembersQuery } from '@/sanity/queries'
import type { TeamGridBlock as TeamGridBlockType, TeamMember } from '@/sanity/types'

export async function TeamGridBlock({ block }: { block: TeamGridBlockType }) {
  let members: TeamMember[] = []
  try {
    members = await client.fetch<TeamMember[]>(allTeamMembersQuery)
  } catch {
    // Sanity not configured
  }

  return (
    <SectionWrapper backgroundColor={block.backgroundColor}>
      <Container>
        <AnimatedSection>
          {block.heading && (
            <h2 className="text-3xl md:text-5xl font-black text-dark-blue mb-4 text-center">
              {block.heading}
            </h2>
          )}
          {block.subheading && (
            <p className="text-lg text-very-dark/70 text-center max-w-2xl mx-auto mb-12">
              {block.subheading}
            </p>
          )}
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {members.map((member, i) => (
            <AnimatedSection key={member._id} delay={i * 0.05} animation="fadeUp">
              <div className="group text-center">
                <div className="relative aspect-square overflow-hidden rounded-2xl mb-4 shadow-sm group-hover:shadow-xl transition-shadow duration-300">
                  {member.photo ? (
                    <SanityImage
                      image={member.photo}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-lavender flex items-center justify-center">
                      <span className="text-3xl font-black text-dark-blue/30">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-dark-blue text-lg">{member.name}</h3>
                {member.role && <p className="text-sm text-very-dark/60">{member.role}</p>}
              </div>
            </AnimatedSection>
          ))}
        </div>

        {members.length === 0 && (
          <p className="text-center text-very-dark/50 text-lg py-12">
            Team members will be announced soon.
          </p>
        )}
      </Container>
    </SectionWrapper>
  )
}
