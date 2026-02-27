# Sandstone Real Estate Group Website

Next.js 15 (App Router) marketing website for Sandstone Real Estate Group.

## Overview

The site is a brand-forward real estate experience with:

- Responsive landing page (desktop + mobile)
- Searchable listings feed with dynamic detail pages
- Lead capture form wired to Rolu webhook
- View-only Privacy Policy and Terms pages

Core design direction is defined by brand tokens in `src/app/globals.css` and Montserrat loaded in `src/app/layout.tsx`.

## Tech Stack

- Next.js 15 + React 19 + TypeScript
- Tailwind CSS
- Zod validation
- Framer Motion (contact animations)
- Mammoth (DOCX to HTML conversion for legal docs)

## Architecture

The project is organized by responsibility:

- `src/app`: routes and page composition
- `src/components`: UI sections and reusable components
- `src/actions`: server actions (orchestration only)
- `src/services`: external I/O (MSL feed, lead webhook)
- `src/schemas`: validation contracts
- `src/config`: env accessors
- `src/lib`: pure helpers/utilities
- `src/types`: shared domain types
- `src/constants`: static copy/links

### SOLID in practice

- **Single Responsibility:** each layer has one job (validation vs I/O vs composition).
- **Open/Closed:** new CRM integrations or listing data sources can be added without rewriting UI components.
- **Liskov Substitution:** any implementation of `ILeadSubmissionService` can replace the default one.
- **Interface Segregation:** small focused types (`LeadInput`, `SubmitLeadState`, `PropertyCard`).
- **Dependency Inversion:** server action depends on service interface + config functions, not direct env/fetch logic.

## Routes

- `/`: home page
- `/listings`: all listings, optional `?search=` filter
- `/listings/[id]`: listing details
- `/sell`: service stub page
- `/rent`: service stub page
- `/join`: recruiting stub page
- `/privacy-policy`: view-only legal page
- `/terms-and-conditions`: view-only legal page

## Home Page Composition

`src/app/page.tsx` composes:

1. `SiteHeader`
2. `HeroSection` (search input)
3. `FeaturedListingsSection` (first 4 filtered listings)
4. `PrimaryActionTiles`
5. `AboutSection`
6. `ContactForm`
7. `SiteFooter`

## Listings Flow

1. `fetchMslPropertyCards()` in `src/services/msl.service.ts` loads feed data from `MSL_FEED_URL`.
2. If feed is unavailable, fallback demo listings are returned.
3. `filterPropertyCards()` in `src/lib/properties.ts` applies search query filtering.
4. Cards link into `/listings/[id]` detail pages.

## Lead Form Flow

1. User submits `ContactForm`.
2. `submitLead` server action validates input using `LeadSchema`.
3. Action reads `ROLU_WEBHOOK_URL` via `getRoluWebhookUrl()`.
4. `leadSubmissionService.submit(...)` posts payload to webhook.
5. UI shows success/error + field errors.

## Environment Variables

- `ROLU_WEBHOOK_URL`: required for lead submissions
- `MSL_FEED_URL`: optional JSON listings feed URL

## Local Development

```bash
npm install
npm run dev
```

Build and checks:

```bash
npm run lint
npm run build
```

## Project Structure

```text
src/
├── actions/
│   └── submit-lead.ts
├── app/
│   ├── globals.css
│   ├── join/page.tsx
│   ├── layout.tsx
│   ├── listings/
│   │   ├── [id]/page.tsx
│   │   └── page.tsx
│   ├── page.tsx
│   ├── privacy-policy/page.tsx
│   ├── rent/page.tsx
│   ├── sell/page.tsx
│   └── terms-and-conditions/page.tsx
├── components/
│   ├── properties/
│   │   ├── index.ts
│   │   └── ListingCard.tsx
│   ├── sections/
│   │   ├── AboutSection.tsx
│   │   ├── FeaturedListingsSection.tsx
│   │   └── PrimaryActionTiles.tsx
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── textarea.tsx
│   ├── ContactForm.tsx
│   ├── HeroSection.tsx
│   ├── LegalDocumentLayout.tsx
│   ├── MobileMenuPortal.tsx
│   ├── SiteFooter.tsx
│   ├── SiteHeader.tsx
├── config/
│   ├── env.ts
│   └── index.ts
├── constants/
│   ├── index.ts
│   └── site.ts
├── lib/
│   ├── index.ts
│   ├── properties.ts
│   ├── utils.ts
│   └── zod.ts
├── schemas/
│   ├── index.ts
│   └── lead.ts
├── services/
│   ├── index.ts
│   ├── lead.service.ts
│   └── msl.service.ts
└── types/
    ├── index.ts
    ├── lead.ts
    └── property.ts
```

## Additional Docs

- `docs/ARCHITECTURE.md`
- `docs/ROLU-WORKFLOW.md`
