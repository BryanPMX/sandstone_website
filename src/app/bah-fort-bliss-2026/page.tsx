import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { SiteFooter } from "@/components/SiteFooter";
import { PcsHeader } from "../pcs/PcsHeader.client";
import SearchForm from "./SearchForm";

export const metadata: Metadata = {
  title: "BAH Rates Fort Bliss 2026 | Buy vs. Rent Guide for El Paso | Sandstone",
  description:
    "Review Fort Bliss BAH rates for 2026, compare buying vs. renting in El Paso, and see what your VA loan budget may afford near Fort Bliss.",
};

type BahRate = {
  rank: string;
  monthly: string;
  priceRange: string;
  featured?: boolean;
};

type MortgageMathRow = {
  cost: string;
  home250: string;
  home200: string;
};

type BuyVsRentRow = {
  factor: string;
  renting: string;
  buying: string;
};

type Neighborhood = {
  rank: string;
  area: string;
  price: string;
  why: string;
};

const bahRates: BahRate[] = [
  {
    rank: "E-4",
    monthly: "$1,539",
    priceRange: "$180,000–$220,000",
  },
  {
    rank: "E-5",
    monthly: "$1,629–$1,809",
    priceRange: "$200,000–$275,000",
    featured: true,
  },
  {
    rank: "E-6",
    monthly: "Higher",
    priceRange: "$275,000–$330,000",
  },
  {
    rank: "E-7",
    monthly: "Higher",
    priceRange: "$320,000–$390,000",
  },
  {
    rank: "O-2",
    monthly: "Higher",
    priceRange: "$350,000–$430,000",
  },
  {
    rank: "O-3",
    monthly: "Higher",
    priceRange: "$380,000–$480,000",
  },
  {
    rank: "O-4+",
    monthly: "Higher",
    priceRange: "$450,000+",
  },
];

const mortgageMath: MortgageMathRow[] = [
  {
    cost: "Principal & Interest",
    home250: "~$1,580/month",
    home200: "~$1,264/month",
  },
  {
    cost: "Property taxes",
    home250: "~$375/month",
    home200: "~$300/month",
  },
  {
    cost: "Homeowner's insurance",
    home250: "~$100/month",
    home200: "~$80/month",
  },
  {
    cost: "Estimated total payment",
    home250: "~$2,055/month",
    home200: "~$1,644/month",
  },
  {
    cost: "BAH coverage, E-5 with dependents",
    home250: "~88%",
    home200: "~100%",
  },
];

const buyVsRent: BuyVsRentRow[] = [
  {
    factor: "Average monthly cost",
    renting: "$1,400–$1,800/month",
    buying: "Partially or largely covered by BAH",
  },
  {
    factor: "Total paid over a 3-year tour",
    renting: "$50,400–$75,600 to a landlord",
    buying: "Payments can build equity over time",
  },
  {
    factor: "Equity after 3 years",
    renting: "$0",
    buying: "$10,000–$12,000 estimated principal paydown",
  },
  {
    factor: "Potential appreciation",
    renting: "$0",
    buying: "Market-dependent upside",
  },
  {
    factor: "Long-term benefit",
    renting: "No ownership position",
    buying: "Possible equity and resale opportunity",
  },
];

const neighborhoods: Neighborhood[] = [
  {
    rank: "E-4 / E-5",
    area: "Northeast El Paso",
    price: "$180,000–$250,000",
    why: "Often one of the strongest fits for Fort Bliss buyers who want a short commute and practical monthly payments.",
  },
  {
    rank: "E-6 / E-7",
    area: "Northeast El Paso or Horizon City",
    price: "$250,000–$330,000",
    why: "Good mix of space, newer construction options, and access to Fort Bliss-area routes.",
  },
  {
    rank: "O-2 / O-3",
    area: "Far East El Paso or West El Paso",
    price: "$320,000–$450,000",
    why: "Popular for buyers wanting larger homes, newer communities, and more neighborhood options.",
  },
  {
    rank: "O-4+",
    area: "West El Paso or Upper Valley",
    price: "$400,000–$600,000+",
    why: "Premium neighborhoods with larger properties, established areas, and higher-end home options.",
  },
];

const mortgageTiers: {
  title: string;
  dataKey: keyof Pick<MortgageMathRow, "home250" | "home200">;
}[] = [
  {
    title: "$250,000 Home",
    dataKey: "home250",
  },
  {
    title: "$200,000 Home",
    dataKey: "home200",
  },
];

function GoldDivider({ wide = false }: { wide?: boolean }) {
  return (
    <div
      className={`mx-auto mt-6 h-px ${
        wide
          ? "w-24 bg-gradient-to-r from-transparent via-[#d5a94c] to-transparent"
          : "w-16 bg-[#d5a94c]"
      }`}
    />
  );
}

function SectionHeading({
  title,
  description,
  inverse = false,
}: {
  title: string;
  description?: string;
  inverse?: boolean;
}) {
  return (
    <div className="text-center">
      <h2
        className={`font-light tracking-wide ${
          inverse
            ? "text-4xl text-white md:text-5xl lg:text-6xl"
            : "text-3xl text-[#081d4f] md:text-4xl lg:text-5xl"
        }`}
      >
        {title}
      </h2>

      <GoldDivider wide={inverse} />

      {description && (
        <p
          className={`mx-auto mt-8 max-w-4xl text-lg font-light leading-relaxed md:text-xl ${
            inverse ? "text-slate-200" : "text-[#5574aa]"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function BahRateCard({ rate }: { rate: BahRate }) {
  const isLongAmount = rate.monthly.includes("–");

  return (
    <div
      className={`relative flex min-h-[235px] items-center rounded-md bg-white px-8 py-8 shadow-[0_5px_16px_rgba(15,23,42,0.12)] ${
        rate.featured
          ? "border border-[#d5a94c]"
          : "border border-slate-200"
      }`}
    >
      {rate.featured && (
        <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap bg-[#08255a] px-8 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#e8b94c] shadow-md">
          Most Common
        </div>
      )}

      <div className="flex w-full items-center gap-6">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#fbf7ef] text-4xl text-[#d5a94c]">
          {rate.rank === "E-4" || rate.rank === "E-5" ? "☆" : "↗"}
        </div>

        <div className="min-w-0 flex-1 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#5d7db5]">
            {rate.rank}
          </p>

          <div className="mt-3 flex items-baseline justify-center gap-2 whitespace-nowrap">
            <span
              className={`font-light tracking-tight text-[#08255a] ${
                isLongAmount
                  ? "text-[30px] lg:text-[34px] xl:text-[38px]"
                  : "text-5xl"
              }`}
            >
              {rate.monthly}
            </span>

            <span className="text-lg font-light text-[#5d7db5]">/mo</span>
          </div>

          <div className="mt-5 border-t border-slate-200 pt-4">
            <p className="text-sm uppercase tracking-wide text-[#6e87b6]">
              Target Home Price
            </p>

            <p className="mt-1 text-xl font-semibold text-[#d39a29]">
              {rate.priceRange}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MortgageCard({
  title,
  dataKey,
}: {
  title: string;
  dataKey: keyof Pick<MortgageMathRow, "home250" | "home200">;
}) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-8 shadow-[0_8px_24px_rgba(15,23,42,0.12)] md:p-10">
      <div className="flex items-center gap-7">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#08255a] text-4xl text-[#d5a94c]">
          ⌂
        </div>

        <div>
          <h3 className="text-2xl font-light text-[#081d4f]">{title}</h3>
          <div className="mt-4 h-0.5 w-24 bg-[#d5a94c]" />
        </div>
      </div>

      <div className="mt-8">
        {mortgageMath.map((row, index) => {
          const isTotal = row.cost === "Estimated total payment";

          return (
            <div
              key={row.cost}
              className={`flex items-center justify-between gap-6 py-4 ${
                isTotal ? "mt-2 border-t border-slate-200 pt-7" : ""
              }`}
            >
              <span className="text-sm uppercase tracking-wide text-[#293b68]">
                {row.cost}
              </span>

              <span
                className={`text-right text-lg ${
                  isTotal ? "text-[#d5a94c]" : "text-[#14234b]"
                }`}
              >
                {row[dataKey]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BuyRentColumn({
  title,
  type,
}: {
  title: string;
  type: "renting" | "buying";
}) {
  const isBuying = type === "buying";

  return (
    <div
      className={`relative rounded-xl p-8 md:p-10 ${
        isBuying
          ? "border border-[#d5a94c] bg-[#101d35]"
          : "border border-white/20 bg-[#152238]"
      }`}
    >
      {isBuying && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-[#e0ae50] px-10 py-3 text-sm font-medium uppercase tracking-[0.2em] text-[#10203d]">
          VA Loan Option
        </div>
      )}

      <div className="flex items-center gap-7">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#d5a94c] text-4xl text-[#e0aa36]">
          {isBuying ? "⌂" : "▦"}
        </div>

        <div>
          <h3
            className={`text-3xl font-light ${
              isBuying ? "text-[#dba33a]" : "text-white"
            }`}
          >
            {title}
          </h3>

          <div className="mt-4 h-0.5 w-14 bg-[#d5a94c]" />
        </div>
      </div>

      <div className="mt-8">
        {buyVsRent.map((row) => (
          <div
            key={row.factor}
            className="border-b border-white/10 py-5 last:border-b-0"
          >
            <p
              className={`text-sm uppercase tracking-[0.15em] ${
                isBuying ? "text-[#dba33a]" : "text-slate-400"
              }`}
            >
              {row.factor}
            </p>

            <p className="mt-2 text-lg font-light text-white md:text-xl">
              {row[type]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function NeighborhoodCard({ neighborhood }: { neighborhood: Neighborhood }) {
  return (
    <div className="flex min-h-[245px] items-center gap-8 rounded-xl border border-[#d5a94c] bg-white p-7">
      <div className="flex h-36 w-36 shrink-0 items-center justify-center rounded-full bg-[#fbf7ef] text-6xl text-[#08255a]">
        ⌂
      </div>

      <div className="flex-1 border-l border-[#d5a94c] pl-7">
        <div className="flex items-center justify-between gap-4">
          <span className="text-lg text-[#5475ad]">{neighborhood.rank}</span>

          <span className="text-lg font-medium text-[#d39a29]">
            {neighborhood.price}
          </span>
        </div>

        <h3 className="mt-5 text-2xl font-medium text-[#081d4f] md:text-3xl">
          {neighborhood.area}
        </h3>

        <p className="mt-3 text-lg leading-relaxed text-[#5574aa]">
          {neighborhood.why}
        </p>
      </div>
    </div>
  );
}

export default function FortBlissBahPage() {
  return (
    <>
      <PcsHeader />

      <main className="min-h-screen bg-white text-slate-900">
        <section className="bg-white px-6 py-20 md:py-24">
          <div className="mx-auto max-w-5xl text-center">
            <SectionHeading title="Understanding Fort Bliss BAH in 2026" />

            <p className="mx-auto mt-8 max-w-4xl text-lg leading-relaxed text-[#405b8d] md:text-xl">
              Your BAH is one of the biggest factors in deciding whether to rent
              or buy in El Paso. The right strategy depends on your rank,
              dependency status, timeline, commute preferences, and VA loan
              approval.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-5">
              {[
                ["✧", "Rank"],
                ["♙", "Dependency Status"],
                ["▦", "Timeline"],
                ["▱", "Commute Preferences"],
                ["⌂", "VA Loan Approval"],
              ].map(([icon, label]) => (
                <div key={label} className="text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#fbf7ef] text-4xl text-[#d5a94c]">
                    {icon}
                  </div>

                  <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-[#14234b]">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 border-l-2 border-[#d5a94c] bg-[#fafafa] px-8 py-8 text-left">
              <p className="text-lg italic leading-relaxed text-[#26385f] md:text-xl">
                An E-5 with dependents may receive up to{" "}
                <span className="font-semibold text-[#d5a94c]">
                  $1,809/month
                </span>
                , which can cover a major portion of a VA loan payment in El
                Paso.
              </p>
            </div>
          </div>
        </section>

        <section id="rates" className="bg-[#fdfdfd] px-6 py-20 md:py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              title="Fort Bliss BAH Rates 2026 With Dependents"
              description="These sample ranges show how BAH can translate into realistic home-buying power with a VA loan."
            />

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {bahRates.map((rate) => (
                <BahRateCard key={rate.rank} rate={rate} />
              ))}
            </div>

            <div className="mt-8 border-l-4 border-[#d5a94c] bg-white px-8 py-6 shadow-sm">
              <p className="text-[#334b7a]">
                BAH without dependents is lower. Confirm your exact amount by ZIP
                code, rank, and dependency status using the official DoD BAH
                calculator.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              title="Does Your BAH Cover a Mortgage in El Paso?"
              description="In El Paso, BAH can often cover a meaningful portion of a VA loan payment. Here is sample math for an E-5 with dependents at $1,809/month."
            />

            <div className="mt-14 grid gap-8 lg:grid-cols-2">
              {mortgageTiers.map((tier) => (
                <MortgageCard
                  key={tier.title}
                  title={tier.title}
                  dataKey={tier.dataKey}
                />
              ))}
            </div>

            <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-slate-200 bg-white px-8 py-5 text-center">
              <p className="text-[#5574aa]">
                BAH rates vary based on rank, location, and dependents.
              </p>

              <p className="font-semibold text-[#334b7a]">
                We&apos;re here to help you run the numbers for your situation.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#08172d] px-6 py-24 text-white md:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              title="Buy vs. Rent: The 2026 Analysis"
              description="For a two- to three-year assignment, buying may create equity while renting sends your BAH directly to a landlord."
              inverse
            />

            <div className="mt-16 grid gap-8 md:grid-cols-2">
              <BuyRentColumn title="Renting" type="renting" />
              <BuyRentColumn title="Buying" type="buying" />
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-24 md:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              title="Neighborhoods by BAH Level"
              description="These are common starting points for Fort Bliss buyers. Your ideal area depends on commute, school needs, budget, and home style."
            />

            <div className="mt-14 grid gap-5 lg:grid-cols-2">
              {neighborhoods.map((neighborhood) => (
                <NeighborhoodCard
                  key={`${neighborhood.rank}-${neighborhood.area}`}
                  neighborhood={neighborhood}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#08255a] px-6 py-24 text-white md:py-28">
          <div className="absolute inset-0 bg-[url('/uploads/el_paso_neighborhood.jpg')] bg-cover bg-center" />

          <div className="absolute inset-0 bg-[#08255a]/80" />

          <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-[#e0aa36]">
              Search El Paso Homes
            </p>

            <h2 className="max-w-5xl text-4xl font-light leading-[1.05] tracking-[0.12em] text-white md:text-6xl">
              Start Your El Paso Home
              <span className="block">Search</span>
            </h2>

            <div className="mt-7 h-px w-20 bg-[#d5a94c]" />

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-slate-100 md:text-xl">
              Ready to see what your BAH can buy? Browse active listings near
              Fort Bliss, filtered by your budget and preferred neighborhoods.
            </p>

            {/* CENTERED SEARCH FORM */}
            <div className="mt-16 flex w-full justify-center">
              <div className="w-full max-w-4xl">
                <SearchForm />
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#fcfbf9] px-6 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <ContactForm
                heading="Get Your Personalized BAH Analysis"
                subheading="Tell us your rank, dependency status, reporting date, and budget. We will help you understand what your BAH may buy in El Paso and connect you with VA-experienced guidance."
              />
            </div>

            <p className="mt-10 text-center text-xs uppercase tracking-widest text-slate-400">
              Mortgage estimates are approximate and assume sample financing
              terms. Confirm payment, taxes, insurance, rate, and eligibility
              with a licensed lender.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}