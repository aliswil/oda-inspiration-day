import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'expoMap',
  title: 'Expo Map',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'stands',
      title: 'Expo Stands',
      type: 'array',
      of: [{ type: 'expoStand' }],
      description: 'Add companies with their position on the floor map. Use the X/Y fields to place pins.',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) { return { title: title || 'Expo Map' } },
  },
})
