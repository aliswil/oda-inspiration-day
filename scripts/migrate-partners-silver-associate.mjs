/**
 * Uploads Silver and Associate partner logos, creates sponsor documents.
 *
 * Skips:
 *   - Fotoware "Svart" variant (duplicate of Fotoware)
 *   - Tryg in associate (already added as silver)
 *   - Any sponsor whose name already exists (case-insensitive)
 *
 * Usage: SANITY_TOKEN=<token> node scripts/migrate-partners-silver-associate.mjs
 */

import { createClient } from '@sanity/client'
import { readFileSync, readdirSync } from 'fs'
import { basename, extname, join } from 'path'

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

const SILVER_DIR = '/Users/alis/Downloads/Partner logoer sølv'
const ASSOC_DIR = '/Users/alis/Downloads/Partner logoer assosiert'

// filename → display name overrides for cases where the filename doesn't map cleanly
const NAME_OVERRIDES = {
  'akerbp': 'Aker BP',
  'cgi': 'CGI',
  'hpe': 'HPE',
  'sap-logo': 'SAP',
  'sap': 'SAP',
  'fremtind-forsikring-logo': 'Fremtind Forsikring',
  'mnemonic-as-vector-logo': 'mnemonic',
  'sparebanken vest': 'Sparebanken Vest',
  'computas-logo': 'Computas',
  'laerdal': 'Laerdal',
  'rema 1000': 'REMA 1000',
  'soco': 'SOCO',
  'dnv': 'DNV',
  'nav': 'NAV',
}

const SKIP_FILES = new Set([
  'fotoware_logo_svart.jpg',
])

function nameFromFilename(filename) {
  const stem = basename(filename, extname(filename)).toLowerCase()
  if (NAME_OVERRIDES[stem]) return NAME_OVERRIDES[stem]
  return basename(filename, extname(filename))
    .replace(/[-_]/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

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
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function main() {
  const existing = await client.fetch(`*[_type == "sponsor"]{ name }`)
  const existingNames = new Set(existing.map((s) => s.name.toLowerCase()))

  const tasks = []

  for (const file of readdirSync(SILVER_DIR).sort()) {
    if (SKIP_FILES.has(file.toLowerCase())) continue
    tasks.push({ tier: 'silver', file: join(SILVER_DIR, file), name: nameFromFilename(file) })
  }
  for (const file of readdirSync(ASSOC_DIR).sort()) {
    if (SKIP_FILES.has(file.toLowerCase())) continue
    tasks.push({ tier: 'associate', file: join(ASSOC_DIR, file), name: nameFromFilename(file) })
  }

  // Dedupe within batch by lowercase name (keeps the first occurrence, which is silver before associate)
  const seen = new Set()
  const deduped = tasks.filter((t) => {
    const key = t.name.toLowerCase()
    if (seen.has(key) || existingNames.has(key)) {
      console.log(`  skip duplicate: ${t.name}`)
      return false
    }
    seen.add(key)
    return true
  })

  console.log(`Uploading ${deduped.length} partner logos...`)

  let order = 1
  for (const t of deduped) {
    const logo = await uploadImage(t.file)
    await client.create({
      _type: 'sponsor',
      name: t.name,
      tier: t.tier,
      logo,
      order: order++,
    })
    console.log(`  ✓ ${t.tier.padEnd(10)} ${t.name}`)
  }

  console.log('Done.')
}

main().catch((err) => { console.error(err); process.exit(1) })
