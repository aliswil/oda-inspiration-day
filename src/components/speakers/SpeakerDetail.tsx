import { SpeakerHero } from './SpeakerHero'
import { SpeakerBio } from './SpeakerBio'
import type { Speaker } from '@/sanity/types'

export function SpeakerDetail({ speaker }: { speaker: Speaker }) {
  return (
    <article>
      <SpeakerHero speaker={speaker} />
      <SpeakerBio speaker={speaker} />
    </article>
  )
}
