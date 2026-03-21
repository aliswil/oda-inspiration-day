/**
 * Migration script: Updates the Tickets page and fixes the "Explore the Event" card grid.
 *
 * Usage:
 *   SANITY_TOKEN=<your-token> node scripts/migrate-tickets.mjs
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
  console.error('Missing SANITY_TOKEN. Run with:\n  SANITY_TOKEN=<token> node scripts/migrate-tickets.mjs')
  process.exit(1)
}

async function migrateTicketsPage() {
  console.log('Finding tickets page...')
  const page = await client.fetch(`*[_type == "page" && slug.current == "tickets"][0]{ _id, blocks }`)
  if (!page) {
    console.error('Tickets page not found in Sanity. Create it in the Studio first.')
    return false
  }

  // Preserve the existing hero background image reference
  const existingHero = page.blocks?.find((b) => b._type === 'hero')
  const heroImage = existingHero?.backgroundImage

  const newBlocks = [
    {
      _type: 'hero',
      _key: 'hero1',
      heading: 'Get Your Tickets',
      subheading: 'Tickets available 29th April 2026',
      style: 'medium',
      ...(heroImage ? { backgroundImage: heroImage } : {}),
      cta: { _type: 'link', label: 'Become an ODA Member', href: 'https://www.odanettverk.no/bli-medlem', isExternal: true },
      secondaryCta: { _type: 'link', label: 'Update Your Profile', href: 'https://www.odanettverk.no/min-side', isExternal: true },
    },
    {
      _type: 'richText',
      _key: 'info1',
      narrowWidth: true,
      backgroundColor: 'cream',
      content: [
        {
          _type: 'block', _key: 'b1', style: 'normal',
          children: [{ _type: 'span', _key: 's1', text: 'Tickets will be available on 29th April 2026!' }],
        },
        {
          _type: 'block', _key: 'b2', style: 'normal',
          markDefs: [
            { _type: 'link', _key: 'link1', href: 'https://www.odanettverk.no/min-side' },
            { _type: 'link', _key: 'link2', href: 'https://www.odanettverk.no/bli-medlem' },
          ],
          children: [
            { _type: 'span', _key: 's2', text: 'Make sure to ' },
            { _type: 'span', _key: 's3', text: 'update your ODA membership profile', marks: ['link1'] },
            { _type: 'span', _key: 's4', text: ' or ' },
            { _type: 'span', _key: 's5', text: 'become an ODA member', marks: ['link2'] },
            { _type: 'span', _key: 's6', text: ' to secure your ticket once registration opens.' },
          ],
        },
        {
          _type: 'block', _key: 'b3', style: 'normal',
          children: [{ _type: 'span', _key: 's7', text: 'To improve the experience of ODA Inspiration Day, we are introducing a ticket fee this year. The cost will be XXX NOK and the ticket includes:' }],
        },
      ],
    },
    {
      _type: 'cardGrid',
      _key: 'inclusions1',
      heading: "What's Included in Your Ticket",
      columns: 3,
      cards: [
        { _key: 'c1', title: 'Partner Exhibition', description: [{ _type: 'block', _key: 'd1', style: 'normal', children: [{ _type: 'span', _key: 't1', text: 'Access to the Inspiration Day exhibition with all our partners.' }] }], accentColor: 'lavender' },
        { _key: 'c2', title: 'Main Stage Programme', description: [{ _type: 'block', _key: 'd2', style: 'normal', children: [{ _type: 'span', _key: 't2', text: 'The full main stage programme with inspiring speakers and interesting talks.' }] }], accentColor: 'red' },
        { _key: 'c3', title: 'Fish Bowl Side Event', description: [{ _type: 'block', _key: 'd3', style: 'normal', children: [{ _type: 'span', _key: 't3', text: 'Our "fish bowl" side event hosted during the lunch break.' }] }], accentColor: 'mint' },
        { _key: 'c4', title: 'Lunch, Coffee & Tea', description: [{ _type: 'block', _key: 'd4', style: 'normal', children: [{ _type: 'span', _key: 't4', text: 'Lunch, coffee and tea is included in the price.' }] }], accentColor: 'dark-blue' },
        { _key: 'c5', title: 'Coworking Space', description: [{ _type: 'block', _key: 'd5', style: 'normal', children: [{ _type: 'span', _key: 't5', text: 'Access to our new coworking space and start-up wall.' }] }], accentColor: 'lavender' },
        { _key: 'c6', title: 'And More', description: [{ _type: 'block', _key: 'd6', style: 'normal', children: [{ _type: 'span', _key: 't6', text: 'Stay tuned for additional surprises and experiences.' }] }], accentColor: 'red' },
      ],
    },
    {
      _type: 'ctaSection',
      _key: 'ctaWhyAttend',
      heading: 'Want to Know More?',
      body: 'Learn about everything ODA Inspiration Day has to offer.',
      backgroundColor: 'lavender',
      cta: { _type: 'link', label: 'Why Attend', href: '/why-attend', isExternal: false },
    },
    {
      _type: 'ctaSection',
      _key: 'ctaDigital',
      heading: 'Join Us Digitally',
      body: 'If you are unable to attend ODA Inspiration Day physically, we offer online tickets to follow the streaming of the conference. Attending digitally is free and open for everyone. Registration opens 29th April.',
      backgroundColor: 'dark-blue',
      cta: { _type: 'link', label: 'Register for Streaming', href: 'https://odanettverk.no/streaming', isExternal: true },
    },
    {
      _type: 'ctaSection',
      _key: 'ctaCancel',
      heading: "Can't Attend? Here's How to Cancel",
      body: "Can't make it to ODA Inspiration Day? To cancel your physical ticket, please send an e-mail to inspirationday@odanettverk.no.",
      backgroundColor: 'mint',
      cta: { _type: 'link', label: 'Send Cancellation Email', href: 'mailto:inspirationday@odanettverk.no', isExternal: true },
    },
    {
      _type: 'richText',
      _key: 'policy1',
      heading: 'Event Participation Policy',
      narrowWidth: true,
      backgroundColor: 'cream',
      content: [
        { _type: 'block', _key: 'p1', style: 'normal', listItem: 'bullet', level: 1, children: [{ _type: 'span', _key: 'ps1', text: 'By registering for this event, you agree that ODA Network reserves the right to use photos and video material captured during the event for marketing and communication purposes.' }] },
        { _type: 'block', _key: 'p2', style: 'normal', listItem: 'bullet', level: 1, children: [{ _type: 'span', _key: 'ps2', text: 'Cancellations after May 23rd will incur a cancellation fee of NOK 300.' }] },
        { _type: 'block', _key: 'p3', style: 'normal', listItem: 'bullet', level: 1, children: [{ _type: 'span', _key: 'ps3', text: 'Please note that ODA Network operates with a no-show fee of NOK 500.' }] },
      ],
    },
  ]

  await client.patch(page._id).set({
    blocks: newBlocks,
    seo: {
      _type: 'seo',
      title: 'Tickets — ODA Inspiration Day 2026',
      description: 'Get your ticket for ODA Inspiration Day 2026. Physical and digital tickets available from 29th April. Includes exhibition access, main stage, lunch, and more.',
    },
  }).commit()

  console.log('  ✓ Tickets page updated')
  return true
}

async function fixExploreCards() {
  console.log('Finding "Explore the Event" card grid...')

  // Find all pages that have a cardGrid block with heading "Explore the Event"
  const pages = await client.fetch(`*[_type == "page" && count(blocks[_type == "cardGrid" && heading == "Explore the Event"]) > 0]{ _id, blocks }`)

  if (!pages.length) {
    console.log('  No pages with "Explore the Event" card grid found — skipping')
    return
  }

  // Links for each card title
  const cardLinks = {
    'Program': { _type: 'link', label: 'View Program', href: '/program', isExternal: false },
    'Speakers': { _type: 'link', label: 'See Speakers', href: '/speakers', isExternal: false },
    'Tickets': { _type: 'link', label: 'Get Tickets', href: '/tickets', isExternal: false },
    'Venue': { _type: 'link', label: 'See Venue', href: '/venue', isExternal: false },
    'ODA Awards': { _type: 'link', label: 'Learn More', href: '/oda-awards', isExternal: false },
    'Afterparty': { _type: 'link', label: 'Details', href: '/afterparty', isExternal: false },
  }

  for (const page of pages) {
    const updatedBlocks = page.blocks.map((block) => {
      if (block._type !== 'cardGrid' || block.heading !== 'Explore the Event') return block

      return {
        ...block,
        cards: (block.cards || []).map((card) => {
          // Remove old invalid "link" field if present
          const { link, ...rest } = card

          // Convert string description to portable text array
          if (typeof rest.description === 'string') {
            rest.description = [{
              _type: 'block',
              _key: `desc-${rest._key}`,
              style: 'normal',
              children: [{ _type: 'span', _key: `span-${rest._key}`, text: rest.description }],
            }]
          }

          // Add the link field (now supported by the schema)
          if (cardLinks[rest.title]) {
            rest.link = cardLinks[rest.title]
          }

          return rest
        }),
      }
    })

    await client.patch(page._id).set({ blocks: updatedBlocks }).commit()
    console.log(`  ✓ Fixed card grid in page ${page._id}`)
  }
}

async function removeLightningSpeakers() {
  console.log('Removing lightning talk speakers section...')
  const page = await client.fetch(`*[_type == "page" && slug.current == "speakers"][0]{ _id, blocks }`)
  if (!page) {
    console.log('  Speakers page not found — skipping')
    return
  }

  const filtered = page.blocks.filter(
    (b) => !(b._type === 'speakerGrid' && b.filter === 'lightning')
  )

  if (filtered.length === page.blocks.length) {
    console.log('  No lightning talk block found — skipping')
    return
  }

  await client.patch(page._id).set({ blocks: filtered }).commit()
  console.log('  ✓ Removed lightning talk speakers block')
}

async function main() {
  console.log('Starting migration...\n')
  await migrateTicketsPage()
  await fixExploreCards()
  await removeLightningSpeakers()
  console.log('\nDone!')
}

main().catch(console.error)
