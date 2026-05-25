/**
 * Home page stream rollout:
 *   - Replaces the hero "Theme 2026" secondary CTA with a disabled
 *     "Stream (available from Friday)" button (href "#" = disabled).
 *   - Adds a new CTA section about the stream further down the page.
 *
 * Usage: SANITY_TOKEN=<token> node scripts/migrate-home-stream.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '8uk0dvi6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

if (!process.env.SANITY_TOKEN) {
  console.error('Missing SANITY_TOKEN.')
  process.exit(1)
}

const STREAM_LABEL = 'Stream (available from Friday)'

const streamCtaBlock = {
  _type: 'ctaSection',
  _key: 'streamCta',
  heading: 'Can\'t attend in person?',
  body: 'Don\'t worry — watch our groundbreaking program on stream for free. Link will be available from Friday 29th of May.',
  backgroundColor: 'lavender',
  cta: { _type: 'link', label: STREAM_LABEL, href: '#', isExternal: false },
}

async function main() {
  const page = await client.fetch(`*[_type == "page" && slug.current == "home"][0]{ _id, blocks }`)
  if (!page) { console.error('Home page not found.'); process.exit(1) }

  const blocks = page.blocks.map((b) =>
    b._type === 'hero' && b._key === 'hero1'
      ? { ...b, secondaryCta: { _type: 'link', label: STREAM_LABEL, href: '#', isExternal: false } }
      : b
  )

  const hasStream = blocks.some((b) => b._key === 'streamCta')
  if (!hasStream) {
    const galleryIdx = blocks.findIndex((b) => b._key === 'gallery1')
    const insertAfter = galleryIdx >= 0 ? galleryIdx + 1 : blocks.length
    blocks.splice(insertAfter, 0, streamCtaBlock)
  }

  await client.patch(page._id).set({ blocks }).commit()
  console.log('  ✓ Hero secondary CTA replaced with disabled Stream button.')
  console.log(`  ✓ Stream CTA section ${hasStream ? 'already present' : 'inserted after gallery'}.`)
}

main().catch((err) => { console.error(err); process.exit(1) })
