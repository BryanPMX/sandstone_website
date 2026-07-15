import type { Metadata } from "next";
import type { ReactNode } from "react";

import Image from "next/image";
import { PcsHeader } from "../pcs/PcsHeader.client";
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

const vaQuickStats = [
  {
    value: "$0",
    label: "Down Payment",
    detail:
      "Qualified VA buyers can purchase without a traditional down payment.",
  },
  {
    value: "$0",
    label: "Monthly PMI",
    detail: "VA loans do not require private mortgage insurance.",
  },
  {
    value: "30–45",
    label: "Typical Closing Days",
    detail:
      "Most VA purchases can close in about 30 to 45 days after an accepted offer.",
  },
];

const vaBuyerPath = [
  {
    title: "Best entry budget",
    value: "E-5",
    detail:
      "Northeast El Paso is usually the most approachable starting point for VA buyers.",
  },
  {
    title: "Best east-side option",
    value: "E-6",
    detail:
      "Horizon City and Far East El Paso offer newer homes and practical Fort Bliss access.",
  },
  {
    title: "Best west-side fit",
    value: "E-7 / O-3",
    detail:
      "West El Paso can work well for buyers prioritizing lifestyle, schools, and amenities.",
  },
  {
    title: "Upper budget range",
    value: "O-5+",
    detail:
      "Upper Valley and custom-home areas may fit larger VA-backed purchase budgets.",
  },
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
    neighborhood: "Upper Valley",
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

type VaIconName =
  | "shield-home"
  | "tag"
  | "shield-check"
  | "chart"
  | "calendar"
  | "handshake"
  | "house-star"
  | "document"
  | "person-check"
  | "house-heart"
  | "search-home"
  | "clipboard-home"
  | "key"
  | "military"
  | "medal"
  | "shield-star"
  | "family"
  | "house"
  | "pin"
  | "hardhat"
  | "dollar";

function VaIcon({
  name,
  className = "h-8 w-8",
}: {
  name: VaIconName;
  className?: string;
}) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const icons: Record<VaIconName, ReactNode> = {
    "shield-home": (
      <>
        <path
          {...common}
          d="M12 2.7 20 6v5.6c0 5.1-3.4 8.2-8 9.7-4.6-1.5-8-4.6-8-9.7V6l8-3.3Z"
        />
        <path
          {...common}
          d="m8.2 12 3.8-3.1 3.8 3.1v4.2h-2.6v-2.5h-2.4v2.5H8.2V12Z"
        />
      </>
    ),
    tag: (
      <>
        <path {...common} d="M4 5.5h7.5l6.5 6.5-6 6-6.5-6.5V5.5Z" />
        <circle {...common} cx="8.2" cy="9" r="1" />
        <path {...common} d="M9.7 12.3h4.8M12.1 10.7v3.2" />
      </>
    ),
    "shield-check": (
      <>
        <path
          {...common}
          d="M12 2.8 19 5.7v5.1c0 4.6-3 7.5-7 9-4-1.5-7-4.4-7-9V5.7L12 2.8Z"
        />
        <path {...common} d="m8.8 11.5 2.1 2.1 4.4-4.6" />
      </>
    ),
    chart: (
      <>
        <path {...common} d="M4 19V5M4 19h16" />
        <path {...common} d="M7 16v-4h3v4M12 16V9h3v7M17 16V6h3v10" />
        <path {...common} d="m7 9 4-3 3 2 5-4" />
      </>
    ),
    calendar: (
      <>
        <rect {...common} x="4" y="5.5" width="16" height="14" rx="2" />
        <path
          {...common}
          d="M8 3v5M16 3v5M4 9.5h16M8 13h2M12 13h2M16 13h1M8 16h2M12 16h2"
        />
      </>
    ),
    handshake: (
      <>
        <path {...common} d="m3.5 11 4-4 3 1 2-1 4 4" />
        <path {...common} d="m7 10 5 5c.8.8 2.1.8 2.9 0l4.6-4.6" />
        <path
          {...common}
          d="m3 9-1.5 3 4.5 3 1.5-1.5M21 9l1.5 3-4.5 3-1.5-1.5"
        />
      </>
    ),
    "house-star": (
      <>
        <path {...common} d="m3 11 9-7 9 7M5.5 10.5V20h13v-9.5" />
        <path
          {...common}
          d="m12 12.3.9 1.8 2 .3-1.5 1.4.4 2-1.8-.9-1.8.9.4-2-1.5-1.4 2-.3.9-1.8Z"
        />
      </>
    ),
    document: (
      <>
        <path {...common} d="M6 3h8l4 4v14H6V3Z" />
        <path {...common} d="M14 3v5h5M9 11h6M9 15h4" />
        <circle {...common} cx="16.5" cy="17.5" r="2.5" />
        <path {...common} d="m15.5 17.5.8.8 1.4-1.7" />
      </>
    ),
    "person-check": (
      <>
        <circle {...common} cx="10" cy="7" r="3" />
        <path {...common} d="M4.5 19c.3-4.2 2.2-6.4 5.5-6.4s5.2 2.2 5.5 6.4" />
        <circle {...common} cx="17.5" cy="15.5" r="3" />
        <path {...common} d="m16.2 15.5 1 1 1.8-2" />
      </>
    ),
    "house-heart": (
      <>
        <path {...common} d="m3 11 9-7 9 7M5.5 10.5V20h13v-9.5" />
        <path
          {...common}
          d="M12 16.5s-3-1.8-3-4a1.8 1.8 0 0 1 3-1.3 1.8 1.8 0 0 1 3 1.3c0 2.2-3 4-3 4Z"
        />
      </>
    ),
    "search-home": (
      <>
        <path {...common} d="m4 11 8-6 8 6M6.5 10.5V19h7" />
        <circle {...common} cx="16.2" cy="16.2" r="3.2" />
        <path {...common} d="m18.6 18.6 2.4 2.4" />
      </>
    ),
    "clipboard-home": (
      <>
        <rect {...common} x="5" y="4.5" width="14" height="16" rx="2" />
        <path {...common} d="M9 4V2.8h6V4M8 9h2M8 12h2M8 15h2" />
        <path {...common} d="m12 15 3-2.5 3 2.5v3h-6v-3Z" />
      </>
    ),
    key: (
      <>
        <circle {...common} cx="8" cy="15" r="3.5" />
        <path
          {...common}
          d="m10.7 12.3 7.1-7.1 2 2-1.4 1.4 1.1 1.1-1.8 1.8-1.1-1.1-3.7 3.7"
        />
      </>
    ),
    military: (
      <>
        <circle {...common} cx="12" cy="7" r="3" />
        <path
          {...common}
          d="M7 21v-4.5c0-3 2-5 5-5s5 2 5 5V21M8 6.2 12 3l4 3.2"
        />
        <path {...common} d="M9 16h6M10 19h4" />
      </>
    ),
    medal: (
      <>
        <path {...common} d="M8 3h8l-1.5 6h-5L8 3Z" />
        <circle {...common} cx="12" cy="14.5" r="4.5" />
        <path
          {...common}
          d="m12 12.3.7 1.4 1.6.2-1.2 1.1.3 1.6-1.4-.8-1.4.8.3-1.6-1.2-1.1 1.6-.2.7-1.4Z"
        />
      </>
    ),
    "shield-star": (
      <>
        <path
          {...common}
          d="M12 2.7 20 6v5.6c0 5.1-3.4 8.2-8 9.7-4.6-1.5-8-4.6-8-9.7V6l8-3.3Z"
        />
        <path
          {...common}
          d="m12 8.4.9 1.9 2.1.3-1.5 1.5.4 2.1-1.9-1-1.9 1 .4-2.1-1.5-1.5 2.1-.3.9-1.9Z"
        />
      </>
    ),
    family: (
      <>
        <circle {...common} cx="8" cy="8" r="2.5" />
        <circle {...common} cx="16" cy="8" r="2.5" />
        <path
          {...common}
          d="M3 19c.2-3.4 1.8-5.5 5-5.5 1.6 0 2.8.5 3.6 1.5M21 19c-.2-3.4-1.8-5.5-5-5.5-1.6 0-2.8.5-3.6 1.5"
        />
        <circle {...common} cx="12" cy="12" r="2" />
        <path {...common} d="M8.5 20c.2-2.8 1.3-4.5 3.5-4.5s3.3 1.7 3.5 4.5" />
      </>
    ),
    house: (
      <>
        <path {...common} d="m3 11 9-7 9 7M5.5 10.5V20h13v-9.5M9.5 20v-5h5v5" />
      </>
    ),
    pin: (
      <>
        <path
          {...common}
          d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z"
        />
        <circle {...common} cx="12" cy="10" r="2.2" />
      </>
    ),
    hardhat: (
      <>
        <path {...common} d="M4 15a8 8 0 0 1 16 0M3 15h18v3H3zM9 7v8M15 7v8" />
      </>
    ),
    dollar: (
      <>
        <circle {...common} cx="12" cy="12" r="8" />
        <path
          {...common}
          d="M14.8 8.7c-.7-.8-1.7-1.2-2.9-1.2-1.7 0-2.9.9-2.9 2.2 0 1.5 1.3 2 3 2.4 1.8.4 3 1 3 2.5 0 1.4-1.2 2.4-3 2.4-1.4 0-2.7-.5-3.6-1.5M12 6v12"
        />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

function StatCard({
  value,
  label,
  detail,
}: {
  value: string;
  label: string;
  detail: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-4xl font-bold text-[#c6a46a]">{value}</p>
      <h3 className="mt-3 text-lg font-bold text-[#26356f]">{label}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
    </div>
  );
}

function BuyerPathCard({
  title,
  value,
  detail,
}: {
  title: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-md">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#c6a46a]">
        {title}
      </p>
      <h3 className="mt-3 text-2xl font-bold text-[#26356f]">{value}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{detail}</p>
    </div>
  );
}

export default function VaLoansPage() {
  return (
    <>
      <PcsHeader />

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

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="flex gap-4 md:gap-6">
              <div className="mt-1 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-[#26356f] shadow-sm md:h-20 md:w-20">
                <VaIcon
                  name="shield-home"
                  className="h-10 w-10 md:h-12 md:w-12"
                />
              </div>

              <div>
                <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-[#26356f] md:text-4xl">
                  Why the VA Loan Works So Well in El Paso
                </h2>

                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                  The VA home loan is one of the most powerful home-buying
                  benefits available to military families. In El Paso, where
                  home prices are still more affordable than many major military
                  markets, your VA benefit can go especially far.
                </p>

                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                  With $0 down, no PMI, and strong purchasing power near Fort
                  Bliss, VA buyers can compete for homes across Northeast El
                  Paso, Horizon City, Far East El Paso, West El Paso, and the
                  Upper Valley.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-sm md:p-8">
              <h3 className="text-2xl font-bold text-[#26356f]">
                What the VA Loan Gets You
              </h3>
              <div className="mt-3 h-px w-20 bg-[#c6a46a]" />

              <div className="mt-6 space-y-4">
                {[
                  { icon: "tag" as VaIconName, label: benefits[0] },
                  { icon: "shield-check" as VaIconName, label: benefits[1] },
                  { icon: "chart" as VaIconName, label: benefits[2] },
                  { icon: "calendar" as VaIconName, label: benefits[3] },
                  { icon: "handshake" as VaIconName, label: benefits[4] },
                  { icon: "house-star" as VaIconName, label: benefits[5] },
                ].map((benefit) => (
                  <div key={benefit.label} className="flex items-center gap-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#26356f] shadow-sm">
                      <VaIcon name={benefit.icon} className="h-6 w-6" />
                    </div>
                    <p className="text-base leading-7 text-slate-700">
                      {benefit.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold text-[#26356f]">
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

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {vaQuickStats.map((stat) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  detail={stat.detail}
                />
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#c6a46a]">
                    Buyer Guide
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-[#26356f]">
                    Quick VA buyer paths by budget
                  </h3>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-slate-600">
                  Use these as simple starting points before comparing exact
                  payment, taxes, insurance, and lender approval.
                </p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {vaBuyerPath.map((item) => (
                  <BuyerPathCard
                    key={item.title}
                    title={item.title}
                    value={item.value}
                    detail={item.detail}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold tracking-tight text-[#26356f] md:text-4xl">
              The VA Loan Process in El Paso
            </h2>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-[#f7f5ef] p-6 shadow-sm md:p-8">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#c6a46a]">
                    Timeline Snapshot
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-[#26356f]">
                    Keep the process simple
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
                    The biggest takeaway for VA buyers is simple: get
                    pre-approved before shopping seriously, then expect most
                    purchases to close in about 30–45 days after an accepted
                    offer.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      icon: "document" as VaIconName,
                      value: "1",
                      label: "Get COE",
                    },
                    {
                      icon: "person-check" as VaIconName,
                      value: "2",
                      label: "Pre-approve",
                    },
                    {
                      icon: "house-heart" as VaIconName,
                      value: "3",
                      label: "Shop + offer",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="relative flex min-h-32 flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <VaIcon
                        name={item.icon}
                        className="h-9 w-9 text-[#26356f]"
                      />
                      <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#26356f] text-sm font-bold text-white">
                        {item.value}
                      </div>
                      <p className="mt-4 text-base font-bold text-[#26356f]">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative mt-7 space-y-3 md:pl-14">
              <div className="absolute bottom-6 left-[18px] top-6 hidden border-l border-dashed border-[#26356f]/30 md:block" />

              {processSteps.map((item, index) => {
                const icons: VaIconName[] = [
                  "document",
                  "person-check",
                  "search-home",
                  "handshake",
                  "clipboard-home",
                  "search-home",
                  "key",
                ];
                const cleanStep = item.step.replace(/^\d+\.\s*/, "");

                return (
                  <div key={item.step} className="relative">
                    <div className="absolute -left-14 top-4 z-10 hidden h-9 w-9 items-center justify-center rounded-full bg-[#26356f] text-sm font-bold text-white shadow-sm md:flex">
                      {index + 1}
                    </div>

                    <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[48px_190px_1fr_150px] md:items-center md:p-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-[#26356f]">
                        <VaIcon name={icons[index]} className="h-7 w-7" />
                      </div>
                      <h3 className="text-base font-bold text-[#26356f]">
                        {cleanStep}
                      </h3>
                      <p className="text-sm leading-6 text-slate-600">
                        {item.detail}
                      </p>
                      <div className="flex items-center gap-3 font-semibold text-[#c69545] md:justify-start">
                        <VaIcon name="calendar" className="h-6 w-6" />
                        <span>{item.timeline}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#26356f] px-6 py-16 text-white md:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Who Qualifies for a VA Loan?
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                {
                  icon: "military" as VaIconName,
                  text: "Active duty service members with qualifying service time",
                },
                {
                  icon: "medal" as VaIconName,
                  text: "Veterans with an honorable discharge",
                },
                {
                  icon: "shield-star" as VaIconName,
                  text: "National Guard and Reservists who meet service requirements",
                },
                {
                  icon: "family" as VaIconName,
                  text: "Eligible surviving spouses of service members",
                },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex min-h-24 items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.08] px-5 py-4"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-[#d4aa5c]">
                    <VaIcon name={item.icon} className="h-8 w-8" />
                  </div>
                  <div className="h-12 w-px shrink-0 bg-white/20" />
                  <p className="text-base leading-7 text-white/90">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold tracking-tight text-[#26356f] md:text-4xl">
              Common VA Loan Questions El Paso Buyers Ask
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {faqs.map((faq, index) => {
                const icons: VaIconName[] = [
                  "house",
                  "pin",
                  "hardhat",
                  "dollar",
                ];

                return (
                  <div
                    key={faq.question}
                    className="flex min-h-36 items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f3f5fa] text-[#26356f]">
                      <VaIcon name={icons[index]} className="h-9 w-9" />
                    </div>
                    <div className="h-16 w-px shrink-0 bg-[#26356f]/15" />
                    <div>
                      <h3 className="text-base font-bold text-[#26356f]">
                        {faq.question}
                      </h3>
                      <p className="mt-3 text-base leading-7 text-slate-700">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
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