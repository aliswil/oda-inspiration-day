import { groq } from 'next-sanity'

const blockContentProjection = `
  ...,
  _type == "schedule" => {
    ...,
    sessions[] {
      _key, time, title, description, location, linkUrl, linkLabel,
      "format": format-> { title, "slug": slug.current, color, isBreak, isSideEvent },
      "speakers": speakers[]-> { _id, name, role, company, "slug": slug.current, photo },
      "topics": topics[]-> { _id, title, "slug": slug.current }
    }
  },
  _type == "imageGallery" => {
    ...,
    images[] { ..., asset-> }
  }
`

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug && published != false][0] {
    _id, title, "slug": slug.current,
    seo { title, description, "ogImage": ogImage.asset->url },
    blocks[] { ${blockContentProjection} }
  }
`

export const allPageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current) && published != false].slug.current
`

export const homePageQuery = groq`
  *[_type == "page" && slug.current == "home"][0] {
    _id, title, "slug": slug.current,
    seo { title, description, "ogImage": ogImage.asset->url },
    blocks[] { ${blockContentProjection} }
  }
`

export const themePageQuery = groq`
  *[_type == "page" && slug.current == "theme"][0] {
    _id, title, "slug": slug.current,
    seo { title, description, "ogImage": ogImage.asset->url },
    blocks[] { ... }
  }
`

export const whyAttendPageQuery = groq`
  *[_type == "page" && slug.current == "why-attend"][0] {
    _id, title, "slug": slug.current,
    seo { title, description, "ogImage": ogImage.asset->url },
    blocks[] { ... }
  }
`
