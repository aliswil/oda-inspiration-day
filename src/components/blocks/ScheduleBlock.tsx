import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { cn } from '@/lib/utils'
import type { ScheduleBlock as ScheduleBlockType } from '@/sanity/types'

const tagColors: Record<string, string> = {
  keynote: 'bg-red text-white',
  lightning: 'bg-lavender text-dark-blue',
  panel: 'bg-dark-blue text-white',
  workshop: 'bg-mint text-very-dark',
  break: 'bg-cream text-very-dark',
  networking: 'bg-lavender text-dark-blue',
}

export function ScheduleBlock({ block }: { block: ScheduleBlockType }) {
  return (
    <SectionWrapper backgroundColor={block.backgroundColor}>
      <Container>
        <AnimatedSection>
          {block.heading && (
            <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">
              {block.heading}
            </h2>
          )}
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {block.sessions?.map((session, i) => (
            <AnimatedSection key={session._key} delay={i * 0.05} animation="fadeUp">
              <div className={cn(
                'flex gap-4 md:gap-8 py-6 border-b border-dark-blue/10',
                session.tag === 'break' && 'opacity-70'
              )}>
                <div className="w-20 md:w-28 flex-shrink-0">
                  <span className="text-sm md:text-base font-bold text-red">
                    {session.time}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start gap-2 mb-1">
                    <h3 className="font-bold text-lg">{session.title}</h3>
                    {session.tag && (
                      <span className={cn(
                        'px-2 py-0.5 rounded-full text-xs font-semibold',
                        tagColors[session.tag] || 'bg-cream text-dark-blue'
                      )}>
                        {session.tag}
                      </span>
                    )}
                  </div>
                  {session.description && (
                    <p className="text-sm opacity-70 mb-2">{session.description}</p>
                  )}
                  {session.speaker && (
                    <p className="text-sm font-medium text-red">
                      {session.speaker.name}
                      {session.speaker.company && `, ${session.speaker.company}`}
                    </p>
                  )}
                  {session.location && (
                    <p className="text-xs opacity-50 mt-1">{session.location}</p>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}

          {(!block.sessions || block.sessions.length === 0) && (
            <p className="text-center opacity-50 text-lg py-12">
              The program will be announced soon. Stay tuned!
            </p>
          )}
        </div>
      </Container>
    </SectionWrapper>
  )
}
