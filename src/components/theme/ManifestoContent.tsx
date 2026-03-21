'use client'

import { motion } from 'framer-motion'
import type { ManifestoBlock } from './ThemePageContent'

const styleClassMap: Record<string, string> = {
  normal: 'text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed',
  h2: 'text-3xl md:text-4xl lg:text-5xl text-white font-black leading-tight',
  h3: 'text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-tight',
  h4: 'text-xl md:text-2xl lg:text-3xl text-white font-bold leading-snug',
  blockquote: 'text-xl md:text-2xl text-white/60 leading-relaxed italic border-l-4 border-lavender pl-6',
}

export function ManifestoContent({ blocks }: { blocks: ManifestoBlock[] }) {
  const elements: React.ReactNode[] = []
  let listBuffer: ManifestoBlock[] = []
  let animIndex = 0

  function flushList() {
    if (listBuffer.length === 0) return
    const isNumbered = listBuffer[0].type === 'number'
    const Tag = isNumbered ? 'ol' : 'ul'
    const idx = animIndex++
    elements.push(
      <motion.div
        key={`list-${idx}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: idx * 0.1 }}
      >
        <Tag className={`space-y-3 text-xl md:text-2xl text-white/80 leading-relaxed ${isNumbered ? 'list-decimal' : 'list-disc'} list-outside ml-6`}>
          {listBuffer.map((item, i) => (
            <li key={i}>{item.text}</li>
          ))}
        </Tag>
      </motion.div>
    )
    listBuffer = []
  }

  for (const block of blocks) {
    if (block.type === 'bullet' || block.type === 'number') {
      if (listBuffer.length > 0 && listBuffer[0].type !== block.type) {
        flushList()
      }
      listBuffer.push(block)
    } else {
      flushList()
      const idx = animIndex++
      const style = block.style || 'normal'
      const className = styleClassMap[style] || styleClassMap.normal
      const Tag = style === 'h2' ? 'h2' : style === 'h3' ? 'h3' : style === 'h4' ? 'h4' : 'p'
      elements.push(
        <motion.div
          key={`p-${idx}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: idx * 0.1 }}
        >
          <Tag className={className}>{block.text}</Tag>
        </motion.div>
      )
    }
  }
  flushList()

  return <>{elements}</>
}
