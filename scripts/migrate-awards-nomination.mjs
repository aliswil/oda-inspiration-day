import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '8uk0dvi6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

const nominationUrl = 'https://forms.office.com/pages/responsepage.aspx?id=6i1hfRLmzEK9cPDoXR_sakJC7tVDAfxIi_vWGDKuXNNUOE1MUVQ4QUdRM1g5SFVaTUlSRVlNUzM1Qi4u&route=shorturl'

function textBlock(key, text) {
  return {
    _type: 'block', _key: key, style: 'normal',
    children: [{ _type: 'span', _key: `${key}s`, text }],
    markDefs: [],
  }
}

const blocks = [
  {
    _type: 'richText',
    _key: 'intro',
    heading: 'ODA Awards',
    content: [
      textBlock('i1', 'Since 2009, ODA Network has awarded ODA Awards to the foremost ambassadors for gender diversity and inclusion in the Norwegian tech industry.'),
      textBlock('i2', 'The awards recognize leaders, professionals, and organizations advancing inclusion in tech through four distinct categories.'),
    ],
    backgroundColor: 'cream',
  },
  {
    _type: 'cardGrid',
    _key: 'categories',
    heading: 'Award Categories',
    columns: 2,
    cards: [
      {
        _key: 'c1',
        title: 'ODA Change-maker',
        description: [
          textBlock('cm1', 'Everyday heroes inspiring colleagues within their company. They foster positive organizational development, demonstrate courage and confidence, and create hope by showing the possibility of achievement.'),
        ],
        accentColor: 'red',
      },
      {
        _key: 'c2',
        title: 'ODA Techie',
        description: [
          textBlock('t1', 'Tech enthusiasts who pioneer in their roles. They challenge norms and established practices, share expertise and commitment to positive development, and emphasize progress reflecting societal diversity.'),
        ],
        accentColor: 'lavender',
      },
      {
        _key: 'c3',
        title: 'ODA Leader',
        description: [
          textBlock('l1', 'Established role models with extended track records. They are recognized speakers in official forums, visible advocates for diversity and inclusion, and demonstrate impressive results over time.'),
        ],
        accentColor: 'dark-blue',
      },
      {
        _key: 'c4',
        title: 'ODA Champions',
        description: [
          textBlock('ch1', 'Organizations creating sustainable, inclusive environments. They document concrete results over extended periods, share experiences across industries, and demonstrate how diversity generates better customer solutions.'),
        ],
        accentColor: 'mint',
      },
    ],
  },
  {
    _type: 'ctaSection',
    _key: 'nomination',
    heading: 'Nominate a Candidate',
    body: 'Know someone making a difference in tech diversity? The nomination period is now open. Submit your nomination today!',
    backgroundColor: 'lavender',
    cta: {
      _type: 'link',
      label: 'Submit your nomination here',
      href: nominationUrl,
      isExternal: true,
    },
  },
  {
    _type: 'richText',
    _key: 'contact',
    heading: 'Questions?',
    content: [
      textBlock('q1', 'For questions about the ODA Awards, contact awards@odanettverk.no'),
    ],
    backgroundColor: 'white',
  },
]

async function main() {
  const page = await client.fetch(
    `*[_type == "page" && slug.current == "oda-awards"][0]{ _id, blocks }`
  )

  if (!page) {
    console.log('ODA Awards page not found. Creating...')
    await client.create({
      _type: 'page',
      title: 'ODA Awards',
      slug: { _type: 'slug', current: 'oda-awards' },
      published: true,
      blocks,
    })
    console.log('Created ODA Awards page with all content.')
    return
  }

  // Keep the hero block if it exists, replace the rest
  const hero = page.blocks?.find((b) => b._type === 'hero')
  const newBlocks = hero ? [hero, ...blocks] : blocks

  await client.patch(page._id).set({ blocks: newBlocks }).commit()
  console.log('Updated ODA Awards page with new content.')
}

main().catch(console.error)
