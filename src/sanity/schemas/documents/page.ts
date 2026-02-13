import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
    defineField({
      name: 'blocks',
      title: 'Page Blocks',
      type: 'array',
      of: [
        { type: 'hero' }, { type: 'richText' }, { type: 'speakerGrid' }, { type: 'schedule' },
        { type: 'imageGallery' }, { type: 'videoEmbed' }, { type: 'ctaSection' }, { type: 'statsCounter' },
        { type: 'teamGrid' }, { type: 'partnerGrid' }, { type: 'cardGrid' }, { type: 'faqAccordion' },
        { type: 'quote' }, { type: 'venueMap' }, { type: 'videoCarousel' },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare({ title, slug }) { return { title, subtitle: `/${slug || ''}` } },
  },
})
