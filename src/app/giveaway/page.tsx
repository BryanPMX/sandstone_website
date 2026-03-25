import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { QrVisitForm } from "@/components/QrVisitForm";
import { getTurnstileSiteKey } from "@/config";

/**
 * Hidden page for giveaway sign-up. QR code / direct URL only.
 * Not linked from the main site. URL: https://sandstone.homes/giveaway
 */
export const metadata: Metadata = {
  title: "Giveaway | Sandstone Real Estate Group",
  description: "Enter the giveaway — Sandstone Real Estate Group.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GiveawayPage() {
  const turnstileSiteKey = getTurnstileSiteKey();

  return (
    <>
      <SiteHeader variant="lead" logoOnly />
      <main className="min-h-screen bg-gradient-to-b from-[#f6f2ec] to-white flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center mb-8">
        <h1 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)] sm:text-3xl">
          Enter the Giveaway
        </h1>
        <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/80">
          Share your details below to enter.
        </p>
      </div>
      <div className="rounded-2xl border border-white/65 bg-white/72 p-5 shadow-[0_20px_40px_-26px_rgba(37,52,113,0.5)] backdrop-blur-sm sm:p-6 w-full max-w-md">
        <QrVisitForm turnstileSiteKey={turnstileSiteKey} />
      </div>
      <p className="mt-6 text-xs text-[var(--sandstone-charcoal)]/60">
        Sandstone Real Estate Group · El Paso
      </p>
    </main>
      <SiteFooter showNav={false} />
    </>
  );
}
