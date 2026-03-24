'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const SLOTS = [
  { pos: 'top-[8%] left-[5%]', align: 'text-left', maxW: 'max-w-[55%]' },
  { pos: 'top-[20%] right-[5%]', align: 'text-right', maxW: 'max-w-[50%]' },
  { pos: 'top-[42%] left-[8%]', align: 'text-left', maxW: 'max-w-[55%]' },
  { pos: 'top-[55%] right-[8%]', align: 'text-right', maxW: 'max-w-[50%]' },
  { pos: 'top-[75%] left-[5%]', align: 'text-left', maxW: 'max-w-[55%]' },
]

const ACCENTS = ['text-red', 'text-lavender', 'text-mint', 'text-white/70']

type Slot = {
  id: number
  text: string
  slotIndex: number
  accent: string
}

export function ParadoxPulse({ heading, sentences }: { heading: string; sentences: string[] }) {
  const prefersReduced = useReducedMotion()
  const [slots, setSlots] = useState<(Slot | null)[]>(() => Array(SLOTS.length).fill(null))
  const idRef = useRef(0)
  const sentenceRef = useRef(0)

  useEffect(() => {
    if (sentences.length === 0) return

    const getNext = () => {
      const text = sentences[sentenceRef.current % sentences.length]
      sentenceRef.current++
      return text
    }

    // Initially fill 3 slots with staggered delays
    const initialTimers = [0, 1, 2].map((slotIndex) =>
      setTimeout(() => {
        setSlots((prev) => {
          const next = [...prev]
          next[slotIndex] = {
            id: idRef.current++,
            text: getNext(),
            slotIndex,
            accent: ACCENTS[Math.floor(Math.random() * ACCENTS.length)],
          }
          return next
        })
      }, slotIndex * 800)
    )

    // Each slot cycles independently at different intervals
    const baseDuration = prefersReduced ? 5000 : 3500
    const intervals = SLOTS.map((_, slotIndex) => {
      const offset = slotIndex * 1200 + 2000
      const duration = baseDuration + Math.random() * 2000

      return setInterval(() => {
        setSlots((prev) => {
          const next = [...prev]
          // Ensure at least 2 are always visible
          const filledCount = next.filter(Boolean).length
          const isCurrentFilled = next[slotIndex] !== null

          if (isCurrentFilled && filledCount <= 2) return next

          // Either fill an empty slot or swap a filled one
          if (!isCurrentFilled || Math.random() > 0.3) {
            next[slotIndex] = {
              id: idRef.current++,
              text: getNext(),
              slotIndex,
              accent: ACCENTS[Math.floor(Math.random() * ACCENTS.length)],
            }
          } else {
            next[slotIndex] = null
          }
          return next
        })
      }, duration + offset)
    })

    return () => {
      initialTimers.forEach(clearTimeout)
      intervals.forEach(clearInterval)
    }
  }, [sentences, prefersReduced])

  return (
    <section className="bg-very-dark py-16 md:py-24">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-white/40 text-sm uppercase tracking-[0.3em] text-center mb-10 font-bold"
      >
        {heading}
      </motion.h2>
      <div className="relative min-h-[35vh] md:min-h-[40vh] overflow-hidden px-4">
        <AnimatePresence>
          {slots.map((slot, i) => {
            if (!slot) return null
            const { pos, align, maxW } = SLOTS[i]
            return (
              <motion.p
                key={slot.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
                transition={{
                  duration: prefersReduced ? 5 : 3.5,
                  times: [0, 0.15, 0.8, 1],
                  ease: 'easeInOut',
                }}
                className={`absolute ${pos} ${align} ${maxW} ${slot.accent} text-xl md:text-2xl lg:text-3xl font-bold leading-snug`}
              >
                {slot.text}
              </motion.p>
            )
          })}
        </AnimatePresence>
      </div>
    </section>
  )
}
