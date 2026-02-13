'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { PortableTextRenderer } from '@/components/portable-text/PortableTextRenderer'
import { cn } from '@/lib/utils'
import type { FaqAccordionBlock as FaqAccordionBlockType } from '@/sanity/types'

export function FaqAccordionBlock({ block }: { block: FaqAccordionBlockType }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <SectionWrapper backgroundColor={block.backgroundColor}>
      <Container narrow>
        {block.heading && (
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-black text-dark-blue mb-12 text-center">
              {block.heading}
            </h2>
          </AnimatedSection>
        )}

        <div className="space-y-3">
          {block.items?.map((item, i) => (
            <AnimatedSection key={item._key} delay={i * 0.05} animation="fadeUp">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-bold text-dark-blue pr-4 text-lg">{item.question}</span>
                  <span className={cn(
                    'flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-lavender text-red transition-transform duration-300',
                    openIndex === i && 'rotate-45'
                  )}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="7" y1="0" x2="7" y2="14" />
                      <line x1="0" y1="7" x2="14" y2="7" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence>
                  {openIndex === i && item.answer && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-very-dark/70">
                        <PortableTextRenderer content={item.answer} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
