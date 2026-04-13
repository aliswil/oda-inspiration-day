/**
 * Migration script: Creates the Food page and adds it under the About nav dropdown.
 *
 * Usage:
 *   SANITY_TOKEN=<your-token> node scripts/migrate-food.mjs
 *
 * Get a write token from: https://www.sanity.io/manage/project/8uk0dvi6/api#tokens
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { basename } from 'path'

const client = createClient({
  projectId: '8uk0dvi6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

if (!process.env.SANITY_TOKEN) {
  console.error('Missing SANITY_TOKEN. Run with:\n  SANITY_TOKEN=<token> node scripts/migrate-food.mjs')
  process.exit(1)
}

const HERO_IMAGE_PATH = '/Users/alis/Projects/ID/media/DSC04343.jpg'

async function uploadImage(filepath) {
  const buffer = readFileSync(filepath)
  const asset = await client.assets.upload('image', buffer, {
    filename: basename(filepath),
    contentType: 'image/jpeg',
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

function richTextDescription(key, text) {
  return [block(`${key}b`, 'normal', [span(`${key}s`, text)])]
}

async function createFoodPage() {
  console.log('Checking for existing Food page...')
  const existing = await client.fetch(`*[_type == "page" && slug.current == "food"][0]{ _id }`)
  if (existing) {
    console.log(`  Food page already exists (${existing._id}) — skipping creation.`)
    return existing._id
  }

  console.log('Uploading hero image...')
  const heroImage = await uploadImage(HERO_IMAGE_PATH)

  console.log('Creating Food page...')

  const blocks = [
    {
      _type: 'hero',
      _key: 'hero1',
      heading: 'Good Food, Good Mood',
      subheading: 'Lunch at Oslo Concert Hall — served by The Food Hub, a partner that puts people, planet, and flavour first.',
      style: 'medium',
      backgroundImage: heroImage,
      cta: { _type: 'link', label: 'Visit The Food Hub', href: 'https://www.thefoodhub.no/', isExternal: true },
    },
    {
      _type: 'richText',
      _key: 'intro1',
      heading: 'A partner that shares our values',
      narrowWidth: true,
      backgroundColor: 'cream',
      content: [
        block('i1', 'normal', [
          span('i1s', 'Great conferences need great food. This year we have teamed up with '),
          span('i1s2', 'The Food Hub', ['strong']),
          span('i1s3', ' — an Oslo-based catering partner with a serious focus on sustainability, seasonality, and reducing food waste. Their kitchen prioritises surplus and locally sourced ingredients, turning what others might throw away into something genuinely delicious.'),
        ]),
        block('i2', 'normal', [
          span('i2s', 'Collaborating with The Food Hub means your lunch at Inspiration Day has a lighter footprint — without compromising on taste. Expect fresh, vibrant flavours served with care.'),
        ]),
      ],
    },
    {
      _type: 'quote',
      _key: 'quote1',
      text: 'Good food, good mood.',
      author: 'The Food Hub',
      style: 'centered',
    },
    {
      _type: 'richText',
      _key: 'menuIntro',
      heading: 'Lunch Menu',
      narrowWidth: true,
      backgroundColor: 'mint',
      content: [
        block('m1', 'normal', [
          span('m1s', 'A selection of fresh, flavourful dishes — with options for every preference. Allergens are listed under each dish.'),
        ]),
      ],
    },
    {
      _type: 'cardGrid',
      _key: 'menu1',
      heading: '',
      columns: 2,
      cards: [
        {
          _key: 'm1',
          title: 'Pulled Beef Slider',
          description: [
            block('pb1', 'normal', [span('pb1s', 'Ananassalsa med Tomatillo & Spicy Pasilla-Majo')]),
            block('pb2', 'normal', [span('pb2s', 'Allergens: Hvete, Egg, Sennep, Sulfitt', ['em'])]),
          ],
          accentColor: 'red',
        },
        {
          _key: 'm2',
          title: 'Pulled Veggie Slider',
          description: [
            block('pv1', 'normal', [span('pv1s', 'Ananassalsa med Tomatillo & Spicy Pasilla-Majo')]),
            block('pv2', 'normal', [span('pv2s', 'Allergens: Hvete, Egg, Sennep, Sulfitt', ['em'])]),
          ],
          accentColor: 'mint',
        },
        {
          _key: 'm3',
          title: 'Pokebowl',
          description: [
            block('pk1', 'normal', [span('pk1s', 'Laks, ananassalsa, syltet rødkål, ingefær, edamamebønner & calamansi aioli')]),
            block('pk2', 'normal', [span('pk2s', 'Allergens: Fisk, Egg, Soya, Sesam, Sennep', ['em'])]),
          ],
          accentColor: 'lavender',
        },
        {
          _key: 'm4',
          title: 'Pokebowl Vegetar',
          description: [
            block('pv3', 'normal', [span('pv3s', 'Tofu, shitake, edamamebønner, syltet rødkål, ingefær & sitrus-aioli')]),
            block('pv4', 'normal', [span('pv4s', 'Allergens: Soya, Sesamfrø, Sennep, Sulfitt', ['em'])]),
          ],
          accentColor: 'dark-blue',
        },
      ],
    },
    {
      _type: 'ctaSection',
      _key: 'cta1',
      heading: 'Curious about The Food Hub?',
      body: 'Learn more about their mission to reduce food waste and serve sustainable, seasonal food across Oslo.',
      backgroundColor: 'dark-blue',
      cta: { _type: 'link', label: 'Visit thefoodhub.no', href: 'https://www.thefoodhub.no/', isExternal: true },
    },
  ]

  const created = await client.create({
    _type: 'page',
    title: 'Food',
    published: true,
    slug: { _type: 'slug', current: 'food' },
    seo: {
      _type: 'seo',
      title: 'Food — ODA Inspiration Day 2026',
      description: 'Lunch at Oslo Concert Hall is catered by The Food Hub — a sustainable, waste-reducing partner serving fresh, seasonal dishes at ODA Inspiration Day 2026.',
    },
    blocks,
  })

  console.log(`  Created: Food (${created._id})`)
  return created._id
}

async function addFoodToAboutNav() {
  console.log('Updating site navigation (adding Food under About)...')
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{ _id, navigation }`)
  if (!settings) {
    console.log('  No siteSettings document found — skipping nav update.')
    return
  }

  const nav = Array.isArray(settings.navigation) ? [...settings.navigation] : []
  const aboutIdx = nav.findIndex((n) => n?.label === 'About')

  const foodChild = { _type: 'link', _key: 'nav-food', label: 'Food', href: '/food', isExternal: false }

  if (aboutIdx === -1) {
    nav.push({
      _type: 'navItem',
      _key: 'nav-about',
      label: 'About',
      href: '/team',
      children: [
        { _type: 'link', _key: 'nav-team', label: 'Team', href: '/team', isExternal: false },
        foodChild,
      ],
    })
  } else {
    const about = nav[aboutIdx]
    const children = Array.isArray(about.children) ? [...about.children] : []
    if (children.some((c) => c?.href === '/food')) {
      console.log('  Food already present under About — skipping.')
      return
    }
    children.push(foodChild)
    nav[aboutIdx] = { ...about, children }
  }

  await client.patch(settings._id).set({ navigation: nav }).commit()
  console.log('  Navigation updated.')
}

async function main() {
  console.log('Starting Food page migration...\n')
  await createFoodPage()
  await addFoodToAboutNav()
  console.log('\nDone!')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
