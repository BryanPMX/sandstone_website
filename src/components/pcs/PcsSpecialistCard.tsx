"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import Script from "next/script";
import { submitLead } from "@/actions/submit-lead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  PRIVACY_POLICY_HREF,
  PRIVACY_POLICY_LABEL,
  SITE_CONTACT,
  TERMS_AND_CONDITIONS_HREF,
  TERMS_AND_CONDITIONS_LABEL,
} from "@/constants/site";
import type { SubmitLeadState } from "@/types";

const initialState: SubmitLeadState | null = null;

type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, string | boolean>) => string;
  remove?: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

function CompactTurnstile({ siteKey }: { siteKey: string }) {
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

interface PcsSpecialistCardProps {
  turnstileSiteKey?: string;
}

export function PcsSpecialistCard({ turnstileSiteKey = "" }: PcsSpecialistCardProps) {
  const [state, formAction, isPending] = useActionState(submitLead, initialState);

  return (
    <aside className="rounded-3xl border border-[var(--sandstone-navy)]/12 bg-white p-5 shadow-[0_20px_42px_-30px_rgba(17,24,61,0.48)] sm:p-6">
      <Script
        id="cloudflare-turnstile-api-compact"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => {
          window.dispatchEvent(new Event("turnstile-ready"));
        }}
      />

      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sandstone-navy)]/62">
        PCS Specialist Support
      </p>
      <h3 className="mt-1 font-heading text-2xl font-bold text-[var(--sandstone-navy)]">
        Talk to a PCS Relocation Specialist
      </h3>
      <p className="mt-2 text-sm leading-6 text-[var(--sandstone-charcoal)]/78">
        Send a quick message and we will help you build a relocation plan around your timeline.
      </p>

      <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
        <a
          href={`mailto:${SITE_CONTACT.email}`}
          className="inline-flex rounded-full border border-[var(--sandstone-navy)]/20 bg-[var(--sandstone-off-white)] px-3 py-1.5 text-[var(--sandstone-navy)]"
        >
          Email: {SITE_CONTACT.email}
        </a>
        <a
          href={`tel:${SITE_CONTACT.phoneRaw}`}
          className="inline-flex rounded-full border border-[var(--sandstone-navy)]/20 bg-[var(--sandstone-off-white)] px-3 py-1.5 text-[var(--sandstone-navy)]"
        >
          Call: {SITE_CONTACT.phone}
        </a>
      </div>

      <form action={formAction} className="mt-4 space-y-3">
        <input type="hidden" name="source" value="pcs-specialist" />

        {state?.success === true ? (
          <p className="rounded-lg bg-green-100 px-3 py-2 text-sm font-medium text-green-800">
            {state.message ?? "Thank you. We will contact you shortly."}
          </p>
        ) : null}

        {state?.success === false && state.error ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-800">
            {state.error}
          </p>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor="pcs-specialist-firstName">First Name</Label>
            <Input id="pcs-specialist-firstName" name="firstName" required disabled={isPending} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="pcs-specialist-lastName">Last Name</Label>
            <Input id="pcs-specialist-lastName" name="lastName" required disabled={isPending} />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor="pcs-specialist-email">Email</Label>
            <Input id="pcs-specialist-email" name="email" type="email" required disabled={isPending} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="pcs-specialist-phone">Phone</Label>
            <Input id="pcs-specialist-phone" name="phone" type="tel" required disabled={isPending} />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="pcs-specialist-message">Message</Label>
          <Textarea
            id="pcs-specialist-message"
            name="message"
            rows={2}
            placeholder="Timeline, budget, and priorities..."
            disabled={isPending}
            className="min-h-[82px]"
          />
        </div>

        <input type="hidden" name="acceptTransactionalSms" value="" />
        <input type="hidden" name="acceptMarketingSms" value="" />

        {turnstileSiteKey ? (
          <CompactTurnstile siteKey={turnstileSiteKey} />
        ) : (
          <p className="text-xs text-red-600">
            Captcha is not configured. Set NEXT_PUBLIC_TURNSTILE_SITE_KEY.
          </p>
        )}

        <Button
          type="submit"
          disabled={isPending || !turnstileSiteKey}
          className="w-full rounded-full bg-[var(--sandstone-navy)] text-white hover:bg-[var(--sandstone-navy-deep)]"
        >
          {isPending ? "Sending..." : "Send to PCS Specialist"}
        </Button>

        <p className="text-[11px] leading-5 text-[var(--sandstone-charcoal)]/70">
          By submitting, you agree to our {" "}
          <Link href={PRIVACY_POLICY_HREF} className="underline">
            {PRIVACY_POLICY_LABEL}
          </Link>
          {" "}and{" "}
          <Link href={TERMS_AND_CONDITIONS_HREF} className="underline">
            {TERMS_AND_CONDITIONS_LABEL}
          </Link>
          .
        </p>
      </form>
    </aside>
  );
}
