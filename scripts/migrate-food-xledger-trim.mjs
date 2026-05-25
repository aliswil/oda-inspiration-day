/**
 * Trims the Xledger sponsor sentence on the Pulled Beef Slider card.
 *
 * Usage: SANITY_TOKEN=<token> node scripts/migrate-food-xledger-trim.mjs
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

const NEW_TEXT = 'Proudly sponsored by Xledger — supporting ODA Inspiration Day.'

async function main() {
  const page = await client.fetch(`*[_type == "page" && slug.current == "food"][0]{ _id, blocks }`)
  if (!page) { console.error('Food page not found.'); process.exit(1) }

  const blocks = page.blocks.map((b) => {
    if (b._type !== 'cardGrid' || b._key !== 'menu1') return b
    return {
      ...b,
      cards: (b.cards || []).map((c) =>
        c.sponsor?.name === 'Xledger'
          ? { ...c, sponsor: { ...c.sponsor, text: NEW_TEXT } }
          : c
      ),
    }
  })

  await client.patch(page._id).set({ blocks }).commit()
  console.log('  ✓ Xledger sponsor sentence trimmed.')
}

main().catch((err) => { console.error(err); process.exit(1) })
