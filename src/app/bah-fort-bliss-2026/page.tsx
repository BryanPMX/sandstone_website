import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";
import SearchForm from "./SearchForm";

export const metadata = {
  title: "BAH Rates Fort Bliss 2026 | Buy vs. Rent Guide for El Paso | Sandstone",
  description:
    "Fort Bliss BAH rates 2026 by rank. E-5 receives $1,809/mo with dependents — enough to cover a VA loan mortgage in El Paso. See the buy vs. rent breakdown.",
};

const bahRates = [
  { rank: "E-4", monthly: "$1,539", annual: "$18,468", priceRange: "$180,000–$220,000" },
  { rank: "E-5", monthly: "$1,629–$1,809", annual: "$19,548–$21,708", priceRange: "$200,000–$275,000" },
  { rank: "E-6", monthly: "Higher", annual: "Contact us", priceRange: "$275,000–$330,000" },
  { rank: "E-7", monthly: "Higher", annual: "Contact us", priceRange: "$320,000–$390,000" },
  { rank: "O-2", monthly: "Higher", annual: "Contact us", priceRange: "$350,000–$430,000" },
  { rank: "O-3", monthly: "Higher", annual: "Contact us", priceRange: "$380,000–$480,000" },
  { rank: "O-4+", monthly: "Higher", annual: "Contact us", priceRange: "$450,000+" },
];

const mortgageMath = [
  { cost: "Principal & Interest", home250: "~$1,580/month", home200: "~$1,264/month" },
  { cost: "Property taxes", home250: "~$375/month", home200: "~$300/month" },
  { cost: "Homeowner's insurance", home250: "~$100/month", home200: "~$80/month" },
  { cost: "Total monthly payment", home250: "~$2,055/month", home200: "~$1,644/month" },
  { cost: "BAH coverage, E-5 with dependents", home250: "~88%", home200: "~100%" },
];

const buyVsRent = [
  { factor: "Average monthly cost", renting: "$1,400–$1,800/month", buying: "~$2,055/month, largely covered by BAH" },
  { factor: "Total paid over 3-year tour", renting: "$50,400–$75,600 to landlord", buying: "Covered by BAH" },
  { factor: "Equity after 3 years", renting: "$0", buying: "$10,000–$12,000 principal paydown" },
  { factor: "Home appreciation", renting: "$0", buying: "~$32,000 in 3 years on a $250K home" },
  { factor: "Total wealth created", renting: "$0", buying: "$42,000–$44,000" },
];

const neighborhoods = [
  {
    rank: "E-4 / E-5",
    area: "Northeast El Paso",
    price: "$180,000–$250,000",
    why: "BAH covers full payment on many properties. 5–15 minutes to Fort Bliss gates.",
  },
  {
    rank: "E-6 / E-7",
    area: "Northeast El Paso premium or Horizon City",
    price: "$250,000–$330,000",
    why: "Strong inventory, newer construction, and more space for the money.",
  },
  {
    rank: "O-2 / O-3",
    area: "West El Paso or Far East premium areas",
    price: "$320,000–$450,000",
    why: "Top school zones and more space while still fitting many BAH levels.",
  },
  {
    rank: "O-4+",
    area: "West El Paso, Upper Valley",
    price: "$400,000–$600,000+",
    why: "Premium neighborhoods, larger lots, and top school districts.",
  },
];

export default function FortBlissBahPage() {
  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-white text-slate-900">
        <section className="relative overflow-hidden bg-[#0f172a] px-6 py-32 text-white">
          <div className="absolute inset-0 bg-[url('/uploads/el_paso_luxury_home.jpg')] bg-cover bg-center opacity-70"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/60 via-[#0f172a]/70 to-[#0f172a]"></div>

          <div className="relative mx-auto max-w-6xl text-center">
            <p className="mb-8 text-sm font-light uppercase tracking-[0.3em] text-[#c6a46a]">
              Fort Bliss Housing Guide
            </p>

            <h1 className="mx-auto max-w-5xl text-5xl font-light tracking-wide md:text-7xl lg:leading-tight">
              BAH Rates Fort Bliss 2026
              <span className="block mt-4 italic text-transparent bg-clip-text bg-gradient-to-r from-[#c6a46a] via-[#e6d0a3] to-[#c6a46a]">
                The Home Buyers Guide
              </span>
            </h1>

            <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-[#c6a46a] to-transparent"></div>

            <p className="mx-auto mt-10 max-w-3xl text-lg font-light leading-relaxed text-slate-300 md:text-xl">
              If you are PCSing to Fort Bliss in 2026, your BAH is one of the
              biggest pieces of your housing decision. See what your allowance
              can cover, how buying compares to renting, and which El Paso
              neighborhoods fit your budget.
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <a
                href="#rates"
                className="bg-[#c6a46a] px-8 py-4 text-sm font-light uppercase tracking-widest text-[#0f172a] transition hover:bg-[#e6d0a3]"
              >
                View BAH Rates
              </a>

              <a
                href="#contact"
                className="border border-[#c6a46a]/50 bg-transparent px-8 py-4 text-sm font-light uppercase tracking-widest text-white transition hover:bg-white/5"
              >
                Get My BAH Analysis
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 bg-white">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-light tracking-wide text-[#0f172a] md:text-4xl">
              Understanding Fort Bliss BAH in 2026
            </h2>
            <div className="mx-auto mt-6 h-px w-16 bg-[#c6a46a]"></div>

            <p className="mt-8 text-lg font-light leading-relaxed text-slate-600 md:text-xl">
              Fort Bliss BAH increased 7% over 2025, reflecting El Paso&apos;s
              steady housing market appreciation. For your exact amount by ZIP
              code and dependency status, use the official DoD BAH calculator.
            </p>

            <div className="mt-12 rounded-none border-l-2 border-[#c6a46a] bg-slate-50 p-8 text-left text-slate-800 shadow-sm">
              <p className="text-lg font-light italic leading-relaxed">
                &quot;An E-5 with dependents may receive up to <span className="font-semibold text-[#c6a46a]">$1,809/month</span>, which can cover a major portion of a luxury VA loan mortgage payment in El Paso.&quot;
              </p>
            </div>
          </div>
        </section>

        <section id="rates" className="bg-[#fcfbf9] px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-light tracking-wide text-[#0f172a] md:text-4xl">
                Fort Bliss BAH Rates 2026 With Dependents
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-slate-500">
                These sample ranges show how different ranks translate into
                realistic home-buying power with a VA loan.
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {bahRates.map((row, index) => (
                <div key={row.rank} className={`group relative bg-white p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${index === 1 ? 'border border-[#c6a46a] shadow-xl' : 'border border-slate-100 shadow-sm'}`}>
                  {index === 1 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0f172a] px-6 py-1.5 text-xs font-light uppercase tracking-[0.2em] text-[#c6a46a]">
                      Most Common
                    </div>
                  )}
                  <h3 className="text-center text-sm font-light uppercase tracking-[0.2em] text-slate-400">{row.rank}</h3>
                  <div className="mt-6 flex justify-center items-baseline gap-1">
                    <span className="text-4xl font-light tracking-tight text-[#0f172a]">{row.monthly}</span>
                    <span className="text-sm font-light text-slate-400">/mo</span>
                  </div>
                  <div className="mt-8 border-t border-slate-100 pt-6 text-center">
                    <p className="text-xs font-light uppercase tracking-widest text-slate-400">Target Home Price</p>
                    <p className="mt-2 text-lg font-medium text-[#c6a46a]">{row.priceRange}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-12 text-center text-sm font-light text-slate-400">
              BAH without dependents is lower. Confirm your exact amount using
              the official DoD calculator.
            </p>
          </div>
        </section>

        <section className="bg-white px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <h2 className="text-3xl font-light tracking-wide text-[#0f172a] md:text-4xl">
                Does Your BAH Cover a Mortgage in El Paso?
              </h2>
              <div className="mx-auto mt-6 h-px w-16 bg-[#c6a46a]"></div>
              <p className="mx-auto mt-8 max-w-3xl text-lg font-light leading-relaxed text-slate-500">
                In El Paso, the answer is often yes, especially with a VA loan.
                Here is the sample math for an E-5 with dependents at
                <span className="font-medium text-[#c6a46a]"> $1,809/month </span> BAH.
              </p>
            </div>

            <div className="mt-16 grid gap-10 lg:grid-cols-2">
              {[
                { price: "$250,000 Luxury Residence", dataKey: "home250" },
                { price: "$200,000 Premium Home", dataKey: "home200" }
              ].map((tier) => (
                <div key={tier.price} className="border border-slate-200 bg-white p-10 transition-shadow duration-500 hover:shadow-2xl">
                  <h3 className="text-center text-xl font-light tracking-wide text-[#0f172a]">{tier.price}</h3>
                  <div className="mt-8 space-y-6">
                    {mortgageMath.map((row) => {
                      const isTotal = row.cost === "Total monthly payment";
                      const isCoverage = row.cost.includes("coverage");
                      return (
                        <div key={row.cost} className={`flex items-center justify-between ${isTotal ? 'border-t border-slate-200 pt-6 mt-6' : ''}`}>
                          <span className={`text-sm font-light uppercase tracking-wider ${isTotal || isCoverage ? 'text-[#0f172a] font-medium' : 'text-slate-500'}`}>
                            {row.cost}
                          </span>
                          <span className={`text-lg font-light ${isTotal ? 'text-2xl text-[#c6a46a] font-normal' : 'text-[#0f172a]'}`}>
                            {row[tier.dataKey as "home250" | "home200"]}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0f172a] px-6 py-32 text-white">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-4xl font-light tracking-wide md:text-5xl">
                Buy vs. Rent: The 2026 Analysis
              </h2>
              <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#c6a46a] to-transparent"></div>
              <p className="mx-auto mt-8 max-w-3xl text-lg font-light leading-relaxed text-slate-300">
                For assignments of two to three years or longer, buying can create
                meaningful equity while renting sends your BAH directly to a landlord.
              </p>
            </div>

            <div className="mt-20 grid gap-8 md:grid-cols-2">
              <div className="border border-white/10 bg-white/5 p-12 backdrop-blur-md transition-colors hover:bg-white/10">
                <h3 className="text-center text-2xl font-light tracking-wide text-white">Renting</h3>
                <div className="mx-auto mt-4 h-px w-12 bg-white/20"></div>
                <ul className="mt-12 space-y-8">
                  {buyVsRent.map((row) => (
                    <li key={row.factor} className="text-center">
                      <p className="text-xs font-light uppercase tracking-[0.2em] text-white/50">{row.factor}</p>
                      <p className="mt-2 text-xl font-light text-white/90">{row.renting}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative border border-[#c6a46a]/40 bg-gradient-to-b from-[#162032] to-[#0f172a] p-12 shadow-[0_0_50px_rgba(198,164,106,0.1)]">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#c6a46a] px-8 py-2 text-xs font-light uppercase tracking-[0.2em] text-[#0f172a]">
                  Wealth Builder
                </div>
                <h3 className="text-center text-2xl font-light tracking-wide text-[#c6a46a]">Buying With VA Loan</h3>
                <div className="mx-auto mt-4 h-px w-12 bg-[#c6a46a]/30"></div>
                <ul className="mt-12 space-y-8">
                  {buyVsRent.map((row) => (
                    <li key={row.factor} className="text-center">
                      <p className="text-xs font-light uppercase tracking-[0.2em] text-[#c6a46a]/70">{row.factor}</p>
                      <p className="mt-2 text-xl font-light text-white">{row.buying}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#fcfbf9] px-6 py-32">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-light tracking-wide text-[#0f172a] md:text-4xl">
                Curated Neighborhoods by BAH Level
              </h2>
              <div className="mx-auto mt-6 h-px w-16 bg-[#c6a46a]"></div>
            </div>

            <div className="mt-20 grid gap-12 md:grid-cols-2">
              {neighborhoods.map((row) => (
                <div key={row.rank} className="group flex flex-col border-b border-slate-200 pb-10 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-light uppercase tracking-[0.2em] text-[#0f172a]">
                      {row.rank}
                    </span>
                    <span className="text-sm font-medium tracking-wide text-[#c6a46a]">{row.price}</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-light tracking-wide text-[#0f172a] transition-colors group-hover:text-[#c6a46a]">{row.area}</h3>
                  <p className="mt-4 text-lg font-light leading-relaxed text-slate-500">{row.why}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-32 bg-white">
          <div className="mx-auto max-w-5xl">
            <div className="relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/uploads/el_paso_neighborhood.jpg")' }}>
                <div className="absolute inset-0 bg-[#0f172a]/50"></div>
              </div>
              <div className="relative z-10 flex flex-col items-center p-16 text-center text-white md:p-24">
                <h3 className="text-4xl font-light tracking-wide md:text-5xl">
                  Start Your El Paso Home Search
                </h3>
                <div className="mx-auto mt-6 h-px w-16 bg-[#c6a46a]"></div>
                <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-slate-300">
                  Ready to see what your BAH can buy? Browse active listings near Fort Bliss, filtered by your budget and preferred neighborhoods.
                </p>
                <SearchForm />
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#fcfbf9] px-6 py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-light tracking-wide text-[#0f172a] md:text-4xl">
              Get Your Personalized BAH Analysis
            </h2>
            <div className="mx-auto mt-6 h-px w-16 bg-[#c6a46a]"></div>
            <p className="mt-8 text-lg font-light leading-relaxed text-slate-500">
              Tell us your rank, dependency status, reporting date, and budget.
              We will show you what your BAH buys in each El Paso luxury neighborhood
              and connect you with a VA-experienced lender.
            </p>

            <div className="mt-16 text-left">
              <ContactForm />
            </div>

            <p className="mt-12 text-xs font-light text-slate-400 uppercase tracking-widest">
              Mortgage estimates assume a sample 6.5% rate and are approximate. Verify with a licensed lender.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}