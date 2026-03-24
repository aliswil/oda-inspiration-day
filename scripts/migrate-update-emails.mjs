import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '8uk0dvi6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

const NEW_EMAIL = 'inspirationday@odanettverk.no'

async function updatePage(slug) {
  const page = await client.fetch(
    `*[_type == "page" && slug.current == $slug][0]{ _id, blocks }`,
    { slug }
  )
  if (!page) { console.log(`${slug} not found.`); return }

  const blocks = JSON.parse(JSON.stringify(page.blocks))
  let changed = false

  for (const block of blocks) {
    if (block._type === 'richText' && block.content) {
      for (const item of block.content) {
        if (item.children) {
          for (const child of item.children) {
            if (child.text && (child.text.includes('info@odanettverk.no') || child.text.includes('conduct@odanettverk.no'))) {
              child.text = child.text
                .replace(/info@odanettverk\.no/g, NEW_EMAIL)
                .replace(/conduct@odanettverk\.no/g, NEW_EMAIL)
              changed = true
            }
          }
        }
      }
    }
  }

  if (changed) {
    await client.patch(page._id).set({ blocks }).commit()
    console.log(`Updated emails in ${slug}`)
  } else {
    console.log(`No emails to update in ${slug}`)
  }
}

async function main() {
  await updatePage('privacy-policy')
  await updatePage('code-of-conduct')
  console.log('Done!')
}

main().catch(console.error)
