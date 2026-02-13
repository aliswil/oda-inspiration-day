import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'schedule',
  title: 'Schedule',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({
      name: 'sessions', title: 'Sessions', type: 'array',
      of: [{
        type: 'object', name: 'session',
        fields: [
          defineField({ name: 'time', title: 'Time', type: 'string' }),
          defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
          defineField({ name: 'speaker', title: 'Speaker', type: 'reference', to: [{ type: 'speaker' }] }),
          defineField({ name: 'tag', title: 'Tag', type: 'string', options: { list: ['keynote', 'lightning', 'panel', 'workshop', 'break', 'networking'] } }),
          defineField({ name: 'location', title: 'Location / Room', type: 'string' }),
        ],
        preview: { select: { title: 'title', time: 'time', tag: 'tag' }, prepare({ title, time, tag }) { return { title: `${time || ''} ${title}`, subtitle: tag } } },
      }],
    }),
    defineField({ name: 'backgroundColor', title: 'Background Color', type: 'string', options: { list: ['cream', 'lavender', 'white', 'dark-blue'] }, initialValue: 'cream' }),
  ],
  preview: { select: { title: 'heading' }, prepare({ title }) { return { title: title || 'Schedule Block' } } },
})
