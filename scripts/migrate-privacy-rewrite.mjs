import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '8uk0dvi6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

function block(key, style, text) {
  return {
    _type: 'block', _key: key, style: style || 'normal',
    children: [{ _type: 'span', _key: `${key}s`, text }],
    markDefs: [],
  }
}

function bullet(key, text) {
  return {
    _type: 'block', _key: key, style: 'normal', listItem: 'bullet',
    level: 1,
    children: [{ _type: 'span', _key: `${key}s`, text }],
    markDefs: [],
  }
}

const content = [
  block('p1', 'normal', 'If you are a member of ODA, our partner or just visit our website, we want you to feel safe. We can assure you that your personal data is stored securely.'),
  block('p2', 'normal', 'For access, correction and deletion, send an email to sekretariat@odanettverk.no.'),
  block('p3', 'normal', 'Member data is stored at ODA-Nettverk\'s member portal odaportal.no. You can read the privacy policy for our member data here: https://odaportal.no/page/privacy-policy'),
  block('ph1', 'h3', 'Photography and video at the event'),
  block('ph2', 'normal', 'ODA Inspiration Day is a public event where professional photographers and videographers will be present. By attending the event, you acknowledge that photography and video recording will take place.'),
  block('ph3', 'h4', 'How we use images'),
  block('ph4', 'normal', 'Photos and video from the event may be used for:'),
  bullet('ph5', 'Promotion of ODA Inspiration Day and future ODA events'),
  bullet('ph6', 'ODA Nettverk\'s website, newsletters, and social media channels'),
  bullet('ph7', 'Press coverage and media partnerships related to the event'),
  block('ph8', 'normal', 'Images will not be sold to third parties or used for purposes unrelated to ODA Nettverk\'s activities.'),
  block('ph9', 'h4', 'Legal basis'),
  block('ph10', 'normal', 'General event photography (stage shots, crowd scenes, venue) is processed under our legitimate interest in documenting and promoting the event (GDPR Article 6(1)(f)). For individual portraits or close-up photos used in marketing, we will seek your consent where required under the Norwegian Copyright Act (åndsverkloven § 104).'),
  block('ph11', 'h4', 'Your rights regarding images'),
  block('ph12', 'normal', 'You may request that specific photos of you are removed from our channels by contacting inspirationday@odanettverk.no.'),
  block('ph13', 'normal', 'We take reasonable steps to ensure event photography is respectful and aligned with the values of our community.'),
]

async function main() {
  const page = await client.fetch(
    `*[_type == "page" && slug.current == "privacy-policy"][0]{ _id, blocks }`
  )
  if (!page) { console.log('Not found.'); return }

  const richTextBlock = page.blocks.find((b) => b._type === 'richText')
  if (!richTextBlock) { console.log('No richText block.'); return }

  await client
    .patch(page._id)
    .set({ [`blocks[_key=="${richTextBlock._key}"].content`]: content })
    .commit()

  console.log('Replaced Privacy Policy content.')
}

main().catch(console.error)
