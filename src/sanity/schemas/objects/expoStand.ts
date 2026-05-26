import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'expoStand',
  title: 'Expo Stand',
  type: 'object',
  fields: [
    defineField({
      name: 'standType',
      title: 'Stand Type',
      type: 'string',
      options: { list: [{ title: 'Company', value: 'company' }, { title: 'Food', value: 'food' }] },
      initialValue: 'company',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'company', title: 'Company Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: false } }),
    defineField({ name: 'description', title: 'Short Description', type: 'text', rows: 3 }),
    defineField({ name: 'websiteUrl', title: 'Website URL', type: 'url' }),
    defineField({
      name: 'floor',
      title: 'Floor',
      type: 'number',
      options: { list: [{ title: 'Floor 1', value: 1 }, { title: 'Floor 2', value: 2 }] },
      validation: (r) => r.required(),
      initialValue: 1,
    }),
    defineField({ name: 'standLabel', title: 'Stand Label', description: 'Short label shown on the map pin (e.g. "A1")', type: 'string' }),
    defineField({ name: 'x', title: 'Position X (%)', description: 'Horizontal position as a percentage (0–100) from the left edge of the map', type: 'number', validation: (r) => r.required().min(0).max(100) }),
    defineField({ name: 'y', title: 'Position Y (%)', description: 'Vertical position as a percentage (0–100) from the top edge of the map', type: 'number', validation: (r) => r.required().min(0).max(100) }),
  ],
  preview: {
    select: { title: 'company', subtitle: 'standLabel', media: 'logo' },
    prepare({ title, subtitle }) { return { title: title || 'Stand', subtitle: subtitle ? `Label: ${subtitle}` : '' } },
  },
})
