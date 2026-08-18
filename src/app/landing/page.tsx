import type { Metadata } from "next";
import Script from "next/script";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

/**
 * Landing page for the "Dia del Nino" campaign.
 * URL: https://sandstone.homes/landing
 */
export const metadata: Metadata = {
  title: "Landing | Sandstone Real Estate Group",
  description:
    "Sandstone Real Estate Group - El Paso, Santa Teresa & Fort Bliss. Talk to a local team you can trust.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LandingPage() {
  return (
    <>
      <SiteHeader variant="lead" logoOnly />
      <main className="min-h-screen bg-gradient-to-b from-[#f6f2ec] to-white flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl text-center mb-8">
          <h1 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)] sm:text-4xl">
            Luxury. Lifestyle. Legacy.
          </h1>
          <p className="mt-3 text-base text-[var(--sandstone-charcoal)]/80 sm:text-lg">
            Fill out the form below and a member of the Sandstone Real Estate
            Group team will reach out shortly.
          </p>
        </div>

        <div className="rounded-2xl border border-white/65 bg-white/72 p-5 shadow-[0_20px_40px_-26px_rgba(37,52,113,0.5)] backdrop-blur-sm sm:p-6 w-full max-w-xl">
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/TETJpEApl5xoAu9W5WQx"
            style={{ width: "100%", height: "1569px", border: "none", borderRadius: "3px" }}
            id="inline-TETJpEApl5xoAu9W5WQx"
            data-layout={'{"id":"INLINE"}'}
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="Landing page Sandstone Real Estate  dia del nino"
            data-height="1569"
            data-layout-iframe-id="inline-TETJpEApl5xoAu9W5WQx"
            data-form-id="TETJpEApl5xoAu9W5WQx"
            title="Landing page Sandstone Real Estate  dia del nino"
          />
        </div>

        <p className="mt-6 text-xs text-[var(--sandstone-charcoal)]/60">
          Sandstone Real Estate Group &middot; El Paso, TX
        </p>
      </main>
      <SiteFooter showNav={false} />
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </>
  );
}
