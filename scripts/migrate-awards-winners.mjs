import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'

const client = createClient({
  projectId: '8uk0dvi6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

async function main() {
  // Upload winners image
  console.log('Uploading winners image...')
  const buffer = readFileSync('/Users/alis/Projects/ID/public/images/oda-awards-winners.jpg')
  const asset = await client.assets.upload('image', buffer, {
    filename: 'oda-awards-winners.jpg',
    contentType: 'image/jpeg',
  })
  console.log(`  Uploaded: ${asset._id}`)

  const winnersImage = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }

  // Get existing page
  const page = await client.fetch(
    `*[_type == "page" && slug.current == "oda-awards"][0]{ _id, blocks }`
  )

  if (!page) {
    console.log('ODA Awards page not found.')
    return
  }

  // Add winners image block at the end
  await client
    .patch(page._id)
    .append('blocks', [
      {
        _type: 'imageGallery',
        _key: 'winners',
        heading: 'Previous Winners',
        layout: 'grid',
        columns: 1,
        images: [
          { ...winnersImage, _key: 'w1', alt: 'ODA Awards winners through the years' },
        ],
      },
    ])
    .commit()

  console.log('Added winners image to ODA Awards page.')
}

main().catch(console.error)
