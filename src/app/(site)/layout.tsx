import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { client } from '@/sanity/client'
import { siteSettingsQuery } from '@/sanity/queries'
import { NAV_ITEMS, type NavItem } from '@/lib/constants'

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let navItems: NavItem[] = NAV_ITEMS
  let ticketUrl = '/tickets'

  try {
    const settings = await client.fetch(siteSettingsQuery)
    if (settings?.navigation?.length) {
      navItems = settings.navigation
    }
    if (settings?.ticketUrl) {
      ticketUrl = settings.ticketUrl
    }
  } catch { /* fall back to constants */ }

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-dark-blue focus:text-white focus:rounded-lg">
        Skip to content
      </a>
      <Header navItems={navItems} ticketUrl={ticketUrl} />
      <main id="main-content" className="min-h-screen pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
    </>
  )
}
