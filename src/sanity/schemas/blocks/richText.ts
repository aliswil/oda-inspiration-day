import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'richText',
  title: 'Rich Text',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
    defineField({
      name: 'content', title: 'Content', type: 'array',
      of: [
        { type: 'block', styles: [{ title: 'Normal', value: 'normal' }, { title: 'H2', value: 'h2' }, { title: 'H3', value: 'h3' }, { title: 'H4', value: 'h4' }, { title: 'Quote', value: 'blockquote' }] },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({ name: 'backgroundColor', title: 'Background Color', type: 'string', options: { list: ['cream', 'lavender', 'dark-blue', 'white', 'mint'] }, initialValue: 'cream' }),
    defineField({ name: 'narrowWidth', title: 'Narrow Width?', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'heading' }, prepare({ title }) { return { title: title || 'Rich Text Block' } } },
})
