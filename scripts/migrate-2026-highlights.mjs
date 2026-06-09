/**
 * Post-event 2026 update. After Inspiration Day 2026:
 *   - Upload the arena header image + executive-summary PDF as Sanity assets.
 *   - Create the /2026-highlights page (hero header image + inline PDF block).
 *   - Home hero: replace the stream + ticket buttons with one "2026 Highlights" CTA.
 *   - Home "Can't attend?" stream section: hide it via the enabled:false toggle.
 *   - Navigation: remove the "Watch the stream" item.
 *   - Unpublish the /watch page (published:false) — the /watch route is retired in code.
 *
 * Workaround for this project: Editor tokens cannot mutate published docs
 * directly (Content Releases changed the permission model). We write a draft
 * via createOrReplace, then publish it via the Actions API. Asset uploads and
 * new-document creation use the same draft+publish flow.
 *
 * Usage: SANITY_TOKEN=<editor-token> node scripts/migrate-2026-highlights.mjs
 */

import { createClient } from '@sanity/client'
import { randomBytes } from 'crypto'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const PROJECT_ID = '8uk0dvi6'
const DATASET = 'production'
const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO = join(__dirname, '..')

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

const HIGHLIGHTS_SLUG = '2026-highlights'
const HEADER_IMAGE = join(REPO, 'media', '2026-highlights-header.jpg')
const PDF_FILE = join(REPO, 'media', 'oda-id-2026-executive-summary.pdf')
const PDF_DOWNLOAD_NAME = 'ODA-Inspiration-Day-2026-Executive-Summary.pdf'

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
          { actionType: 'sanity.action.document.publish', draftId, publishedId },
        ],
      }),
    }
  )
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Publish failed (${res.status}): ${body}`)
  }
}

// Write changes to an existing published doc via draft + publish.
async function patchAndPublish(publishedId, transform) {
  const current = await client.getDocument(publishedId)
  if (!current) throw new Error(`Document ${publishedId} not found`)
  const next = transform(current)
  const draftId = `drafts.${publishedId}`
  await client.createOrReplace({ ...next, _id: draftId })
  await publishDraft(draftId, publishedId)
}

async function uploadAssets() {
  console.log('Uploading header image…')
  const image = await client.assets.upload('image', readFileSync(HEADER_IMAGE), {
    filename: '2026-highlights-header.jpg',
  })
  console.log(`  ✓ image asset ${image._id}`)

  console.log('Uploading executive-summary PDF (~24 MB, this can take a moment)…')
  const file = await client.assets.upload('file', readFileSync(PDF_FILE), {
    filename: PDF_DOWNLOAD_NAME,
    contentType: 'application/pdf',
  })
  console.log(`  ✓ file asset ${file._id}`)

  return { imageId: image._id, fileId: file._id }
}

async function createHighlightsPage({ imageId, fileId }) {
  const existing = await client.fetch(
    `*[_type == "page" && slug.current == $slug][0]{_id}`,
    { slug: HIGHLIGHTS_SLUG }
  )
  if (existing) {
    console.log(`  · /${HIGHLIGHTS_SLUG} already exists — skipping create.`)
    return
  }

  const publishedId = randomBytes(12).toString('hex')
  const draftId = `drafts.${publishedId}`
  const doc = {
    _id: draftId,
    _type: 'page',
    published: true,
    title: '2026 Highlights',
    slug: { _type: 'slug', current: HIGHLIGHTS_SLUG },
    seo: {
      _type: 'seo',
      title: '2026 Highlights — ODA Inspiration Day',
      description:
        'Relive ODA Inspiration Day 2026 and read the executive summary. We will be back end of May 2027.',
    },
    blocks: [
      {
        _type: 'hero',
        _key: 'hero1',
        style: 'tall',
        heading: '2026 Highlights',
        subheading:
          'A look back at ODA Inspiration Day 2026 — read the executive summary below.',
        backgroundImage: {
          _type: 'image',
          asset: { _type: 'reference', _ref: imageId },
        },
      },
      {
        _type: 'pdfEmbed',
        _key: 'summary',
        enabled: true,
        heading: 'Executive Summary',
        downloadLabel: 'Download the summary (PDF)',
        file: { _type: 'file', asset: { _type: 'reference', _ref: fileId } },
      },
    ],
  }

  await client.createOrReplace(doc)
  await publishDraft(draftId, publishedId)
  console.log(`  ✓ Created and published /${HIGHLIGHTS_SLUG} (${publishedId}).`)
}

async function updateHome() {
  const home = await client.fetch(`*[_type == "page" && slug.current == "home"][0]{_id}`)
  if (!home) {
    console.error('Home page not found.')
    process.exit(1)
  }

  await patchAndPublish(home._id, (doc) => {
    const blocks = doc.blocks.map((b) => {
      // Hero: one "2026 Highlights" button instead of the stream + ticket CTAs.
      if (b._type === 'hero' && b._key === 'hero1') {
        const next = { ...b }
        delete next.secondaryCta
        next.cta = {
          _type: 'link',
          label: '2026 Highlights',
          href: `/${HIGHLIGHTS_SLUG}`,
          isExternal: false,
        }
        return next
      }
      // Stream promo section: hide (keep content, editor can re-enable).
      if (b._type === 'ctaSection' && b._key === 'streamCta') {
        return { ...b, enabled: false }
      }
      return b
    })
    return { ...doc, blocks }
  })
  console.log('  ✓ Home updated (hero CTA swapped, stream section hidden).')
}

async function updateNavigation() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{_id}`)
  if (!settings) {
    console.error('siteSettings not found.')
    process.exit(1)
  }

  await patchAndPublish(settings._id, (doc) => {
    const navigation = (doc.navigation || []).filter((n) => n.href !== '/watch')
    return { ...doc, navigation }
  })
  console.log('  ✓ Navigation updated ("Watch the stream" removed).')
}

async function unpublishWatch() {
  const watch = await client.fetch(`*[_type == "page" && slug.current == "watch"][0]{_id}`)
  if (!watch) {
    console.log('  · /watch page not found — skipping.')
    return
  }
  await patchAndPublish(watch._id, (doc) => ({ ...doc, published: false }))
  console.log('  ✓ /watch unpublished.')
}

async function main() {
  const assets = await uploadAssets()
  await createHighlightsPage(assets)
  await updateHome()
  await updateNavigation()
  await unpublishWatch()
  console.log('\nDone.')
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
