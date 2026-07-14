import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";
import SearchForm from "../bah-fort-bliss-2026/SearchForm";

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
  {
    gate: "Cassidy Gate / MSG Peña Gate",
    area: "Northeast El Paso",
    price: "$231,526",
    commute: "5–15 min",
  },
  {
    gate: "Cassidy Gate, east units",
    area: "Horizon City TX",
    price: "$324,000",
    commute: "10–15 min",
  },
  {
    gate: "Biggs Army Airfield",
    area: "West El Paso",
    price: "$350,000–$380,000",
    commute: "25–30 min",
  },
  {
    gate: "West side flexibility / lower taxes",
    area: "Santa Teresa NM",
    price: "$346,000",
    commute: "40–45 min to main gate",
  },
];

const schoolDistricts = [
  {
    area: "Northeast El Paso",
    district: "El Paso ISD",
    schools: "Parkland High School, Transmountain Early College HS",
  },
  {
    area: "West El Paso",
    district: "El Paso ISD",
    schools: "Coronado High School, Franklin High School",
  },
  {
    area: "Horizon City / Far East",
    district: "Socorro ISD",
    schools: "Eastlake High School, Horizon Heights Elementary",
  },
  {
    area: "Santa Teresa NM",
    district: "Gadsden ISD",
    schools: "Santa Teresa High School, Middle, Elementary",
  },
  {
    area: "On-post housing",
    district: "El Paso ISD",
    schools: "On-installation elementary schools and high school",
  },
];

const processingChecklist = [
  {
    task: "Report to Reception Company",
    where: "Building 1006, Carter Street",
    priority: "Day 1",
  },
  {
    task: "Complete unit in-processing",
    where: "Through your unit",
    priority: "Day 1–3",
  },
  {
    task: "Update military IDs",
    where: "DEERS / RAPIDS office",
    priority: "Week 1",
  },
  {
    task: "Enroll children in school",
    where: "EPISD, SISD, or Gadsden ISD",
    priority: "Week 1",
  },
  {
    task: "Set up TRICARE",
    where: "William Beaumont Army Medical Center",
    priority: "Week 1",
  },
  {
    task: "Register vehicle",
    where: "El Paso Tax Assessor-Collector office",
    priority: "Within 90 days",
  },
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
      "Call Housing Office, calculate BAH, decide buy vs. rent, and contact Sandstone.",
  },
  {
    timeframe: "90 days out",
    action: "Start your remote home search and get VA pre-approved.",
  },
  {
    timeframe: "60 days out",
    action: "Use PTDY to tour homes, compare areas, and make an offer.",
  },
  {
    timeframe: "30 days out",
    action:
      "Complete inspections, escrow steps, lender requests, and moving coordination.",
  },
  {
    timeframe: "Reporting date",
    action: "In-process at Reception and finalize your housing plan.",
  },
  {
    timeframe: "Within 90 days",
    action: "Register vehicles in Texas or New Mexico if applicable.",
  },
];

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-[var(--sandstone-sand-gold)]">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--sandstone-navy)] md:text-4xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-4 text-base leading-8 text-[var(--sandstone-charcoal)] md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function ChecklistCard({
  title,
  items,
  variant = "light",
}: {
  title: string;
  items: string[];
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";

  return (
    <div
      className={`rounded-3xl border p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
        isDark
          ? "border-white/10 bg-[var(--sandstone-navy)] text-white"
          : "border-slate-200 bg-white text-[var(--sandstone-charcoal)]"
      }`}
    >
      <h3
        className={`font-heading text-2xl font-bold ${
          isDark ? "text-white" : "text-[var(--sandstone-navy)]"
        }`}
      >
        {title}
      </h3>

      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-7">
            <span className="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--sandstone-sand-gold)] text-xs font-bold text-white">
              ✓
            </span>

            <span className={isDark ? "text-white/85" : "text-slate-700"}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Table({
  headers,
  children,
}: {
  headers: string[];
  children: ReactNode;
}) {
  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-[var(--sandstone-navy)] text-white">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-5 py-4 text-xs font-bold uppercase tracking-[0.18em]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">{children}</tbody>
        </table>
      </div>
    </div>
  );
}

function TimelineCard() {
  return (
    <div className="rounded-3xl bg-[var(--sandstone-navy)] p-8 text-white shadow-xl md:p-10">
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--sandstone-sand-gold)]">
        PCS Timeline
      </p>

      <h3 className="mt-3 font-heading text-3xl font-bold">
        Your move at a glance
      </h3>

      <div className="mt-8 space-y-5">
        {timeline.map((item, index) => (
          <div key={item.timeframe} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--sandstone-sand-gold)] text-sm font-bold text-white">
                {index + 1}
              </span>

              {index !== timeline.length - 1 ? (
                <span className="mt-2 h-full w-px bg-white/15" />
              ) : null}
            </div>

            <div className="pb-5">
              <p className="font-bold text-white">{item.timeframe}</p>
              <p className="mt-1 leading-7 text-white/75">{item.action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PcsElPasoChecklistPage() {
  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-white text-slate-900">
        <section className="relative min-h-[640px] overflow-hidden bg-[var(--sandstone-navy)] px-6 pt-36 pb-24 text-white md:min-h-[700px] md:pt-44">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/uploads/pcs-hero-bg.png')",
            }}
          />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,33,82,0.92)_0%,rgba(20,33,82,0.78)_42%,rgba(20,33,82,0.38)_72%,rgba(20,33,82,0.18)_100%)]" />

          <div className="absolute inset-0 bg-black/10" />

          <div className="relative mx-auto flex min-h-[460px] max-w-6xl items-center">
            <div className="max-w-4xl">
              <p className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.28em] text-[var(--sandstone-sand-gold)] backdrop-blur">
                Fort Bliss Relocation Guide
              </p>

              <h1 className="font-heading text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                PCS to El Paso Checklist 2026
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-white/85 md:text-xl">
                A complete Fort Bliss relocation guide covering housing, BAH, VA
                loan prep, school districts, neighborhoods, in-processing, and
                your first week in El Paso.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#checklist"
                  className="rounded-full bg-[var(--sandstone-sand-gold)] px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:opacity-90"
                >
                  View Checklist →
                </a>

                <a
                  href="#contact"
                  className="rounded-full border border-white/30 px-8 py-4 text-sm font-bold text-white transition hover:bg-white hover:text-[var(--sandstone-navy)]"
                >
                  Get Relocation Help
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="checklist" className="bg-slate-50 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow="Start Here"
              title="Your PCS checklist by phase"
              description="Use these steps to stay organized before you arrive at Fort Bliss."
            />

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <ChecklistCard
                title="As Soon As You Get Orders"
                items={ordersChecklist}
              />

              <ChecklistCard
                title="60–90 Days Before Reporting"
                items={daysBeforeChecklist}
              />
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow="Neighborhoods"
              title="Quick neighborhood guide by gate"
              description="Choose your target area based on commute, price range, schools, and preferred gate access."
            />

            <Table
              headers={[
                "Gate / Assignment",
                "Best Neighborhood",
                "Median Price",
                "Commute",
              ]}
            >
              {neighborhoodGuide.map((row) => (
                <tr key={row.gate} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4 font-bold text-[var(--sandstone-navy)]">
                    {row.gate}
                  </td>
                  <td className="px-5 py-4 text-slate-700">{row.area}</td>
                  <td className="px-5 py-4 text-slate-700">{row.price}</td>
                  <td className="px-5 py-4 text-slate-700">{row.commute}</td>
                </tr>
              ))}
            </Table>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow="Schools"
              title="School districts near Fort Bliss"
              description="Fort Bliss does not have DoDEA schools. Children attend public schools based on home address, so confirm the exact attendance zone before buying."
            />

            <Table headers={["Area", "School District", "Notable Schools"]}>
              {schoolDistricts.map((row) => (
                <tr key={row.area} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4 font-bold text-[var(--sandstone-navy)]">
                    {row.area}
                  </td>
                  <td className="px-5 py-4 text-slate-700">{row.district}</td>
                  <td className="px-5 py-4 text-slate-700">{row.schools}</td>
                </tr>
              ))}
            </Table>
          </div>
        </section>

        <section className="bg-[var(--sandstone-navy)] px-6 py-16 text-white md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--sandstone-sand-gold)]">
                  30–60 Days Out
                </p>

                <h2 className="mt-3 font-heading text-3xl font-bold md:text-4xl">
                  Finalize housing and move details before reporting
                </h2>

                <p className="mt-5 leading-8 text-white/75">
                  This is the window to tighten up inspections, lender
                  documents, moving logistics, and your arrival plan.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {[
                  "Make an offer and open escrow.",
                  "Schedule a home inspection.",
                  "Coordinate your DITY / PPM move if applicable.",
                  "Register vehicles in Texas within 90 days of establishing residency.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-sm"
                  >
                    <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--sandstone-sand-gold)] font-bold">
                      ✓
                    </span>

                    <p className="leading-7 text-white/85">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow="Arrival"
              title="El Paso in-processing checklist"
              description="Use this list to stay organized during your first few days after arriving at Fort Bliss."
            />

            <Table headers={["Task", "Where / How", "Priority"]}>
              {processingChecklist.map((row) => (
                <tr key={row.task} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4 font-bold text-[var(--sandstone-navy)]">
                    {row.task}
                  </td>
                  <td className="px-5 py-4 text-slate-700">{row.where}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-[#f5efe5] px-3 py-1 text-xs font-bold text-[var(--sandstone-navy)]">
                      {row.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </Table>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <ChecklistCard title="VA Loan Documents Checklist" items={vaDocs} />
            <TimelineCard />
          </div>
        </section>

        <section className="py-0">
          <div className="w-full">
            <div className="relative min-h-[620px] w-full overflow-hidden shadow-2xl md:min-h-[680px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url("/uploads/el_paso_neighborhood.jpg")',
                }}
              />

              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(38,53,111,0.92)_0%,rgba(38,53,111,0.76)_45%,rgba(38,53,111,0.45)_100%)]" />

              <div className="relative z-10 mx-auto flex min-h-[620px] max-w-6xl flex-col items-center justify-center px-6 text-center md:min-h-[680px]">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#c6a46a] md:text-sm">
                  Homes Near Fort Bliss
                </p>

                <h2 className="max-w-5xl text-4xl font-light leading-tight tracking-[0.16em] text-white md:text-5xl lg:text-6xl">
                  Start Your El Paso Home Search
                </h2>

                <div className="mt-6 h-px w-20 bg-[var(--sandstone-sand-gold)]" />

                <p className="mt-8 max-w-3xl px-6 py-3 text-lg font-light leading-relaxed text-white md:text-xl">
                  Ready to see what your BAH can buy? Browse active listings
                  near Fort Bliss, filtered by your budget and preferred
                  neighborhoods.
                </p>

                <div className="mt-10 w-full max-w-3xl">
                  <SearchForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-slate-50 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--sandstone-sand-gold)]">
                Relocation Support
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <ContactForm
                heading="Planning Your PCS to Fort Bliss?"
                subheading="Sandstone's military relocation team can help with remote home searches, VA loan timelines, neighborhood recommendations, and buyer support before you arrive."
              />
            </div>

            <p className="mt-6 text-center text-sm leading-7 text-slate-500">
              Information current as of 2026. BAH rates, school districts, VA
              loan requirements, and military procedures are subject to change.
              Always verify with official sources before making decisions.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}