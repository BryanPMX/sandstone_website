# Architecture & Design Principles

This codebase is structured for a clean, maintainable marketing site with clear boundaries between UI, validation, and integrations.

## Layer Responsibilities

- `app/`: route-level composition and page metadata
- `components/`: presentational sections and reusable UI blocks
- `actions/`: server-side orchestration (validation + service invocation)
- `schemas/`: Zod contracts
- `services/`: external I/O adapters (Spark listings, legacy feed fallback, Rolu webhook)
- `config/`: environment access
- `lib/`: pure helper functions
- `types/`: shared domain contracts
- `constants/`: static copy and links

## SOLID Mapping

| Principle | Current implementation |
|---|---|
| Single Responsibility | `submit-lead.ts` orchestrates; `lead.service.ts` performs network I/O; `lead.ts` schema validates; UI components render only. |
| Open/Closed | New CRM = new `ILeadSubmissionService` implementation; listing data source can change without rewriting listing components. |
| Liskov Substitution | Any `ILeadSubmissionService` implementation can replace `leadSubmissionService`. |
| Interface Segregation | Contracts are small: `LeadInput`, `SubmitLeadState`, `PropertyCard`, `LeadSubmissionResult`. |
| Dependency Inversion | Server action depends on config/services abstractions, not raw `process.env` calls spread across app code. |

## Patterns in Use

- **Service abstraction:** lead submission is encapsulated behind `ILeadSubmissionService`.
- **Data normalization at boundaries:** `spark.service.ts` maps Spark listing payloads into the internal `PropertyCard` shape.
- **Shared search-query model:** `buildListingsMapHref()` and `parseListingsMapSearchParams()` in `lib/properties.ts` keep the home hero and `/listings/map` query state aligned.
- **Pure filtering helpers:** listing search lives in `lib/properties.ts` (`filterPropertyCards`, `filterPropertyCardsWithFilters`) so pages remain composition-focused.
- **Section composition:** pages compose sections; sections consume typed props.

## Current App Flow

### Home (`/`)

1. Fetch listings from `fetchMyPropertyCards()`.
2. Try Spark `my/listings` first, then legacy `MSL_FEED_URL`, then demo fallback data.
3. Render the hero search with a buy-first layout that mirrors the brand comp: compact centered tabs, a refined address field, and preset price/bed/bath filters.
4. On submit, normalize the hero state into `/listings/map` query params via `buildListingsMapHref()`.
5. Render hero, carousel, action tiles, about, contact, footer.

### Listings (`/listings`)

1. Fetch listings from `fetchActivePropertyCards()`.
2. Page through all active Spark listings before falling back.
3. Apply `?search=` query filter.
4. Render full results grid via reusable `ListingCard`.

### Listings Map (`/listings/map`)

1. Read route `searchParams` in the App Router page component.
2. Normalize search text, radius, and preset filters through `parseListingsMapSearchParams()`.
3. Apply shared filtering through `filterPropertyCardsWithFilters()`.
4. Render the map/sidebar results plus a GET search form that preserves active filters on subsequent Enter submits.

### Listing Detail (`/listings/[id]`)

1. Fetch the listing directly by id.
2. Fall back to legacy/demo sources if Spark is unavailable.
3. Render detail view or `notFound()`.

### Lead Submission

1. `ContactForm` submits to `submitLead` server action.
2. Action validates via `LeadSchema`.
3. Action retrieves the form-specific Rolu webhook URL from config.
4. Action calls `leadSubmissionService.submit(...)`.

## Folder Structure

```text
src/
├── actions/
├── app/
├── components/
│   ├── properties/
│   ├── sections/
│   └── ui/
├── config/
├── constants/
├── lib/
├── schemas/
├── services/
└── types/
```

## Extension Guidelines

### Add a New CRM

1. Create a new service implementing `ILeadSubmissionService`.
2. Select implementation in action/config.
3. Keep form/action contracts unchanged.

### Add a New Listings Source

1. Return normalized `PropertyCard[]` from a new service/provider.
2. Keep UI consuming `PropertyCard[]` only.
3. Reuse `buildListingsMapHref()`, `parseListingsMapSearchParams()`, and the filtering helpers for search behavior.
