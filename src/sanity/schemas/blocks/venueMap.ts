import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'venueMap',
  title: 'Venue Map',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'venueImage', title: 'Venue Image / Map', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'address', title: 'Address', type: 'string' }),
    defineField({ name: 'googleMapsUrl', title: 'Google Maps URL', type: 'url' }),
    defineField({ name: 'details', title: 'Additional Details', type: 'array', of: [{ type: 'block' }] }),
  ],
  preview: { select: { title: 'heading' }, prepare({ title }) { return { title: title || 'Venue Map' } } },
})
