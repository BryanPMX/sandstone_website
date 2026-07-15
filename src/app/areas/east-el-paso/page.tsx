import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ContactForm } from "@/components/ContactForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import SearchForm from "../../bah-fort-bliss-2026/SearchForm";
export const metadata: Metadata = {
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

const checklistPhaseData = [
  { label: "Orders received", value: ordersChecklist.length, display: `${ordersChecklist.length} steps` },
  { label: "60–90 days before", value: daysBeforeChecklist.length, display: `${daysBeforeChecklist.length} steps` },
  { label: "30–60 days before", value: 4, display: "4 steps" },
  { label: "Arrival / Week 1", value: processingChecklist.length, display: `${processingChecklist.length} steps` },
  { label: "VA documents", value: vaDocs.length, display: `${vaDocs.length} docs` },
];

const arrivalPriorityData = [
  { label: "Day 1", value: 1, display: "1 task" },
  { label: "Day 1–3", value: 1, display: "1 task" },
  { label: "Week 1", value: 3, display: "3 tasks" },
  { label: "Within 90 days", value: 1, display: "1 task" },
];

const pcsPhaseTimelineData = [
  { phase: "Orders", timing: "Now", value: 0, display: "Confirm BAH + housing plan" },
  { phase: "90 days", timing: "Pre-approval", value: 90, display: "Remote search + lender prep" },
  { phase: "60 days", timing: "Tour + offer", value: 60, display: "PTDY, video tours, offer strategy" },
  { phase: "30 days", timing: "Escrow", value: 30, display: "Inspection, documents, move coordination" },
  { phase: "Report", timing: "Arrival", value: 0, display: "In-process + finish housing setup" },
];

const neighborhoodComparisonData = [
  {
    area: "Northeast El Paso",
    price: 231526,
    priceLabel: "$231,526",
    commute: 10,
    commuteLabel: "5–15 min",
    bestFor: "Fastest Fort Bliss access",
  },
  {
    area: "Horizon City",
    price: 324000,
    priceLabel: "$324,000",
    commute: 13,
    commuteLabel: "10–15 min",
    bestFor: "Newer homes + east-side units",
  },
  {
    area: "Santa Teresa",
    price: 346000,
    priceLabel: "$346,000",
    commute: 43,
    commuteLabel: "40–45 min",
    bestFor: "Lower-tax New Mexico option",
  },
  {
    area: "West El Paso",
    price: 365000,
    priceLabel: "$350k–$380k",
    commute: 28,
    commuteLabel: "25–30 min",
    bestFor: "West-side lifestyle + schools",
  },
];

function SectionHeader({
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
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-[var(--sandstone-sand-gold)]">
          {eyebrow}
        </p>
      )}

      <h2
        className={`font-heading text-3xl font-bold tracking-tight md:text-4xl ${
          inverse ? "text-white" : "text-[var(--sandstone-navy)]"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-4 text-base leading-8 md:text-lg ${
            inverse ? "text-white/75" : "text-[var(--sandstone-charcoal)]"
          }`}
        >
          {description}
        </p>
      )}
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
      className={`rounded-3xl border p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
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
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--sandstone-sand-gold)] text-xs font-bold text-white">
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

function DataTable({
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

function ChartShell({
  eyebrow,
  title,
  description,
  children,
  inverse = false,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
  inverse?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[2rem] border shadow-lg ${
        inverse
          ? "border-white/10 bg-white/10 text-white"
          : "border-slate-200 bg-white text-slate-900"
      }`}
    >
      <div
        className={`border-b px-6 py-6 md:px-8 ${
          inverse ? "border-white/10" : "border-slate-100"
        }`}
      >
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--sandstone-sand-gold)]">
            {eyebrow}
          </p>
        )}
        <h3
          className={`mt-2 font-heading text-2xl font-bold ${
            inverse ? "text-white" : "text-[var(--sandstone-navy)]"
          }`}
        >
          {title}
        </h3>
        <p className={`mt-3 leading-7 ${inverse ? "text-white/70" : "text-slate-600"}`}>
          {description}
        </p>
      </div>

      <div className="p-6 md:p-8">{children}</div>
    </div>
  );
}

function HorizontalBarChart({
  title,
  description,
  data,
  valuePrefix = "",
  valueSuffix = "",
  maxValue,
  footer,
}: {
  title: string;
  description: string;
  data: { label: string; value: number; display: string }[];
  valuePrefix?: string;
  valueSuffix?: string;
  maxValue?: number;
  footer?: string;
}) {
  const chartMax = maxValue ?? Math.max(...data.map((item) => item.value));

  return (
    <ChartShell title={title} description={description} eyebrow="Visual Guide">
      <div className="space-y-6">
        {data.map((item, index) => {
          const width = Math.max((item.value / chartMax) * 100, 9);

          return (
            <div key={item.label} className="group">
              <div className="mb-2 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 font-heading text-base font-bold text-[var(--sandstone-navy)]">
                    {item.label}
                  </p>
                </div>
                <p className="shrink-0 rounded-full bg-[#f7f5ef] px-3 py-1 text-sm font-bold text-[var(--sandstone-navy)]">
                  {valuePrefix}
                  {item.display}
                  {valueSuffix}
                </p>
              </div>

              <div className="relative h-5 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,var(--sandstone-sand-gold),#d8be85)] transition-all duration-500 group-hover:brightness-105"
                  style={{ width: `${width}%` }}
                />
                <div className="absolute inset-y-0 left-1/4 w-px bg-white/70" />
                <div className="absolute inset-y-0 left-1/2 w-px bg-white/70" />
                <div className="absolute inset-y-0 left-3/4 w-px bg-white/70" />
              </div>
            </div>
          );
        })}
      </div>

      {footer && <p className="mt-6 text-sm leading-6 text-slate-500">{footer}</p>}
    </ChartShell>
  );
}

function PcsTimelineGraph() {
  return (
    <ChartShell
      eyebrow="Timeline"
      title="PCS planning runway"
      description="The cleanest path is to front-load lender prep and remote search work before PTDY or arrival week."
    >
      <div className="relative">
        <div className="absolute left-5 top-5 hidden h-px w-[calc(100%-2.5rem)] bg-slate-200 md:block" />

        <div className="grid gap-5 md:grid-cols-5">
          {pcsPhaseTimelineData.map((item, index) => (
            <div key={item.phase} className="relative rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--sandstone-navy)] text-sm font-bold text-white shadow-md">
                {index + 1}
              </span>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--sandstone-sand-gold)]">
                {item.phase}
              </p>
              <h4 className="mt-2 font-heading text-lg font-bold text-[var(--sandstone-navy)]">
                {item.timing}
              </h4>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.display}</p>
            </div>
          ))}
        </div>
      </div>
    </ChartShell>
  );
}

function PriorityDistributionChart() {
  const total = arrivalPriorityData.reduce((sum, item) => sum + item.value, 0);

  return (
    <ChartShell
      eyebrow="First Week"
      title="Arrival task load"
      description="Most tasks stack into Week 1, so plan admin time instead of filling the first few days with showings only."
    >
      <div className="rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-200">
        <div className="flex h-7 overflow-hidden rounded-full bg-white ring-1 ring-slate-200">
          {arrivalPriorityData.map((item) => {
            const width = (item.value / total) * 100;
            return (
              <div
                key={item.label}
                className="bg-[var(--sandstone-sand-gold)] first:rounded-l-full last:rounded-r-full odd:bg-[var(--sandstone-navy)]"
                style={{ width: `${width}%` }}
                title={`${item.label}: ${item.display}`}
              />
            );
          })}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {arrivalPriorityData.map((item) => (
            <div key={item.label} className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
              <div className="flex items-center justify-between gap-3">
                <p className="font-bold text-[var(--sandstone-navy)]">{item.label}</p>
                <p className="rounded-full bg-[#f7f5ef] px-3 py-1 text-xs font-bold text-slate-700">
                  {Math.round((item.value / total) * 100)}%
                </p>
              </div>
              <p className="mt-2 text-sm text-slate-600">{item.display}</p>
            </div>
          ))}
        </div>
      </div>
    </ChartShell>
  );
}

function NeighborhoodMarketGraph() {
  const maxPrice = Math.max(...neighborhoodComparisonData.map((item) => item.price));
  const maxCommute = Math.max(...neighborhoodComparisonData.map((item) => item.commute));

  return (
    <ChartShell
      eyebrow="Neighborhood Comparison"
      title="Price and commute tradeoffs"
      description="This combines the two decisions PCS families care about most: how far the drive is and how much home budget the area usually requires."
    >
      <div className="space-y-5">
        {neighborhoodComparisonData.map((item) => {
          const priceWidth = Math.max((item.price / maxPrice) * 100, 12);
          const commuteWidth = Math.max((item.commute / maxCommute) * 100, 12);

          return (
            <div key={item.area} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <h4 className="font-heading text-xl font-bold text-[var(--sandstone-navy)]">
                    {item.area}
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{item.bestFor}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-200">
                    {item.priceLabel}
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-200">
                    {item.commuteLabel}
                  </span>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    <span>Price</span>
                    <span>{item.priceLabel}</span>
                  </div>
                  <div className="h-4 rounded-full bg-white ring-1 ring-slate-200">
                    <div
                      className="h-4 rounded-full bg-[var(--sandstone-sand-gold)]"
                      style={{ width: `${priceWidth}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    <span>Commute</span>
                    <span>{item.commuteLabel}</span>
                  </div>
                  <div className="h-4 rounded-full bg-white ring-1 ring-slate-200">
                    <div
                      className="h-4 rounded-full bg-[var(--sandstone-navy)]"
                      style={{ width: `${commuteWidth}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ChartShell>
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
    <div className="group rounded-[2rem] border border-white/10 bg-white/[0.08] p-6 text-white shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.12]">
      <div className="flex items-start justify-between gap-4">
        <p className="font-heading text-5xl font-bold text-[var(--sandstone-sand-gold)]">
          {value}
        </p>
        <span className="mt-2 h-3 w-3 rounded-full bg-[var(--sandstone-sand-gold)] opacity-70 transition group-hover:scale-125" />
      </div>
      <h3 className="mt-5 font-heading text-xl font-bold">{label}</h3>
      <p className="mt-3 leading-7 text-white/75">{detail}</p>
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

              {index !== timeline.length - 1 && (
                <span className="mt-2 h-full w-px bg-white/15" />
              )}
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

function HeroButton({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
}) {
  const baseClasses =
    "rounded-full px-8 py-4 text-sm font-bold transition hover:-translate-y-0.5";

  const variantClasses =
    variant === "solid"
      ? "bg-[var(--sandstone-sand-gold)] text-white shadow-lg hover:opacity-90"
      : "border border-white/30 text-white hover:bg-white hover:text-[var(--sandstone-navy)]";

  return (
    <a href={href} className={`${baseClasses} ${variantClasses}`}>
      {children}
    </a>
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

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,33,82,0.94)_0%,rgba(20,33,82,0.8)_42%,rgba(20,33,82,0.42)_72%,rgba(20,33,82,0.2)_100%)]" />
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
                <HeroButton href="#checklist">View Checklist →</HeroButton>

                <HeroButton href="#contact" variant="outline">
                  Get Relocation Help
                </HeroButton>
              </div>
            </div>
          </div>
        </section>

        <section id="checklist" className="bg-slate-50 px-6 py-20 md:py-24">
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
                variant="dark"
              />
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow="PCS Snapshot"
              title="Move planning at a glance"
              description="These charts turn the checklist into quick visual benchmarks for timing, documents, and first-week priorities."
            />

            <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <PcsTimelineGraph />
              <PriorityDistributionChart />
            </div>

            <div className="mt-8">
              <HorizontalBarChart
                title="Checklist weight by phase"
                description="This shows how many action items are attached to each phase, so buyers can see where the planning pressure builds."
                data={checklistPhaseData}
                footer="Use this as a planning guide, not an official military timeline."
              />
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow="Neighborhoods"
              title="Quick neighborhood guide by gate"
              description="Choose your target area based on commute, price range, schools, and preferred gate access."
            />

            <DataTable
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
            </DataTable>

            <div className="mt-12">
              <NeighborhoodMarketGraph />
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow="Schools"
              title="School districts near Fort Bliss"
              description="Fort Bliss does not have DoDEA schools. Children attend public schools based on home address, so confirm the exact attendance zone before buying."
            />

            <DataTable headers={["Area", "School District", "Notable Schools"]}>
              {schoolDistricts.map((row) => (
                <tr key={row.area} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4 font-bold text-[var(--sandstone-navy)]">
                    {row.area}
                  </td>
                  <td className="px-5 py-4 text-slate-700">{row.district}</td>
                  <td className="px-5 py-4 text-slate-700">{row.schools}</td>
                </tr>
              ))}
            </DataTable>
          </div>
        </section>

        <section className="bg-[var(--sandstone-navy)] px-6 py-20 text-white md:py-24">
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
                    className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white/15"
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

        <section className="bg-[var(--sandstone-navy)] px-6 py-20 text-white md:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow="Relocation Numbers"
              title="Key PCS planning metrics"
              description="Use these numbers as simple checkpoints while planning your Fort Bliss move."
              inverse
            />

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              <StatCard
                value="90"
                label="Days to plan ahead"
                detail="Start BAH, VA pre-approval, and remote tours as soon as orders arrive."
              />
              <StatCard
                value="6"
                label="VA documents"
                detail="Keep your COE, orders, LES, W-2s, bank statements, and funding fee info ready."
              />
              <StatCard
                value="4"
                label="Main housing areas"
                detail="Northeast, Horizon City, West El Paso, and Santa Teresa each fit different commute needs."
              />
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              eyebrow="Arrival"
              title="El Paso in-processing checklist"
              description="Use this list to stay organized during your first few days after arriving at Fort Bliss."
            />

            <DataTable headers={["Task", "Where / How", "Priority"]}>
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
            </DataTable>
          </div>
        </section>

        <section className="bg-slate-50 px-6 py-20 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <ChecklistCard title="VA Loan Documents Checklist" items={vaDocs} />
            <TimelineCard />
          </div>
        </section>

        <section className="py-0">
          <div className="relative min-h-[620px] w-full overflow-hidden shadow-2xl md:min-h-[680px]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url("/uploads/el_paso_neighborhood.jpg")',
              }}
            />

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(38,53,111,0.92)_0%,rgba(38,53,111,0.76)_45%,rgba(38,53,111,0.45)_100%)]" />
            <div className="absolute inset-0 bg-black/10" />

            <div className="relative z-10 mx-auto flex min-h-[620px] max-w-6xl flex-col items-center justify-center px-6 text-center md:min-h-[680px]">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#c6a46a] md:text-sm">
                Homes Near Fort Bliss
              </p>

              <h2 className="max-w-5xl text-4xl font-light leading-tight tracking-[0.16em] text-white md:text-5xl lg:text-6xl">
                Start Your El Paso Home Search
              </h2>

              <div className="mt-6 h-px w-20 bg-[var(--sandstone-sand-gold)]" />

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
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sandstone-sand-gold)]">
                Relocation Support
              </p>

              <h2 className="mx-auto mt-5 max-w-4xl font-heading text-3xl font-light leading-tight tracking-wide text-[var(--sandstone-navy)] md:text-5xl">
                Planning Your PCS to Fort Bliss?
              </h2>

              <div className="mx-auto mt-6 h-px w-20 bg-[var(--sandstone-sand-gold)]" />

              <p className="mx-auto mt-6 max-w-3xl text-base font-light leading-8 text-slate-600 md:text-lg">
                Sandstone&apos;s military relocation team can help with remote
                home searches, VA loan timelines, neighborhood recommendations,
                and buyer support before you arrive.
              </p>

              <div className="mx-auto mt-10 grid max-w-4xl gap-4 text-left md:grid-cols-3">
                {[
                  "Remote home search support",
                  "VA loan timeline guidance",
                  "Neighborhood recommendations",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-[#f7f5ef] px-5 py-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--sandstone-sand-gold)]" />
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
                heading="Planning Your PCS to Fort Bliss?"
                subheading="Sandstone's military relocation team can help with remote home searches, VA loan timelines, neighborhood recommendations, and buyer support before you arrive."
              />
            </div>

            <p className="mx-auto mt-8 max-w-4xl text-center text-sm leading-7 text-slate-500">
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