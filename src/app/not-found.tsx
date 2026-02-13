import Link from 'next/link'
import { Container } from '@/components/ui/Container'

export default function NotFound() {
  return (
    <Container className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-black text-dark-blue mb-4">404</h1>
        <p className="text-xl text-very-dark/60 mb-8">
          This page doesn&apos;t exist yet.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-red text-white rounded-full font-semibold hover:bg-red/90 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </Container>
  )
}
