# ODA Inspiration Day

Conference website for **ODA Inspiration Day** — an annual tech event bringing together the Norwegian tech community.

**Live:** [inspirationday.odanettverk.no](https://inspirationday.odanettverk.no)

## Tech Stack

- **Next.js 16** (App Router, React 19)
- **Sanity CMS v5** — headless CMS with embedded studio at `/studio`
- **Tailwind CSS v4** — utility-first styling with custom brand theme
- **Framer Motion** — page and scroll animations (respects `prefers-reduced-motion`)
- **TypeScript 5** — strict typing throughout
- **Vercel** — hosting and deployment

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (Next.js + Sanity Studio)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the site and [http://localhost:3000/studio](http://localhost:3000/studio) for the CMS.

### Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_REVALIDATE_SECRET=your_webhook_secret
```

## Project Structure

```
src/
├── app/
│   ├── (site)/          # Public pages (home, theme, speakers, etc.)
│   ├── (studio)/        # Sanity Studio route
│   └── api/revalidate/  # ISR webhook
├── components/
│   ├── blocks/          # CMS block components (Hero, FAQ, Schedule, etc.)
│   ├── layout/          # Header, Footer, PageTransition
│   ├── ui/              # Reusable UI (Button, Container, AnimatedSection)
│   ├── theme/           # Theme page components
│   └── why-attend/      # Why Attend page components
├── lib/                 # Utilities, fonts, metadata, constants
└── sanity/
    ├── schemas/         # Document, block, and object schemas
    └── queries/         # GROQ queries
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Content Management

All page content is managed through Sanity CMS. Pages are built with composable **blocks** (Hero, Rich Text, Speaker Grid, Schedule, FAQ, etc.). Each block has an `enabled` toggle for visibility control.

Dynamic pages use the `[slug]` route — create a new Page document in Sanity to add pages like privacy policy, terms, or code of conduct.

## Architecture Rules

- Files must be ≤ 150 lines — split into sub-components when needed
- Content comes from Sanity CMS — no hardcoded strings
- Server components by default — `'use client'` only when necessary
- WCAG AA accessibility — semantic HTML, ARIA attributes, `prefers-reduced-motion`
- Mobile-first responsive design
