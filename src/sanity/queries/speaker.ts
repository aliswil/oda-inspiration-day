import { groq } from 'next-sanity'

const speakerFields = `
  _id, name, "slug": slug.current, role, company, photo, portraitCutout,
  secondaryPhoto, bio, presentationDescription, isLightningTalk, topic, videoUrl, linkedin
`

export const allSpeakersQuery = groq`
  *[_type == "speaker"] | order(name asc) { ${speakerFields} }
`

export const keynoteSpeakersQuery = groq`
  *[_type == "speaker" && isLightningTalk != true] | order(name asc) { ${speakerFields} }
`

export const lightningSpeakersQuery = groq`
  *[_type == "speaker" && isLightningTalk == true] | order(name asc) { ${speakerFields} }
`

export const speakerBySlugQuery = groq`
  *[_type == "speaker" && slug.current == $slug][0] { ${speakerFields} }
`

export const allSpeakerSlugsQuery = groq`
  *[_type == "speaker" && defined(slug.current)].slug.current
`
