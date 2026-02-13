import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-black text-dark-blue mt-12 mb-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-bold text-dark-blue mt-10 mb-4">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl md:text-2xl font-semibold text-dark-blue mt-8 mb-3">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-lg leading-relaxed mb-6 text-very-dark/80">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-red pl-6 my-8 italic text-xl text-dark-blue/80">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-red underline underline-offset-4 hover:text-dark-blue transition-colors"
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-10">
          <Image
            src={urlFor(value).width(1200).auto('format').quality(85).url()}
            alt={value.alt || ''}
            width={1200}
            height={800}
            className="rounded-2xl w-full"
          />
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-very-dark/60">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

type PortableTextRendererProps = {
  content: PortableTextBlock[]
}

export function PortableTextRenderer({ content }: PortableTextRendererProps) {
  if (!content) return null
  return <PortableText value={content} components={components} />
}
