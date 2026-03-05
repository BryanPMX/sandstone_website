"use client";

import Link from "next/link";
import { useActionState } from "react";
import { MessageCircle } from "lucide-react";
import { submitListingInquiry } from "@/actions/submit-listing-inquiry";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SubmitLeadState } from "@/types";

const initialState: SubmitLeadState | null = null;

interface ListingInquiryCardProps {
  listingTitle: string;
  listingRouteId: string;
  listingAgentName?: string;
  whatsappHref: string;
}

export function ListingInquiryCard({
  listingTitle,
  listingRouteId,
  listingAgentName,
  whatsappHref,
}: ListingInquiryCardProps) {
  const [state, formAction, isPending] = useActionState(
    submitListingInquiry,
    initialState
  );

  return (
    <aside className="rounded-2xl border border-[var(--sandstone-navy)]/10 bg-[var(--sandstone-off-white)]/70 p-5">
      <h2 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)]">
        Contact Agent
      </h2>

      <form action={formAction} className="mt-4 space-y-3">
        <input type="hidden" name="listingTitle" value={listingTitle} />
        <input type="hidden" name="listingRouteId" value={listingRouteId} />
        <input
          type="hidden"
          name="listingAgentName"
          value={listingAgentName ?? ""}
        />

        {state?.success === true && (
          <p className="rounded-lg bg-green-100 px-3 py-2 text-sm text-green-800">
            {state.message}
          </p>
        )}
        {state?.success === false && state.error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
            {state.error}
          </p>
        )}

        <div className="space-y-1">
          <Label htmlFor="listing-full-name">Full Name</Label>
          <Input
            id="listing-full-name"
            name="fullName"
            placeholder="Jane Smith"
            required
            disabled={isPending}
            className={state?.success === false && state.fieldErrors?.fullName ? "border-red-500" : ""}
          />
          {state?.success === false && state.fieldErrors?.fullName && (
            <p className="text-xs text-red-600">{state.fieldErrors.fullName[0]}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="listing-email">Email</Label>
          <Input
            id="listing-email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            required
            disabled={isPending}
            className={state?.success === false && state.fieldErrors?.email ? "border-red-500" : ""}
          />
          {state?.success === false && state.fieldErrors?.email && (
            <p className="text-xs text-red-600">{state.fieldErrors.email[0]}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="listing-phone">Phone Number</Label>
          <Input
            id="listing-phone"
            name="phone"
            type="tel"
            placeholder="(555) 123-4567"
            required
            disabled={isPending}
            className={state?.success === false && state.fieldErrors?.phone ? "border-red-500" : ""}
          />
          {state?.success === false && state.fieldErrors?.phone && (
            <p className="text-xs text-red-600">{state.fieldErrors.phone[0]}</p>
          )}
        </div>

        <Button
          type="submit"
          className="mt-1 w-full rounded-lg bg-[var(--sandstone-navy)] py-2.5 text-base font-semibold text-white hover:opacity-95"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Submit"}
        </Button>

        <div className="flex justify-center pt-1">
          <Link
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Contact via WhatsApp"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#21b94f] text-white transition hover:brightness-95"
          >
            <MessageCircle size={22} />
          </Link>
        </div>

        <p className="text-center text-xs text-[var(--sandstone-charcoal)]/65">
          Listing agent from Flex MLS:{" "}
          <span className="font-semibold text-[var(--sandstone-charcoal)]/80">
            {listingAgentName || "Not available"}
          </span>
        </p>
      </form>
    </aside>
  );
}
