/**
 * Hides the "Good food, good mood" quote block on the Food page.
 *
 * Usage: SANITY_TOKEN=<token> node scripts/migrate-food-hide-quote.mjs
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
  const page = await client.fetch(`*[_type == "page" && slug.current == "food"][0]{ _id, blocks }`)
  if (!page) { console.error('Food page not found.'); process.exit(1) }

  const blocks = page.blocks.map((b) =>
    b._type === 'quote' && b._key === 'quote1' ? { ...b, enabled: false } : b
  )

  await client.patch(page._id).set({ blocks }).commit()
  console.log('  ✓ Quote block hidden.')
}

main().catch((err) => { console.error(err); process.exit(1) })
