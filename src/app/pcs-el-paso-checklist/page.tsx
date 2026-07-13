import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title:
    "PCS to El Paso Checklist 2026 | Fort Bliss Relocation Guide | Sandstone",
  description:
    "Complete PCS to El Paso checklist for Fort Bliss. BAH rates, best neighborhoods, VA loan timeline, schools, and what to do before you arrive. Updated 2026.",
};

const ordersChecklist = [
  "Confirm your reporting date and contact the Fort Bliss Housing Office.",
  "Calculate your exact BAH using the official DoD BAH calculator.",
  "Decide whether buying or renting makes more sense for your assignment length.",
  "Start VA loan pre-approval with a VA-experienced lender.",
];

const daysBeforeChecklist = [
  "Start your home search remotely with video walkthroughs and virtual tours.",
  "Choose your target neighborhood based on your unit gate and commute.",
  "Research school districts based on address.",
  "Arrange PTDY through your losing unit for house hunting.",
];

const neighborhoodGuide = [
  { gate: "Cassidy Gate / MSG Peña Gate", area: "Northeast El Paso", price: "$231,526", commute: "5–15 min" },
  { gate: "Cassidy Gate, east units", area: "Horizon City TX", price: "$324,000", commute: "10–15 min" },
  { gate: "Biggs Army Airfield", area: "West El Paso", price: "$350,000–$380,000", commute: "25–30 min" },
  { gate: "West side flexibility / lower taxes", area: "Santa Teresa NM", price: "$346,000", commute: "40–45 min to main gate" },
];

const schoolDistricts = [
  { area: "Northeast El Paso", district: "El Paso ISD", schools: "Parkland High School, Transmountain Early College HS" },
  { area: "West El Paso", district: "El Paso ISD", schools: "Coronado High School, Franklin High School" },
  { area: "Horizon City / Far East", district: "Socorro ISD", schools: "Eastlake High School, Horizon Heights Elementary" },
  { area: "Santa Teresa NM", district: "Gadsden ISD", schools: "Santa Teresa High School, Middle, Elementary" },
  { area: "On-post housing", district: "El Paso ISD", schools: "On-installation elementary schools and high school" },
];

const processingChecklist = [
  { task: "Report to Reception Company", where: "Building 1006, Carter Street", priority: "Day 1" },
  { task: "Complete unit in-processing", where: "Through your unit", priority: "Day 1–3" },
  { task: "Update military IDs", where: "DEERS / RAPIDS office", priority: "Week 1" },
  { task: "Enroll children in school", where: "EPISD, SISD, or Gadsden ISD", priority: "Week 1" },
  { task: "Set up TRICARE", where: "William Beaumont Army Medical Center", priority: "Week 1" },
  { task: "Register vehicle", where: "El Paso Tax Assessor-Collector office", priority: "Within 90 days" },
];

const vaDocs = [
  "Certificate of Eligibility",
  "Last 2 years of W-2s or LES",
  "Last 30 days of pay stubs or LES",
  "Last 2 months of bank statements",
  "Copy of PCS orders",
  "VA funding fee information",
];

const timeline = [
  {
    timeframe: "Orders received",
    action:
      "Call Housing Office, calculate BAH, decide buy vs. rent, contact Sandstone.",
  },
  { timeframe: "90 days out", action: "Start remote home search and get VA pre-approval." },
  { timeframe: "60 days out", action: "Use PTDY to tour homes and make an offer." },
  { timeframe: "30 days out", action: "Complete inspection, escrow steps, and moving coordination." },
  { timeframe: "Reporting date", action: "In-process at Reception and finalize housing." },
  { timeframe: "Within 90 days", action: "Register vehicles in Texas or New Mexico." },
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

export default function PcsElPasoChecklistPage() {
  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-white text-slate-900">
        <section className="bg-[#26356f] px-6 py-20 text-white">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#c6a46a]">
              Fort Bliss Relocation Guide
            </p>

            <h1 className="max-w-5xl text-4xl font-bold tracking-tight md:text-6xl">
              PCS to El Paso Checklist 2026 — Complete Military Relocation Guide
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
              Got orders to Fort Bliss? Use this checklist to organize housing,
              BAH, VA loan pre-approval, schools, neighborhoods, and your first
              week on post.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#checklist"
                className="rounded-full bg-[#c6a46a] px-6 py-3 text-sm font-bold normal-case tracking-normal text-white transition hover:bg-[#b89458]"
              >
                View Checklist
              </a>

              <a
                href="#contact"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold normal-case tracking-normal text-white transition hover:bg-white hover:text-[#26356f]"
              >
                Get Relocation Help
              </a>
            </div>
          </div>
        </section>

        <section id="checklist" className="px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 p-8">
              <h2 className="text-3xl font-bold text-[#26356f]">
                As Soon As You Get Orders
              </h2>

              <ul className="mt-6 space-y-4">
                {ordersChecklist.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-700">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#c6a46a]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-slate-100 p-8">
              <h2 className="text-3xl font-bold text-[#26356f]">
                60–90 Days Before Reporting
              </h2>

              <ul className="mt-6 space-y-4">
                {daysBeforeChecklist.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-700">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#c6a46a]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-[#26356f]">
              Quick Neighborhood Guide by Gate
            </h2>

            <p className="mt-4 max-w-3xl text-slate-700">
              Choose your target area based on gate access, commute, schools,
              and budget.
            </p>

            <Table headers={["Gate / Assignment", "Best Neighborhood", "Median Price", "Commute"]}>
              {neighborhoodGuide.map((row) => (
                <tr key={row.gate} className="border-t border-slate-200">
                  <td className="p-4 font-semibold">{row.gate}</td>
                  <td className="p-4">{row.area}</td>
                  <td className="p-4">{row.price}</td>
                  <td className="p-4">{row.commute}</td>
                </tr>
              ))}
            </Table>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-[#26356f]">
              School Districts Near Fort Bliss
            </h2>

            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              Fort Bliss does not have DoDEA schools. Children attend public
              schools based on the home address, so always confirm the exact
              attendance zone before finalizing a purchase.
            </p>

            <Table headers={["Area", "School District", "Notable Schools"]}>
              {schoolDistricts.map((row) => (
                <tr key={row.area} className="border-t border-slate-200">
                  <td className="p-4 font-semibold">{row.area}</td>
                  <td className="p-4">{row.district}</td>
                  <td className="p-4">{row.schools}</td>
                </tr>
              ))}
            </Table>
          </div>
        </section>

        <section className="bg-[#26356f] px-6 py-16 text-white">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold">
              30–60 Days Before Reporting
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                "Make an offer and open escrow.",
                "Schedule a home inspection.",
                "Coordinate your DITY / PPM move if applicable.",
                "Register vehicles in Texas within 90 days of establishing residency.",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-white/10 p-6">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-[#26356f]">
              El Paso In-Processing Checklist
            </h2>

            <Table headers={["Task", "Where / How", "Priority"]}>
              {processingChecklist.map((row) => (
                <tr key={row.task} className="border-t border-slate-200">
                  <td className="p-4 font-semibold">{row.task}</td>
                  <td className="p-4">{row.where}</td>
                  <td className="p-4">{row.priority}</td>
                </tr>
              ))}
            </Table>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-[#26356f]">
                VA Loan Documents Checklist
              </h2>

              <ul className="mt-6 space-y-4">
                {vaDocs.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-700">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#c6a46a]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-[#26356f] p-8 text-white">
              <h2 className="text-3xl font-bold">
                Your PCS Timeline at a Glance
              </h2>

              <div className="mt-6 space-y-4">
                {timeline.map((item) => (
                  <div
                    key={item.timeframe}
                    className="border-b border-white/10 pb-4"
                  >
                    <p className="font-bold text-[#c6a46a]">
                      {item.timeframe}
                    </p>
                    <p className="mt-1 text-white/80">{item.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-[#26356f]">
              Browse Homes by Gate and Budget
            </h2>

            <p className="mt-4 max-w-3xl text-slate-700">
              Search El Paso and Santa Teresa homes based on commute, budget,
              and your Fort Bliss assignment.
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
                PCS to Fort Bliss? Let&apos;s Talk Now.
              </h2>

              <p className="mt-4 max-w-3xl text-white/80">
                Sandstone&apos;s military relocation team works around your
                schedule with evening calls, weekend availability, video
                walkthroughs, remote searches, and remote closing support.
              </p>
            </div>

            <div className="mt-10">
              <ContactForm />
            </div>

            <p className="mt-6 text-sm text-slate-500">
              Information current as of 2026. BAH rates, school districts, and
              military procedures are subject to change. Always verify with
              official sources before making decisions.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}