'use client'

import { motion } from 'framer-motion'
import type { ManifestoBlock } from './ThemePageContent'

const styleClassMap: Record<string, string> = {
  normal: 'text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed',
  h2: 'text-3xl md:text-4xl lg:text-5xl text-white font-black leading-tight',
  h3: 'text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-tight',
  h4: 'text-xl md:text-2xl lg:text-3xl text-white font-bold leading-snug',
  blockquote: 'text-xl md:text-2xl text-white/60 leading-relaxed italic border-l-4 border-lavender pl-6',
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.7 },
}

export function ManifestoContent({ blocks }: { blocks: ManifestoBlock[] }) {
  const elements: React.ReactNode[] = []
  let listBuffer: ManifestoBlock[] = []

  function flushList() {
    if (listBuffer.length === 0) return
    const isNumbered = listBuffer[0].type === 'number'
    const Tag = isNumbered ? 'ol' : 'ul'
    elements.push(
      <motion.div key={`list-${elements.length}`} {...fadeIn}>
        <Tag className={`space-y-4 ${isNumbered ? 'list-decimal' : 'list-disc'} list-outside ml-6`}>
          {listBuffer.map((item, i) => {
            const cls = styleClassMap[item.style || 'normal'] || styleClassMap.normal
            return <li key={i} className={cls}>{item.text}</li>
          })}
        </Tag>
      </motion.div>
    )
    listBuffer = []
  }

  for (const block of blocks) {
    if (block.type === 'bullet' || block.type === 'number') {
      if (listBuffer.length > 0 && listBuffer[0].type !== block.type) flushList()
      listBuffer.push(block)
    } else {
      flushList()
      const style = block.style || 'normal'
      const className = styleClassMap[style] || styleClassMap.normal
      const Tag = style === 'h2' ? 'h2' : style === 'h3' ? 'h3' : style === 'h4' ? 'h4' : 'p'
      elements.push(
        <motion.div key={`p-${elements.length}`} {...fadeIn}>
          <Tag className={className}>{block.text}</Tag>
        </motion.div>
      )
    }
  }
  flushList()

  return <>{elements}</>
}
