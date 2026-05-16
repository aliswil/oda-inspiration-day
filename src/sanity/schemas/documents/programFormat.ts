import { defineField, defineType } from 'sanity'

const COLOR_OPTIONS = [
  { title: 'Red (filled)', value: 'red' },
  { title: 'Dark Blue (filled)', value: 'dark-blue' },
  { title: 'Mint (filled)', value: 'mint' },
  { title: 'Lavender (filled)', value: 'lavender' },
  { title: 'Cream (filled)', value: 'cream' },
  { title: 'Very Dark (filled)', value: 'very-dark' },
  { title: 'Mint on Dark', value: 'mint-dark' },
  { title: 'Lavender on Dark', value: 'lavender-dark' },
  { title: 'Red (soft outline)', value: 'red-soft' },
  { title: 'Mint (soft outline)', value: 'mint-soft' },
]

export default defineType({
  name: 'programFormat',
  title: 'Program Format',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required(), description: 'e.g. Keynote, Panel, Break, Side Event' }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug',
      options: { source: 'title', maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'color', title: 'Chip Color', type: 'string',
      options: { list: COLOR_OPTIONS, layout: 'radio' },
      initialValue: 'red',
      description: 'Brand color for the format chip. All options pass WCAG AA contrast.',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number', description: 'Lower numbers appear first in pickers' }),
    defineField({
      name: 'isBreak', title: 'Is a break?', type: 'boolean', initialValue: false,
      description: 'Renders the row dimmer, signals "no talk happening here".',
    }),
    defineField({
      name: 'isSideEvent', title: 'Is a side event?', type: 'boolean', initialValue: false,
      description: 'Renders with a dotted border to signal a parallel session during a break.',
    }),
  ],
  preview: {
    select: { title: 'title', color: 'color', isBreak: 'isBreak', isSideEvent: 'isSideEvent' },
    prepare({ title, color, isBreak, isSideEvent }) {
      const flags = [isBreak && 'break', isSideEvent && 'side event'].filter(Boolean).join(' · ')
      return { title, subtitle: [color, flags].filter(Boolean).join(' — ') }
    },
  },
})
