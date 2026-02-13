import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamGrid',
  title: 'Team Grid',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 2 }),
    defineField({ name: 'backgroundColor', title: 'Background Color', type: 'string', options: { list: ['cream', 'lavender', 'white'] }, initialValue: 'cream' }),
  ],
  preview: { select: { title: 'heading' }, prepare({ title }) { return { title: title || 'Team Grid' } } },
})
