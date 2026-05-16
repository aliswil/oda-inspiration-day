import { cn } from '@/lib/utils'
import type { ProgramFormatColor } from '@/sanity/types'

type ChipProps = {
  label: string
  variant?: 'format' | 'topic'
  color?: ProgramFormatColor
  ariaLabel?: string
  className?: string
}

const formatColorClasses: Record<ProgramFormatColor, string> = {
  red: 'bg-red text-white',
  'dark-blue': 'bg-dark-blue text-white',
  mint: 'bg-mint text-very-dark',
  lavender: 'bg-lavender text-dark-blue',
  cream: 'bg-cream text-very-dark border border-dark-blue/20',
  'very-dark': 'bg-very-dark text-cream',
  'mint-dark': 'bg-very-dark text-mint border border-mint',
  'lavender-dark': 'bg-very-dark text-lavender border border-lavender',
  'red-soft': 'bg-cream text-dark-blue border-2 border-red',
  'mint-soft': 'bg-cream text-dark-blue border-2 border-mint',
}

export function Chip({ label, variant = 'format', color = 'red', ariaLabel, className }: ChipProps) {
  if (variant === 'topic') {
    return (
      <span
        className={cn(
          'inline-flex items-center px-2.5 py-1 rounded-full text-xs border border-dark-blue/25 text-dark-blue bg-transparent',
          className,
        )}
        aria-label={ariaLabel}
      >
        {label}
      </span>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wide',
        formatColorClasses[color],
        className,
      )}
      aria-label={ariaLabel}
    >
      {label}
    </span>
  )
}
