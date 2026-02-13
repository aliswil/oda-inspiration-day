import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string' }),
    defineField({ name: 'siteDescription', title: 'Site Description', type: 'text', rows: 3 }),
    defineField({ name: 'navigation', title: 'Main Navigation', type: 'array', of: [{ type: 'navItem' }] }),
    defineField({ name: 'footerNavigation', title: 'Footer Navigation', type: 'array', of: [{ type: 'link' }] }),
    defineField({ name: 'socialLinks', title: 'Social Media Links', type: 'array', of: [{ type: 'socialLink' }] }),
    defineField({ name: 'defaultSeo', title: 'Default SEO', type: 'seo' }),
    defineField({ name: 'ticketUrl', title: 'Ticket Purchase URL', type: 'url' }),
    defineField({ name: 'contactEmail', title: 'Contact Email', type: 'string' }),
  ],
  preview: { prepare() { return { title: 'Site Settings' } } },
})
