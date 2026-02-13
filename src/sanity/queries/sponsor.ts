import { groq } from 'next-sanity'

export const allSponsorsQuery = groq`
  *[_type == "sponsor"] | order(order asc, name asc) {
    _id, name, logo, tier, url
  }
`

export const sponsorsByTierQuery = groq`
  *[_type == "sponsor" && tier == $tier] | order(order asc, name asc) {
    _id, name, logo, tier, url
  }
`
