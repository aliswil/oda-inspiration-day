import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'imageGallery',
  title: 'Image Gallery',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'images', title: 'Images', type: 'array',
      of: [{ type: 'image', options: { hotspot: true }, fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
        defineField({ name: 'caption', title: 'Caption', type: 'string' }),
      ]}],
    }),
    defineField({ name: 'layout', title: 'Layout', type: 'string', options: { list: ['grid', 'masonry', 'carousel'] }, initialValue: 'grid' }),
    defineField({ name: 'columns', title: 'Columns', type: 'number', initialValue: 3, validation: (r) => r.min(2).max(4) }),
  ],
  preview: { select: { title: 'heading' }, prepare({ title }) { return { title: title || 'Image Gallery' } } },
})
