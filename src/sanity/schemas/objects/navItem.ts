import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'navItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'href', title: 'URL', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'children',
      title: 'Dropdown Items',
      type: 'array',
      of: [{ type: 'link' }],
    }),
  ],
})
