'use client'

import { cn } from '@/lib/utils'

type BlobDecorationProps = {
  color?: 'lavender' | 'mint' | 'red' | 'cream'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const colorMap = {
  lavender: '#D9CEF5',
  mint: '#DDFFD9',
  red: '#EF3255',
  cream: '#F8F2EA',
}

const sizeMap = {
  sm: 'w-32 h-32',
  md: 'w-64 h-64',
  lg: 'w-96 h-96',
}

export function BlobDecoration({ color = 'lavender', size = 'md', className }: BlobDecorationProps) {
  return (
    <div
      className={cn(
        'absolute rounded-full blur-3xl opacity-30 animate-blob-float pointer-events-none',
        sizeMap[size],
        className
      )}
      style={{ backgroundColor: colorMap[color] }}
      aria-hidden="true"
    />
  )
}
