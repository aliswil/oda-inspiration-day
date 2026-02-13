import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'videoCarousel',
  title: 'Video Carousel',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'url', title: 'Video URL (YouTube/Vimeo)', type: 'url', validation: (r) => r.required() }),
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
    }),
    defineField({ name: 'backgroundColor', title: 'Background Color', type: 'string', options: { list: ['white', 'cream', 'lavender', 'dark-blue', 'very-dark'] } }),
  ],
  preview: { select: { title: 'heading' }, prepare({ title }) { return { title: title || 'Video Carousel' } } },
})
