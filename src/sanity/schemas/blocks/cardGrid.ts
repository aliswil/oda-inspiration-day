import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'cardGrid',
  title: 'Card Grid',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'cards', title: 'Cards', type: 'array',
      of: [{
        type: 'object', name: 'card',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'link', title: 'Link', type: 'link' }),
          defineField({ name: 'accentColor', title: 'Accent Color', type: 'string', options: { list: ['lavender', 'red', 'mint', 'dark-blue'] } }),
        ],
        preview: { select: { title: 'title', media: 'image' } },
      }],
    }),
    defineField({ name: 'columns', title: 'Columns', type: 'number', initialValue: 3, validation: (r) => r.min(2).max(4) }),
  ],
  preview: { select: { title: 'heading' }, prepare({ title }) { return { title: title || 'Card Grid' } } },
})
