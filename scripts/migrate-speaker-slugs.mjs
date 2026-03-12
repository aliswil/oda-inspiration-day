import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '8uk0dvi6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

async function main() {
  const speakers = await client.fetch(
    `*[_type == "speaker" && !defined(slug.current)]{ _id, name }`
  )

  if (speakers.length === 0) {
    console.log('All speakers already have slugs.')
    return
  }

  console.log(`Adding slugs to ${speakers.length} speakers...\n`)

  for (const speaker of speakers) {
    const slug = toSlug(speaker.name)
    await client
      .patch(speaker._id)
      .set({ slug: { _type: 'slug', current: slug } })
      .commit()
    console.log(`  ${speaker.name} -> ${slug}`)
  }

  console.log('\nDone!')
}

main().catch(console.error)
