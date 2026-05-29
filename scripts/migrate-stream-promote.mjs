/**
 * Stream is live — promote it across the site:
 *   - Home hero: swap CTAs so the stream becomes the primary (prominent) CTA
 *     and "Get Tickets" becomes the secondary outline button.
 *   - Home streamCta section: relabel button to "Watch the stream" and refresh
 *     body copy (Friday-availability line is now stale).
 *   - Site navigation: prepend a "Watch the stream" item pointing to /watch.
 *   - Create a new /watch page that reuses the stream CTA section.
 *
 * Workaround for this project: Editor tokens cannot mutate published docs
 * directly (Content Releases changed the permission model). We instead write
 * a draft via createOrReplace, then publish it via the Actions API.
 *
 * Usage: SANITY_TOKEN=<editor-token> node scripts/migrate-stream-promote.mjs
 */

import { createClient } from '@sanity/client'
import { randomBytes } from 'crypto'

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

const STREAM_URL = 'https://embed.plaii.no/fbaaecc4f2/'
const STREAM_LABEL = 'Watch the stream'
const TICKET_URL = '/tickets'
const TICKET_LABEL = 'Get Tickets'
const STREAM_BODY = "Don't worry — watch our groundbreaking program on stream for free."

// Publish a draft via the Sanity Actions API.
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
        actions: [
          {
            actionType: 'sanity.action.document.publish',
            draftId,
            publishedId,
          },
        ],
      }),
    }
  )
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Publish failed (${res.status}): ${body}`)
  }
}

// Write changes via draft + publish.
async function patchAndPublish(publishedId, transform) {
  const current = await client.getDocument(publishedId)
  if (!current) throw new Error(`Document ${publishedId} not found`)
  const next = transform(current)
  const draftId = `drafts.${publishedId}`
  await client.createOrReplace({ ...next, _id: draftId })
  await publishDraft(draftId, publishedId)
}

async function updateHome() {
  const home = await client.fetch(`*[_type == "page" && slug.current == "home"][0]{_id}`)
  if (!home) { console.error('Home page not found.'); process.exit(1) }

  await patchAndPublish(home._id, (doc) => {
    const blocks = doc.blocks.map((b) => {
      if (b._type === 'hero' && b._key === 'hero1') {
        return {
          ...b,
          cta: { _type: 'link', label: STREAM_LABEL, href: STREAM_URL, isExternal: true },
          secondaryCta: { _type: 'link', label: TICKET_LABEL, href: TICKET_URL, isExternal: false },
        }
      }
      if (b._type === 'ctaSection' && b._key === 'streamCta') {
        return {
          ...b,
          body: STREAM_BODY,
          cta: { _type: 'link', label: STREAM_LABEL, href: STREAM_URL, isExternal: true },
        }
      }
      return b
    })
    return { ...doc, blocks }
  })
  console.log('  ✓ Home page updated and published.')
}

async function updateNavigation() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{_id}`)
  if (!settings) { console.error('siteSettings not found.'); process.exit(1) }

  await patchAndPublish(settings._id, (doc) => {
    const nav = doc.navigation || []
    if (nav.some((n) => n.href === '/watch')) {
      console.log('  · Navigation already has /watch item — leaving as-is.')
      return doc
    }
    const newItem = {
      _key: 'nav-watch-stream',
      _type: 'navItem',
      label: STREAM_LABEL,
      href: '/watch',
    }
    return { ...doc, navigation: [newItem, ...nav] }
  })
  console.log('  ✓ siteSettings updated and published.')
}

async function createWatchPage() {
  const existing = await client.fetch(`*[_type == "page" && slug.current == "watch"][0]{_id}`)
  if (existing) {
    console.log('  · /watch page already exists — skipping.')
    return
  }

  const publishedId = randomBytes(12).toString('hex')
  const draftId = `drafts.${publishedId}`
  const doc = {
    _id: draftId,
    _type: 'page',
    published: true,
    title: 'Watch the stream',
    slug: { _type: 'slug', current: 'watch' },
    seo: {
      _type: 'seo',
      title: 'Watch the stream — ODA Inspiration Day',
      description: "Can't attend in person? Watch our groundbreaking program on stream for free.",
    },
    blocks: [
      {
        _type: 'ctaSection',
        _key: 'watchStreamCta',
        heading: "Can't attend in person?",
        body: STREAM_BODY,
        backgroundColor: 'lavender',
        cta: { _type: 'link', label: STREAM_LABEL, href: STREAM_URL, isExternal: true },
      },
    ],
  }

  await client.createOrReplace(doc)
  await publishDraft(draftId, publishedId)
  console.log(`  ✓ Created and published /watch page (${publishedId}).`)
}

async function main() {
  await updateHome()
  await updateNavigation()
  await createWatchPage()
  console.log('\nDone.')
}

main().catch((err) => { console.error(err.message || err); process.exit(1) })
