"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { submitLead } from "@/actions/submit-lead";
import type { SubmitLeadState } from "@/types";
import {
  CONTACT_HEADLINE,
  CONTACT_SUBHEADLINE,
  CONTACT_CTA,
  PRIVACY_POLICY_HREF,
  TERMS_AND_CONDITIONS_HREF,
} from "@/constants/site";

const initialState: SubmitLeadState | null = null;

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitLead,
    initialState
  );

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-[70px] md:py-[98px] scroll-mt-20 bg-gradient-to-br from-sandstone-bg via-sandstone-base/95 to-sandstone-bronze/40"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.03] to-sandstone-navy/10" aria-hidden />
      <div className="pointer-events-none absolute -left-14 top-4 h-56 w-56 rounded-full bg-sandstone-bronze/22 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-8 h-64 w-64 rounded-full bg-sandstone-navy/18 blur-[110px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sandstone-gold/8 blur-[100px]" aria-hidden />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-sandstone-navy/15 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-0 backdrop-blur-[2px]" aria-hidden />
      <div className="container relative mx-auto max-w-3xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-gradient-to-br from-white/55 via-sandstone-base/40 to-sandstone-bronze/28 p-5 shadow-[0_8px_32px_-16px_rgba(37,52,113,0.25)] ring-1 ring-white/20 ring-inset backdrop-blur-xl sm:p-[35px] md:p-[42px]">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-white/8 to-sandstone-navy/10" />
          <motion.div
            className="relative text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl font-bold text-sandstone-gold md:text-4xl">
              {CONTACT_HEADLINE}
            </h2>
            <p className="mt-[14px] text-sandstone-text/85">
              {CONTACT_SUBHEADLINE}
            </p>
          </motion.div>

          <motion.div
            className="relative mt-6 overflow-hidden rounded-2xl border border-white/45 bg-gradient-to-br from-white/70 via-sandstone-base/50 to-sandstone-bronze/35 p-5 shadow-[0_18px_40px_-24px_rgba(37,52,113,0.4)] ring-1 ring-white/25 ring-inset backdrop-blur-xl sm:mt-[35px] sm:p-[35px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/30 via-sandstone-base/12 to-sandstone-navy/10" />
            <form action={formAction} className="relative space-y-[28px]">
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

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Jane"
                  required
                  disabled={isPending}
                  className={state?.success === false && state.fieldErrors?.firstName ? "border-red-500" : ""}
                />
                {state?.success === false && state.fieldErrors?.firstName && (
                  <p className="text-xs text-red-600">
                    {state.fieldErrors.firstName[0]}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Smith"
                  required
                  disabled={isPending}
                  className={state?.success === false && state.fieldErrors?.lastName ? "border-red-500" : ""}
                />
                {state?.success === false && state.fieldErrors?.lastName && (
                  <p className="text-xs text-red-600">
                    {state.fieldErrors.lastName[0]}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="jane@example.com"
                required
                disabled={isPending}
                className={state?.success === false && state.fieldErrors?.email ? "border-red-500" : ""}
              />
              {state?.success === false && state.fieldErrors?.email && (
                <p className="text-xs text-red-600">
                  {state.fieldErrors.email[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(555) 123-4567"
                required
                disabled={isPending}
                className={state?.success === false && state.fieldErrors?.phone ? "border-red-500" : ""}
              />
              {state?.success === false && state.fieldErrors?.phone && (
                <p className="text-xs text-red-600">
                  {state.fieldErrors.phone[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us about your real estate goals..."
                rows={4}
                disabled={isPending}
                className={state?.success === false && state.fieldErrors?.message ? "border-red-500" : ""}
              />
              {state?.success === false && state.fieldErrors?.message && (
                <p className="text-xs text-red-600">
                  {state.fieldErrors.message[0]}
                </p>
              )}
            </div>

            <div className="space-y-4 rounded-lg border border-white/30 bg-white/10 p-4">
              {(state?.success === false &&
                (state.fieldErrors?.acceptPrivacyPolicy ?? state.fieldErrors?.acceptTermsConditions)) && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
                >
                  <p className="font-medium">
                    Please accept both documents below before submitting your message.
                  </p>
                  <p className="mt-1 text-red-700/90">
                    We need your consent to process your request and stay compliant with our policies.
                  </p>
                </div>
              )}
              <p className="text-sm font-medium text-sandstone-text/90">
                Before submitting, please accept:
              </p>
              <div className="flex flex-col gap-3 sm:gap-4">
                <label className="flex cursor-pointer items-start gap-3 text-sm text-sandstone-text/90">
                  <input
                    type="checkbox"
                    name="acceptPrivacyPolicy"
                    value="on"
                    required
                    disabled={isPending}
                    className="mt-1 h-4 w-4 rounded border-sandstone-brown/50 text-sandstone-navy focus:ring-sandstone-bronze"
                    aria-describedby="privacy-error"
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
                    required
                    disabled={isPending}
                    className="mt-1 h-4 w-4 rounded border-sandstone-brown/50 text-sandstone-navy focus:ring-sandstone-bronze"
                    aria-describedby="terms-error"
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
            </div>

              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-sandstone-maroon via-sandstone-navy to-[#70543c] text-white shadow-[0_18px_32px_-18px_rgba(37,52,113,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_44px_-18px_rgba(37,52,113,0.85)] focus-visible:-translate-y-0.5 uppercase tracking-wider"
                disabled={isPending}
              >
                {isPending ? "Sending..." : CONTACT_CTA}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
