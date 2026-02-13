import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-dark-blue focus:text-white focus:rounded-lg">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="min-h-screen pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
    </>
  )
}
