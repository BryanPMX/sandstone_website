"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitGiveawayLead } from "@/actions/submit-lead";
import type { SubmitLeadState } from "@/types";
import {
  CONTACT_CTA,
  FORM_MARKETING_SMS_COPY,
  FORM_TRANSACTIONAL_SMS_COPY,
  PRIVACY_POLICY_HREF,
  PRIVACY_POLICY_LABEL,
  TERMS_AND_CONDITIONS_HREF,
  TERMS_AND_CONDITIONS_LABEL,
} from "@/constants/site";

const initialState: SubmitLeadState | null = null;

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: Record<string, string | boolean>
  ) => string;
  remove?: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

function TurnstileWidget({ siteKey }: { siteKey: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    let isCancelled = false;
    let pollId: number | null = null;

    const renderWidget = () => {
      if (isCancelled || widgetIdRef.current || !containerRef.current) {
        return;
      }
      if (!window.turnstile?.render) {
        return;
      }
      containerRef.current.innerHTML = "";
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: "light",
      });
      if (pollId !== null) {
        window.clearInterval(pollId);
        pollId = null;
      }
    };

    const handleReady = () => {
      renderWidget();
    };

    renderWidget();
    window.addEventListener("turnstile-ready", handleReady);
    if (!widgetIdRef.current) {
      pollId = window.setInterval(renderWidget, 250);
    }

    return () => {
      isCancelled = true;
      window.removeEventListener("turnstile-ready", handleReady);
      if (pollId !== null) {
        window.clearInterval(pollId);
      }
      if (widgetIdRef.current && window.turnstile?.remove) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  return <div ref={containerRef} className="min-h-[65px]" />;
}

export function QrVisitForm() {
  const [state, formAction, isPending] = useActionState(
    submitGiveawayLead,
    initialState
  );
  const turnstileSiteKey =
    typeof process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY === "string"
      ? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
      : "";
  const hasCaptchaError =
    state?.success === false && Boolean(state.fieldErrors?.captcha);

  return (
    <div className="mx-auto w-full max-w-md">
      <Script
        id="cloudflare-turnstile-api"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => {
          window.dispatchEvent(new Event("turnstile-ready"));
        }}
      />

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
            <Label htmlFor="qr-firstName">First Name</Label>
            <Input
              id="qr-firstName"
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
            <Label htmlFor="qr-lastName">Last Name</Label>
            <Input
              id="qr-lastName"
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
            <Label htmlFor="qr-email">Email</Label>
            <Input
              id="qr-email"
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
            <Label htmlFor="qr-phone">Phone</Label>
            <Input
              id="qr-phone"
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
          <Label htmlFor="qr-message">Message</Label>
          <Textarea
            id="qr-message"
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
          {hasCaptchaError && (
            <div
              role="alert"
              aria-live="assertive"
              className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
            >
              {state.fieldErrors?.captcha?.[0]}
            </div>
          )}

          <div className="space-y-1.5">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--sandstone-navy)]/70">
              Security Check
            </p>
            {turnstileSiteKey ? (
              <TurnstileWidget siteKey={turnstileSiteKey} />
            ) : (
              <p className="text-xs text-red-600">
                Captcha is not configured. Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
              </p>
            )}
          </div>

          <fieldset className="space-y-2.5">
            <legend className="text-xs font-medium uppercase tracking-[0.12em] text-[var(--sandstone-navy)]/70">
              Text Message Preferences (optional)
            </legend>
            <p className="text-[11px] leading-4 text-[var(--sandstone-charcoal)]/75 sm:text-xs sm:leading-5">
              Both options are optional and do not block form submission.
            </p>

            <label className="flex cursor-pointer items-start gap-3 text-sm text-sandstone-text/90">
              <input
                type="checkbox"
                name="acceptTransactionalSms"
                value="on"
                disabled={isPending}
                className="mt-1 h-4 w-4 rounded border-sandstone-brown/50 text-sandstone-navy focus:ring-sandstone-bronze"
              />
              <span className="text-[11px] leading-4 sm:text-xs">
                {FORM_TRANSACTIONAL_SMS_COPY}
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3 text-sm text-sandstone-text/90">
              <input
                type="checkbox"
                name="acceptMarketingSms"
                value="on"
                disabled={isPending}
                className="mt-1 h-4 w-4 rounded border-sandstone-brown/50 text-sandstone-navy focus:ring-sandstone-bronze"
              />
              <span className="text-[11px] leading-4 sm:text-xs">
                {FORM_MARKETING_SMS_COPY}
              </span>
            </label>

            <p className="text-[11px] leading-4 text-[var(--sandstone-charcoal)]/75 sm:text-xs sm:leading-5">
              Review our{" "}
              <Link
                href={PRIVACY_POLICY_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-sandstone-navy underline underline-offset-2 hover:text-sandstone-bronze"
              >
                {PRIVACY_POLICY_LABEL}
              </Link>{" "}
              and{" "}
              <Link
                href={TERMS_AND_CONDITIONS_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-sandstone-navy underline underline-offset-2 hover:text-sandstone-bronze"
              >
                {TERMS_AND_CONDITIONS_LABEL}
              </Link>
              . Mobile opt-in data is not shared with third parties for
              marketing purposes.
            </p>
          </fieldset>
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
  );
}
