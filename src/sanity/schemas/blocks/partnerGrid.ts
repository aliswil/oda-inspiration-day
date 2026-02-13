import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'partnerGrid',
  title: 'Partner Grid',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'showTiers', title: 'Show Tier Headers?', type: 'boolean', initialValue: true }),
    defineField({ name: 'backgroundColor', title: 'Background Color', type: 'string', options: { list: ['cream', 'white', 'lavender'] }, initialValue: 'white' }),
  ],
  preview: { select: { title: 'heading' }, prepare({ title }) { return { title: title || 'Partner Grid' } } },
})
