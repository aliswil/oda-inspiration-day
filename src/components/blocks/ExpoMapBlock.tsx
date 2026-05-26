'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { cn } from '@/lib/utils'
import type { ExpoMapBlock as ExpoMapBlockType, ExpoStand } from '@/sanity/types'
import { ExpoMapFloor } from './ExpoMapFloor'
import { ExpoStandPopup } from './ExpoStandPopup'

export function ExpoMapBlock({ block }: { block: ExpoMapBlockType }) {
  const [activeFloor, setActiveFloor] = useState<1 | 2>(1)
  const [selectedStand, setSelectedStand] = useState<ExpoStand | null>(null)

  const stands = block.stands ?? []
  const floors: Array<1 | 2> = [1, 2]

  return (
    <SectionWrapper backgroundColor="cream">
      <Container>
        <AnimatedSection>
          {block.heading ? (
            <h2 className="text-3xl md:text-5xl font-black text-dark-blue mb-4 text-center">
              {block.heading}
            </h2>
          ) : null}
          {block.description ? (
            <p className="text-lg text-very-dark/70 text-center max-w-2xl mx-auto mb-10">
              {block.description}
            </p>
          ) : null}
        </AnimatedSection>

        <div className="flex justify-center gap-2 mb-8" role="tablist" aria-label="Select floor">
          {floors.map((floor) => (
            <button
              key={floor}
              role="tab"
              aria-selected={activeFloor === floor}
              onClick={() => { setActiveFloor(floor); setSelectedStand(null) }}
              className={cn(
                'px-6 py-2 rounded-full font-semibold text-sm transition-colors',
                activeFloor === floor
                  ? 'bg-dark-blue text-white'
                  : 'bg-lavender text-dark-blue hover:bg-lavender/60',
              )}
            >
              Floor {floor}
            </button>
          ))}
        </div>

        <ExpoMapFloor
          floor={activeFloor}
          stands={stands}
          selectedKey={selectedStand?._key ?? null}
          onSelect={setSelectedStand}
        />

        <p className="text-center text-very-dark/50 text-sm mt-4">
          Click a pin to learn more about the exhibitor
        </p>
      </Container>

      {selectedStand ? (
        <ExpoStandPopup
          stand={selectedStand}
          onClose={() => setSelectedStand(null)}
        />
      ) : null}
    </SectionWrapper>
  )
}
