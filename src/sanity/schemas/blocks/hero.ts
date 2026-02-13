import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 3 }),
    defineField({ name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'backgroundVideo', title: 'Background Video URL', type: 'url' }),
    defineField({ name: 'cta', title: 'Call to Action', type: 'link' }),
    defineField({ name: 'secondaryCta', title: 'Secondary CTA', type: 'link' }),
    defineField({ name: 'style', title: 'Style Variant', type: 'string', options: { list: ['fullscreen', 'tall', 'medium'] }, initialValue: 'fullscreen' }),
  ],
  preview: { select: { title: 'heading' }, prepare({ title }) { return { title: title || 'Hero Block' } } },
})
