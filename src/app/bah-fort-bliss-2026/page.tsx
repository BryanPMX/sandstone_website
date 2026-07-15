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
  annual: string;
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
    annual: "$18,468",
    priceRange: "$180,000–$220,000",
  },
  {
    rank: "E-5",
    monthly: "$1,629–$1,809",
    annual: "$19,548–$21,708",
    priceRange: "$200,000–$275,000",
    featured: true,
  },
  {
    rank: "E-6",
    monthly: "Higher",
    annual: "Confirm rate",
    priceRange: "$275,000–$330,000",
  },
  {
    rank: "E-7",
    monthly: "Higher",
    annual: "Confirm rate",
    priceRange: "$320,000–$390,000",
  },
  {
    rank: "O-2",
    monthly: "Higher",
    annual: "Confirm rate",
    priceRange: "$350,000–$430,000",
  },
  {
    rank: "O-3",
    monthly: "Higher",
    annual: "Confirm rate",
    priceRange: "$380,000–$480,000",
  },
  {
    rank: "O-4+",
    monthly: "Higher",
    annual: "Confirm rate",
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
          ? "w-24 bg-gradient-to-r from-transparent via-[#c6a46a] to-transparent"
          : "w-16 bg-[#c6a46a]"
      }`}
    />
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  inverse = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  inverse?: boolean;
}) {
  return (
    <div className="text-center">
      {eyebrow && (
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#c6a46a]">
          {eyebrow}
        </p>
      )}

      <h2
        className={`text-3xl font-light tracking-wide md:text-4xl ${
          inverse ? "text-white md:text-5xl" : "text-[#0f172a]"
        }`}
      >
        {title}
      </h2>

      <GoldDivider wide={inverse} />

      {description && (
        <p
          className={`mx-auto mt-8 max-w-3xl text-lg font-light leading-relaxed ${
            inverse ? "text-slate-300" : "text-slate-500"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

function HeroButton({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
}) {
  const baseClasses =
    "w-full px-8 py-4 text-center text-sm font-medium uppercase tracking-widest transition sm:w-auto";

  const variantClasses =
    variant === "solid"
      ? "bg-[#c6a46a] text-[#0f172a] hover:bg-[#e6d0a3]"
      : "border border-[#c6a46a]/60 text-white hover:bg-white/10";

  return (
    <a href={href} className={`${baseClasses} ${variantClasses}`}>
      {children}
    </a>
  );
}

function BahRateCard({ rate }: { rate: BahRate }) {
  return (
    <div
      className={`group relative bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl md:p-10 ${
        rate.featured
          ? "border border-[#c6a46a] shadow-lg"
          : "border border-slate-100 shadow-sm"
      }`}
    >
      {rate.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0f172a] px-5 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#c6a46a]">
          Most Common
        </div>
      )}

      <h3 className="text-center text-sm font-light uppercase tracking-[0.2em] text-slate-400">
        {rate.rank}
      </h3>

      <div className="mt-6 flex items-baseline justify-center gap-1">
        <span className="text-3xl font-light tracking-tight text-[#0f172a] md:text-4xl">
          {rate.monthly}
        </span>
        <span className="text-sm font-light text-slate-400">/mo</span>
      </div>

      <div className="mt-8 border-t border-slate-100 pt-6 text-center">
        <p className="text-xs font-light uppercase tracking-widest text-slate-400">
          Target Home Price
        </p>
        <p className="mt-2 text-lg font-medium text-[#c6a46a]">
          {rate.priceRange}
        </p>
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
    <div className="border border-slate-200 bg-white p-8 transition duration-300 hover:shadow-xl md:p-10">
      <h3 className="text-center text-xl font-light tracking-wide text-[#0f172a]">
        {title}
      </h3>

      <div className="mt-8 space-y-5">
        {mortgageMath.map((row) => {
          const isTotal = row.cost === "Estimated total payment";
          const isCoverage = row.cost.includes("coverage");

          return (
            <div
              key={row.cost}
              className={`flex items-center justify-between gap-6 ${
                isTotal ? "mt-6 border-t border-slate-200 pt-6" : ""
              }`}
            >
              <span
                className={`text-sm font-light uppercase tracking-wider ${
                  isTotal || isCoverage
                    ? "font-medium text-[#0f172a]"
                    : "text-slate-500"
                }`}
              >
                {row.cost}
              </span>

              <span
                className={`text-right text-lg font-light ${
                  isTotal
                    ? "text-2xl font-normal text-[#c6a46a]"
                    : "text-[#0f172a]"
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
      className={
        isBuying
          ? "relative border border-[#c6a46a]/40 bg-gradient-to-b from-[#162032] to-[#0f172a] p-8 shadow-[0_0_50px_rgba(198,164,106,0.1)] md:p-12"
          : "border border-white/10 bg-white/5 p-8 backdrop-blur-md transition hover:bg-white/10 md:p-12"
      }
    >
      {isBuying && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c6a46a] px-6 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#0f172a]">
          VA Loan Option
        </div>
      )}

      <h3
        className={`text-center text-2xl font-light tracking-wide ${
          isBuying ? "text-[#c6a46a]" : "text-white"
        }`}
      >
        {title}
      </h3>

      <div
        className={`mx-auto mt-4 h-px w-12 ${
          isBuying ? "bg-[#c6a46a]/30" : "bg-white/20"
        }`}
      />

      <ul className="mt-10 space-y-7">
        {buyVsRent.map((row) => (
          <li key={row.factor} className="text-center">
            <p
              className={`text-xs font-light uppercase tracking-[0.2em] ${
                isBuying ? "text-[#c6a46a]/70" : "text-white/50"
              }`}
            >
              {row.factor}
            </p>
            <p className="mt-2 text-lg font-light text-white md:text-xl">
              {row[type]}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NeighborhoodCard({ neighborhood }: { neighborhood: Neighborhood }) {
  return (
    <div className="group border-b border-slate-200 pb-10 transition">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-xs font-light uppercase tracking-[0.2em] text-[#0f172a]">
          {neighborhood.rank}
        </span>

        <span className="text-sm font-medium tracking-wide text-[#c6a46a]">
          {neighborhood.price}
        </span>
      </div>

      <h3 className="mt-5 text-2xl font-light tracking-wide text-[#0f172a] transition group-hover:text-[#c6a46a]">
        {neighborhood.area}
      </h3>

      <p className="mt-4 text-lg font-light leading-relaxed text-slate-500">
        {neighborhood.why}
      </p>
    </div>
  );
}

export default function FortBlissBahPage() {
  return (
    <>
      <PcsHeader />

      <main className="min-h-screen bg-white text-slate-900">
        <section className="relative overflow-hidden bg-[#0f172a] px-6 py-28 text-white md:py-36">
          <div className="absolute inset-0 bg-[url('/uploads/el_paso_luxury_home.jpg')] bg-cover bg-center opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/50 via-[#0f172a]/75 to-[#0f172a]" />

          <div className="relative mx-auto max-w-6xl text-center">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-[#c6a46a] md:text-sm">
              Fort Bliss Housing Guide
            </p>

            <h1 className="mx-auto max-w-5xl text-4xl font-light leading-tight tracking-[0.1em] md:text-6xl lg:text-7xl">
              BAH Rates Fort Bliss 2026
              <span className="mt-4 block bg-gradient-to-r from-[#c6a46a] via-[#e6d0a3] to-[#c6a46a] bg-clip-text italic text-transparent">
                Home Buyer Guide
              </span>
            </h1>

            <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-[#c6a46a] to-transparent" />

            <p className="mx-auto mt-8 max-w-3xl text-base font-light leading-relaxed text-slate-200 md:text-xl">
              PCSing to Fort Bliss? Use your BAH to compare renting, buying, VA
              loan affordability, and El Paso neighborhoods that may fit your
              budget.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <HeroButton href="#rates">View BAH Rates</HeroButton>
              <HeroButton href="#contact" variant="outline">
                Get My BAH Analysis
              </HeroButton>
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-20 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <SectionHeading title="Understanding Fort Bliss BAH in 2026" />

            <p className="mt-8 text-lg font-light leading-relaxed text-slate-600 md:text-xl">
              Your BAH is one of the biggest factors in deciding whether to rent
              or buy in El Paso. The right strategy depends on your rank,
              dependency status, timeline, commute preferences, and VA loan
              approval.
            </p>

            <div className="mt-10 border-l-2 border-[#c6a46a] bg-slate-50 p-6 text-left shadow-sm md:p-8">
              <p className="text-lg font-light italic leading-relaxed text-slate-700">
                An E-5 with dependents may receive up to{" "}
                <span className="font-semibold text-[#c6a46a]">
                  $1,809/month
                </span>
                , which can cover a major portion of a VA loan payment in El
                Paso.
              </p>
            </div>
          </div>
        </section>

        <section id="rates" className="bg-[#fcfbf9] px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              title="Fort Bliss BAH Rates 2026 With Dependents"
              description="These sample ranges show how BAH can translate into realistic home-buying power with a VA loan."
            />

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {bahRates.map((rate) => (
                <BahRateCard key={rate.rank} rate={rate} />
              ))}
            </div>

            <p className="mt-10 text-center text-sm font-light text-slate-400">
              BAH without dependents is lower. Confirm your exact amount by ZIP
              code, rank, and dependency status using the official DoD BAH
              calculator.
            </p>
          </div>
        </section>

        <section className="bg-white px-6 py-20 md:py-24">
          <div className="mx-auto max-w-5xl">
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
          </div>
        </section>

        <section className="bg-[#0f172a] px-6 py-24 text-white md:py-32">
          <div className="mx-auto max-w-6xl">
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

        <section className="bg-[#fcfbf9] px-6 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              title="Neighborhoods by BAH Level"
              description="These are common starting points for Fort Bliss buyers. Your ideal area depends on commute, school needs, budget, and home style."
            />

            <div className="mt-16 grid gap-10 md:grid-cols-2">
              {neighborhoods.map((neighborhood) => (
                <NeighborhoodCard
                  key={`${neighborhood.rank}-${neighborhood.area}`}
                  neighborhood={neighborhood}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#0f172a] px-6 py-28 text-white md:py-36">
          <div className="absolute inset-0 bg-[url('/uploads/el_paso_neighborhood.jpg')] bg-cover bg-center opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/55 via-[#0f172a]/75 to-[#0f172a]" />

          <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#c6a46a]">
              Search El Paso Homes
            </p>

            <h2 className="max-w-5xl text-4xl font-light leading-tight tracking-[0.12em] text-white md:text-6xl">
              Start Your El Paso Home Search
            </h2>

            <div className="mt-6 h-px w-20 bg-[#c6a46a]" />

            <p className="mt-8 max-w-3xl text-lg font-light leading-relaxed text-slate-200 md:text-xl">
              Ready to see what your BAH can buy? Browse active listings near
              Fort Bliss, filtered by your budget and preferred neighborhoods.
            </p>

            <div className="mt-10 w-full max-w-4xl">
              <SearchForm />
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#fcfbf9] px-6 py-24 md:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm md:p-8">
              <ContactForm
                heading="Get Your Personalized BAH Analysis"
                subheading="Tell us your rank, dependency status, reporting date, and budget. We will help you understand what your BAH may buy in El Paso and connect you with VA-experienced guidance."
              />
            </div>

            <p className="mt-10 text-center text-xs font-light uppercase tracking-widest text-slate-400">
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