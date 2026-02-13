'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import type { StatsCounterBlock as StatsCounterBlockType, StatItem } from '@/sanity/types'

function Counter({ stat, inView }: { stat: StatItem; inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const target = stat.value
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, stat.value])

  return (
    <div className="text-center">
      <div className="text-5xl md:text-6xl lg:text-7xl font-black mb-2 tabular-nums">
        {count.toLocaleString()}{stat.suffix || ''}
      </div>
      <div className="text-sm md:text-base opacity-70 font-bold uppercase tracking-widest">
        {stat.label}
      </div>
    </div>
  )
}

export function StatsCounterBlock({ block }: { block: StatsCounterBlockType }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <SectionWrapper backgroundColor={block.backgroundColor}>
      <Container>
        {block.heading && (
          <h2 className="text-3xl md:text-5xl font-black mb-16 text-center">
            {block.heading}
          </h2>
        )}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {block.stats?.map((stat) => (
            <Counter key={stat._key} stat={stat} inView={inView} />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
