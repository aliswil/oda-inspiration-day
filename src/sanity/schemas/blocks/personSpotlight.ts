import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'personSpotlight',
  title: 'Person Spotlight',
  type: 'object',
  description: 'Highlight a person — host, moderator, featured guest — with bio + image',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({
      name: 'label', title: 'Label', type: 'string',
      description: 'Small uppercase chip above the heading. e.g. "Host", "Moderator", "Featured Guest"',
      initialValue: 'Host',
    }),
    defineField({ name: 'heading', title: 'Heading', type: 'string', description: 'e.g. "Meet your Host"' }),
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Role / Title', type: 'string' }),
    defineField({ name: 'company', title: 'Company', type: 'string' }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 8, description: 'Use blank lines for paragraph breaks.' }),
    defineField({
      name: 'image', title: 'Image', type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'imagePosition', title: 'Image Position (desktop)', type: 'string',
      options: { list: [{ title: 'Left', value: 'left' }, { title: 'Right', value: 'right' }], layout: 'radio' },
      initialValue: 'left',
    }),
    defineField({
      name: 'backgroundColor', title: 'Background Color', type: 'string',
      options: { list: ['cream', 'lavender', 'white', 'mint', 'dark-blue'] },
      initialValue: 'cream',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'image' },
    prepare({ title, subtitle, media }) { return { title: title || 'Person Spotlight', subtitle, media } },
  },
})
