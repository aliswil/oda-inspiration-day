/**
 * Migration script: Creates the Paradox Panel page and adds it to the main nav
 * between "Program" and "Speakers".
 *
 * Usage:
 *   SANITY_TOKEN=<your-token> node scripts/migrate-paradox-panel.mjs
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
  console.error('Missing SANITY_TOKEN. Run with:\n  SANITY_TOKEN=<token> node scripts/migrate-paradox-panel.mjs')
  process.exit(1)
}

const HERO_IMAGE_PATH = '/Users/alis/Projects/ID/media/DSC04600.jpg'

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

async function createParadoxPanelPage() {
  console.log('Checking for existing Paradox Panel page...')
  const existing = await client.fetch(`*[_type == "page" && slug.current == "paradox-panel"][0]{ _id }`)
  if (existing) {
    console.log(`  Paradox Panel page already exists (${existing._id}) — skipping creation.`)
    return existing._id
  }

  console.log('Uploading hero image...')
  const heroImage = await uploadImage(HERO_IMAGE_PATH)

  console.log('Creating Paradox Panel page...')

  const blocks = [
    {
      _type: 'hero',
      _key: 'hero1',
      heading: 'Paradox Panel',
      subheading: 'A live, rotating discussion where our Platinum Partners take the stage to debate this year\u2019s most relevant digital dilemmas.',
      style: 'medium',
      backgroundImage: heroImage,
    },
    {
      _type: 'richText',
      _key: 'intro1',
      heading: 'A live, rotating discussion',
      narrowWidth: true,
      backgroundColor: 'cream',
      content: [
        block('i1', 'normal', [
          span('i1s', 'During the lunch break, head to Lillesal and grab a seat for this year\u2019s side event: the Paradox Panel. This is a live, rotating discussion where our Platinum Partners take the stage to debate some of this year\u2019s most relevant digital dilemmas.'),
        ]),
        block('i2', 'normal', [
          span('i2s', 'The format is fast-moving and unscripted. Four participants sit in chairs while three stand behind \u2014 only those seated can speak, and as the conversation shifts, so do the seats. A moderator guides the discussion through 2\u20133 digital paradoxes, keeping the energy up and the perspectives flowing. It\u2019s the kind of conversation that\u2019s genuinely interesting to watch unfold in real time.'),
        ]),
        block('i3', 'normal', [
          span('i3s', 'The Paradox Panel is open to all attendees at no extra cost, and you\u2019re welcome to bring your lunch. Seats are limited, so make sure you head over early.'),
        ]),
        block('i4', 'normal', [
          span('i4s', '\ud83d\udccd Lillesal \u00b7 \ud83d\udd52 11:30\u201312:15', ['strong']),
        ]),
      ],
    },
    {
      _type: 'richText',
      _key: 'speed1',
      heading: 'The Speed Paradox: When Going Faster Makes Us Fragile',
      narrowWidth: true,
      backgroundColor: 'dark-blue',
      content: [
        block('s1', 'normal', [
          span('s1s', 'At the core of this Paradox Panel is speed, and how it is increasingly structurally rewarded, while restraint is treated as overhead.'),
        ]),
        block('s2', 'normal', [
          span('s2s', 'Across organizations and digital systems, speed has become a proxy for progress, control, and competitiveness. The paradox is that this same logic is quietly eroding our ability to think, learn, safeguard, and prevent harm. The panel explores this tension through two connected paradoxes that operate at different levels, but share the same root cause.'),
        ]),
      ],
    },
    {
      _type: 'cardGrid',
      _key: 'paradoxes1',
      columns: 2,
      cards: [
        {
          _key: 'p1',
          title: 'Paradox 1: Permanent acceleration',
          description: [
            block('p1d', 'normal', [
              span('p1ds', 'What does speed, as a structural incentive, do to our ability to think, learn and lead?'),
            ]),
          ],
          accentColor: 'red',
        },
        {
          _key: 'p2',
          title: 'Paradox 2: Speed outpaces safeguards',
          description: [
            block('p2d', 'normal', [
              span('p2ds', 'What does this same logic unleash when it meets malicious intent and real-world harm?'),
            ]),
          ],
          accentColor: 'lavender',
        },
      ],
    },
    {
      _type: 'ctaSection',
      _key: 'cta1',
      heading: 'See the full program',
      body: 'Browse the sessions, speakers, and side events happening across the day.',
      backgroundColor: 'mint',
      cta: { _type: 'link', label: 'View program', href: '/program', isExternal: false },
    },
  ]

  const created = await client.create({
    _type: 'page',
    title: 'Paradox Panel',
    published: true,
    slug: { _type: 'slug', current: 'paradox-panel' },
    seo: {
      _type: 'seo',
      title: 'Paradox Panel — ODA Inspiration Day 2026',
      description: 'Join the Paradox Panel — a live, rotating discussion with our Platinum Partners on the Speed Paradox, happening during lunch in Lillesal at ODA Inspiration Day 2026.',
    },
    blocks,
  })

  console.log(`  Created: Paradox Panel (${created._id})`)
  return created._id
}

async function addParadoxPanelToNav() {
  console.log('Updating site navigation (adding Paradox Panel between Program and Speakers)...')
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{ _id, navigation }`)
  if (!settings) {
    console.log('  No siteSettings document found — skipping nav update.')
    return
  }

  const nav = Array.isArray(settings.navigation) ? [...settings.navigation] : []

  if (nav.some((n) => n?.href === '/paradox-panel')) {
    console.log('  Paradox Panel already present in nav — skipping.')
    return
  }

  const newItem = {
    _type: 'navItem',
    _key: 'nav-paradox-panel',
    label: 'Paradox Panel',
    href: '/paradox-panel',
  }

  const programIdx = nav.findIndex((n) => n?.href === '/program')
  if (programIdx === -1) {
    nav.push(newItem)
  } else {
    nav.splice(programIdx + 1, 0, newItem)
  }

  await client.patch(settings._id).set({ navigation: nav }).commit()
  console.log('  Navigation updated.')
}

async function main() {
  console.log('Starting Paradox Panel migration...\n')
  await createParadoxPanelPage()
  await addParadoxPanelToNav()
  console.log('\nDone!')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
