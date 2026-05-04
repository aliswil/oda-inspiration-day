import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SessionRow } from './schedule/SessionRow'
import type { ScheduleBlock as ScheduleBlockType } from '@/sanity/types'

export function ScheduleBlock({ block }: { block: ScheduleBlockType }) {
  const onDarkBg = block.backgroundColor === 'dark-blue'
  const sessions = block.sessions ?? []
  const headingColor = onDarkBg ? 'text-white' : 'text-dark-blue'
  const introColor = onDarkBg ? 'text-white/80' : 'text-very-dark/70'

  return (
    <SectionWrapper backgroundColor={block.backgroundColor || 'cream'}>
      <Container>
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            {block.heading && (
              <h2 className={`text-3xl md:text-5xl font-black mb-4 text-center ${headingColor}`}>
                {block.heading}
              </h2>
            )}
            {block.outcomesIntro && (
              <p className={`text-base md:text-lg text-center max-w-2xl mx-auto mb-10 ${introColor}`}>
                {block.outcomesIntro}
              </p>
            )}
          </AnimatedSection>

          {sessions.length > 0 ? (
            <ul className="list-none">
              {sessions.map((session) => (
                <SessionRow key={session._key} session={session} onDarkBg={onDarkBg} />
              ))}
            </ul>
          ) : (
            <p className={`text-center text-lg py-12 ${introColor}`}>
              The program will be announced soon. Stay tuned!
            </p>
          )}
        </div>
      </Container>
    </SectionWrapper>
  )
}
