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

const photoSection = [
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
  bullet('ph12', 'You may request that specific photos of you are removed from our channels by contacting info@odanettverk.no'),
  bullet('ph13', 'If you do not wish to be photographed, please inform the event staff at registration and we will provide you with a visual indicator (e.g. a colored lanyard)'),
  bullet('ph14', 'Requests for removal will be handled within 30 days'),
  block('ph15', 'normal', 'We take reasonable steps to ensure event photography is respectful and aligned with the values of our community.'),
]

async function main() {
  const page = await client.fetch(
    `*[_type == "page" && slug.current == "privacy-policy"][0]{ _id, blocks }`
  )

  if (!page) {
    console.log('Privacy Policy page not found.')
    return
  }

  // Get the existing richText block and append photo sections to its content
  const richTextBlock = page.blocks.find((b) => b._type === 'richText')
  if (!richTextBlock) {
    console.log('No richText block found on privacy page.')
    return
  }

  const updatedContent = [...(richTextBlock.content || []), ...photoSection]

  await client
    .patch(page._id)
    .set({
      [`blocks[_key=="${richTextBlock._key}"].content`]: updatedContent,
    })
    .commit()

  console.log('Added photography section to Privacy Policy.')
}

main().catch(console.error)
