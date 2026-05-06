# Listing Inquiry Form Status

This document was originally a planning TODO. The core feature has now been implemented.

## Implemented

- Listing detail pages include an embedded inquiry card/form.
- Submission is handled by dedicated server action logic for listing inquiries.
- Environment routing supports `ROLU_WEBHOOK_LISTING_INQUIRY_URL` with fallback to contact webhook settings.
- Inquiry payload includes listing context (route id, MLS number, Spark id, title, path, price, agent name when available).
- Validation + success/error handling are active in the server action pipeline.

## Current Touchpoints

- `src/app/listings/[id]/page.tsx`
- `src/components/properties/ListingInquiryCard.tsx`
- `src/actions/submit-listing-inquiry.ts`
- `src/config/env.ts`

## Current Behavior Summary

1. User opens a listing detail page and submits inquiry details.
2. `submitListingInquiry` validates required fields.
3. Webhook URL resolves from listing inquiry env, then contact fallback.
4. Lead is submitted through `leadSubmissionService`.
5. Listing context is appended to the message delivered to CRM.

## Follow-Up Opportunities

- Add optional scheduling fields (preferred time/contact method).
- Add dedicated analytics events for inquiry submission success/failure.
- Optionally mirror listing inquiries into Spark contacts if business requires CRM dual-write.

## QA Notes

- Verify payload includes expected listing metadata in your Rolu destination.
- Verify fallback webhook routing when listing inquiry webhook is unset.
- Regression test inquiry submission across mobile and desktop layouts.

## References

- Spark Overview: https://sparkplatform.com/docs/overview
- Spark Contacts API: https://sparkplatform.com/docs/services/contacts
