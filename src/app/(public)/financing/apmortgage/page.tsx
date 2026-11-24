import type { Metadata } from "next";
import Script from "next/script";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

/**
 * Financing partner page for American Pacific Mortgage / Lisa Wren.
 * URL: https://sandstone.homes/financing/apmortgage
 */
export const metadata: Metadata = {
  title: "VA & PCS Financing in El Paso | Lisa Wren, American Pacific Mortgage",
  description:
    "Get pre-approved for your VA or PCS home purchase in El Paso, TX. Connect with Lisa Wren, Branch Manager at American Pacific Mortgage, licensed in TX and NM.",
  alternates: {
    canonical: "https://www.sandstone.homes/financing/apmortgage",
  },
};

export default function ApMortgageFinancingPage() {
  return (
    <>
      <Script
        id="apmortgage-lender-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            name: "Lisa Wren - American Pacific Mortgage",
            description:
              "Branch Manager at American Pacific Mortgage, serving VA and PCS homebuyers in El Paso, TX and the surrounding region.",
            url: "https://www.sandstone.homes/financing/apmortgage",
            telephone: "+16015496768",
            email: "Lisa.Wren@apmortgage.com",
            areaServed: ["El Paso, TX", "New Mexico"],
            address: {
              "@type": "PostalAddress",
              streetAddress: "221 N Kansas Suite 700",
              addressLocality: "El Paso",
              addressRegion: "TX",
              postalCode: "79902",
              addressCountry: "US",
            },
            employee: {
              "@type": "Person",
              name: "Lisa Wren",
              jobTitle: "Branch Manager",
              telephone: "+16015496768",
              email: "Lisa.Wren@apmortgage.com",
              url: "https://www.apmortgage.com/lisa-wren",
            },
          }),
        }}
      />

      <SiteHeader />

      <main className="min-h-screen bg-gradient-to-b from-[#f6f2ec] to-white">
        <section className="mx-auto w-full max-w-5xl px-4 py-14 lg:px-6 lg:py-20">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--sandstone-sand-gold)]">
              Sandstone Preferred Lending Partner
            </p>

            <h1 className="mt-4 font-heading text-3xl font-bold text-[var(--sandstone-navy)] sm:text-5xl">
              VA &amp; PCS Financing in El Paso
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--sandstone-charcoal)]/80 sm:text-lg">
              Talk to Lisa Wren, Branch Manager at American Pacific Mortgage, about your VA loan
              or PCS pre-approval. Fill out the form below and she&rsquo;ll reach out directly.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="rounded-2xl border border-white/70 bg-white p-6 shadow-[0_20px_40px_-26px_rgba(37,52,113,0.35)] sm:p-8">
              <h2 className="font-heading text-xl font-bold text-[var(--sandstone-navy)]">
                Lisa Wren
              </h2>

              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.1em] text-[var(--sandstone-sand-gold)]">
                Branch Manager
              </p>

              <div className="mt-5 space-y-3 text-sm text-[var(--sandstone-charcoal)]/85">
                <p>
                  221 N Kansas Suite 700
                  <br />
                  El Paso, TX 79902
                </p>

                <p>NMLS: 117939 &middot; Licensed in TX, NM</p>

                <p>
                  <a
                    href="tel:16015496768"
                    className="text-[var(--sandstone-navy)] hover:underline"
                  >
                    (601) 549-6768
                  </a>
                </p>

                <p>
                  <a
                    href="mailto:Lisa.Wren@apmortgage.com"
                    className="text-[var(--sandstone-navy)] hover:underline"
                  >
                    Lisa.Wren@apmortgage.com
                  </a>
                </p>

                <p>
                  <a
                    href="https://www.apmortgage.com/lisa-wren"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--sandstone-navy)] hover:underline"
                  >
                    apmortgage.com/lisa-wren
                  </a>
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/65 bg-white/72 p-5 shadow-[0_20px_40px_-26px_rgba(37,52,113,0.5)] backdrop-blur-sm sm:p-6">
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/31mlwZ2CgQhhHCvNKlME"
                style={{
                  width: "100%",
                  height: "592px",
                  border: "none",
                  borderRadius: "8px",
                }}
                id="inline-31mlwZ2CgQhhHCvNKlME"
                data-layout={'{"id":"INLINE"}'}
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Lisa Wren"
                data-height="592"
                data-layout-iframe-id="inline-31mlwZ2CgQhhHCvNKlME"
                data-form-id="31mlwZ2CgQhhHCvNKlME"
                title="Lisa Wren"
              />
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-[var(--sandstone-charcoal)]/60">
            Sandstone Real Estate Group works with trusted local lending partners. Loan approval
            is subject to lender underwriting guidelines.
          </p>
        </section>
      </main>

      <SiteFooter />

      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </>
  );
}
