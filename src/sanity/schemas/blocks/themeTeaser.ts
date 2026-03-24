import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'themeTeaser',
  title: 'Theme Teaser',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Digital Paradox' }),
    defineField({ name: 'buttonLabel', title: 'Button Label', type: 'string', initialValue: 'Explore this years theme' }),
    defineField({ name: 'buttonHref', title: 'Button Link', type: 'string', initialValue: '/theme' }),
  ],
  preview: { prepare() { return { title: 'Theme Teaser' } } },
})
