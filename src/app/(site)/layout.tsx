import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MotionProvider } from '@/components/ui/MotionProvider'
import { sanityFetch } from '@/sanity/lib/fetch'
import { siteSettingsQuery } from '@/sanity/queries'
import { NAV_ITEMS, type NavItem } from '@/lib/constants'
import type { SanityLink, SocialLink } from '@/sanity/types'

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let navItems: NavItem[] = NAV_ITEMS
  let ticketUrl = '/tickets'
  let footerNavigation: SanityLink[] = []
  let socialLinks: SocialLink[] = []
  let contactEmail = ''

  try {
    const settings = await sanityFetch<Record<string, unknown>>({
      query: siteSettingsQuery,
      tags: ['sanity', 'siteSettings'],
    })
    if (settings?.navigation?.length) {
      navItems = settings.navigation
    }
    if (settings?.ticketUrl) {
      ticketUrl = settings.ticketUrl
    }
    if (settings?.footerNavigation?.length) {
      footerNavigation = settings.footerNavigation
    }
    if (settings?.socialLinks?.length) {
      socialLinks = settings.socialLinks
    }
    if (settings?.contactEmail) {
      contactEmail = settings.contactEmail
    }
  } catch { /* fall back to constants */ }

  return (
    <MotionProvider>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-dark-blue focus:text-white focus:rounded-lg">
        Skip to content
      </a>
      <Header navItems={navItems} ticketUrl={ticketUrl} />
      <main id="main-content" className="min-h-screen pt-16 md:pt-20">
        {children}
      </main>
      <Footer
        footerNavigation={footerNavigation}
        socialLinks={socialLinks}
        contactEmail={contactEmail}
      />
    </MotionProvider>
  )
}
