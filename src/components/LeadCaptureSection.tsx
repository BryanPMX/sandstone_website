"use client";

import { useActionState } from "react";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitLeadForForm } from "@/actions/submit-lead";
import type { LeadFormType, SubmitLeadState } from "@/types";
import {
  PRIVACY_POLICY_HREF,
  TERMS_AND_CONDITIONS_HREF,
  SITE_CONTACT,
} from "@/constants/site";

const initialState: SubmitLeadState | null = null;

export interface LeadCaptureSectionProps {
  formType: LeadFormType;
  sectionId?: string;
  heading: string;
  subheading: string;
  ctaLabel: string;
  messagePlaceholder?: string;
  asideEyebrow?: string;
  asideTitle?: string;
  asideDescription?: string;
  asideCtaLabel?: string;
  asideCtaHref?: string;
}

export function LeadCaptureSection({
  formType,
  sectionId,
  heading,
  subheading,
  ctaLabel,
  messagePlaceholder = "Tell us about your real estate goals...",
  asideEyebrow = "Luxury. Lifestyle. Legacy.",
  asideTitle = "Ready to Make Your Next Move?",
  asideDescription = "Schedule a consultation and get a personalized strategy for your property.",
  asideCtaLabel = "Schedule a Consultation",
  asideCtaHref = `tel:${SITE_CONTACT.phoneRaw}`,
}: LeadCaptureSectionProps) {
  const action = submitLeadForForm.bind(null, formType);
  const [state, formAction, isPending] = useActionState(action, initialState);
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const hasConsentErrors =
    state?.success === false &&
    Boolean(
      state.fieldErrors?.acceptPrivacyPolicy ||
        state.fieldErrors?.acceptTermsConditions
    );
  const hasCaptchaError =
    state?.success === false && Boolean(state.fieldErrors?.captcha);
  const id = (field: string) => `${formType}-${field}`;

  return (
    <section
      id={sectionId}
      className="relative scroll-mt-20 bg-gradient-to-b from-[#f6f2ec] to-white py-14 md:py-16"
    >
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />

      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
            {heading}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[var(--sandstone-charcoal)]/80">
            {subheading}
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
                  <Label htmlFor={id("firstName")}>First Name</Label>
                  <Input
                    id={id("firstName")}
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
                  <Label htmlFor={id("lastName")}>Last Name</Label>
                  <Input
                    id={id("lastName")}
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
                  <Label htmlFor={id("email")}>Email</Label>
                  <Input
                    id={id("email")}
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
                  <Label htmlFor={id("phone")}>Phone</Label>
                  <Input
                    id={id("phone")}
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
                <Label htmlFor={id("message")}>Message</Label>
                <Textarea
                  id={id("message")}
                  name="message"
                  placeholder={messagePlaceholder}
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
                {hasCaptchaError && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
                  >
                    {state.fieldErrors?.captcha?.[0]}
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--sandstone-navy)]/70">
                    Security Check
                  </p>

                  {turnstileSiteKey ? (
                    <div
                      className="cf-turnstile"
                      data-sitekey={turnstileSiteKey}
                      data-theme="light"
                    />
                  ) : (
                    <p className="text-xs text-red-600">
                      Captcha is not configured. Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
                    </p>
                  )}
                </div>

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
                    aria-describedby={id("privacy-error")}
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
                  <p id={id("privacy-error")} className="text-xs text-red-600">
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
                    aria-describedby={id("terms-error")}
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
                  <p id={id("terms-error")} className="text-xs text-red-600">
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
                {isPending ? "Sending..." : ctaLabel}
              </Button>

              {/* TODO: add honeypot + rate limiting as a second anti-bot layer. */}
            </form>
          </div>

          <aside className="relative isolate min-h-[340px] overflow-hidden rounded-2xl border border-[var(--sandstone-navy)]/10 bg-[var(--sandstone-navy)] shadow-[0_24px_40px_-24px_rgba(37,52,113,0.5)]">
            <div
              aria-hidden
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgba(37,52,113,0.74) 8%, rgba(37,52,113,0.34) 50%, rgba(37,52,113,0.08) 100%), linear-gradient(135deg, rgba(37,52,113,0.12), rgba(183,150,120,0.14)), url('/house2.webp')",
              }}
            />
            <div className="relative flex h-full flex-col justify-end p-6 text-white md:p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--sandstone-sand-gold)]">
                {asideEyebrow}
              </p>
              <h3 className="mt-2 font-heading text-3xl font-bold leading-tight md:text-4xl">
                {asideTitle}
              </h3>
              <p className="mt-3 max-w-sm text-sm text-white/85">
                {asideDescription}
              </p>
              <Link
                href={asideCtaHref}
                className="mt-6 inline-flex w-fit items-center justify-center rounded-full bg-[var(--sandstone-sand-gold)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
              >
                {asideCtaLabel}
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
