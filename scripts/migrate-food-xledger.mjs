/**
 * Adds Xledger sponsor to the Pulled Beef Slider card,
 * appends an Image Gallery block with food photos,
 * and adds the gluten-free / dairy-free sentence to the Lunch Menu intro.
 *
 * Usage: SANITY_TOKEN=<token> node scripts/migrate-food-xledger.mjs
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
  console.error('Missing SANITY_TOKEN. Run with:\n  SANITY_TOKEN=<token> node scripts/migrate-food-xledger.mjs')
  process.exit(1)
}

const IMG_DIR = '/Users/alis/.claude/image-cache/eec780e0-9860-4516-a40c-869506cfefde'
const XLEDGER_LOGO = `${IMG_DIR}/5.png`

const FOOD_PHOTOS = [
  { path: `${IMG_DIR}/1.jpeg`, alt: 'The Food Hub Vegan Bowl stand at ODA Inspiration Day' },
  { path: `${IMG_DIR}/2.jpeg`, alt: 'Pulled Beef Sliders under warming lamps at The Food Hub stand' },
  { path: `${IMG_DIR}/3.jpeg`, alt: 'Poké Bowls served at The Food Hub stand' },
  { path: `${IMG_DIR}/4.jpeg`, alt: 'Close-up of Poké Bowls with salmon, edamame and pickled vegetables' },
]

const SPONSOR_SENTENCE =
  'Proudly sponsored by Xledger — supporting ODA Inspiration Day and the women shaping the future of business technology.'

const GLUTEN_DAIRY_SENTENCE =
  'We will also be making gluten-free and dairy-free variants, so there is something for everyone.'

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
  console.log(`  Uploaded: ${basename(filepath)} -> ${asset._id}`)
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

function span(key, text, marks) {
  return { _type: 'span', _key: key, text, ...(marks ? { marks } : {}) }
}
function block(key, style, children, extra = {}) {
  return { _type: 'block', _key: key, style: style || 'normal', children, markDefs: [], ...extra }
}

async function main() {
  const page = await client.fetch(`*[_type == "page" && slug.current == "food"][0]{ _id, blocks }`)
  if (!page) {
    console.error('Food page not found.')
    process.exit(1)
  }

  console.log('Uploading Xledger logo...')
  const xledgerLogo = await uploadImage(XLEDGER_LOGO)
  xledgerLogo.alt = 'Xledger'

  console.log('Uploading food photos...')
  const foodImages = []
  for (const photo of FOOD_PHOTOS) {
    const img = await uploadImage(photo.path)
    foodImages.push({ ...img, _key: `food-${foodImages.length + 1}`, alt: photo.alt })
  }

  const blocks = page.blocks.map((b) => {
    if (b._type === 'richText' && b._key === 'menuIntro') {
      const hasSentence = (b.content || []).some((blk) =>
        (blk.children || []).some((c) => c.text && c.text.includes('gluten-free'))
      )
      if (hasSentence) return b
      return {
        ...b,
        content: [
          ...(b.content || []),
          block('gf1', 'normal', [span('gf1s', GLUTEN_DAIRY_SENTENCE)]),
        ],
      }
    }

    if (b._type === 'cardGrid' && b._key === 'menu1') {
      return {
        ...b,
        cards: (b.cards || []).map((c) =>
          c._key === 'm1'
            ? {
                ...c,
                sponsor: {
                  _type: 'object',
                  name: 'Xledger',
                  logo: { ...xledgerLogo, alt: 'Xledger' },
                  text: SPONSOR_SENTENCE,
                  url: 'https://www.xledger.com/no/',
                },
              }
            : c
        ),
      }
    }

    return b
  })

  if (!blocks.some((b) => b._type === 'imageGallery' && b._key === 'foodGallery')) {
    const ctaIdx = blocks.findIndex((b) => b._type === 'ctaSection' && b._key === 'cta1')
    const gallery = {
      _type: 'imageGallery',
      _key: 'foodGallery',
      heading: 'A taste of the day',
      layout: 'masonry',
      columns: 3,
      images: foodImages,
    }
    if (ctaIdx >= 0) blocks.splice(ctaIdx, 0, gallery)
    else blocks.push(gallery)
  }

  await client.patch(page._id).set({ blocks }).commit()
  console.log('  ✓ Food page updated with Xledger sponsor, food gallery, and dietary note.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
