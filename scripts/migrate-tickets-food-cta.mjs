/**
 * Adds a "Food Included" CTA section to the Tickets page, linking to /food.
 * Inserts it right after the "What's Included" card grid.
 *
 * Usage: SANITY_TOKEN=<token> node scripts/migrate-tickets-food-cta.mjs
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

async function main() {
  const page = await client.fetch(`*[_type == "page" && slug.current == "tickets"][0]{_id, blocks}`)
  if (!page) { console.error('Tickets page not found.'); process.exit(1) }

  const blocks = [...page.blocks]

  if (blocks.some((b) => b._key === 'ctaFood')) {
    console.log('  Food CTA already present — skipping')
    return
  }

  const foodCta = {
    _type: 'ctaSection',
    _key: 'ctaFood',
    heading: 'Lunch is on Us',
    body: 'New this year, lunch is included in your ticket. Served by The Food Hub, our sustainable catering partner in Oslo.',
    backgroundColor: 'mint',
    cta: { _type: 'link', label: 'See the Menu', href: '/food', isExternal: false },
  }

  const gridIdx = blocks.findIndex((b) => b._key === 'inclusions1')
  const insertAt = gridIdx === -1 ? blocks.length : gridIdx + 1
  blocks.splice(insertAt, 0, foodCta)

  await client.patch(page._id).set({ blocks }).commit()
  console.log('  ✓ Added Food CTA to Tickets page')
}

main().catch((err) => { console.error(err); process.exit(1) })
