'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import type { NavItem } from '@/lib/constants'

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined)

  function enter() {
    clearTimeout(timeout.current)
    setOpen(true)
  }
  function leave() {
    timeout.current = setTimeout(() => setOpen(false), 150)
  }

  useEffect(() => () => clearTimeout(timeout.current), [])

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        className="px-3 py-2 text-sm font-semibold text-dark-blue hover:text-red transition-colors rounded-lg hover:bg-dark-blue/5 flex items-center gap-1"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {item.label}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M3 5l3 3 3-3" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-dark-blue/10 py-2 min-w-[160px]"
          >
            {item.children!.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="block px-4 py-2 text-sm font-medium text-dark-blue hover:text-red hover:bg-dark-blue/5 transition-colors"
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileDropdown({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-lg font-medium text-dark-blue hover:text-red hover:bg-dark-blue/5 rounded-lg transition-colors"
        aria-expanded={open}
      >
        {item.label}
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M3 5l3 3 3-3" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {item.children!.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={onNavigate}
                className="block pl-8 pr-4 py-2.5 text-base font-medium text-dark-blue/70 hover:text-red hover:bg-dark-blue/5 rounded-lg transition-colors"
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Header({ navItems, ticketUrl }: { navItems: NavItem[]; ticketUrl: string }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header role="banner" className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-lg border-b border-dark-blue/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logos/oda-id-logo.svg"
              alt="ODA Inspiration Day"
              width={160}
              height={40}
              className="h-8 md:h-10 w-auto"
              priority
            />
          </Link>

          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.children?.length ? (
                <DesktopDropdown key={item.label} item={item} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-sm font-semibold text-dark-blue hover:text-red transition-colors rounded-lg hover:bg-dark-blue/5"
                >
                  {item.label}
                </Link>
              )
            )}
            <Button href={ticketUrl} size="sm" className="ml-3">
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
              {navItems.map((item) =>
                item.children?.length ? (
                  <MobileDropdown key={item.label} item={item} onNavigate={() => setMobileOpen(false)} />
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-lg font-medium text-dark-blue hover:text-red hover:bg-dark-blue/5 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="pt-4 px-4">
                <Button href={ticketUrl} className="w-full">
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
