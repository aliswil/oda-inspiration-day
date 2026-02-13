import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: ['linkedin', 'instagram', 'twitter', 'facebook', 'youtube', 'tiktok'],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'url', title: 'URL', type: 'url', validation: (r) => r.required() }),
  ],
})
