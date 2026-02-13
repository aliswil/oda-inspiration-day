import Image from 'next/image'
import { urlFor } from '@/sanity/image'
import { cn } from '@/lib/utils'
import type { SanityImage as SanityImageType } from '@/sanity/types'

type SanityImageProps = {
  image: SanityImageType
  alt?: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  className?: string
  sizes?: string
}

export function SanityImage({
  image,
  alt = '',
  width,
  height,
  fill,
  priority = false,
  className,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: SanityImageProps) {
  if (!image?.asset) return null

  const imageUrl = urlFor(image)
    .auto('format')
    .quality(85)

  if (fill) {
    return (
      <Image
        src={imageUrl.url()}
        alt={alt}
        fill
        priority={priority}
        className={cn('object-cover', className)}
        sizes={sizes}
      />
    )
  }

  return (
    <Image
      src={imageUrl.width(width || 1200).url()}
      alt={alt}
      width={width || 1200}
      height={height || 800}
      priority={priority}
      className={className}
      sizes={sizes}
    />
  )
}
