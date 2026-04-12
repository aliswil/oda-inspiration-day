import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'
import { urlFor } from '@/sanity/image'

const buildComponents = (onDark: boolean): PortableTextComponents => {
  const heading = onDark ? 'text-white' : 'text-dark-blue'
  const body = onDark ? 'text-white' : 'text-very-dark/80'
  const bodySize = onDark ? 'text-xl md:text-2xl' : 'text-lg'
  const linkColor = onDark ? 'text-mint hover:text-white' : 'text-red hover:text-dark-blue'

  return {
    block: {
      h2: ({ children }) => (
        <h2 className={`text-3xl md:text-4xl font-black ${heading} mt-12 mb-6`}>{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className={`text-2xl md:text-3xl font-bold ${heading} mt-10 mb-4`}>{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 className={`text-xl md:text-2xl font-semibold ${heading} mt-8 mb-3`}>{children}</h4>
      ),
      normal: ({ children }) => (
        <p className={`${bodySize} leading-relaxed mb-6 ${body}`}>{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className={`border-l-4 ${onDark ? 'border-mint' : 'border-red'} pl-6 my-8 italic text-xl ${onDark ? 'text-white/90' : 'text-dark-blue/80'}`}>
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
          className={`${linkColor} underline underline-offset-4 transition-colors`}
          target={value?.href?.startsWith('http') ? '_blank' : undefined}
          rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className={`list-disc pl-6 mb-6 space-y-2 ${bodySize} leading-relaxed ${body}`}>{children}</ul>
      ),
      number: ({ children }) => (
        <ol className={`list-decimal pl-6 mb-6 space-y-2 ${bodySize} leading-relaxed ${body}`}>{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
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
              <figcaption className={`mt-3 text-center text-sm ${onDark ? 'text-white/70' : 'text-very-dark/60'}`}>
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      },
    },
  }
}

const lightComponents = buildComponents(false)
const darkComponents = buildComponents(true)

type PortableTextRendererProps = {
  content: PortableTextBlock[]
  onDark?: boolean
}

export function PortableTextRenderer({ content, onDark = false }: PortableTextRendererProps) {
  if (!content || !Array.isArray(content)) return null
  return <PortableText value={content} components={onDark ? darkComponents : lightComponents} />
}
