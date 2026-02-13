import { groq } from 'next-sanity'

export const allSpeakersQuery = groq`
  *[_type == "speaker"] | order(name asc) {
    _id, name, role, company, photo, bio, isLightningTalk, topic, linkedin
  }
`

export const keynoteSpeakersQuery = groq`
  *[_type == "speaker" && isLightningTalk != true] | order(name asc) {
    _id, name, role, company, photo, bio, topic, linkedin
  }
`

export const lightningSpeakersQuery = groq`
  *[_type == "speaker" && isLightningTalk == true] | order(name asc) {
    _id, name, role, company, photo, bio, topic, linkedin
  }
`
