import { cn } from '@/lib/utils'

const bgColorMap: Record<string, string> = {
  cream: 'bg-cream',
  lavender: 'bg-lavender',
  'dark-blue': 'bg-dark-blue text-white',
  red: 'bg-red text-white',
  'very-dark': 'bg-very-dark text-white',
  mint: 'bg-mint',
  white: 'bg-white',
}

type SectionWrapperProps = {
  children: React.ReactNode
  className?: string
  backgroundColor?: string
  id?: string
  padding?: 'sm' | 'md' | 'lg' | 'xl'
}

const paddingMap = {
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-24',
  xl: 'py-24 md:py-32',
}

export function SectionWrapper({ children, className, backgroundColor = 'cream', id, padding = 'lg' }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative overflow-hidden',
        paddingMap[padding],
        bgColorMap[backgroundColor] || 'bg-cream',
        className
      )}
    >
      {children}
    </section>
  )
}
