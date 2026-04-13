/**
 * Updates the Food page:
 *   - Removes the hero CTA (single bottom CTA is enough)
 *   - Swaps Quote and Lunch Menu order (menu first, quote after)
 *   - Removes hyphens from dish descriptions
 *   - Adds a note that lunch is included in the ticket
 *
 * Usage:
 *   SANITY_TOKEN=<token> node scripts/migrate-food-updates.mjs
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
  console.error('Missing SANITY_TOKEN.')
  process.exit(1)
}

function span(key, text, marks) {
  return { _type: 'span', _key: key, text, ...(marks ? { marks } : {}) }
}
function block(key, style, children, extra = {}) {
  return { _type: 'block', _key: key, style: style || 'normal', children, markDefs: [], ...extra }
}

async function main() {
  const page = await client.fetch(`*[_type == "page" && slug.current == "food"][0]{ _id, blocks }`)
  if (!page) {
    console.error('Food page not found.')
    process.exit(1)
  }

  const heroImage = page.blocks?.find((b) => b._type === 'hero')?.backgroundImage

  const newBlocks = [
    {
      _type: 'hero',
      _key: 'hero1',
      heading: 'Good Food, Good Mood',
      subheading: 'Lunch at Oslo Concert Hall — served by The Food Hub, a partner that puts people, planet, and flavour first.',
      style: 'medium',
      ...(heroImage ? { backgroundImage: heroImage } : {}),
    },
    {
      _type: 'richText',
      _key: 'intro1',
      heading: 'A partner that shares our values',
      narrowWidth: true,
      backgroundColor: 'cream',
      content: [
        block('i1', 'normal', [
          span('i1s', 'Great conferences need great food. This year we have teamed up with '),
          span('i1s2', 'The Food Hub', ['strong']),
          span('i1s3', ' — an Oslo based catering partner with a serious focus on sustainability, seasonality, and reducing food waste. Their kitchen prioritises surplus and locally sourced ingredients, turning what others might throw away into something genuinely delicious.'),
        ]),
        block('i2', 'normal', [
          span('i2s', 'Collaborating with The Food Hub means your lunch at Inspiration Day has a lighter footprint — without compromising on taste. Expect fresh, vibrant flavours served with care.'),
        ]),
      ],
    },
    {
      _type: 'richText',
      _key: 'menuIntro',
      heading: 'Lunch Menu',
      narrowWidth: true,
      backgroundColor: 'mint',
      content: [
        block('m1', 'normal', [
          span('m1s', 'A selection of fresh, flavourful dishes — with options for every preference. Lunch is included in your ticket. Allergens are listed under each dish.'),
        ]),
      ],
    },
    {
      _type: 'cardGrid',
      _key: 'menu1',
      heading: '',
      columns: 2,
      cards: [
        {
          _key: 'm1',
          title: 'Pulled Beef Slider',
          description: [
            block('pb1', 'normal', [span('pb1s', 'Ananassalsa med Tomatillo & Spicy Pasilla Majo')]),
            block('pb2', 'normal', [span('pb2s', 'Allergens: Hvete, Egg, Sennep, Sulfitt', ['em'])]),
          ],
          accentColor: 'red',
        },
        {
          _key: 'm2',
          title: 'Pulled Veggie Slider',
          description: [
            block('pv1', 'normal', [span('pv1s', 'Ananassalsa med Tomatillo & Spicy Pasilla Majo')]),
            block('pv2', 'normal', [span('pv2s', 'Allergens: Hvete, Egg, Sennep, Sulfitt', ['em'])]),
          ],
          accentColor: 'mint',
        },
        {
          _key: 'm3',
          title: 'Pokebowl',
          description: [
            block('pk1', 'normal', [span('pk1s', 'Laks, ananassalsa, syltet rødkål, ingefær, edamamebønner & calamansi aioli')]),
            block('pk2', 'normal', [span('pk2s', 'Allergens: Fisk, Egg, Soya, Sesam, Sennep', ['em'])]),
          ],
          accentColor: 'lavender',
        },
        {
          _key: 'm4',
          title: 'Pokebowl Vegetar',
          description: [
            block('pv3', 'normal', [span('pv3s', 'Tofu, shitake, edamamebønner, syltet rødkål, ingefær & sitrus aioli')]),
            block('pv4', 'normal', [span('pv4s', 'Allergens: Soya, Sesamfrø, Sennep, Sulfitt', ['em'])]),
          ],
          accentColor: 'dark-blue',
        },
      ],
    },
    {
      _type: 'quote',
      _key: 'quote1',
      text: 'Good food, good mood.',
      author: 'The Food Hub',
      style: 'centered',
    },
    {
      _type: 'ctaSection',
      _key: 'cta1',
      heading: 'Curious about The Food Hub?',
      body: 'Learn more about their mission to reduce food waste and serve sustainable, seasonal food across Oslo.',
      backgroundColor: 'dark-blue',
      cta: { _type: 'link', label: 'Visit thefoodhub.no', href: 'https://www.thefoodhub.no/', isExternal: true },
    },
  ]

  await client.patch(page._id).set({ blocks: newBlocks }).commit()
  console.log('  ✓ Food page updated')
}

main().catch((err) => { console.error(err); process.exit(1) })
