@AGENTS.md

# Project Rules — ODA Inspiration Day

## 1. Code Quality — Top Priority

- **Small files.** No file should exceed ~150 lines. Split large components into focused sub-components.
- **One responsibility per file.** A component renders. A query fetches. A schema defines. Don't mix concerns.
- **No `any`, no `@ts-ignore`.** Type all props, Sanity data, and function signatures properly.
- **Server Components by default.** Only add `'use client'` when you need state, effects, or browser APIs.
- **Remove dead code.** No commented-out blocks, unused imports, or leftover variables.
- **DRY within reason.** Extract shared patterns, but three similar lines beat a premature abstraction.
- **Follow existing patterns.** Match the naming conventions, folder structure, and style already in the project.
- **Edit existing files.** Prefer modifying what exists over creating new files.

## 2. Sanity CMS First

- All user-facing text, images, links, and page structure must be editable from Sanity Studio.
- Never hardcode content that a non-developer should be able to change.
- When adding a new section or component, always create/update the corresponding Sanity schema and seed example data.
- Navigation, CTAs, and footer content live in `siteSettings` — not in code constants.
- Use the `enabled` toggle pattern on blocks so editors can show/hide sections without deleting content.

## 3. Norske Nettsider Score (norskenettsider.no)

Every page is evaluated on six equally weighted categories (0-100 each). Final score = sum / 600 × 100.

**Performance** — `next/image` with proper `sizes` for all images. Lazy-load below-fold. `priority` only on LCP image. Minimize client JS. Keep page weight low. No layout shift.

**Accessibility** — 4.5:1 contrast for body text, 3:1 for large text. Semantic HTML (`nav`, `main`, `section`, `header`, `footer`). `aria-label` on icon buttons. `aria-expanded` on toggles. Skip-to-content link. `prefers-reduced-motion` respected. `lang="en"` on `<html>`.

**Best Practices** — HTTPS only. No `console.log` in production. No `dangerouslySetInnerHTML`, `eval`, or `document.write`. `poweredByHeader: false` in next.config.

**SEO** — Unique `<title>` and `<meta description>` per page. One `<h1>`, sequential heading hierarchy. Descriptive link text. Open Graph tags.

**Green Hosting** — Vercel is certified by The Green Web Foundation. Keep it there.

**Carbon / Page Weight** — Target < 0.5g CO2 per page load. Compress assets. Modern image formats via next/image. No unused CSS/JS. Self-host fonts via `next/font`. No heavy third-party scripts.

## 4. Mobile First

- Design for mobile, enhance for desktop. Use responsive Tailwind (`text-base md:text-lg lg:text-xl`).
- Touch targets: minimum 44×44px.
- No accidental horizontal scrolling.
- Always verify navigation and interactive elements on narrow viewports.

## 5. Visual Identity & Originality

- This is a creative conference site. It should feel bold, expressive, and distinctive — not like a template.
- Avoid generic AI-website patterns: no stock-photo grids, no cookie-cutter layouts.
- Brand palette: cream, lavender, dark-blue, red, mint, very-dark. Each color is intentional.
- Motion should feel crafted and purposeful, not decorative noise.
- White space is a feature.

## 6. Pre-Commit Checklist

Before every commit, verify:
- All content editable from Sanity?
- `next/image` for all images with proper sizing?
- No unnecessary `'use client'`?
- `prefers-reduced-motion` respected?
- Heading hierarchy correct?
- Color contrast meets WCAG AA?
- Mobile layout looks good?
- Files under ~150 lines?
