# Rolu to Website Workflow Notes

Goal: keep listing images and metadata fresh on the site without one-off edits.

---

## What the Site Expects

- **`MSL_FEED_URL`** (env): HTTP endpoint returning an array of listings. Each item should map to:
  - `id` (string)
  - `title` or `name`
  - `location` or `address`
  - `price`
  - `image.url` or `photo` (full URL to primary image)
  - optional: `beds`, `baths`, `sqft`, `featured`
- **`ROLU_WEBHOOK_URL`** (env): Incoming webhook URL for lead submissions (contact form posts here).

---

## Recommended Workflow Structure (Single Workflow)

Use one workflow that runs when a listing is created or updated and pushes the full payload to the site.

1. **Trigger**
   - Type: App event for your MSL real estate source (e.g. "Listing updated/created"), or "Incoming Webhook" if your source is external.

2. **Action**
   - Type: "Webhook/HTTP Request/Send data".
   - Method: `POST`.
   - URL: the endpoint you set in `MSL_FEED_URL` (the site consumes this feed; the exact URL depends on your Rolu/site setup).
   - Headers: `Content-Type: application/json`.
   - Body: JSON mapping of trigger fields to site fields, for example:
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
   - Use the exact token names Rolu shows for your trigger; the above is a template.

3. **Test and enable**
   - Send a test event from the trigger and confirm a successful response from your feed consumer.
   - Turn on retries/backoff if available.

---

## FAQ

- **Do we need a workflow per image?** No. The site reads whatever listings the workflow provides. Each listing carries its own image URL; updating the listing image updates the site when the workflow runs.
- **What if the feed is down?** The site falls back to demo listings until `MSL_FEED_URL` responds again.
- **Where do hero, logo, and other static assets live?** All served assets live under **`public/`**. Examples: `hero.webp` (hero background), `logo-mark.webp` and `logo-hero.webp` (brand), `icon1.webp`–`icon3.webp` (action tiles), `keller-williams.webp` and `mls.webp` (footer compliance). Agent photos are `agents-1.jpg` … `agents-4.jpg`. Replace or add files in `public/` as needed; no Rolu workflow is required for these.
