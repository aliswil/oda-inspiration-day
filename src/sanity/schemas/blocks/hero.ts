import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 3 }),
    defineField({ name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'backgroundVideo', title: 'Background Video URL', type: 'url' }),
    defineField({
      name: 'backgroundVideoStart',
      title: 'Background Video Start (seconds)',
      type: 'number',
      description: 'Where the video starts. 20 starts it 20 seconds in. Leave empty to start from the beginning.',
      validation: (r) => r.min(0).integer(),
    }),
    defineField({
      name: 'backgroundVideoDailyStep',
      title: 'Move Start Forward Each Day (seconds)',
      type: 'number',
      description: 'Show a different part of the video each day. 5 starts it 5 seconds later every day (switches at midnight, Norwegian time). Leave empty to use the same start every day.',
      validation: (r) => r.min(0).integer(),
    }),
    defineField({
      name: 'backgroundVideoLatestStart',
      title: 'Latest Daily Start (seconds)',
      type: 'number',
      description: 'When the daily start would pass this point, it goes back to Background Video Start.',
      hidden: ({ parent }) => !parent?.backgroundVideoDailyStep,
      validation: (r) =>
        r.integer().custom((value, context) => {
          const hero = context.parent as { backgroundVideoStart?: number; backgroundVideoDailyStep?: number } | undefined
          if (!hero?.backgroundVideoDailyStep) return true
          if (value === undefined) return 'Required when the start moves each day.'
          return value > (hero.backgroundVideoStart ?? 0) || 'Must be later than Background Video Start.'
        }),
    }),
    defineField({ name: 'cta', title: 'Call to Action', type: 'link' }),
    defineField({ name: 'secondaryCta', title: 'Secondary CTA', type: 'link' }),
    defineField({ name: 'style', title: 'Style Variant', type: 'string', options: { list: ['fullscreen', 'tall', 'medium'] }, initialValue: 'fullscreen' }),
  ],
  preview: { select: { title: 'heading' }, prepare({ title }) { return { title: title || 'Hero Block' } } },
})
