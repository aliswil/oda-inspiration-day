/**
 * Removes all hyphens and em dashes from Food page copy.
 *
 * Usage: SANITY_TOKEN=<token> node scripts/migrate-food-dashes.mjs
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

// Strip hyphens and em dashes from any user-facing string.
// " — ", " - " → ", "
// Standalone "—" or "-" between words → ", "
// Hyphens inside compound words → space
function stripDashes(s) {
  if (typeof s !== 'string') return s
  return s
    .replace(/\s+[—–-]\s+/g, ', ')
    .replace(/[—–]/g, ', ')
    .replace(/-/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/ ,/g, ',')
    .trim()
}

function cleanChildren(children) {
  if (!Array.isArray(children)) return children
  return children.map((c) =>
    c._type === 'span' ? { ...c, text: stripDashes(c.text) } : c
  )
}

function cleanPortableText(content) {
  if (!Array.isArray(content)) return content
  return content.map((b) =>
    b._type === 'block' ? { ...b, children: cleanChildren(b.children) } : b
  )
}

function cleanBlock(b) {
  const next = { ...b }
  if (typeof next.heading === 'string') next.heading = stripDashes(next.heading)
  if (typeof next.subheading === 'string') next.subheading = stripDashes(next.subheading)
  if (typeof next.body === 'string') next.body = stripDashes(next.body)
  if (typeof next.text === 'string') next.text = stripDashes(next.text)
  if (typeof next.author === 'string') next.author = stripDashes(next.author)
  if (Array.isArray(next.content)) next.content = cleanPortableText(next.content)
  if (Array.isArray(next.cards)) {
    next.cards = next.cards.map((c) => ({
      ...c,
      title: typeof c.title === 'string' ? stripDashes(c.title) : c.title,
      description: cleanPortableText(c.description),
    }))
  }
  return next
}

async function main() {
  const page = await client.fetch(`*[_type == "page" && slug.current == "food"][0]{_id, blocks}`)
  if (!page) { console.error('Food page not found.'); process.exit(1) }

  const blocks = page.blocks.map(cleanBlock)
  await client.patch(page._id).set({ blocks }).commit()
  console.log('  ✓ Dashes removed across Food page')
}

main().catch((err) => { console.error(err); process.exit(1) })
