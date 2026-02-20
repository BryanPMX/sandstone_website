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
  const hasConsentErrors =
    state?.success === false &&
    Boolean(
      state.fieldErrors?.acceptPrivacyPolicy ||
        state.fieldErrors?.acceptTermsConditions
    );

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-16 md:py-24 scroll-mt-20 bg-[var(--sandstone-off-white)]"
    >
      <div className="container relative mx-auto max-w-3xl px-4">
        <div className="relative overflow-hidden rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white p-5 shadow-lg sm:p-8">
          <motion.div
            className="relative text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
              {CONTACT_HEADLINE}
            </h2>
            <p className="mt-[14px] text-[var(--sandstone-charcoal)]/85">
              {CONTACT_SUBHEADLINE}
            </p>
          </motion.div>

          <motion.div
            className="relative mt-6 overflow-hidden rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white p-5 shadow-lg sm:mt-8 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[var(--sandstone-off-white)]/30" aria-hidden />
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
              {hasConsentErrors && (
                <div
                  role="alert"
                  aria-live="assertive"
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
                    disabled={isPending}
                    className="mt-1 h-4 w-4 rounded border-sandstone-brown/50 text-sandstone-navy focus:ring-sandstone-bronze"
                    aria-describedby="privacy-error"
                    aria-invalid={state?.success === false && Boolean(state.fieldErrors?.acceptPrivacyPolicy)}
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
                    aria-invalid={state?.success === false && Boolean(state.fieldErrors?.acceptTermsConditions)}
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
                className="w-full sm:w-auto rounded-full bg-[var(--sandstone-navy)] px-6 py-3 font-semibold text-white uppercase tracking-wider transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sandstone-sand-gold)]"
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
