import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'statsCounter',
  title: 'Stats Counter',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'stats', title: 'Stats', type: 'array',
      of: [{
        type: 'object', name: 'stat',
        fields: [
          defineField({ name: 'value', title: 'Number Value', type: 'number', validation: (r) => r.required() }),
          defineField({ name: 'suffix', title: 'Suffix (e.g., +, %)', type: 'string' }),
          defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
        ],
        preview: { select: { value: 'value', suffix: 'suffix', label: 'label' }, prepare({ value, suffix, label }) { return { title: `${value}${suffix || ''} ${label}` } } },
      }],
    }),
    defineField({ name: 'backgroundColor', title: 'Background Color', type: 'string', options: { list: ['cream', 'lavender', 'dark-blue', 'mint'] }, initialValue: 'lavender' }),
  ],
  preview: { select: { title: 'heading' }, prepare({ title }) { return { title: title || 'Stats Counter' } } },
})
