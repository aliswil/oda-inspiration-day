import { defineField, defineType } from 'sanity'

const URL_PATTERN = /^(\/|https?:\/\/)/

export default defineType({
  name: 'schedule',
  title: 'Schedule',
  type: 'object',
  fields: [
    defineField({ name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true }),
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'outcomesIntro', title: 'Intro line above timeline', type: 'text', rows: 2,
      description: 'One short sentence that frames the day. e.g. "Six talks, one big idea: walk away ready to act."',
    }),
    defineField({
      name: 'sessions', title: 'Sessions', type: 'array',
      of: [{
        type: 'object', name: 'session',
        fields: [
          defineField({ name: 'time', title: 'Time', type: 'string', validation: (r) => r.required(), description: 'e.g. "09:30" or "09:30–10:15"' }),
          defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          defineField({
            name: 'format', title: 'Format', type: 'reference', to: [{ type: 'programFormat' }],
            validation: (r) => r.required(),
          }),
          defineField({
            name: 'speakers', title: 'Speakers', type: 'array',
            of: [{ type: 'reference', to: [{ type: 'speaker' }] }],
            description: 'Pick one for a keynote, multiple for a panel, none for a break.',
          }),
          defineField({
            name: 'topics', title: 'Topics', type: 'array',
            of: [{ type: 'reference', to: [{ type: 'programTopic' }] }],
            validation: (r) => r.max(3),
            description: 'Up to 3 — keeps the row scannable on mobile.',
          }),
          defineField({ name: 'location', title: 'Location / Room', type: 'string' }),
          defineField({
            name: 'linkUrl', title: 'Learn-more link (URL)', type: 'string',
            description: 'For parallel/side events, e.g. /paradox-panel. Adds a "Learn more" link to the row.',
            validation: (r) => r.custom((value) => {
              if (!value) return true
              return URL_PATTERN.test(value) ? true : 'Must start with / or https://'
            }),
          }),
          defineField({ name: 'linkLabel', title: 'Learn-more label', type: 'string', description: 'Defaults to "Learn more" if blank.' }),
        ],
        preview: {
          select: { time: 'time', title: 'title', format: 'format.title', speakerCount: 'speakers' },
          prepare({ time, title, format, speakerCount }) {
            const count = Array.isArray(speakerCount) ? speakerCount.length : 0
            const parts = [format, count > 0 && `${count} speaker${count === 1 ? '' : 's'}`].filter(Boolean)
            return { title: [time, title].filter(Boolean).join(' · '), subtitle: parts.join(' · ') }
          },
        },
      }],
    }),
    defineField({ name: 'backgroundColor', title: 'Background Color', type: 'string', options: { list: ['cream', 'lavender', 'white', 'dark-blue'] }, initialValue: 'cream' }),
  ],
  preview: { select: { title: 'heading' }, prepare({ title }) { return { title: title || 'Schedule Block' } } },
})
