import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";

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

function Table({
  headers,
  children,
}: {
  headers: string[];
  children: ReactNode;
}) {
  return (
    <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <thead className="bg-[#26356f] text-white">
          <tr>
            {headers.map((header) => (
              <th key={header} className="p-4">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export default function FortBlissBahPage() {
  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-white text-slate-900">
        <section className="bg-[#26356f] px-6 py-20 text-white">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#c6a46a]">
              Fort Bliss Housing Guide
            </p>

            <h1 className="max-w-5xl text-4xl font-bold tracking-tight md:text-6xl">
              BAH Rates Fort Bliss 2026 — Complete Guide for El Paso Home Buyers
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
              If you are PCSing to Fort Bliss in 2026, your BAH is one of the
              biggest pieces of your housing decision. See what your allowance
              can cover, how buying compares to renting, and which El Paso
              neighborhoods fit your budget.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#rates"
                className="rounded-full bg-[#c6a46a] px-6 py-3 text-sm font-bold normal-case tracking-normal text-white transition hover:bg-[#b89458]"
              >
                View BAH Rates
              </a>

              <a
                href="#contact"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold normal-case tracking-normal text-white transition hover:bg-white hover:text-[#26356f]"
              >
                Get My BAH Analysis
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-[#26356f]">
              Understanding Fort Bliss BAH in 2026
            </h2>

            <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-700">
              Fort Bliss BAH increased 7% over 2025, reflecting El Paso&apos;s
              steady housing market appreciation. For your exact amount by ZIP
              code and dependency status, use the official DoD BAH calculator.
            </p>

            <div className="mt-8 rounded-3xl bg-[#f5efe3] p-6 text-slate-800">
              <p className="font-semibold">
                Quick example: an E-5 with dependents may receive up to
                $1,809/month, which can cover a major portion of a VA loan
                mortgage payment in El Paso.
              </p>
            </div>
          </div>
        </section>

        <section id="rates" className="bg-slate-50 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-[#26356f]">
              Fort Bliss BAH Rates 2026 With Dependents
            </h2>

            <p className="mt-4 max-w-3xl text-slate-700">
              These sample ranges show how different ranks may translate into
              realistic home-buying power with a VA loan.
            </p>

            <Table headers={["Rank", "Monthly BAH", "Annual BAH", "Approx. Home Price Range"]}>
              {bahRates.map((row) => (
                <tr key={row.rank} className="border-t border-slate-200">
                  <td className="p-4 font-semibold">{row.rank}</td>
                  <td className="p-4">{row.monthly}</td>
                  <td className="p-4">{row.annual}</td>
                  <td className="p-4">{row.priceRange}</td>
                </tr>
              ))}
            </Table>

            <p className="mt-4 text-sm text-slate-500">
              BAH without dependents is lower. Confirm your exact amount using
              the official DoD calculator.
            </p>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-[#26356f]">
              Does Your BAH Cover a Mortgage in El Paso?
            </h2>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              In El Paso, the answer is often yes, especially with a VA loan.
              Here is the sample math for an E-5 with dependents at
              $1,809/month BAH.
            </p>

            <Table headers={["Cost Component", "Home at $250K", "Home at $200K"]}>
              {mortgageMath.map((row) => (
                <tr key={row.cost} className="border-t border-slate-200">
                  <td className="p-4 font-semibold">{row.cost}</td>
                  <td className="p-4">{row.home250}</td>
                  <td className="p-4">{row.home200}</td>
                </tr>
              ))}
            </Table>
          </div>
        </section>

        <section className="bg-[#26356f] px-6 py-16 text-white">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold">
              Buy vs. Rent: The 2026 Analysis for Fort Bliss
            </h2>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-white/80">
              For assignments of two to three years or longer, buying can create
              meaningful equity while renting sends your BAH to a landlord.
            </p>

            <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-white">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm text-slate-900">
                <thead className="bg-[#c6a46a] text-white">
                  <tr>
                    <th className="p-4">Factor</th>
                    <th className="p-4">Renting</th>
                    <th className="p-4">Buying With VA Loan</th>
                  </tr>
                </thead>

                <tbody>
                  {buyVsRent.map((row) => (
                    <tr key={row.factor} className="border-t border-slate-200">
                      <td className="p-4 font-semibold">{row.factor}</td>
                      <td className="p-4">{row.renting}</td>
                      <td className="p-4">{row.buying}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-[#26356f]">
              Which Neighborhoods Fit Which BAH Levels?
            </h2>

            <Table headers={["Rank Range", "Best Neighborhood", "Home Price Target", "Why It Works"]}>
              {neighborhoods.map((row) => (
                <tr key={row.rank} className="border-t border-slate-200">
                  <td className="p-4 font-semibold">{row.rank}</td>
                  <td className="p-4">{row.area}</td>
                  <td className="p-4">{row.price}</td>
                  <td className="p-4">{row.why}</td>
                </tr>
              ))}
            </Table>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-[#26356f]">
              Browse Homes Within Your BAH Range
            </h2>

            <p className="mt-4 max-w-3xl text-slate-700">
              Search El Paso homes from approximately $150K–$450K across all
              major areas near Fort Bliss.
            </p>

            <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h3 className="text-xl font-bold text-[#26356f]">
                IDX / Listing Carousel Placeholder
              </h3>
              <p className="mt-2 text-slate-600">
                Add the property listing widget here when ready.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-3xl bg-[#26356f] p-8 text-white md:p-12">
              <h2 className="text-3xl font-bold">
                Get Your Personalized BAH Analysis
              </h2>

              <p className="mt-4 max-w-3xl text-white/80">
                Tell us your rank, dependency status, reporting date, and budget.
                We will show you what your BAH buys in each El Paso neighborhood
                and connect you with a VA-experienced lender.
              </p>
            </div>

            <div className="mt-10">
              <ContactForm />
            </div>

            <p className="mt-6 text-sm text-slate-500">
              Mortgage estimates assume a sample 6.5% rate and are approximate.
              Verify with a licensed lender for your situation.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}