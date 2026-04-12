/**
 * Updates the existing Tickets page with pricing, access dates, a buy CTA,
 * and a refreshed policy section. Uses existing block types — no schema changes.
 *
 * The buy button stays hidden until an editor adds a URL to the "Buy Your Ticket"
 * CTA block in Sanity Studio (the button only renders when `cta` is set).
 *
 * Usage:
 *   SANITY_TOKEN=<your-token> node scripts/update-tickets-content.mjs
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
  console.error('Missing SANITY_TOKEN. Run with:\n  SANITY_TOKEN=<token> node scripts/update-tickets-content.mjs')
  process.exit(1)
}

// "info" richText — intro sentence + prices + access dates. Uses h2 inside
// and a lavender background so the section pops.
const infoBlock = {
  _type: 'richText',
  _key: 'info1',
  heading: 'Pricing & Access',
  narrowWidth: true,
  backgroundColor: 'lavender',
  content: [
    {
      _type: 'block', _key: 'feeNote', style: 'normal',
      children: [{ _type: 'span', _key: 'feeNoteS', text: 'To improve the experience of ODA Inspiration Day, we are introducing a ticket fee this year.', marks: ['strong'] }],
      markDefs: [],
    },
    {
      _type: 'block', _key: 'intro1', style: 'normal',
      children: [{ _type: 'span', _key: 'introS1', text: 'Secure your seat at ODA Inspiration Day 2026. Three ticket tiers, early access for ODA Members.' }],
      markDefs: [],
    },
    {
      _type: 'block', _key: 'priceH', style: 'h2',
      children: [{ _type: 'span', _key: 'priceHs', text: 'Ticket Prices' }],
      markDefs: [],
    },
    {
      _type: 'block', _key: 'price1', style: 'normal', listItem: 'bullet', level: 1,
      children: [{ _type: 'span', _key: 'price1s', text: 'ODA Members — 499 kr' }],
      markDefs: [],
    },
    {
      _type: 'block', _key: 'price2', style: 'normal', listItem: 'bullet', level: 1,
      children: [{ _type: 'span', _key: 'price2s', text: 'Non-members — 799 kr' }],
      markDefs: [],
    },
    {
      _type: 'block', _key: 'price3', style: 'normal', listItem: 'bullet', level: 1,
      children: [{ _type: 'span', _key: 'price3s', text: 'Students — 299 kr' }],
      markDefs: [],
    },
    {
      _type: 'block', _key: 'dateH', style: 'h2',
      children: [{ _type: 'span', _key: 'dateHs', text: 'When Tickets Open' }],
      markDefs: [],
    },
    {
      _type: 'block', _key: 'date1', style: 'normal', listItem: 'bullet', level: 1,
      children: [
        { _type: 'span', _key: 'date1s1', text: 'Early access for ODA Members: ', marks: ['strong'] },
        { _type: 'span', _key: 'date1s2', text: 'Thursday 16 April, 10:00 AM' },
      ],
      markDefs: [],
    },
    {
      _type: 'block', _key: 'date1note', style: 'normal', listItem: 'bullet', level: 2,
      markDefs: [{ _type: 'link', _key: 'portalLink', href: 'https://odaportal.no/' }],
      children: [
        { _type: 'span', _key: 'date1noteS1', text: 'Link to tickets will be sent on mail and can be found in our event on ' },
        { _type: 'span', _key: 'date1noteS2', text: 'odaportal.no', marks: ['portalLink'] },
      ],
    },
    {
      _type: 'block', _key: 'date2', style: 'normal', listItem: 'bullet', level: 1,
      children: [
        { _type: 'span', _key: 'date2s1', text: 'General access: ', marks: ['strong'] },
        { _type: 'span', _key: 'date2s2', text: 'Friday 17 April, 10:00 AM' },
      ],
      markDefs: [],
    },
  ],
}

// "Buy Your Ticket" CTA block. Primary CTA routes pre-sales visitors to the
// ODA membership signup. Secondary CTA is a "Buy Ticket" placeholder that
// renders as a disabled-looking button (shadow + reduced opacity) until an
// editor swaps the href in Studio — CtaSectionBlock detects `href === '#'`.
const buyCtaBlock = {
  _type: 'ctaSection',
  _key: 'ctaBuy',
  heading: 'Buy Your Ticket',
  body: 'Tickets open Friday 17 April at 10:00 AM. ODA Members get early access Thursday 16 April.',
  backgroundColor: 'cream',
  cta: {
    _type: 'link',
    label: 'Become an ODA Member for Early Access',
    href: 'https://odanettverk.no/bli-medlem-i-oda-nettverk/',
    isExternal: true,
  },
  secondaryCta: {
    _type: 'link',
    label: 'Buy tickets here 17 April 10:00',
    href: '#',
    isExternal: false,
  },
}

// New policy richText — noRefunds, resaleNote, studentIdNote
const policyBlock = {
  _type: 'richText',
  _key: 'policy1',
  heading: 'Ticket Policy',
  narrowWidth: true,
  backgroundColor: 'cream',
  content: [
    {
      _type: 'block', _key: 'polNo', style: 'h3',
      children: [{ _type: 'span', _key: 'polNoS', text: 'No Refunds' }],
      markDefs: [],
    },
    {
      _type: 'block', _key: 'polNoB', style: 'normal',
      children: [{ _type: 'span', _key: 'polNoBs', text: 'All ticket sales are final. No refunds.' }],
      markDefs: [],
    },
    {
      _type: 'block', _key: 'polRe', style: 'h3',
      children: [{ _type: 'span', _key: 'polReS', text: 'Resale' }],
      markDefs: [],
    },
    {
      _type: 'block', _key: 'polReB', style: 'normal',
      children: [{ _type: 'span', _key: 'polReBs', text: 'Resale is allowed at your own responsibility. No name change needed — just pass on your ticket.' }],
      markDefs: [],
    },
    {
      _type: 'block', _key: 'polSt', style: 'h3',
      children: [{ _type: 'span', _key: 'polStS', text: 'Student ID' }],
      markDefs: [],
    },
    {
      _type: 'block', _key: 'polStB', style: 'normal',
      children: [{ _type: 'span', _key: 'polStBs', text: 'Students must show a valid student ID at the door.' }],
      markDefs: [],
    },
  ],
}

async function updateTicketsPage() {
  console.log('Finding tickets page...')
  const page = await client.fetch(`*[_type == "page" && slug.current == "tickets"][0]{ _id, blocks }`)
  if (!page) {
    console.error('Tickets page not found. Create it in Sanity Studio first.')
    return false
  }

  // Drop blocks that are no longer needed here.
  let blocks = (page.blocks || []).filter((b) => b._key !== 'ctaWhyAttend' && b._key !== 'welcome1')
  const byKey = (key) => blocks.findIndex((b) => b._key === key)

  // 1. Make opening times prominent in the hero subheading with day names
  //    and a clear 10:00 AM. Fix the broken membership URL on the primary
  //    CTA. Drop the "Update Your Profile" secondary CTA. Preserve everything else.
  const heroIdx = blocks.findIndex((b) => b._type === 'hero')
  if (heroIdx >= 0) {
    const { secondaryCta, ...existing } = blocks[heroIdx]
    void secondaryCta
    const fixedCta = existing.cta && /odanettverk\.no\/bli-medlem(?!-i-oda-nettverk\/)/.test(existing.cta.href || '')
      ? { ...existing.cta, href: 'https://odanettverk.no/bli-medlem-i-oda-nettverk/' }
      : existing.cta
    blocks[heroIdx] = {
      ...existing,
      subheading: 'Tickets open Friday 17 April, 10:00 AM · ODA Members get early access Thursday 16 April',
      ...(fixedCta ? { cta: fixedCta } : {}),
    }
  }

  // 2. Replace info1 richText, positioned directly after the hero.
  const infoIdx = byKey('info1')
  if (infoIdx >= 0) {
    blocks[infoIdx] = infoBlock
  } else {
    const hIdx = blocks.findIndex((b) => b._type === 'hero')
    blocks.splice(hIdx >= 0 ? hIdx + 1 : 0, 0, infoBlock)
  }

  // 3. Upsert ctaBuy after info1 with a visible CTA.
  const buyIdx = byKey('ctaBuy')
  if (buyIdx >= 0) {
    blocks[buyIdx] = buyCtaBlock
  } else {
    const insertAt = byKey('info1') + 1
    blocks.splice(insertAt > 0 ? insertAt : blocks.length, 0, buyCtaBlock)
  }

  // 4. Replace policy1 richText (keep position, else append to end)
  const policyIdx = byKey('policy1')
  if (policyIdx >= 0) {
    blocks[policyIdx] = policyBlock
  } else {
    blocks.push(policyBlock)
  }

  await client.patch(page._id).set({ blocks }).commit()
  console.log('  ✓ Tickets page updated')
  return true
}

updateTicketsPage().catch((err) => {
  console.error(err)
  process.exit(1)
})
