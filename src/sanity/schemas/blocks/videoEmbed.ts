import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'videoEmbed',
  title: 'Video Embed',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'url', title: 'Video URL (YouTube/Vimeo)', type: 'url', validation: (r) => r.required() }),
    defineField({ name: 'thumbnail', title: 'Custom Thumbnail', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({ name: 'aspectRatio', title: 'Aspect Ratio', type: 'string', options: { list: ['16:9', '4:3', '1:1'] }, initialValue: '16:9' }),
  ],
  preview: { select: { title: 'heading' }, prepare({ title }) { return { title: title || 'Video Embed' } } },
})
