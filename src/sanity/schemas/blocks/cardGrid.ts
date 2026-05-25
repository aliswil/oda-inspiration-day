import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'cardGrid',
  title: 'Card Grid',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'cards', title: 'Cards', type: 'array',
      of: [{
        type: 'object', name: 'card',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
          defineField({ name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] }),
          defineField({ name: 'link', title: 'Link', type: 'link' }),
          defineField({ name: 'accentColor', title: 'Accent Color', type: 'string', options: { list: ['lavender', 'red', 'mint', 'dark-blue'] } }),
          defineField({
            name: 'sponsor', title: 'Sponsor', type: 'object',
            description: 'Optional — adds a sponsor logo and sentence to this card.',
            fields: [
              defineField({ name: 'name', title: 'Sponsor Name', type: 'string' }),
              defineField({
                name: 'logo', title: 'Sponsor Logo', type: 'image',
                options: { hotspot: true },
                fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
              }),
              defineField({ name: 'text', title: 'Sponsorship Sentence', type: 'string' }),
              defineField({ name: 'url', title: 'Sponsor URL', type: 'url' }),
            ],
          }),
        ],
        preview: { select: { title: 'title' } },
      }],
    }),
    defineField({ name: 'columns', title: 'Columns', type: 'number', initialValue: 3, validation: (r) => r.min(2).max(4) }),
  ],
  preview: { select: { title: 'heading' }, prepare({ title }) { return { title: title || 'Card Grid' } } },
})
