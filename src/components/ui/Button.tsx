import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonBaseProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
}

type ButtonAsLink = ButtonBaseProps & {
  href: string
  isExternal?: boolean
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps>

type ButtonAsButton = ButtonBaseProps & {
  href?: never
  isExternal?: never
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps>

type ButtonProps = ButtonAsLink | ButtonAsButton

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-red text-white hover:bg-red/90 shadow-lg hover:shadow-xl hover:scale-105',
  secondary: 'bg-dark-blue text-white hover:bg-dark-blue/90 hover:scale-105',
  outline: 'border-2 border-dark-blue text-dark-blue hover:bg-dark-blue hover:text-white',
  ghost: 'text-dark-blue hover:bg-dark-blue/10',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-base',
  lg: 'px-10 py-4.5 text-lg',
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-full font-bold tracking-wide uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-dark-blue focus:ring-offset-2',
    variantStyles[variant],
    sizeStyles[size],
    className
  )

  if ('href' in props && props.href) {
    const { href, isExternal, ...rest } = props as ButtonAsLink
    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  )
}
