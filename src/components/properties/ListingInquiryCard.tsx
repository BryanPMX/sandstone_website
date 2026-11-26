"use client";

import { useActionState, useEffect, useState } from "react";
import { submitListingInquiry } from "@/actions/submit-listing-inquiry";
import { Button } from "@/components/ui/button";
import { TurnstileWidget } from "@/components/TurnstileWidget";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SubmitLeadState } from "@/types";

const initialState: SubmitLeadState | null = null;

interface ListingInquiryCardProps {
  listingTitle: string;
  listingRouteId: string;
  listingNumber?: string;
  listingSparkId?: string;
  listingPath: string;
  listingPrice: string;
  listingAgentName?: string;
  turnstileSiteKey?: string;
}

export function ListingInquiryCard({
  listingTitle,
  listingRouteId,
  listingNumber,
  listingSparkId,
  listingPath,
  listingPrice,
  listingAgentName,
  turnstileSiteKey = "",
}: ListingInquiryCardProps) {
  const [state, formAction, isPending] = useActionState(
    submitListingInquiry,
    initialState,
  );

  const [captchaVersion, setCaptchaVersion] = useState(0);
  const [previousResult, setPreviousResult] = useState(state);

  if (previousResult !== state) {
    setPreviousResult(state);

    if (state) {
      setCaptchaVersion((version) => version + 1);
    }
  }

  useEffect(() => {
    if (!state) return;

    const w = window as typeof window & {
      gtag?: (...args: unknown[]) => void;
    };

    w.gtag?.("event", state.success ? "generate_lead" : "lead_form_error", {
      form_type: "listing_inquiry",
      ...(state.success
        ? {}
        : {
            error_type: state.fieldErrors?.captcha
              ? "captcha"
              : state.fieldErrors
                ? "validation"
                : "delivery",
          }),
    });
  }, [state]);

  return (
    <aside
      id="property-inquiry"
      className="rounded-2xl border border-[var(--sandstone-navy)]/10 bg-[var(--sandstone-off-white)]/70 p-5 shadow-sm"
    >
      <h2 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)]">
        Interested in This Property?
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-[var(--sandstone-charcoal)]/70">
        Have questions or want to schedule a showing? Our team is here to help.
      </p>

      <form action={formAction} className="mt-5 space-y-4">
        {/* Property information */}
        <input type="hidden" name="listingTitle" value={listingTitle} />
        <input type="hidden" name="listingRouteId" value={listingRouteId} />
        <input type="hidden" name="listingNumber" value={listingNumber ?? ""} />
        <input
          type="hidden"
          name="listingSparkId"
          value={listingSparkId ?? ""}
        />
        <input type="hidden" name="listingPath" value={listingPath} />
        <input type="hidden" name="listingPrice" value={listingPrice} />
        <input
          type="hidden"
          name="listingAgentName"
          value={listingAgentName ?? ""}
        />

        {/* Submission messages */}
        {state?.success === true && (
          <p
            role="status"
            className="rounded-lg bg-green-100 px-3 py-3 text-sm text-green-800"
          >
            {state.message}
          </p>
        )}

        {state?.success === false && state.error && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-3 py-3 text-sm text-red-800"
          >
            {state.error}
          </p>
        )}

        {/* Inquiry selection */}
        <div className="space-y-2">
          <Label htmlFor="inquiry-type">How Can We Help?</Label>

          <select
            id="inquiry-type"
            name="inquiryType"
            required
            disabled={isPending}
            defaultValue="information"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-[var(--sandstone-charcoal)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]"
          >
            <option value="information">Request More Information</option>
            <option value="tour">Schedule a Property Tour</option>
            <option value="question">Ask a Question</option>
          </select>

          {state?.success === false && state.fieldErrors?.inquiryType && (
            <p className="text-xs text-red-600">
              {state.fieldErrors.inquiryType[0]}
            </p>
          )}
        </div>

        {/* Full name */}
        <div className="space-y-2">
          <Label htmlFor="listing-full-name">Full Name</Label>

          <Input
            id="listing-full-name"
            name="fullName"
            placeholder="Jane Smith"
            autoComplete="name"
            required
            disabled={isPending}
            className={
              state?.success === false && state.fieldErrors?.fullName
                ? "border-red-500"
                : ""
            }
          />

          {state?.success === false && state.fieldErrors?.fullName && (
            <p className="text-xs text-red-600">
              {state.fieldErrors.fullName[0]}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="listing-email">Email Address</Label>

          <Input
            id="listing-email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            autoComplete="email"
            required
            disabled={isPending}
            className={
              state?.success === false && state.fieldErrors?.email
                ? "border-red-500"
                : ""
            }
          />

          {state?.success === false && state.fieldErrors?.email && (
            <p className="text-xs text-red-600">{state.fieldErrors.email[0]}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="listing-phone">Phone Number</Label>

          <Input
            id="listing-phone"
            name="phone"
            type="tel"
            placeholder="(915) 555-0123"
            autoComplete="tel"
            required
            disabled={isPending}
            className={
              state?.success === false && state.fieldErrors?.phone
                ? "border-red-500"
                : ""
            }
          />

          {state?.success === false && state.fieldErrors?.phone && (
            <p className="text-xs text-red-600">{state.fieldErrors.phone[0]}</p>
          )}
        </div>

        {/* Optional message */}
        <div className="space-y-2">
          <Label htmlFor="listing-message">Your Message (Optional)</Label>

          <textarea
            id="listing-message"
            name="message"
            rows={4}
            maxLength={2000}
            disabled={isPending}
            placeholder="Tell us what you'd like to know about this property..."
            className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-[var(--sandstone-charcoal)] focus:outline-none focus:ring-2 focus:ring-[var(--sandstone-sand-gold)]"
          />

          {state?.success === false && state.fieldErrors?.message && (
            <p className="text-xs text-red-600">
              {state.fieldErrors.message[0]}
            </p>
          )}
        </div>

        <div className="space-y-2 rounded-lg border border-[var(--sandstone-navy)]/10 bg-white p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--sandstone-navy)]">
            Security Check
          </p>

          {state?.success === false && state.fieldErrors?.captcha && (
            <p role="alert" className="text-xs text-red-600">
              {state.fieldErrors.captcha[0]}
            </p>
          )}

          {turnstileSiteKey ? (
            <TurnstileWidget
              key={`listing-inquiry-${captchaVersion}`}
              siteKey={turnstileSiteKey}
              formType="listing_inquiry"
            />
          ) : (
            <p role="alert" className="text-xs text-red-600">
              Security verification is temporarily unavailable.
              Please contact our team directly.
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="mt-2 w-full rounded-lg bg-[var(--sandstone-navy)] py-3 text-base font-semibold text-white transition hover:opacity-95"
          disabled={isPending || !turnstileSiteKey}
        >
          {isPending ? "Submitting..." : "CONTACT OUR TEAM"}
        </Button>

        <p className="text-center text-xs leading-relaxed text-[var(--sandstone-charcoal)]/65">
          Our team will review your inquiry and follow up.
        </p>

        {/* Listing agent */}
        <div className="border-t border-[var(--sandstone-navy)]/10 pt-4">
          <p className="text-center text-xs text-[var(--sandstone-charcoal)]/65">
            Listing Agent:{" "}
            <span className="font-semibold text-[var(--sandstone-charcoal)]/80">
              {listingAgentName || "Not available"}
            </span>
          </p>
        </div>
      </form>
    </aside>
  );
}
