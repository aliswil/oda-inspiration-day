import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pdfEmbed',
  title: 'PDF / Document',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'file',
      title: 'PDF File',
      type: 'file',
      options: { accept: 'application/pdf' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'downloadLabel',
      title: 'Download Button Label',
      type: 'string',
      initialValue: 'Download PDF',
    }),
  ],
  preview: { select: { title: 'heading' }, prepare({ title }) { return { title: title || 'PDF / Document' } } },
})
