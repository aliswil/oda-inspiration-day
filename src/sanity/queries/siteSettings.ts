import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName, siteDescription,
    navigation[] { label, href, children[] { label, href, isExternal } },
    footerNavigation[] { label, href, isExternal },
    socialLinks[] { platform, url },
    defaultSeo { title, description, "ogImage": ogImage.asset->url },
    ticketUrl, contactEmail
  }
`
