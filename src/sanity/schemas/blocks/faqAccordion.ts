import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faqAccordion',
  title: 'FAQ Accordion',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'items', title: 'FAQ Items', type: 'array',
      of: [{
        type: 'object', name: 'faqItem',
        fields: [
          defineField({ name: 'question', title: 'Question', type: 'string', validation: (r) => r.required() }),
          defineField({ name: 'answer', title: 'Answer', type: 'array', of: [{ type: 'block' }] }),
        ],
        preview: { select: { title: 'question' } },
      }],
    }),
    defineField({ name: 'backgroundColor', title: 'Background Color', type: 'string', options: { list: ['cream', 'lavender', 'white'] }, initialValue: 'cream' }),
  ],
  preview: { select: { title: 'heading' }, prepare({ title }) { return { title: title || 'FAQ Accordion' } } },
})
