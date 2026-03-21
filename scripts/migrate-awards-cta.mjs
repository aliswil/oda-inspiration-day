/**
 * Migration script: Adds a CTA Section block to the ODA Awards page
 * linking to https://odanettverk.no/initiativer/oda-prisen/
 *
 * Usage:
 *   SANITY_TOKEN=<your-token> node scripts/migrate-awards-cta.mjs
 *
 * Get a write token from: https://www.sanity.io/manage/project/8uk0dvi6/api#tokens
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
  console.error('Missing SANITY_TOKEN. Run with:\n  SANITY_TOKEN=<token> node scripts/migrate-awards-cta.mjs')
  process.exit(1)
}

async function migrateAwardsCta() {
  console.log('Finding ODA Awards page...')
  const page = await client.fetch(`*[_type == "page" && slug.current == "oda-awards"][0]{ _id, blocks }`)

  if (!page) {
    console.error('ODA Awards page not found in Sanity. Create it in the Studio first.')
    process.exit(1)
  }

  const existingBlocks = page.blocks || []

  // Check if a ctaSection already exists to avoid duplicates
  const hasCtaSection = existingBlocks.some((b) => b._type === 'ctaSection')
  if (hasCtaSection) {
    console.log('CTA Section block already exists on the awards page. Skipping.')
    return
  }

  const ctaBlock = {
    _type: 'ctaSection',
    _key: 'cta1',
    enabled: true,
    heading: 'Learn More About ODA-prisen',
    body: 'Discover the history, categories, and previous winners of the ODA Awards on our main site.',
    cta: { _type: 'link', label: 'Read more about ODA-prisen', href: 'https://odanettverk.no/initiativer/oda-prisen/', isExternal: true },
    backgroundColor: 'dark-blue',
  }

  console.log('Adding CTA Section block...')
  await client
    .patch(page._id)
    .set({ blocks: [...existingBlocks, ctaBlock] })
    .commit()

  console.log('Done! CTA Section added to the ODA Awards page.')
}

migrateAwardsCta().catch(console.error)
