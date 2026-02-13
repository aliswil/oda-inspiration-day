'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { NAV_ITEMS } from '@/lib/constants'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header role="banner" className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-lg border-b border-dark-blue/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logos/oda-id-logo.svg"
              alt="ODA Inspiration Day 2026"
              width={160}
              height={40}
              className="h-8 md:h-10 w-auto"
              priority
            />
          </Link>

          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-semibold text-dark-blue hover:text-red transition-colors rounded-lg hover:bg-dark-blue/5"
              >
                {item.label}
              </Link>
            ))}
            <Button href="/tickets" size="sm" className="ml-3">
              Get Tickets
            </Button>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-dark-blue"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-cream border-t border-dark-blue/10 overflow-hidden"
          >
            <nav aria-label="Mobile navigation" className="px-4 py-6 space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-lg font-medium text-dark-blue hover:text-red hover:bg-dark-blue/5 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 px-4">
                <Button href="/tickets" className="w-full">
                  Get Tickets
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
