import { SiteFooter } from "@/components/SiteFooter";
import { LeadCaptureSection } from "@/components/LeadCaptureSection";
import { ListingCarousel } from "@/components/properties";
import { BahCalculator } from "@/components/bah/BahCalculator";
import { fetchMyPropertyCards } from "@/services";
import { getTurnstileSiteKey } from "@/config";
import { PcsHeader } from "../pcs/PcsHeader.client";

export const metadata = {
  title: "Fort Bliss BAH Calculator | Sandstone Real Estate",
  description:
    "Estimate your Fort Bliss BAH, monthly payment, and VA loan home affordability near Fort Bliss.",
};

export default async function BahCalculatorPage() {
  const turnstileSiteKey = getTurnstileSiteKey();
  const properties = await fetchMyPropertyCards();

  return (
    <>
      <PcsHeader />

      <main className="min-h-screen bg-[var(--sandstone-off-white)]">
        <BahCalculator />

        <section id="homes-within-budget" className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4 lg:px-6">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--sandstone-sand-gold)]">
                Homes Within Your Budget
              </p>

              <h2 className="mt-3 font-heading text-3xl font-extrabold text-[var(--sandstone-navy)] sm:text-4xl">
                Browse Homes Near Fort Bliss
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-[var(--sandstone-charcoal)]/75">
                Explore El Paso homes that may fit your BAH, VA loan, and PCS
                timeline.
              </p>
            </div>

            <div className="mt-8">
              <ListingCarousel properties={properties.slice(0, 9)} />
            </div>
          </div>
        </section>

        <section className="bg-[var(--sandstone-off-white)] py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:px-6 lg:items-start">
            <div className="rounded-[2rem] border border-[var(--sandstone-navy)]/10 bg-white p-8 shadow-sm lg:sticky lg:top-24">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--sandstone-sand-gold)]">
                Why Use a VA Loan?
              </p>

              <h2 className="mt-3 font-heading text-3xl font-extrabold leading-tight text-[var(--sandstone-navy)] sm:text-4xl">
                VA Loan Benefits for Military Buyers
              </h2>

              <p className="mt-4 text-base leading-7 text-[var(--sandstone-charcoal)]/75">
                Your VA loan benefit can make homeownership more affordable
                while you&apos;re stationed at Fort Bliss.
              </p>

              <div className="mt-8 space-y-5">
                {[
                  {
                    title: "No Down Payment",
                    text: "Qualified military buyers can often purchase with zero down.",
                  },
                  {
                    title: "No Monthly PMI",
                    text: "Keep your monthly payment lower by avoiding private mortgage insurance.",
                  },
                  {
                    title: "Competitive Rates",
                    text: "VA loans frequently offer strong financing options for eligible buyers.",
                  },
                  {
                    title: "Military Experts",
                    text: "Our team helps Fort Bliss families relocate with confidence.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-2xl border border-[var(--sandstone-navy)]/10 bg-[var(--sandstone-off-white)] p-5"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--sandstone-navy)] text-sm font-bold text-white">
                      ✓
                    </div>

                    <div>
                      <h3 className="font-bold text-[var(--sandstone-navy)]">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-[var(--sandstone-charcoal)]/75">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="/pcs/va-loan-guide"
                className="mt-8 inline-flex rounded-full bg-[var(--sandstone-sand-gold)] px-7 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:opacity-90"
              >
                View VA Loan Guide →
              </a>
            </div>

            <LeadCaptureSection
              formType="buy"
              sectionId="bah-contact"
              heading="Request a BAH Consultation"
              headingTag="h2"
              subheading="Tell us your price range, pay grade, timeline, or any questions."
              showAside={false}
              ctaLabel="REQUEST A BAH CONSULTATION"
              messagePlaceholder="Tell us your price range, pay grade, timeline, or any questions..."
              turnstileSiteKey={turnstileSiteKey}
            />
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4 lg:px-6">
            <h2 className="text-center font-heading text-3xl font-extrabold text-[var(--sandstone-navy)]">
              BAH Calculator FAQ
            </h2>

            <div className="mt-8 space-y-4">
              {[
                {
                  q: "Can I use BAH toward a mortgage?",
                  a: "Yes. Many military buyers use their monthly BAH to help cover their housing payment.",
                },
                {
                  q: "Does this calculator include taxes and insurance?",
                  a: "No. The estimate is mainly principal and interest. Taxes, insurance, HOA dues, and lender costs may change the final payment.",
                },
                {
                  q: "Can I buy near Fort Bliss with a VA loan?",
                  a: "Yes. Eligible buyers may use a VA loan to purchase a primary residence near Fort Bliss.",
                },
              ].map((item) => (
                <div
                  key={item.q}
                  className="rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white p-6"
                >
                  <h3 className="font-bold text-[var(--sandstone-navy)]">
                    {item.q}
                  </h3>

                  <p className="mt-2 text-[var(--sandstone-charcoal)]/75">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}