/**
 * Adds a Startup Corner pin (#9) on floor 1 of the Expo map, with 4 featured
 * startup logos in the popup.
 *
 * Usage: SANITY_TOKEN=<token> node scripts/migrate-expo-startup-corner.mjs
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { basename, extname } from 'path'

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

const STARTUPS = [
  { name: 'Actential', path: '/Users/alis/Downloads/Actential_logo_blå.svg', darkBackground: false },
  { name: 'ByeByeApply', path: '/Users/alis/Downloads/ByeByeApply-wordmark-mono-white.svg', darkBackground: true },
  { name: 'Livity', path: '/Users/alis/Downloads/livity_logo.svg', darkBackground: false },
  { name: 'Repass', path: '/Users/alis/Downloads/Repass logo 1200 x 720.png', darkBackground: false },
]

function contentTypeFor(filepath) {
  const ext = extname(filepath).toLowerCase()
  if (ext === '.png') return 'image/png'
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg'
  if (ext === '.svg') return 'image/svg+xml'
  return 'application/octet-stream'
}

async function uploadImage(filepath) {
  const buffer = readFileSync(filepath)
  const asset = await client.assets.upload('image', buffer, {
    filename: basename(filepath),
    contentType: contentTypeFor(filepath),
  })
  console.log(`  uploaded ${basename(filepath)} -> ${asset._id}`)
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

function randKey() {
  return Math.random().toString(16).slice(2, 14)
}

async function main() {
  const pages = await client.fetch(`*[_type == "page" && slug.current == "expo"]{ _id }`)
  if (pages.length === 0) { console.error('Expo page not found.'); process.exit(1) }

  console.log('Uploading startup logos...')
  const startups = []
  for (const s of STARTUPS) {
    const logo = await uploadImage(s.path)
    startups.push({
      _key: randKey(),
      _type: 'startup',
      name: s.name,
      logo,
      darkBackground: s.darkBackground,
    })
  }

  const newStand = {
    _key: randKey(),
    _type: 'expoStand',
    standType: 'company',
    company: 'Startup Corner',
    description: 'Meet the featured startups in this year\'s Startup Corner.',
    floor: 1,
    standLabel: '9',
    x: 87,
    y: 40,
    startups,
  }

  for (const p of pages) {
    const doc = await client.fetch(`*[_id == $id][0]{ blocks }`, { id: p._id })
    const blocks = (doc.blocks || []).map((b) => {
      if (b._type !== 'expoMap') return b
      const existing = (b.stands || []).find((s) => s.standLabel === '9' && s.floor === 1)
      if (existing) return b // idempotent
      return { ...b, stands: [...(b.stands || []), newStand] }
    })
    await client.patch(p._id).set({ blocks }).commit()
    console.log(`  ✓ added Startup Corner pin to ${p._id}`)
  }
}

main().catch((err) => { console.error(err); process.exit(1) })
