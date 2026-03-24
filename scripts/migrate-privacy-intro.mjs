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

const introBlocks = [
  block('intro1', 'normal', 'If you are a member of ODA, our partner or just visit our website, we want you to feel safe. We can assure you that your personal data is stored securely.'),
  block('intro2', 'normal', 'For access, correction and deletion, send an email to sekretariat@odanettverk.no.'),
  block('intro3', 'normal', 'Member data is stored at ODA-Nettverk\'s member portal odaportal.no. You can read the privacy policy for our member data here: https://odaportal.no/page/privacy-policy'),
]

async function main() {
  const page = await client.fetch(
    `*[_type == "page" && slug.current == "privacy-policy"][0]{ _id, blocks }`
  )
  if (!page) { console.log('Not found.'); return }

  const richTextBlock = page.blocks.find((b) => b._type === 'richText')
  if (!richTextBlock) { console.log('No richText block.'); return }

  // Insert intro blocks after the "Last updated" line (index 0)
  const content = richTextBlock.content || []
  const updatedContent = [content[0], ...introBlocks, ...content.slice(1)]

  await client
    .patch(page._id)
    .set({ [`blocks[_key=="${richTextBlock._key}"].content`]: updatedContent })
    .commit()

  console.log('Added ODA intro to Privacy Policy.')
}

main().catch(console.error)
