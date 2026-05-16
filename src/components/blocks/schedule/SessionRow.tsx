import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Chip } from './Chip'
import type { ScheduleSession } from '@/sanity/types'

type SessionRowProps = { session: ScheduleSession; onDarkBg: boolean }

export function SessionRow({ session, onDarkBg }: SessionRowProps) {
  const { time, title, description, format, speakers, location, linkUrl, linkLabel } = session
  const isBreak = !!format?.isBreak
  const isSideEvent = !!format?.isSideEvent
  const validSpeakers = (speakers || []).filter(Boolean)

  // Stage-based color: main vs side vs networking/pause.
  const stage: 'main' | 'side' | 'pause' = isBreak ? 'pause' : isSideEvent ? 'side' : 'main'
  const stageColor = onDarkBg
    ? { main: 'text-lavender', side: 'text-mint', pause: 'text-red' }[stage]
    : { main: 'text-purple', side: 'text-green', pause: 'text-red' }[stage]

  const titleColor = onDarkBg ? 'text-white' : 'text-dark-blue'
  const bodyColor = onDarkBg ? 'text-white/80' : 'text-very-dark/80'
  const mutedColor = onDarkBg ? 'text-white/60' : 'text-very-dark/60'
  const speakerColor = onDarkBg ? 'text-mint' : 'text-red'
  const borderColor = onDarkBg ? 'border-white/10' : 'border-dark-blue/10'

  return (
    <li
      className={cn(
        'group flex gap-4 md:gap-8 py-5 md:py-6 border-b',
        borderColor,
      )}
    >
      <div className="w-16 md:w-24 flex-shrink-0 pt-1">
        <time className={cn('text-base md:text-lg font-bold', stageColor)}>
          {time}
        </time>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start gap-x-3 gap-y-2 mb-1.5">
          <h3 className={cn('font-bold text-lg md:text-xl leading-tight', titleColor)}>{title}</h3>
          {format && (
            <Chip
              variant="format"
              color={format.color}
              label={format.title}
              ariaLabel={`Format: ${format.title}`}
              className="mt-0.5 shrink-0"
            />
          )}
        </div>

        {validSpeakers.length > 0 && (
          <p className={cn('text-sm md:text-base font-medium mb-1.5', speakerColor)}>
            {validSpeakers.map((s, i) => (
              <span key={s._id}>
                {s.slug ? (
                  <Link href={`/speakers/${s.slug}`} className="hover:underline focus-visible:underline focus-visible:outline-none">
                    {s.name}
                  </Link>
                ) : (
                  s.name
                )}
                {s.company && <span className={mutedColor}>, {s.company}</span>}
                {i < validSpeakers.length - 1 && <span className={mutedColor}>{' · '}</span>}
              </span>
            ))}
          </p>
        )}

        {description && (
          <details className="mt-1 group/details">
            <summary className={cn(
              'cursor-pointer text-sm font-medium list-none inline-flex items-center gap-1.5 hover:underline focus-visible:underline focus-visible:outline-none',
              isSideEvent ? speakerColor : mutedColor,
            )}>
              <span className="transition-transform group-open/details:rotate-90" aria-hidden="true">›</span>
              <span className="group-open/details:hidden">Read more</span>
              <span className="hidden group-open/details:inline">Hide</span>
            </summary>
            <p className={cn('text-sm md:text-base leading-relaxed mt-2 max-w-prose', bodyColor)}>
              {description}
            </p>
          </details>
        )}

        {(location || linkUrl) && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs">
            {location && (
              <span className={cn('font-semibold uppercase tracking-wide', stageColor)}>
                {location}
              </span>
            )}
            {linkUrl && (
              <Link
                href={linkUrl}
                className={cn('font-semibold hover:underline focus-visible:underline focus-visible:outline-none', speakerColor)}
              >
                {linkLabel || 'Learn more'} <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </li>
  )
}
