import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'speaker',
  title: 'Speaker',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'role', title: 'Role / Title', type: 'string' }),
    defineField({ name: 'company', title: 'Company', type: 'string' }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'portraitCutout',
      title: 'Portrait Without Background (PNG)',
      type: 'image',
      description: 'Transparent PNG cutout of the speaker. Used on the detail page.',
      options: { hotspot: true },
    }),
    defineField({ name: 'secondaryPhoto', title: 'Secondary Photo (candid)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 4 }),
    defineField({ name: 'presentationDescription', title: 'Presentation Description', type: 'text', rows: 3 }),
    defineField({ name: 'isLightningTalk', title: 'Lightning Talk Speaker?', type: 'boolean', initialValue: false }),
    defineField({ name: 'topic', title: 'Talk Topic', type: 'string' }),
    defineField({ name: 'videoUrl', title: 'Video URL (YouTube/Vimeo)', type: 'url' }),
    defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
  ],
  preview: { select: { title: 'name', subtitle: 'company', media: 'photo' } },
})
