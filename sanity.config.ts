import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
  name: 'oda-inspiration-day',
  title: 'ODA Inspiration Day 2026',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8uk0dvi6',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            S.documentTypeListItem('page').title('Pages'),
            S.documentTypeListItem('speaker').title('Speakers'),
            S.documentTypeListItem('teamMember').title('Team Members'),
            S.documentTypeListItem('sponsor').title('Sponsors / Partners'),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
