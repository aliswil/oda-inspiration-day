'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { ExpoStand } from '@/sanity/types'

type Props = {
  floor: 1 | 2
  stands: ExpoStand[]
  selectedKey: string | null
  onSelect: (stand: ExpoStand) => void
}

export function ExpoMapFloor({ floor, stands, selectedKey, onSelect }: Props) {
  const visible = stands.filter((s) => s.floor === floor)
  const src = floor === 1 ? '/images/expo-non-floor1.png' : '/images/expo-non-floor2.png'

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-lavender/30 border border-lavender" style={{ aspectRatio: '4500 / 5626' }}>
      <Image
        key={src}
        src={src}
        alt={`Expo floor ${floor} map`}
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, 80vw"
        priority={floor === 1}
      />

      {visible.map((stand) => (
        <button
          key={stand._key}
          style={{ left: `${stand.x}%`, top: `${stand.y}%` }}
          onClick={() => onSelect(stand)}
          aria-label={stand.company}
          aria-pressed={selectedKey === stand._key}
          className={cn(
            'absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-lg',
            'transition-all duration-150 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-blue focus-visible:ring-offset-2',
            'flex items-center justify-center',
            selectedKey === stand._key
              ? 'bg-red w-5 h-5 sm:w-11 sm:h-11 scale-110'
              : stand.standType === 'food' ? 'bg-dark-blue w-4 h-4 sm:w-9 sm:h-9' : 'bg-mint w-4 h-4 sm:w-9 sm:h-9',
          )}
        >
          {stand.standLabel ? (
            <span className={cn('text-[9px] font-black leading-none select-none', stand.standType === 'food' ? 'text-white' : 'text-dark-blue')}>
              {stand.standLabel}
            </span>
          ) : null}

          {/* Pulse ring for unselected pins */}
          {selectedKey !== stand._key && (
            <span className={cn('absolute -inset-1 rounded-full animate-pulse', stand.standType === 'food' ? 'bg-dark-blue/20' : 'bg-mint/50')} aria-hidden="true" />
          )}
        </button>
      ))}
    </div>
  )
}
