/**
 * Follow-up tweaks after migrate-stream-promote.mjs:
 *   - Replace em-dash with comma in the "Don't worry" body copy (home + /watch).
 *   - Mark the /watch ctaSection as fullHeight so the lavender background fills
 *     the whole viewport (no cream gap below).
 *   - Move the "Watch the stream" nav item to the end of the navigation array,
 *     so it sits immediately to the left of the header's Tickets button.
 *
 * Uses draft + Actions API publish (Editor tokens can't mutate published docs
 * directly on this project — see scripts/migrate-stream-promote.mjs).
 *
 * Usage: SANITY_TOKEN=<editor-token> node scripts/migrate-stream-tweaks.mjs
 */

import { createClient } from '@sanity/client'

const PROJECT_ID = '8uk0dvi6'
const DATASET = 'production'

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

if (!process.env.SANITY_TOKEN) {
  console.error('Missing SANITY_TOKEN.')
  process.exit(1)
}

const STREAM_BODY = "Don't worry, watch our groundbreaking program on stream for free."

async function publishDraft(draftId, publishedId) {
  const res = await fetch(
    `https://${PROJECT_ID}.api.sanity.io/v2024-10-01/data/actions/${DATASET}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.SANITY_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        actions: [{ actionType: 'sanity.action.document.publish', draftId, publishedId }],
      }),
    }
  )
  if (!res.ok) throw new Error(`Publish failed (${res.status}): ${await res.text()}`)
}

async function patchAndPublish(publishedId, transform) {
  const current = await client.getDocument(publishedId)
  if (!current) throw new Error(`Document ${publishedId} not found`)
  const next = transform(current)
  if (next === current) return false
  const draftId = `drafts.${publishedId}`
  await client.createOrReplace({ ...next, _id: draftId })
  await publishDraft(draftId, publishedId)
  return true
}

async function updateHome() {
  const home = await client.fetch(`*[_type == "page" && slug.current == "home"][0]{_id}`)
  if (!home) { console.error('Home page not found.'); process.exit(1) }

  await patchAndPublish(home._id, (doc) => ({
    ...doc,
    blocks: doc.blocks.map((b) =>
      b._type === 'ctaSection' && b._key === 'streamCta'
        ? { ...b, body: STREAM_BODY }
        : b
    ),
  }))
  console.log('  ✓ Home streamCta body updated (em-dash → comma).')
}

async function updateWatchPage() {
  const watch = await client.fetch(`*[_type == "page" && slug.current == "watch"][0]{_id}`)
  if (!watch) { console.error('/watch page not found.'); process.exit(1) }

  await patchAndPublish(watch._id, (doc) => ({
    ...doc,
    blocks: doc.blocks.map((b) =>
      b._type === 'ctaSection'
        ? { ...b, body: STREAM_BODY, fullHeight: true }
        : b
    ),
  }))
  console.log('  ✓ /watch ctaSection: body updated + fullHeight enabled.')
}

async function reorderNav() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{_id}`)
  if (!settings) { console.error('siteSettings not found.'); process.exit(1) }

  await patchAndPublish(settings._id, (doc) => {
    const nav = doc.navigation || []
    const idx = nav.findIndex((n) => n.href === '/watch')
    if (idx === -1) {
      console.log('  · /watch nav item missing — nothing to reorder.')
      return doc
    }
    if (idx === nav.length - 1) {
      console.log('  · /watch nav item already last — skipping.')
      return doc
    }
    const [item] = nav.splice(idx, 1)
    nav.push(item)
    return { ...doc, navigation: nav }
  })
  console.log('  ✓ /watch nav item moved to end of navigation.')
}

async function main() {
  await updateHome()
  await updateWatchPage()
  await reorderNav()
  console.log('\nDone.')
}

main().catch((err) => { console.error(err.message || err); process.exit(1) })
