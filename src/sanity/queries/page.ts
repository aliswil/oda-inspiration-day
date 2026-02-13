import { groq } from 'next-sanity'

const blockContentProjection = `
  ...,
  _type == "schedule" => {
    ...,
    sessions[] {
      ...,
      speaker-> { name, role, company, photo }
    }
  },
  _type == "imageGallery" => {
    ...,
    images[] { ..., asset-> }
  }
`

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id, title, "slug": slug.current,
    seo { title, description, "ogImage": ogImage.asset->url },
    blocks[] { ${blockContentProjection} }
  }
`

export const allPageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current)].slug.current
`

export const homePageQuery = groq`
  *[_type == "page" && slug.current == "home"][0] {
    _id, title, "slug": slug.current,
    seo { title, description, "ogImage": ogImage.asset->url },
    blocks[] { ${blockContentProjection} }
  }
`
