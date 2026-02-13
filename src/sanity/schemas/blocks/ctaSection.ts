import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'body', title: 'Body Text', type: 'text', rows: 3 }),
    defineField({ name: 'cta', title: 'Primary CTA', type: 'link' }),
    defineField({ name: 'secondaryCta', title: 'Secondary CTA', type: 'link' }),
    defineField({ name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'backgroundColor', title: 'Background Color', type: 'string', options: { list: ['red', 'dark-blue', 'lavender', 'mint'] }, initialValue: 'red' }),
  ],
  preview: { select: { title: 'heading' }, prepare({ title }) { return { title: title || 'CTA Section' } } },
})
