# Sandstone Real Estate Group Website

Marketing and lead-generation site for Sandstone Real Estate Group, built with Next.js App Router.

## What This App Includes

- Brand-forward responsive marketing pages
- Home hero search with Google Places autocomplete
- Listings grid page and map-first browsing experience
- Listing detail pages with inquiry form
- Lead capture flows for contact, sell, rent, join, and giveaway
- Cloudflare Turnstile verification on lead forms
- Spark-backed listings with automatic fallback to legacy feed/demo data

## Tech Stack

- Next.js 15 + React 19 + TypeScript
- Tailwind CSS
- Zod for schema validation
- Leaflet + react-leaflet + supercluster (map rendering and marker clustering)
- Framer Motion

## App Routes

- `/` home page
- `/listings` listings grid + paging + search
- `/listings/map` interactive map browsing
- `/listings/[id]` listing detail page
- `/sell` seller page + lead capture
- `/rent` rental page + lead capture
- `/join` recruiting page + lead capture
- `/giveaway` QR-focused hidden giveaway form (noindex)
- `/privacy-policy` legal page
- `/terms-and-conditions` legal page

## API Routes

- `/api/listings/my` curated/my listings payload
- `/api/listings/active` active listings payload
- `/api/listings/rent` rental listings payload
- `/api/listings/all` filterable listings endpoint with optional bounds and limits
- `/api/listings/map` map cache refresh/read endpoint
- `/api/listings/diagnostics` listings source + Spark configuration diagnostics

## Data Flow (High Level)

1. Server services pull listings from Spark when configured.
2. On Spark failure or missing token, the app falls back to legacy feed (`MSL_FEED_URL`) and then demo listings.
3. Listings are normalized to shared `PropertyCard` / `PropertyDetail` contracts before rendering.
4. Lead server actions validate with Zod, resolve the correct webhook per form type, and submit through `leadSubmissionService`.

## Scripts

- `npm run dev` start development server (Turbopack)
- `npm run build` production build
- `npm run start` run built app
- `npm run lint` lint the codebase
- `npm run vercel:build` run Vercel build
- `npm run vercel:deploy` deploy via Vercel CLI

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

### Core Listings (Spark)

- `SPARK_ACCESS_TOKEN` (preferred)
- `SPARK_API_TOKEN` (legacy alias)
- `SPARK_API_KEY` (legacy alias)
- `SPARK_API_BASE_URL` (default: `https://sparkapi.com`)
- `SPARK_API_LISTINGS_PATH` (default: `/v1/listings`)
- `SPARK_API_MY_LISTINGS_PATH` (default: `/v1/my/listings`)
- `SPARK_API_RENTAL_LISTINGS_PATH` (default: `/v1/listings`)
- `SPARK_ACTIVE_LISTINGS_FILTER` (fallback alias: `SPARK_LISTINGS_FILTER`)
- `SPARK_MY_LISTINGS_FILTER`
- `SPARK_RENTAL_LISTINGS_FILTER`
- `SPARK_TEAM_FILTER`
- `SPARK_PAGE_SIZE` (fallback alias: `SPARK_LISTINGS_LIMIT`)
- `SPARK_DEBUG_LOOKUPS=1` (optional diagnostics logging)

If your key is replication-restricted (Spark error code `1021`), use:

```bash
SPARK_API_BASE_URL=https://replication.sparkapi.com
```

### Lead + Captcha

- `ROLU_WEBHOOK_URL` (legacy global fallback)
- `ROLU_WEBHOOK_CONTACT_URL`
- `ROLU_WEBHOOK_SELL_URL`
- `ROLU_WEBHOOK_RENT_URL`
- `ROLU_WEBHOOK_JOIN_URL`
- `ROLU_WEBHOOK_GIVEAWAY_URL`
- `ROLU_WEBHOOK_LISTING_INQUIRY_URL`
- `TURNSTILE_SECRET_KEY`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`

### Frontend/URL + Legacy Fallback

- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` (for hero autocomplete and place details)
- `NEXT_PUBLIC_SITE_URL` or `SITE_URL` (canonical listing share links)
- `MSL_FEED_URL` (legacy feed fallback)

## Suggested .env.local Starter

```bash
SPARK_ACCESS_TOKEN=your_server_only_token
SPARK_API_BASE_URL=https://sparkapi.com
SPARK_API_LISTINGS_PATH=/v1/listings
SPARK_API_MY_LISTINGS_PATH=/v1/my/listings
SPARK_ACTIVE_LISTINGS_FILTER=MlsStatus Eq 'Active'
SPARK_PAGE_SIZE=27

ROLU_WEBHOOK_CONTACT_URL=https://example.com/contact-webhook
TURNSTILE_SECRET_KEY=your_turnstile_secret
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

## Project Organization

- `src/app` routes and route-level composition
- `src/components` reusable UI and page sections
- `src/actions` server actions for form submissions
- `src/services` data access and external integrations
- `src/config` environment variable accessors
- `src/lib` pure helpers, filtering, map/listing utilities
- `src/schemas` Zod schemas
- `src/types` shared domain types

## Additional Documentation

- `docs/ARCHITECTURE.md`
- `docs/ROLU-WORKFLOW.md`
- `docs/SPARK-SETUP.md`
- `docs/TODO-LISTING-INQUIRY-FORM.md`
