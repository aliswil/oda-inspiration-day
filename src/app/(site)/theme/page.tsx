import { ThemePageContent } from '@/components/theme/ThemePageContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Digital Paradox — ODA Inspiration Day 2026',
  description:
    'Technology promises to unite us — yet it can divide. At ODA Inspiration Day 2026, we confront the Digital Paradox: the tension between what technology promises and what it delivers.',
  openGraph: {
    title: 'Digital Paradox — ODA Inspiration Day 2026',
    description:
      'The tension between what technology promises and what it delivers when the people building it don\'t reflect the world using it.',
  },
}

export default function ThemePage() {
  return <ThemePageContent />
}
