import { timingSafeEqual } from 'node:crypto'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

function isValidSecret(provided: string | null): boolean {
  const expected = process.env.SANITY_REVALIDATE_SECRET
  if (!expected || !provided) return false
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function POST(req: NextRequest) {
  if (!isValidSecret(req.nextUrl.searchParams.get('secret'))) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    revalidateTag('sanity', 'max')
    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
