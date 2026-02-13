import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'sponsor',
  title: 'Sponsor / Partner',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({ name: 'tier', title: 'Tier', type: 'string', options: { list: ['platinum', 'gold', 'silver', 'bronze', 'partner'] }, validation: (r) => r.required() }),
    defineField({ name: 'url', title: 'Website URL', type: 'url' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'tier', media: 'logo' } },
})
