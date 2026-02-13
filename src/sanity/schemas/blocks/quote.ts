import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({ name: 'text', title: 'Quote Text', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'author', title: 'Author', type: 'string' }),
    defineField({ name: 'authorRole', title: 'Author Role', type: 'string' }),
    defineField({ name: 'authorImage', title: 'Author Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'style', title: 'Style', type: 'string', options: { list: ['centered', 'large', 'with-image'] }, initialValue: 'centered' }),
  ],
  preview: { select: { title: 'text', subtitle: 'author' }, prepare({ title, subtitle }) { return { title: (title || '').slice(0, 50) + '...', subtitle } } },
})
