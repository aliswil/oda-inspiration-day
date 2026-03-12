import { SpeakerHero } from './SpeakerHero'
import { SpeakerBio } from './SpeakerBio'
import { SpeakerVideo } from './SpeakerVideo'
import type { Speaker } from '@/sanity/types'

export function SpeakerDetail({ speaker }: { speaker: Speaker }) {
  return (
    <article>
      <SpeakerHero speaker={speaker} />
      <SpeakerBio speaker={speaker} />
      {speaker.videoUrl && <SpeakerVideo url={speaker.videoUrl} name={speaker.name} />}
    </article>
  )
}
