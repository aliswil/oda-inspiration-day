'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { urlFor } from '@/sanity/image'
import type { ExpoStand } from '@/sanity/types'

type Props = { stand: ExpoStand; onClose: () => void }

export function ExpoStandPopup({ stand, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const logoUrl = stand.logo?.asset
    ? urlFor(stand.logo).width(480).auto('format').url()
    : null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={stand.company}
    >
      <div className="absolute inset-0 bg-very-dark/60 backdrop-blur-sm" aria-hidden="true" />

      <div
        className="relative z-10 bg-cream rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-[fade-up_0.2s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-very-dark/50 hover:text-very-dark hover:bg-lavender/40 transition-colors"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {logoUrl ? (
          <div className="mb-4">
            <Image
              src={logoUrl}
              alt={`${stand.company} logo`}
              width={240}
              height={120}
              style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '96px' }}
            />
          </div>
        ) : null}

        <div className="flex items-center gap-3 mb-2">
          {stand.standLabel ? (
            <span
              className={`inline-flex items-center justify-center w-9 h-9 rounded-full font-black text-sm shrink-0 ${
                stand.standType === 'food' ? 'bg-dark-blue text-white' : 'bg-mint text-dark-blue'
              }`}
              aria-label={`Stand number ${stand.standLabel}`}
            >
              {stand.standLabel}
            </span>
          ) : null}
          <h3 className="font-black text-xl text-dark-blue">{stand.company}</h3>
        </div>

        {stand.description ? (
          <p className="text-very-dark/75 text-sm leading-relaxed mb-4">{stand.description}</p>
        ) : null}

        {stand.websiteUrl ? (
          <a
            href={stand.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-dark-blue text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-very-dark transition-colors"
          >
            Visit website
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        ) : null}
      </div>
    </div>
  )
}
