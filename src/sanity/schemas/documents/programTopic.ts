import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'programTopic',
  title: 'Program Topic',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required(), description: 'e.g. AI, Leadership, Customer Experience' }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug',
      options: { source: 'title', maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
  ],
  preview: { select: { title: 'title', subtitle: 'slug.current' } },
})
