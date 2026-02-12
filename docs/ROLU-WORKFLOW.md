# Rolu → Website Workflow Notes

Goal: keep listings images/metadata fresh on the site without one-off edits.

## What the site expects
- `MSL_FEED_URL` (env): HTTP endpoint returning an array of listings. Each item should map to:
  - `id` (string)
  - `title` or `name`
  - `location` or `address`
  - `price`
  - `image.url` or `photo` (full URL to primary image)
  - optional: `beds`, `baths`, `sqft`, `featured`
- `ROLU_WEBHOOK_URL` (env): incoming webhook Rolu gives you for lead submissions (contact form posts here).

## Recommended workflow structure (single workflow, not per image)
Use one workflow that fires whenever a listing is created/updated and pushes the full payload to the site.

1. **Trigger**
   - Type: App event for your MSL real estate source (e.g., “Listing updated/created”), or “Incoming Webhook” if your source is external.
2. **Action**
   - Type: “Webhook/HTTP Request/Send data”.
   - Method: `POST`.
   - URL: your site endpoint set in `MSL_FEED_URL`.
   - Headers: `Content-Type: application/json`.
   - Body: JSON mapping of trigger fields → site fields:
     ```json
     {
       "id": "{{trigger.id}}",
       "title": "{{trigger.title || trigger.name}}",
       "location": "{{trigger.address}}",
       "price": "{{trigger.price}}",
       "image": {"url": "{{trigger.photo_url}}"},
       "beds": "{{trigger.beds}}",
       "baths": "{{trigger.baths}}",
       "sqft": "{{trigger.square_feet}}",
       "featured": "{{trigger.featured}}",
       "timestamp": "{{trigger.timestamp}}"
     }
     ```
   - (Use the exact token names Rolu shows for your trigger; above is a template.)

3. **Test & enable**
   - Send a test event from the trigger, confirm `200` from your site.
   - Turn on retries/backoff if available.

## FAQ
- **Do we need a workflow per image?** No. The site reads whatever listings the workflow posts. Each listing carries its own image URL; updating the listing image updates the site once the workflow runs.
- **What if the feed is down?** The site falls back to demo listings until `MSL_FEED_URL` responds again.
- **Where to change agent/hero assets?** Static images live under `public/agents/` and `public/hero-poster.jpg` (replace files, no workflow needed).
