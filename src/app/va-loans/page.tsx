import type { Metadata } from "next";

import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";
import SearchForm from "../bah-fort-bliss-2026/SearchForm";

export const metadata: Metadata = {
  title: "VA Loan Homes El Paso TX | $0 Down, No PMI | Sandstone Real Estate",
  description:
    "Find VA loan eligible homes in El Paso TX. $0 down, no PMI, competitive rates. Sandstone specializes in VA purchases near Fort Bliss. Get pre-qualified today.",
};

const benefits = [
  "$0 down payment required",
  "No private mortgage insurance (PMI)",
  "Competitive interest rates",
  "No prepayment penalties",
  "Seller can pay closing costs",
  "VA entitlement in El Paso 2026: up to $766,550",
];

const purchaseRanges = [
  {
    rank: "E-5",
    bah: "$1,629–$1,809/mo",
    price: "$220,000–$275,000",
    neighborhood: "Northeast El Paso",
  },
  {
    rank: "E-6",
    bah: "Higher",
    price: "$275,000–$330,000",
    neighborhood: "Horizon City / Far East",
  },
  {
    rank: "E-7",
    bah: "Higher",
    price: "$320,000–$390,000",
    neighborhood: "West El Paso",
  },
  {
    rank: "O-3",
    bah: "Higher",
    price: "$380,000–$480,000",
    neighborhood: "West El Paso",
  },
  {
    rank: "O-5+",
    bah: "Higher",
    price: "$450,000+",
    neighborhood: "Upper Valley / Custom",
  },
];

const processSteps = [
  {
    step: "1. Get Your COE",
    detail:
      "Your Certificate of Eligibility confirms VA loan eligibility. Most lenders can pull this electronically in minutes.",
    timeline: "1–3 days",
  },
  {
    step: "2. Get Pre-Approved",
    detail:
      "Choose a lender who closes VA loans regularly in El Paso and understands military timelines.",
    timeline: "3–5 business days",
  },
  {
    step: "3. Start Your Search",
    detail:
      "Sandstone can set up a custom home search with instant alerts, video walkthroughs, and remote consultations.",
    timeline: "2–8 weeks",
  },
  {
    step: "4. Make an Offer",
    detail:
      "Sandstone helps present VA offers competitively and negotiate seller-paid closing costs when possible.",
    timeline: "1–5 days",
  },
  {
    step: "5. VA Appraisal",
    detail:
      "A VA-certified appraiser verifies value and minimum property standards.",
    timeline: "7–14 days",
  },
  {
    step: "6. Home Inspection",
    detail:
      "Always hire a private inspector. The VA appraisal is not the same thing as a home inspection.",
    timeline: "3–5 days",
  },
  {
    step: "7. Close",
    detail: "Most VA purchases close within 30–45 days from accepted offer.",
    timeline: "30–45 days total",
  },
];


const buyingPowerChart = [
  { rank: "E-5", price: 247500 },
  { rank: "E-6", price: 302500 },
  { rank: "E-7", price: 355000 },
  { rank: "O-3", price: 430000 },
  { rank: "O-5+", price: 450000 },
];


const processTimelineChart = [
  { label: "COE", days: 3 },
  { label: "Pre-approval", days: 5 },
  { label: "Search", days: 56 },
  { label: "Offer", days: 5 },
  { label: "Appraisal", days: 14 },
  { label: "Inspection", days: 5 },
  { label: "Close", days: 45 },
];

const faqs = [
  {
    question: "Can I use my VA loan benefit more than once?",
    answer:
      "Yes. Your VA benefit can be restored after you pay off a VA loan. Many military families use VA loans multiple times.",
  },
  {
    question: "Can I buy a home in El Paso remotely?",
    answer:
      "Yes. Remote VA purchases are common for PCS buyers using video walkthroughs, digital signatures, and remote closing options.",
  },
  {
    question: "Does the VA loan work for new construction?",
    answer:
      "Yes, with additional steps. VA loans can work for new construction when the builder and inspection process meet VA requirements.",
  },
  {
    question: "What if the VA appraisal comes in low?",
    answer:
      "You can negotiate the price down, pay the difference in cash, or walk away. A strong agent helps you prepare for each option.",
  },
];

export default function VaLoansPage() {
  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-white text-slate-900">
        <section className="relative overflow-hidden bg-[#26356f] text-white">
          <div className="absolute inset-0">
            <Image
              src="/uploads/va-home.png"
              alt="El Paso neighborhood homes with mountain views"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />

            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#26356f]/90 via-[#26356f]/60 to-black/20" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#c6a46a]">
              Fort Bliss Military Home Buying
            </p>

            <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
              VA Loan Homes for Sale in El Paso, TX
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85">
              Use your VA home loan benefit in one of the strongest military
              housing markets in the country. Sandstone helps Fort Bliss buyers
              find VA-eligible homes, compare neighborhoods, and close with
              confidence.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-full bg-[#c6a46a] px-6 py-3 text-sm font-bold normal-case tracking-normal text-white transition hover:bg-[#b89458]"
              >
                Get Pre-Qualified
              </a>

              <a
                href="#process"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold normal-case tracking-normal text-white transition hover:bg-white hover:text-[#26356f]"
              >
                See VA Loan Steps
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-3xl font-bold text-[#26356f]">
                Why the VA Loan Works So Well in El Paso
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-700">
                The VA home loan is one of the most powerful home-buying
                benefits available to military families. In El Paso, where home
                prices are still more affordable than many major military
                markets, your VA benefit can go especially far.
              </p>

              <p className="mt-4 text-lg leading-8 text-slate-700">
                With $0 down, no PMI, and strong purchasing power near Fort
                Bliss, VA buyers can compete for homes across Northeast El Paso,
                Horizon City, Far East El Paso, West El Paso, and the Upper
                Valley.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-100 p-8">
              <h3 className="text-xl font-bold text-[#26356f]">
                What the VA Loan Gets You
              </h3>

              <ul className="mt-6 space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-3 text-slate-700">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#c6a46a]" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-[#26356f]">
              What You Can Buy With Your VA Benefit
            </h2>

            <p className="mt-4 max-w-3xl text-slate-700">
              These estimates show how different military ranks may fit into El
              Paso neighborhoods using a VA loan.
            </p>

            <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead className="bg-[#26356f] text-white">
                  <tr>
                    <th className="p-4">Rank</th>
                    <th className="p-4">BAH</th>
                    <th className="p-4">Approx. Purchase Price</th>
                    <th className="p-4">Best Neighborhood</th>
                  </tr>
                </thead>

                <tbody>
                  {purchaseRanges.map((row) => (
                    <tr key={row.rank} className="border-t border-slate-200">
                      <td className="p-4 font-semibold">{row.rank}</td>
                      <td className="p-4">{row.bah}</td>
                      <td className="p-4">{row.price}</td>
                      <td className="p-4">{row.neighborhood}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Estimates are based on sample rates, taxes, and insurance. Verify
              exact numbers with a licensed lender.
            </p>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#26356f]">
                      Estimated VA Buying Power by Rank
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Midpoint estimate from each purchase-price range.
                    </p>
                  </div>
                  <span className="rounded-full bg-[#f7f5ef] px-3 py-1 text-xs font-bold text-[#c6a46a]">
                    VA estimate
                  </span>
                </div>

                <div className="mt-8 space-y-5">
                  {buyingPowerChart.map((item) => {
                    const maxPrice = 450000;
                    const width = Math.round((item.price / maxPrice) * 100);

                    return (
                      <div key={item.rank}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="font-bold text-[#26356f]">{item.rank}</span>
                          <span className="font-semibold text-slate-700">
                            ${item.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="h-4 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-[#c6a46a]"
                            style={{ width: `${width}%` }}
                            aria-label={`${item.rank} estimated purchase price ${item.price}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#26356f]">
                      VA Loan vs. Conventional
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Simple side-by-side snapshot of common buyer costs.
                    </p>
                  </div>
                  <span className="rounded-full bg-[#26356f] px-3 py-1 text-xs font-bold text-white">
                    $0 down
                  </span>
                </div>

                <div className="mt-8 space-y-6">
                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-bold text-[#26356f]">VA down payment</span>
                      <span className="font-semibold text-slate-700">$0</span>
                    </div>
                    <div className="h-4 rounded-full bg-slate-100">
                      <div className="h-full w-[2%] rounded-full bg-[#c6a46a]" />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-bold text-[#26356f]">Example 5% conventional down payment</span>
                      <span className="font-semibold text-slate-700">$15,000</span>
                    </div>
                    <div className="h-4 rounded-full bg-slate-100">
                      <div className="h-full w-full rounded-full bg-slate-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="rounded-2xl bg-[#f7f5ef] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c6a46a]">
                        VA PMI
                      </p>
                      <p className="mt-2 text-3xl font-bold text-[#26356f]">$0</p>
                    </div>
                    <div className="rounded-2xl bg-slate-100 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Typical PMI
                      </p>
                      <p className="mt-2 text-3xl font-bold text-slate-700">$180/mo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-[#26356f]">
              The VA Loan Process in El Paso
            </h2>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#26356f]">
                    Typical VA Purchase Timeline
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Longest estimated duration for each step, shown in days.
                  </p>
                </div>
                <p className="text-sm font-semibold text-[#c6a46a]">
                  Most VA purchases close in 30–45 days after accepted offer.
                </p>
              </div>

              <div className="mt-8 grid gap-4">
                {processTimelineChart.map((item) => {
                  const maxDays = 56;
                  const width = Math.round((item.days / maxDays) * 100);

                  return (
                    <div
                      key={item.label}
                      className="grid items-center gap-3 md:grid-cols-[120px_1fr_80px]"
                    >
                      <p className="text-sm font-bold text-[#26356f]">{item.label}</p>
                      <div className="h-4 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-[#26356f]"
                          style={{ width: `${width}%` }}
                          aria-label={`${item.label} estimated timeline ${item.days} days`}
                        />
                      </div>
                      <p className="text-sm font-semibold text-slate-700">
                        {item.days} days
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              {processSteps.map((item) => (
                <div
                  key={item.step}
                  className="grid gap-4 rounded-2xl border border-slate-200 p-5 md:grid-cols-[220px_1fr_160px]"
                >
                  <h3 className="font-bold text-[#26356f]">{item.step}</h3>
                  <p className="text-slate-700">{item.detail}</p>
                  <p className="font-semibold text-[#c6a46a]">
                    {item.timeline}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#26356f] px-6 py-16 text-white">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold">Who Qualifies for a VA Loan?</h2>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                "Active duty service members with qualifying service time",
                "Veterans with an honorable discharge",
                "National Guard and Reservists who meet service requirements",
                "Eligible surviving spouses of service members",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-white/10 p-5">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-[#26356f]">
              Common VA Loan Questions El Paso Buyers Ask
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-slate-200 p-6"
                >
                  <h3 className="font-bold text-[#26356f]">{faq.question}</h3>
                  <p className="mt-3 text-slate-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden">
          <div className="relative h-[520px] w-full md:h-[560px] lg:h-[620px]">
            <Image
              src="/uploads/el_paso_neighborhood.jpg"
              alt="El Paso neighborhood homes with mountain views"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />

            <div className="absolute inset-0 bg-[#26356f]/60" />
            <div className="absolute inset-0 bg-black/35" />

            <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-6 text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#c6a46a] md:text-sm">
                VA Homes Near Fort Bliss
              </p>

              <h2 className="max-w-4xl text-4xl font-light leading-tight tracking-[0.16em] text-white md:text-5xl lg:text-6xl">
                Start Your El Paso Home Search
              </h2>

              <div className="mt-6 h-px w-20 bg-[#c6a46a]" />

              <p className="mt-8 max-w-3xl px-6 py-3 text-lg font-light leading-relaxed text-white md:text-xl">
                Ready to see what your BAH can buy? Browse active listings near
                Fort Bliss, filtered by your budget and preferred neighborhoods.
              </p>

              <div className="mt-10 w-full max-w-3xl">
                <SearchForm />
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#f7f5ef] px-6 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-[2rem] border border-slate-200 bg-white px-8 py-12 text-center shadow-lg md:px-14 md:py-16">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c6a46a]">
                VA Buyer Guidance
              </p>

              <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-light leading-tight tracking-wide text-[#26356f] md:text-5xl">
                Ready to Use Your VA Benefit in El Paso?
              </h2>

              <div className="mx-auto mt-6 h-px w-20 bg-[#c6a46a]" />

              <p className="mx-auto mt-6 max-w-3xl text-base font-light leading-8 text-slate-600 md:text-lg">
                Sandstone helps military families close on VA purchases across
                every El Paso neighborhood. Tell us your rank, reporting date,
                and budget, and we will help you build a smart home search plan.
              </p>

              <div className="mx-auto mt-10 grid max-w-4xl gap-4 text-left md:grid-cols-3">
                {[
                  "$0 down VA loan guidance",
                  "Fort Bliss neighborhood recommendations",
                  "Remote PCS home search support",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-[#f7f5ef] px-5 py-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#c6a46a]" />
                      <span className="text-sm font-light leading-6 text-slate-700">
                        {item}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl md:p-8">
              <ContactForm
                heading="Have Questions About VA Loans?"
                subheading="Tell us where you are in the VA loan process and we'll help you understand eligibility, benefits, financing options, and homes in El Paso that may work with VA financing."
              />
            </div>

            <p className="mx-auto mt-8 max-w-4xl text-center text-sm leading-6 text-slate-500">
              All financial figures are estimates and should be verified with a
              licensed lender. VA entitlement limits and lending rules are
              subject to change.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}