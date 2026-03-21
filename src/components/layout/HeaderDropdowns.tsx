'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { NavItem } from '@/lib/constants'

export function DesktopDropdown({ item }: { item: NavItem }) {
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
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
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

export function MobileDropdown({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-lg font-medium text-dark-blue hover:text-red hover:bg-dark-blue/5 rounded-lg transition-colors"
        aria-expanded={open}
      >
        {item.label}
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
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
