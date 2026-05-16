import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'participantGrid',
  title: 'Participant Grid',
  type: 'object',
  description: 'Static cards for panelists, judges, hosts — same arch style as speakers, no link.',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 2 }),
    defineField({
      name: 'participants', title: 'Participants', type: 'array',
      of: [{
        type: 'object', name: 'participant',
        fields: [
          defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
          defineField({ name: 'role', title: 'Role / Title', type: 'string' }),
          defineField({ name: 'company', title: 'Company', type: 'string' }),
          defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 6, description: 'Shown inside an expandable "Bio" dropdown under the card. Blank lines make paragraph breaks.' }),
        ],
        preview: { select: { title: 'name', subtitle: 'company', media: 'image' } },
      }],
    }),
    defineField({
      name: 'backgroundColor', title: 'Background Color', type: 'string',
      options: { list: ['cream', 'lavender', 'white', 'mint', 'dark-blue'] },
      initialValue: 'cream',
    }),
    defineField({
      name: 'showPlaceholders', title: 'Show placeholder cards when empty', type: 'boolean', initialValue: false,
      description: 'Useful while building the page. Turn off once real participants are added.',
    }),
  ],
  preview: {
    select: { title: 'heading', participants: 'participants' },
    prepare({ title, participants }) {
      const count = Array.isArray(participants) ? participants.length : 0
      return { title: title || 'Participant Grid', subtitle: count ? `${count} participant${count === 1 ? '' : 's'}` : 'No participants yet' }
    },
  },
})
