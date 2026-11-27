import type { HeroBlock } from '@/sanity/types'

type VideoStartFields = Pick<HeroBlock, 'backgroundVideoStart' | 'backgroundVideoDailyStep' | 'backgroundVideoLatestStart'>

const DAY_MS = 86_400_000
const osloDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Oslo' })

const toSeconds = (value?: number) => Math.max(0, Math.floor(value ?? 0))

// Days since 1970-01-01 by the Norwegian calendar, so the start changes at Oslo midnight.
function osloDayNumber(now: Date): number {
  return Math.floor(Date.parse(osloDate.format(now)) / DAY_MS)
}

/** Seconds into the video where today's first play begins. Loops play from 0:00 again. */
export function getVideoStart(fields: VideoStartFields, now = new Date()): number {
  const base = toSeconds(fields.backgroundVideoStart)
  const step = toSeconds(fields.backgroundVideoDailyStep)
  const latest = toSeconds(fields.backgroundVideoLatestStart)
  if (step === 0 || latest <= base) return base

  const positions = Math.floor((latest - base) / step) + 1
  return base + (osloDayNumber(now) % positions) * step
}
