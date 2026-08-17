# Rolu Workflow Notes

Goal: keep lead delivery reliable while preserving legacy listings fallback support during Spark operations.

## Current Environment Contract

- `SPARK_ACCESS_TOKEN` for primary server-side listings access
- `MSL_FEED_URL` optional legacy listings fallback endpoint
- `ROLU_WEBHOOK_URL` backward-compatible contact fallback
- `ROLU_WEBHOOK_CONTACT_URL`
- `ROLU_WEBHOOK_SELL_URL`
- `ROLU_WEBHOOK_RENT_URL`
- `ROLU_WEBHOOK_JOIN_URL`
- `ROLU_WEBHOOK_GIVEAWAY_URL`
- `ROLU_WEBHOOK_LISTING_INQUIRY_URL`

## Listings Resolution Order

1. Spark listings services
2. Legacy feed via `MSL_FEED_URL`
3. Demo fallback listings

Use Rolu for listing feed delivery only if the legacy fallback endpoint is still part of your rollout.

## Legacy Listing Feed Shape

The app can normalize fallback feed items from common field names:

- `id`
- `title` or `name`
- `location` or `address`
- `price` or `listPrice`
- `image.url` or `photo`
- optional: `beds`, `baths`, `sqft`, `featured`

## Lead Delivery Flow

### Standard forms (contact, sell, rent, join, giveaway)

1. Client form submits to server action.
2. Server action validates with Zod.
3. Captcha token is verified with Turnstile before submission.
4. Webhook URL is resolved from form-specific env vars.
5. Payload is built per form type and sent through `leadSubmissionService`.

### Listing inquiry form (`/listings/[id]`)

1. Listing inquiry card submits to dedicated server action.
2. Action validates user fields and listing context fields.
3. Webhook URL resolves from `ROLU_WEBHOOK_LISTING_INQUIRY_URL`, then contact fallback.
4. Lead is delivered through `leadSubmissionService` with listing context appended into the message.

## Operational Checks

- If listing data appears stale, validate Spark credentials first, then verify `MSL_FEED_URL` only if fallback is enabled.
- If lead delivery fails, confirm relevant `ROLU_WEBHOOK_*` values and receiving endpoint health.
- If captcha blocks submissions, verify both `TURNSTILE_SECRET_KEY` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
- Keep media endpoints HTTPS to avoid mixed-content/browser issues.

## Suggested Rolu Ops Practices

- Use retry/backoff on webhook destinations.
- Log destination response codes for troubleshooting.
- Keep separate workflows for listing inquiries vs general contact leads.
