import { getVideoStart } from '@/lib/videoStart'
import type { HeroBlock as HeroBlockType } from '@/sanity/types'
import { HeroBlock } from './HeroBlock'

// Picks today's video start on the server, so the cached HTML and the browser always agree on it.
export function HeroBlockServer({ block }: { block: HeroBlockType }) {
  return <HeroBlock block={block} videoStart={getVideoStart(block)} />
}
