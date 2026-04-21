# Architecture & Design Principles

This codebase is organized as a layered Next.js App Router application with clear boundaries between UI composition, validation, domain helpers, and external integrations.

## Layer Responsibilities

- `src/app`: route composition, metadata, API route handlers
- `src/components`: reusable UI blocks and page sections
- `src/actions`: server actions for lead and inquiry submission
- `src/schemas`: Zod validation contracts
- `src/services`: integrations (Spark, legacy feed, captcha, lead delivery)
- `src/config`: environment accessors and defaults
- `src/lib`: pure helpers (filtering, query parsing/building, cache helpers)
- `src/types`: shared domain contracts
- `src/constants`: static content and links

## Core Patterns

- Service abstraction: lead delivery is encapsulated behind `ILeadSubmissionService`.
- Boundary normalization: Spark/legacy payloads are normalized into internal property contracts.
- Shared URL-state model: map/listing query params are generated and parsed through the same property helper APIs.
- Progressive fallback strategy: Spark -> legacy feed -> demo data.
- Composition-first pages: app routes orchestrate data and pass typed props to components.

## Current Route Flows

### Home (`/`)

1. Fetches cards via `fetchMyPropertyCards()`.
2. Applies curation logic (Alejandro/Spark subset).
3. Renders: header, hero, featured listings, primary action tiles, contact form, footer.
4. Hero submit builds query state with `buildListingsMapHref()` and navigates to `/listings/map`.

### Listings Grid (`/listings`)

1. Fetches from `fetchMyPropertyCards()`.
2. Applies curation + search + market filter.
3. Applies pagination using configured Spark page size.
4. Renders listing cards with page navigation.

### Listings Map (`/listings/map`)

1. Server page preloads data from map cache helpers.
2. Client map uses shared parsing/filtering helpers for search, listing type, and presets.
3. Uses map bounds + filter params against listings APIs for responsive map-side filtering.

### Listing Detail (`/listings/[id]`)

1. Fetches detail by route id and optional Spark hints.
2. Builds map/share URLs and renders media/spec sections.
3. Embeds listing inquiry card that submits listing-context lead data.

### Lead + Inquiry Submission

1. Forms submit to server actions.
2. Inputs are validated with Zod.
3. Webhook target is resolved from form type and environment config.
4. Submission passes through `leadSubmissionService`.
5. Listing inquiry uses dedicated action (`submitListingInquiry`) and appends property context into the message payload.

## API Surface (Listings)

- `/api/listings/my`
- `/api/listings/active`
- `/api/listings/rent`
- `/api/listings/all`
- `/api/listings/map`
- `/api/listings/diagnostics`

## Folder Structure

```text
src/
├── actions/
├── app/
├── components/
├── config/
├── constants/
├── hooks/
├── lib/
├── schemas/
├── services/
└── types/
```

## Extension Guidelines

### Add a New CRM Destination

1. Add a new `ILeadSubmissionService` implementation.
2. Wire selection through config/service composition.
3. Keep form contracts and UI stable.

### Add a New Listings Source

1. Normalize source payloads into internal property contracts.
2. Plug source into `listings.service.ts` resolution strategy.
3. Reuse shared filtering/query helpers so UX behavior stays consistent.
