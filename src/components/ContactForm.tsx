"use client";

import { useActionState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitLead } from "@/actions/submit-lead";
import type { SubmitLeadState } from "@/types";
import {
  CONTACT_CTA,
  PRIVACY_POLICY_HREF,
  TERMS_AND_CONDITIONS_HREF,
  SITE_CONTACT,
} from "@/constants/site";

const initialState: SubmitLeadState | null = null;

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitLead, initialState);
  const hasConsentErrors =
    state?.success === false &&
    Boolean(
      state.fieldErrors?.acceptPrivacyPolicy ||
        state.fieldErrors?.acceptTermsConditions
    );

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 bg-gradient-to-b from-[#f6f2ec] to-white py-14 md:py-16"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
            How Much Is Your Home Worth?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[var(--sandstone-charcoal)]/80">
            Share a few details and we&apos;ll help you plan your next move with confidence.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="rounded-2xl border border-white/65 bg-white/72 p-5 shadow-[0_20px_40px_-26px_rgba(37,52,113,0.5)] backdrop-blur-sm sm:p-6">
            <form action={formAction} className="space-y-5">
              {state?.success === true && (
                <p className="rounded-lg bg-green-100 px-4 py-3 text-sm font-medium text-green-800">
                  {state.message}
                </p>
              )}

              {state?.success === false && state.error && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                  {state.error}
                </p>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Jane"
                    required
                    disabled={isPending}
                    className={
                      state?.success === false && state.fieldErrors?.firstName
                        ? "border-red-500"
                        : ""
                    }
                  />
                  {state?.success === false && state.fieldErrors?.firstName && (
                    <p className="text-xs text-red-600">
                      {state.fieldErrors.firstName[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Smith"
                    required
                    disabled={isPending}
                    className={
                      state?.success === false && state.fieldErrors?.lastName
                        ? "border-red-500"
                        : ""
                    }
                  />
                  {state?.success === false && state.fieldErrors?.lastName && (
                    <p className="text-xs text-red-600">
                      {state.fieldErrors.lastName[0]}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@example.com"
                    required
                    disabled={isPending}
                    className={
                      state?.success === false && state.fieldErrors?.email
                        ? "border-red-500"
                        : ""
                    }
                  />
                  {state?.success === false && state.fieldErrors?.email && (
                    <p className="text-xs text-red-600">
                      {state.fieldErrors.email[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    required
                    disabled={isPending}
                    className={
                      state?.success === false && state.fieldErrors?.phone
                        ? "border-red-500"
                        : ""
                    }
                  />
                  {state?.success === false && state.fieldErrors?.phone && (
                    <p className="text-xs text-red-600">
                      {state.fieldErrors.phone[0]}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your real estate goals..."
                  rows={3}
                  disabled={isPending}
                  className={
                    state?.success === false && state.fieldErrors?.message
                      ? "border-red-500"
                      : ""
                  }
                />
                {state?.success === false && state.fieldErrors?.message && (
                  <p className="text-xs text-red-600">
                    {state.fieldErrors.message[0]}
                  </p>
                )}
              </div>

              <div className="space-y-3 rounded-xl border border-[var(--sandstone-navy)]/12 bg-white/88 p-4">
                {hasConsentErrors && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
                  >
                    Please accept both documents before submitting.
                  </div>
                )}

                <label className="flex cursor-pointer items-start gap-3 text-sm text-sandstone-text/90">
                  <input
                    type="checkbox"
                    name="acceptPrivacyPolicy"
                    value="on"
                    disabled={isPending}
                    className="mt-1 h-4 w-4 rounded border-sandstone-brown/50 text-sandstone-navy focus:ring-sandstone-bronze"
                    aria-describedby="privacy-error"
                    aria-invalid={
                      state?.success === false &&
                      Boolean(state.fieldErrors?.acceptPrivacyPolicy)
                    }
                  />
                  <span>
                    I have read and accept the{" "}
                    <Link
                      href={PRIVACY_POLICY_HREF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-sandstone-navy underline underline-offset-2 hover:text-sandstone-bronze"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
                {state?.success === false && state.fieldErrors?.acceptPrivacyPolicy && (
                  <p id="privacy-error" className="text-xs text-red-600">
                    {state.fieldErrors.acceptPrivacyPolicy[0]}
                  </p>
                )}

                <label className="flex cursor-pointer items-start gap-3 text-sm text-sandstone-text/90">
                  <input
                    type="checkbox"
                    name="acceptTermsConditions"
                    value="on"
                    disabled={isPending}
                    className="mt-1 h-4 w-4 rounded border-sandstone-brown/50 text-sandstone-navy focus:ring-sandstone-bronze"
                    aria-describedby="terms-error"
                    aria-invalid={
                      state?.success === false &&
                      Boolean(state.fieldErrors?.acceptTermsConditions)
                    }
                  />
                  <span>
                    I have read and accept the{" "}
                    <Link
                      href={TERMS_AND_CONDITIONS_HREF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-sandstone-navy underline underline-offset-2 hover:text-sandstone-bronze"
                    >
                      Terms and Conditions
                    </Link>
                    .
                  </span>
                </label>
                {state?.success === false && state.fieldErrors?.acceptTermsConditions && (
                  <p id="terms-error" className="text-xs text-red-600">
                    {state.fieldErrors.acceptTermsConditions[0]}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full bg-[var(--sandstone-sand-gold)] px-6 py-3 font-semibold uppercase tracking-wider text-white transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
                disabled={isPending}
              >
                {isPending ? "Sending..." : CONTACT_CTA}
              </Button>
            </form>
          </div>

          <aside className="relative min-h-[280px] overflow-hidden rounded-2xl shadow-md">
            <Image
              src="/house2.webp"
              alt="Luxury home exterior"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[var(--sandstone-navy)]/88 via-[var(--sandstone-navy)]/48 to-transparent"
              aria-hidden
            />
            <div className="relative flex h-full flex-col justify-end p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sandstone-sand-gold)]">
                Luxury. Lifestyle. Legacy.
              </p>
              <h3 className="mt-2 font-heading text-3xl font-bold leading-tight md:text-4xl">
                Ready to Make Your Next Move?
              </h3>
              <p className="mt-3 max-w-sm text-sm text-white/85">
                Schedule a consultation and get a personalized strategy for your property.
              </p>
              <Link
                href={`tel:${SITE_CONTACT.phoneRaw}`}
                className="mt-6 inline-flex w-fit items-center justify-center rounded-full bg-[var(--sandstone-sand-gold)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
              >
                Schedule a Consultation
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
