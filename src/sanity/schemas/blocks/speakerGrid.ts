import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'speakerGrid',
  title: 'Speaker Grid',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 2 }),
    defineField({ name: 'filter', title: 'Filter', type: 'string', options: { list: ['all', 'keynote', 'lightning'] }, initialValue: 'all' }),
    defineField({ name: 'backgroundColor', title: 'Background Color', type: 'string', options: { list: ['cream', 'lavender', 'white', 'mint'] }, initialValue: 'cream' }),
  ],
  preview: { select: { title: 'heading', filter: 'filter' }, prepare({ title, filter }) { return { title: title || 'Speaker Grid', subtitle: filter } } },
})
