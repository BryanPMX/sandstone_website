import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HorizonListings } from "@/components/areas/HorizonListings";
import { LeadCaptureSection } from "@/components/LeadCaptureSection";
import { getTurnstileSiteKey } from "@/config";
import {
  Clock,
  BadgePercent,
  Home,
  ArrowUpDown,
  ExternalLink,
  Info,
  ChevronDown,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Horizon City | Sandstone Real Estate Group",
};

export const dynamic = "force-dynamic";

// ── Spark API — market statistics for Horizon City (ZIP 79928) ────────────────
const SPARK_BASE    = "https://replication.sparkapi.com";
const SPARK_TOKEN   = process.env.SPARK_ACCESS_TOKEN ?? "";
const SPARK_HEADERS = {
  Accept: "application/json",
  Authorization: `Bearer ${SPARK_TOKEN}`,
  "User-Agent": "sandstone-website/1.0",
};

async function fetchHorizonCityStats() {
  const qs   = "LocationField=PostalCode&LocationValue=79928";
  const opts = { headers: SPARK_HEADERS, next: { revalidate: 3600 } } as RequestInit;
  try {
    const [priceRes, invRes, domRes, ratioRes] = await Promise.all([
      fetch(`${SPARK_BASE}/v1/marketstatistics/price?${qs}`,     opts),
      fetch(`${SPARK_BASE}/v1/marketstatistics/inventory?${qs}`, opts),
      fetch(`${SPARK_BASE}/v1/marketstatistics/dom?${qs}`,       opts),
      fetch(`${SPARK_BASE}/v1/marketstatistics/ratio?${qs}`,     opts),
    ]);
    const [price, inv, dom, ratio] = await Promise.all([
      priceRes.json(), invRes.json(), domRes.json(), ratioRes.json(),
    ]);
    return {
      p: price?.D?.Results?.[0]  ?? null,
      i: inv?.D?.Results?.[0]    ?? null,
      d: dom?.D?.Results?.[0]    ?? null,
      r: ratio?.D?.Results?.[0]  ?? null,
    };
  } catch {
    return { p: null, i: null, d: null, r: null };
  }
}


const SCHOOLS = {
  elementary: [
    { name: "Horizon Heights Elementary School", district: "Socorro ISD", zip: "79928" },
    { name: "Desert Wind Elementary School", district: "Socorro ISD", zip: "79928" },
    { name: "Frank Macias Elementary School", district: "Clint ISD", zip: "79928" },
    { name: "Carroll T. Welch Elementary School", district: "Clint ISD", zip: "79928" },
    { name: "Desert Hills Elementary School", district: "Socorro ISD", zip: "79928" }
    
  ],
  middle: [
    { name: "Col. John O. Ensor Middle School", district: "Socorro ISD", zip: "79928" },
    { name: "Horizon Middle School", district: "Clint ISD", zip: "79928" },
    { name: "Ricardo Estrada Middle School", district: "Socorro ISD", zip: "79928" },
  ],
  high: [
    { name: "Horizon High School", district: "Clint ISD", zip: "79928" },
    { name: "Eastlake High School", district: "Socorro ISD", zip: "79928" },
  ],
} as const;

const NEARBY = {
  hospitals: [
    { name: "The Hospitals of Providence - Horizon CIty Campus", time: "13 min", img: "/areas/horizon-city/hopistal.jpg" },
    { name: "University Medical Center",                         time: "22 min", img: "/areas/horizon-city/hosptial-2.webp" },
    { name: "Las Palmas Medical Center",                         time: "25 min", img: "/areas/horizon-city/hos-3.jpg" },
  ],
  groceries: [
    { name: "Albertsons",             time: "7 min",  img: "/areas/horizon-city/albertsons.jpg" },
    { name: "Walmart Supercenter",    time: "8 min",  img: "/areas/horizon-city/walmart.jpg" },
    { name: "Whole Foods",            time: "11 min", img: "/areas/horizon-city/whole-foods.webp" },
    { name: "Sprouts Farmers Market", time: "10 min", img: "/areas/horizon-city/sprouts.webp" },
    { name: "Vista Market",           time: "7 min",  img: "/areas/horizon-city/vista-market.webp" },
  ],
  shopping: [
    { name: "Eastlake Shopping Center",        time: "5 min", img: "/areas/horizon-city/shopping center.jpg" },
    { name: "Eastlake Marketplace Center ", time: "10 min", img: "/areas/horizon-city/eastlake-marketplace.jpg"},
    { name: "Cielo Vista Mall",             time: "20 min", img: "/areas/horizon-city/cielo mall.jpg" },
  ],
};

const COMMUTE_TIMES = [
  { icon: "/icons/areas/icon-office.webp",       time: "24 - 30 min", label: "Downtown\nEl Paso"          },
  { icon: "/icons/areas/icon-graduation.webp",   time: "25 - 30  min", label: "UTEP"                       },
  { icon: "/icons/areas/icon-star.webp",         time: "28 - 32 min", label: "Fort Bliss\nBuffalo Soldier" },
  { icon: "/icons/areas/icon-airport.webp",      time: "21 - 25  min", label: "El Paso\nAirport"           },
  { icon: "/icons/areas/icon-shopping-bag.webp", time: "5 min", label: "Eastlake\nShopping"          },
];

const UTILITIES = [
  {
    icon:        "/icons/areas/icon-electric.webp",
    title:       "Electricity",
    provider:    "El Paso Electric",
    description: "Powering homes and businesses across the region.",
    linkLabel:   "Visit Website",
    href:        "https://www.epelectric.com",
    accent:      { bg: "bg-amber-50",  text: "text-amber-500",  border: "border-amber-400"  },
  },
  {
    icon:        "/icons/areas/icon-water.webp",
    title:       "Water",
    provider:    "El Paso Water",
    description: "Providing quality water, wastewater, and stormwater services.",
    linkLabel:   "Visit Website",
    href:        "https://www.epwater.org",
    accent:      { bg: "bg-blue-50",   text: "text-blue-500",   border: "border-blue-400"   },
  },
  {
    icon:        "/icons/areas/icon-flame.webp",
    title:       "Natural Gas",
    provider:    "Texas Gas Service",
    description: "Safe, reliable natural gas service for your home and business.",
    linkLabel:   "Visit Website",
    href:        "https://www.texasgasservice.com",
    accent:      { bg: "bg-violet-50", text: "text-violet-500", border: "border-violet-400" },
  },
  {
    icon:        "/icons/areas/icon-trash.webp",
    title:       "Trash & Recycling",
    provider:    "City of El Paso ESD",
    description: "Waste collection and recycling services to keep our community clean and sustainable.",
    linkLabel:   "Visit Website",
    href:        "https://www.elpasotexas.gov/environmental-services",
    accent:      { bg: "bg-green-50",  text: "text-green-600",  border: "border-green-500"  },
  },
  {
    icon:        "/icons/areas/icon-internet.webp",
    title:       "Internet Service",
    provider:    "Multiple Providers",
    description: "High-speed internet options to keep you connected.",
    linkLabel:   "",
    href:        "",
    accent:      { bg: "bg-blue-50",   text: "text-blue-600",   border: "border-blue-500"   },
  },
] as const;

// Items interleaved left-col / right-col to match the 2-column grid order
const FAQS = [
  {
    icon: "/icons/areas/icon-home.webp",
    q: "Is Horizon City a good place to live?",
    a: "Yes. Horizon City is one of the fastest-growing communities in the El Paso area. Residents enjoy newer neighborhoods, affordable housing options, excellent parks, and convenient access to East El Paso, Fort Bliss, and major roadways.",
  },
  {
    icon: "/icons/areas/icon-water.webp",
    q: "Does Horizon City have irrigation rights?",
    a: "Most residential properties in Horizon City do not include irrigation rights. Water service is typically provided through local utility districts and municipal providers.",
  },
  {
    icon: "/icons/areas/icon-dollar.webp",
    q: "Is Horizon City affordable?",
    a: "Yes. Horizon City is known for offering some of the best value in the El Paso region. Buyers can often find newer homes, larger lots, and modern communities at prices that remain competitive compared to many other Texas markets.",
  },
  {
    icon: "/icons/areas/icon-horse.webp",
    q: "Are there parks and outdoor activities?",
    a: "Yes. Horizon City features several parks, playgrounds, sports fields, walking trails, and recreational areas. Residents also enjoy nearby golf courses, community events, and outdoor activities throughout the year.",
  },
  {
    icon: "/icons/areas/icon-car.webp",
    q: "What is the commute like from Horizon City?",
    a: "Horizon City offers convenient access to East El Paso, Loop 375, I-10, and Fort Bliss. Many residents commute to Eastlake, East El Paso, and major employment centers within 15–30 minutes depending on traffic.",
  },
  {
    icon: "/icons/areas/icon-shield.webp",
    q: "Is Horizon City safe?",
    a: "Horizon City is widely considered a family-friendly community with many master-planned neighborhoods, parks, and active community involvement. As with any area, safety can vary by neighborhood and should be evaluated individually.",
  },
  {
    icon: "/icons/areas/icon-graduation.webp",
    q: "Which school district serves Horizon City?",
    a: "Horizon City is served by both Socorro Independent School District (SISD) and Clint Independent School District (CISD), depending on the neighborhood and specific address. Schools serving the area include Horizon High School, Eastlake High School, Ricardo Estrada Middle School, and several elementary schools.",
  },
  {
    icon: "/icons/areas/icon-chart.webp",
    q: "What's the average home price?",
    a: "Home prices in Horizon City vary by neighborhood, age, size, and builder. Buyers can find everything from starter homes to larger custom residences, making the area attractive to a wide range of budgets.",
  },
  {
    icon: "/icons/areas/icon-location.webp",
    q: "How far is Horizon City from Fort Bliss?",
    a: "Fort Bliss is approximately 15–25 miles from Horizon City depending on the gate used. Typical drive times range from 20–35 minutes depending on traffic conditions.",
  },
  {
    icon: "/icons/areas/icon-home-alt.webp",
    q: "Are there new construction homes?",
    a: "Yes. Horizon City remains one of the most active areas for new home construction in the El Paso region, with multiple builders offering modern floor plans, growing communities, and newly developed neighborhoods.",
  },
];

// ── SVG chart canvas dimensions (fixed, axis labels excluded) ─────────────────
const CX0 = 48, CY0 = 12, CX1 = 348, CY1 = 162;

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function HorizonCityPage() {
  const turnstileSiteKey = getTurnstileSiteKey();

  // ── Live data — market stats only (listings load inside <HorizonListings />)
  const { p, i, d, r } = await fetchHorizonCityStats();

  const fmtUSD = (v: unknown, fallback: string) =>
    v != null
      ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(v))
      : fallback;

  // Current period label from API date ("May 2026" etc.)
  const period = p?.Dates?.[0]
    ? (() => {
        const [m, , y] = (p.Dates[0] as string).split("/");
        return new Date(Number(y), Number(m) - 1).toLocaleDateString("en-US", { month: "short", year: "numeric" });
      })()
    : "May 2026";

  // Live stat values (fallback to last known if API is down)
  const medianPrice       = fmtUSD(p?.ActiveMedianListPrice?.[0], "$650,000");
  const activeInventory   = String(i?.ActiveListings?.[0]  ?? 24);
  const newListings       = String(i?.NewListings?.[0]      ?? 11);
  const avgDom            = d?.AverageDom?.[0] ? String(Math.round(Number(d.AverageDom[0]))) : "99";
  const listPriceReceived = r?.SaleToOriginalListPriceRatio?.[0]
    ? `${Number(r.SaleToOriginalListPriceRatio[0]).toFixed(1)}%`
    : "97.2%";

  // Month-over-month change helper
  const moPct = (curr: unknown, prev: unknown) => {
    const c = Number(curr), p2 = Number(prev);
    if (!curr || !prev || !p2) return null;
    const pct = ((c - p2) / p2) * 100;
    return { pct: `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`, up: pct >= 0 };
  };
  const domChange   = moPct(d?.AverageDom?.[0],                      d?.AverageDom?.[1]);
  const ratioChange = moPct(r?.SaleToOriginalListPriceRatio?.[0],    r?.SaleToOriginalListPriceRatio?.[1]);
  const invChange   = moPct(i?.ActiveListings?.[0],                  i?.ActiveListings?.[1]);
  const newChange   = moPct(i?.NewListings?.[0],                     i?.NewListings?.[1]);

  // Top 2 summary cards
  const STATS_TOP = [
    { label: "Median Price",  value: medianPrice,  sub: null             },
    { label: "Commute Time",  value: "3.3",        sub: "mi / approx."   },
  ];

  // Price detail card
  const PRICE_CARD = { current: medianPrice, projection: "$728K", period };

  // Bottom 4 stat cards
  const STAT_CARDS = [
    { icon: Clock,        label: "Median Days\non Market", value: avgDom,            change: domChange?.pct,   up: domChange?.up   },
    { icon: BadgePercent, label: "List Price\nReceived",   value: listPriceReceived, change: ratioChange?.pct, up: ratioChange?.up },
    { icon: Home,         label: "New Listings",           value: newListings,        change: newChange?.pct,   up: newChange?.up   },
    { icon: ArrowUpDown,  label: "Active\nInventory",      value: activeInventory,   change: invChange?.pct,   up: invChange?.up   },
  ];

  // ── Chart — 12 months of real price data (API returns newest-first) ───────
  const rawDates   = (p?.Dates               as string[] | undefined) ?? [];
  const rawPrices  = (p?.ActiveMedianListPrice as string[] | undefined) ?? [];
  const chartDates  = [...rawDates].slice(0, 12).reverse();
  const chartPricesK = [...rawPrices].slice(0, 12).reverse().map(v => Number(v) / 1000);

  const allK   = chartPricesK.length ? chartPricesK : [550, 700];
  const Y_MIN  = Math.floor(Math.min(...allK) / 50) * 50;
  const Y_MAX  = Math.ceil(Math.max(...allK)  / 50) * 50 + 50;
  const total  = chartPricesK.length || 7;

  const toSvgX = (idx: number) => CX0 + (idx / Math.max(total - 1, 1)) * (CX1 - CX0);
  const toSvgY = (priceK: number) => CY1 - ((priceK - Y_MIN) / (Y_MAX - Y_MIN)) * (CY1 - CY0);

  const pts      = chartPricesK.map((pk, idx) => [toSvgX(idx), toSvgY(pk)] as [number, number]);
  const linePath = pts.map(([x, y], idx) => `${idx === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const areaPath = pts.length ? `${linePath} L${pts[pts.length - 1][0]},${CY1} L${pts[0][0]},${CY1} Z` : "";

  const Y_STEPS  = Math.round((Y_MAX - Y_MIN) / 50);
  const Y_LABELS = Array.from({ length: Y_STEPS + 1 }, (_, k) => Y_MIN + k * 50).reverse();

  const MONTHS   = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const xLabels  = chartDates.map(dt => {
    const [m, , y] = dt.split("/");
    return `${MONTHS[Number(m) - 1]}'${y.slice(2)}`;
  });

  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />
      <main className="min-h-screen bg-[var(--sandstone-off-white)]">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative flex min-h-[600px] items-end overflow-hidden lg:min-h-[720px]">
          <Image
            src="/areas/horizon-city/hero.jpg.jpg"
            alt="Luxury estate in Horizon City, TX"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* layered gradient: strong at bottom, fades to subtle dark tint at top */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--sandstone-navy)] via-[var(--sandstone-navy)]/50 to-[var(--sandstone-navy)]/10" />

          {/* left-side vignette so text always reads cleanly */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent" />

          {/* Content */}
          <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-16 pt-36 lg:px-6 lg:pb-20">

            {/* Location breadcrumb */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[var(--sandstone-sand-gold)]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--sandstone-sand-gold)]">
                Horizon City · El Paso, TX
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-2xl font-heading text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-6xl">
              Homes for Sale in<br />
              Horizon City, TX
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/65">
              Newer homes, growing neighborhoods, and strong East El Paso value — one of the area&apos;s fastest-growing communities.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#listings"
                className="rounded-full bg-[var(--sandstone-sand-gold)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_12px_32px_-12px_rgba(183,150,120,0.9)] transition hover:opacity-90"
              >
                Browse Listings
              </Link>
              <Link
                href="#contact"
                className="rounded-full border border-white/30 bg-white/8 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                Talk to an Agent
              </Link>
            </div>

          </div>
        </section>

        {/* ── Market Snapshot section ──────────────────────────────────────── */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-4 lg:px-6">

            {/* Header */}
            <div className="mb-10 text-center">
              <h2 className="font-heading text-3xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
                Horizon City Market Snapshot 2026
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--sandstone-charcoal)]/60">
                Horizon City is one of the fastest-growing areas in the El Paso region, known for newer homes, family-friendly neighborhoods, parks, schools, and convenient access to Eastlake, I-10, Loop 375, shopping, and Fort Bliss.
              </p>
            </div>

            {/* Top 2 stat cards */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {STATS_TOP.map(({ label, value, sub }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[var(--sandstone-navy)]/12 bg-white px-6 py-7 shadow-sm"
                >
                  <p className="text-sm font-bold text-[var(--sandstone-navy)]">{label}</p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-heading text-4xl font-bold text-[var(--sandstone-sand-gold)]">
                      {value}
                    </span>
                    {sub && (
                      <span className="text-sm font-medium text-[var(--sandstone-charcoal)]/55">{sub}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Middle row: price detail card + line chart */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">

              {/* Left — price detail */}
              <div className="rounded-2xl border border-[var(--sandstone-navy)]/12 bg-white px-6 py-7 shadow-sm">
                <p className="text-sm font-bold text-[var(--sandstone-navy)]">Median Price</p>

                <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--sandstone-charcoal)]/45">
                      Current ({PRICE_CARD.period})
                    </p>
                    <p className="mt-1 font-heading text-3xl font-bold text-[var(--sandstone-navy)]">
                      {PRICE_CARD.current}
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-1 text-[var(--sandstone-charcoal)]/35">
                    <div className="h-px w-8 bg-[var(--sandstone-charcoal)]/25" />
                    <span className="text-lg">→</span>
                    <div className="h-px w-8 bg-[var(--sandstone-charcoal)]/25" />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--sandstone-charcoal)]/45">
                      Market Projection (2026)
                    </p>
                    <p className="mt-1 font-heading text-3xl font-bold text-[var(--sandstone-navy)]">
                      {PRICE_CARD.projection}
                    </p>
                    <p className="mt-1 text-[9px] italic text-[var(--sandstone-charcoal)]/35">Editorial estimate</p>
                  </div>
                </div>

                <p className="mt-5 text-xs italic text-[var(--sandstone-charcoal)]/40">
                  vs market projection / 2026 trend
                </p>
              </div>

              {/* Right — line chart */}
              <div className="rounded-2xl border border-[var(--sandstone-navy)]/12 bg-white px-6 py-7 shadow-sm">
                <p className="mb-4 text-sm font-bold text-[var(--sandstone-navy)]">
                  Horizon City Median List Price — 12 Months
                </p>

                <svg
                  viewBox={`0 0 ${CX1 + 16} ${CY1 + 24}`}
                  className="w-full"
                  aria-label="Horizon City home price trend — last 12 months"
                >
                  <defs>
                    <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#b79678" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#b79678" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  <path d={areaPath} fill="url(#chartFill)" />

                  {/* Y grid lines */}
                  {Y_LABELS.map((price) => {
                    const y = toSvgY(price);
                    return (
                      <g key={price}>
                        <line x1={CX0} y1={y} x2={CX1} y2={y} stroke="#e5e7eb" strokeWidth="1" />
                        <text x={CX0 - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#9ca3af">
                          ${price}K
                        </text>
                      </g>
                    );
                  })}

                  {/* X-axis labels — every other month to avoid crowding */}
                  {xLabels.map((label, idx) =>
                    idx % 2 === 0 || idx === xLabels.length - 1 ? (
                      <text key={idx} x={toSvgX(idx)} y={CY1 + 14} textAnchor="middle" fontSize="9" fill="#9ca3af">
                        {label}
                      </text>
                    ) : null
                  )}

                  {/* Line */}
                  <path d={linePath} fill="none" stroke="#b79678" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Dots */}
                  {pts.map(([x, y], idx) => (
                    <circle key={idx} cx={x} cy={y} r="4" fill="#b79678" />
                  ))}
                </svg>
              </div>
            </div>

            {/* Bottom 4 stat cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STAT_CARDS.map(({ icon: Icon, label, value, change, up }) => (
                <div
                  key={label}
                  className="flex flex-col items-center rounded-2xl border border-[var(--sandstone-navy)]/12 bg-white px-3 py-5 text-center shadow-sm"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--sandstone-navy)]/12 bg-[var(--sandstone-off-white)]">
                    <Icon size={18} className="text-[var(--sandstone-navy)]" strokeWidth={1.75} />
                  </div>
                  <p className="whitespace-pre-line text-[10px] font-semibold leading-snug text-[var(--sandstone-charcoal)]/60">
                    {label}
                  </p>
                  <p className="mt-2 font-heading text-2xl font-bold text-[var(--sandstone-sand-gold)]">
                    {value}
                  </p>
                  {change ? (
                    <span
                      className={`mt-1.5 inline-flex items-center gap-0.5 text-[10px] font-bold ${
                        up ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {change} {up ? "↑" : "↓"}
                    </span>
                  ) : (
                    <span className="mt-1.5 text-[10px] text-[var(--sandstone-charcoal)]/30">—</span>
                  )}
                </div>
              ))}
            </div>

            {/* Source footnote */}
            <p className="mt-6 text-center text-[11px] text-[var(--sandstone-charcoal)]/35">
              Live data: GEPAR MLS via Spark API · ZIP 79928 · Refreshes hourly
            </p>

          </div>
        </section>

        {/* ── Browse Listings section ──────────────────────────────────────── */}
        <section id="listings" className="bg-white py-16 scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 lg:px-6">

            <h2 className="text-center font-heading text-3xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
              Browse Horizon City Listings
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-[var(--sandstone-charcoal)]/60">
              Active homes for sale in Horizon City · ZIP 79928 · El Paso, TX
            </p>

            <HorizonListings />

          </div>
        </section>

        {/* ── Schools Near Horizon City ────────────────────────────────────── */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-4 lg:px-6">

            {/* Header */}
            <div className="mb-10 text-center">
              <h2 className="font-heading text-3xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
                Schools Near Horizon City
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--sandstone-charcoal)]/60">
                Horizon City is served by schools in the Socorro Independent School District and Clint Independent School District depending on the specific address.
              </p>
            </div>

            {/* 2-column layout — items-stretch so photos fill right-column height */}
            <div className="flex flex-col gap-8 lg:flex-row">

              {/* Left: school photos — flex column on desktop so children fill full height */}
              <div className="w-full lg:sticky lg:top-[116px] lg:self-start lg:flex lg:w-[58%] lg:flex-col">
                {/* Large —  High school  (3 parts of the column height) */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src="/areas/horizon-city/Horizon-City-High.jpg"
                    alt="Horizon High School"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <p className="absolute bottom-4 left-4 font-heading text-xl font-bold text-white drop-shadow">
                    Horizon High School
                  </p>
                </div>

                {/* Two smaller photos (2 parts of the column height) */}
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="relative aspect-square overflow-hidden rounded-2xl">
                    <Image
                      src="/areas/horizon-city/horizon-City-middle.jpg"
                      alt="Horizon Middle School"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 27vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <p className="absolute bottom-3 left-3 font-heading text-[15px] font-bold leading-snug text-white drop-shadow">
                      Horizon Middle<br />School
                    </p>
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-2xl">
                    <Image
                      src="/areas/horizon-city/horizon-elemantary.jpg"
                      alt="Horizon Elementary School"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 27vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <p className="absolute bottom-3 left-3 font-heading text-[15px] font-bold leading-snug text-white drop-shadow">
                      Horizon Elementary<br />School
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: school tables */}
              <div className="flex-1 space-y-7">
                {(["elementary", "middle", "high"] as const).map((level) => {
                  const titles = {
                    elementary: "Elementary Schools",
                    middle:     "Middle Schools",
                    high:       "High Schools",
                  };
                  return (
                    <div key={level}>
                      <h3 className="mb-2 font-heading text-[15px] font-bold text-[var(--sandstone-navy)]">
                        {titles[level]}
                      </h3>
                      <div className="overflow-x-auto"><table className="w-full min-w-[480px]">
                        <thead>
                          <tr className="border-b border-[var(--sandstone-navy)]/10">
                            <th className="pb-2 text-left text-[11px] font-semibold uppercase tracking-wide text-[var(--sandstone-charcoal)]/40">School</th>
                            <th className="pb-2 text-left text-[11px] font-semibold uppercase tracking-wide text-[var(--sandstone-charcoal)]/40">District</th>
                            <th className="pb-2 text-right text-[11px] font-semibold uppercase tracking-wide text-[var(--sandstone-charcoal)]/40">Primary ZIP Codes Served*</th>
                          </tr>
                        </thead>
                        <tbody>
                          {SCHOOLS[level].map((school, i) => (
                            <tr key={i} className="border-b border-[var(--sandstone-navy)]/8 last:border-0">
                              <td className="py-2 pr-4 text-[13px] font-medium text-[var(--sandstone-charcoal)]">{school.name}</td>
                              <td className="py-2 pr-4 text-[13px] text-[var(--sandstone-charcoal)]/60">{school.district}</td>
                              <td className="py-2 text-right text-[13px] text-[var(--sandstone-charcoal)]/60">{school.zip}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table></div>
                    </div>
                  );
                })}

                {/* Footer note */}
                <p className="text-[12px] italic leading-relaxed text-[var(--sandstone-charcoal)]/50">
                  Families moving to Horizon City often cite newer neighborhoods, nearby schools, parks, and Eastside convenience as major reasons for choosing the area.{" "}
                  School zoning may change. Buyers should verify attendance boundaries directly with the school district.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── Convenience at Your Doorstep ─────────────────────────────────── */}
        <section className="bg-[var(--sandstone-off-white)] py-16">
          <div className="mx-auto max-w-5xl px-4 lg:px-6">

            {/* Header */}
            <div className="mb-10 text-center">
              <h2 className="font-heading text-3xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
                Convenience at Your Doorstep
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--sandstone-charcoal)]/60">
                Horizon City offers easy access to healthcare, grocery stores, restaurants, and growing Eastside shopping destinations.
              </p>
            </div>

            {/* 3-column cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              {/* Hospitals */}
              <div className="flex flex-col rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--sandstone-off-white)]">
                    <Image src="/icons/areas/icon-hospital.webp" alt="" width={26} height={26} />
                  </div>
                  <div>
                    <h3 className="font-heading text-[15px] font-bold text-[var(--sandstone-navy)]">Hospitals</h3>
                    <p className="mt-0.5 text-[12px] leading-snug text-[var(--sandstone-charcoal)]/55">Top-rated medical care just minutes away.</p>
                  </div>
                </div>
                <div className="my-4 border-t border-[var(--sandstone-navy)]/8" />
                <div className="flex-1 space-y-3">
                  {NEARBY.hospitals.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg">
                        <Image src={item.img} alt={item.name} fill sizes="44px" className="object-cover" />
                      </div>
                      <p className="flex-1 text-[12px] font-medium leading-snug text-[var(--sandstone-charcoal)]">{item.name}</p>
                      <div className="shrink-0 text-right">
                        <p className="text-[12px] font-bold text-[var(--sandstone-navy)]">{item.time}</p>
                        <p className="text-[11px] text-[var(--sandstone-charcoal)]/45">drive</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5">
                  <Link href="#" className="text-[12px] font-semibold text-[var(--sandstone-sand-gold)] hover:underline">
                    View all healthcare options →
                  </Link>
                </div>
              </div>

              {/* Grocery Stores */}
              <div className="flex flex-col rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--sandstone-off-white)]">
                    <Image src="/icons/areas/icon-grocery.webp" alt="" width={26} height={26} />
                  </div>
                  <div>
                    <h3 className="font-heading text-[15px] font-bold text-[var(--sandstone-navy)]">Grocery Stores</h3>
                    <p className="mt-0.5 text-[12px] leading-snug text-[var(--sandstone-charcoal)]/55">Everything you need, from daily essentials to specialty items.</p>
                  </div>
                </div>
                <div className="my-4 border-t border-[var(--sandstone-navy)]/8" />
                <div className="flex-1 space-y-3">
                  {NEARBY.groceries.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[var(--sandstone-navy)]/8">
                        <Image src={item.img} alt={item.name} fill sizes="40px" className="object-cover" />
                      </div>
                      <p className="flex-1 text-[12px] font-medium leading-snug text-[var(--sandstone-charcoal)]">{item.name}</p>
                      <div className="shrink-0 text-right">
                        <p className="text-[12px] font-bold text-[var(--sandstone-navy)]">{item.time}</p>
                        <p className="text-[11px] text-[var(--sandstone-charcoal)]/45">drive</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5">
                  <Link href="#" className="text-[12px] font-semibold text-[var(--sandstone-sand-gold)] hover:underline">
                    View more grocery options →
                  </Link>
                </div>
              </div>

              {/* Shopping */}
              <div className="flex flex-col rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--sandstone-off-white)]">
                    <Image src="/icons/areas/icon-shopping-bag.webp" alt="" width={26} height={26} />
                  </div>
                  <div>
                    <h3 className="font-heading text-[15px] font-bold text-[var(--sandstone-navy)]">Shopping</h3>
                    <p className="mt-0.5 text-[12px] leading-snug text-[var(--sandstone-charcoal)]/55">Retail, boutiques, and entertainment all within easy reach.</p>
                  </div>
                </div>
                <div className="my-4 border-t border-[var(--sandstone-navy)]/8" />
                <div className="flex-1 space-y-3">
                  {NEARBY.shopping.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg">
                        <Image src={item.img} alt={item.name} fill sizes="44px" className="object-cover" />
                      </div>
                      <p className="flex-1 text-[12px] font-medium leading-snug text-[var(--sandstone-charcoal)]">{item.name}</p>
                      <div className="shrink-0 text-right">
                        <p className="text-[12px] font-bold text-[var(--sandstone-navy)]">{item.time}</p>
                        <p className="text-[11px] text-[var(--sandstone-charcoal)]/45">drive</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5">
                  <Link href="#" className="text-[12px] font-semibold text-[var(--sandstone-sand-gold)] hover:underline">
                    View more shopping options →
                  </Link>
                </div>
              </div>

            </div>

            {/* Commute Times bar */}
            <div className="mt-4 flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm lg:flex-row lg:items-center">

              {/* Label */}
              <div className="flex shrink-0 items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--sandstone-off-white)]">
                  <Image src="/icons/areas/icon-car.webp" alt="" width={26} height={26} />
                </div>
                <div>
                  <p className="font-heading text-[15px] font-bold text-[var(--sandstone-navy)]">Commute Times</p>
                  <p className="text-[11px] text-[var(--sandstone-charcoal)]/50">Quick access to everything that matters.</p>
                </div>
              </div>

              <div className="hidden w-px self-stretch bg-[var(--sandstone-navy)]/10 lg:block" />

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                {COMMUTE_TIMES.map((c) => (
                  <div key={c.label} className="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-1.5 sm:text-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--sandstone-off-white)]">
                      <Image src={c.icon} alt="" width={22} height={22} />
                    </div>
                    <div>
                      <p className="font-heading text-xl font-bold text-[var(--sandstone-navy)]">{c.time}</p>
                      <p className="whitespace-pre-line text-[11px] leading-snug text-[var(--sandstone-charcoal)]/55">{c.label}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </section>

        {/* ── Why Buyers Choose Horizon City ───────────────────────────────── */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-4 lg:px-6">

            {/* Full-width centered heading */}
            <h2 className="mb-10 text-center font-heading text-3xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
              Why Buyers Choose Horizon City
            </h2>

            {/* Two-column body */}
            <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">

              {/* Left: editorial text */}
              <div className="flex-1 space-y-7">
                <div>
                  <p className="text-[14px] leading-relaxed text-[var(--sandstone-charcoal)]/65">
                    Horizon City has become one of the most popular choices for buyers who want newer homes, more space, and strong value on the east side of the El Paso region. Many neighborhoods offer modern floor plans, parks, nearby schools, and quick access to Eastlake, I-10, and Loop 375.
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--sandstone-charcoal)]/65">
                    Buyers choose Horizon City for its balance of affordability, convenience, and growth. It is a strong option for first-time buyers, move-up buyers, military families, and anyone looking for a newer community with room to grow.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)]">
                    Horizon City Home Prices in 2026
                  </h2>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--sandstone-charcoal)]/65">
                    Homes in Horizon City offer a wide range of options, from starter homes to larger newer construction properties. The market is especially attractive for buyers comparing East El Paso, Socorro, Clint, and Far East communities.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)]">
                    Is Horizon City Right for You?
                  </h2>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--sandstone-charcoal)]/65">
                    Horizon City is an excellent fit if you&apos;re looking for value, newer homes, and Eastside convenience. It&apos;s particularly popular with:
                  </p>
                  <ul className="mt-3 space-y-2">
                    {[
                      "First-time buyers looking for newer homes",
                      "Military families commuting to Fort Bliss",
                      "Move-up buyers wanting more space on the Eastside",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-[var(--sandstone-charcoal)]/65">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sandstone-sand-gold)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--sandstone-charcoal)]/65">
                    If newer homes and Eastside convenience are priorities, Horizon City is one of the strongest value areas in the El Paso market.
                  </p>
                </div>
              </div>

              {/* Right: stacked lifestyle photos */}
              <div className="flex flex-col gap-4 lg:w-[38%] lg:self-start lg:sticky lg:top-[116px]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src="/areas/horizon-city/horizon-golf.jpg"
                    alt="Horizon City Golf Course"
                    fill
                    sizes="(max-width: 1024px) 100vw, 38vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src="/areas/horizon-city/horizon-Cfa.jpg"
                    alt="Horizon City shopping center"
                    fill
                    sizes="(max-width: 1024px) 100vw, 38vw"
                    className="object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Utilities & Local Services ────────────────────────────────────── */}
        <section className="bg-[var(--sandstone-off-white)] py-16">
          <div className="mx-auto max-w-5xl px-4 lg:px-6">

            {/* Header */}
            <div className="mb-10 text-center">
              <h2 className="font-heading text-3xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
                Utilities &amp; Local Services
              </h2>
              <p className="mt-3 text-sm text-[var(--sandstone-charcoal)]/60">
                Utility providers may vary depending on the specific address and subdivision.
              </p>
            </div>

            {/* 5-card grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {UTILITIES.map(({ icon, title, provider, description, linkLabel, href, accent }) => (
                <div key={title} className="flex flex-col items-center rounded-2xl bg-white p-5 text-center shadow-sm">

                  {/* Icon circle */}
                  <div className={`mb-4 flex h-24 w-24 items-center justify-center rounded-full ${accent.bg}`}>
                    <Image src={icon} alt="" width={44} height={44} />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-[15px] font-bold text-[var(--sandstone-navy)]">
                    {title}
                  </h3>

                  {/* Provider */}
                  <p className={`mt-1 text-[13px] font-semibold ${accent.text}`}>
                    {provider}
                  </p>

                  {/* Description */}
                  <p className="mt-3 flex-1 text-[12px] leading-relaxed text-[var(--sandstone-charcoal)]/55">
                    {description}
                  </p>

                  {/* CTA button */}
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-5 flex w-full items-center justify-center gap-1.5 rounded-lg border ${accent.border} px-3 py-2.5 text-[12px] font-semibold ${accent.text} transition hover:opacity-70`}
                    >
                      {linkLabel}
                      <ExternalLink size={12} strokeWidth={2.5} />
                    </a>
                  )}

                </div>
              ))}
            </div>

            {/* Footnote */}
            <p className="mt-6 flex items-center justify-center gap-1.5 text-[12px] text-[var(--sandstone-charcoal)]/40">
              <Info size={14} strokeWidth={1.75} />
              Providers and service availability may vary depending on the specific address and subdivision.
            </p>

          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
        <section className="bg-[var(--sandstone-off-white)] py-16">
          <div className="mx-auto max-w-5xl px-4 lg:px-6">

            {/* Header */}
            <div className="mb-10 text-center">
              <h2 className="font-heading text-3xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-sm text-[var(--sandstone-charcoal)]/60">
                Find answers to the most common questions about living in Horizon City.
              </p>
              <p className="mt-1 text-sm text-[var(--sandstone-charcoal)]/60">
                Can&apos;t find what you&apos;re looking for?{" "}
                <Link href="/#contact" className="font-semibold text-[var(--sandstone-sand-gold)] hover:underline">
                  We&apos;re here to help!
                </Link>
              </p>
            </div>

            {/* 2-column accordion grid */}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 items-start">
              {FAQS.map(({ icon, q, a }) => (
                <details key={q} className="group rounded-2xl bg-white shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-3">
                    {/* Icon circle */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--sandstone-navy)]/8">
                      <Image src={icon} alt="" width={22} height={22} />
                    </div>
                    {/* Question */}
                    <span className="flex-1 text-[14px] font-semibold text-[var(--sandstone-navy)]">{q}</span>
                    {/* Chevron */}
                    <ChevronDown
                      size={18}
                      strokeWidth={2}
                      className="shrink-0 text-[var(--sandstone-navy)]/50 transition-transform duration-200 group-open:rotate-180"
                    />
                  </summary>
                  {/* Answer */}
                  <div className="border-t border-[var(--sandstone-navy)]/8 px-5 py-4">
                    <p className="text-sm leading-7 text-[var(--sandstone-charcoal)]/70">{a}</p>
                  </div>
                </details>
              ))}
            </div>

          </div>
        </section>


        {/* ── Explore More El Paso Areas ───────────────────────── */}
<section className="bg-white py-16">
  <div className="mx-auto max-w-5xl px-4 lg:px-6">

    <h2 className="text-center font-heading text-3xl font-bold text-[var(--sandstone-navy)]">
      Explore Nearby Areas
    </h2>

    <p className="mx-auto mt-3 max-w-2xl text-center text-[15px] text-[var(--sandstone-charcoal)]/70">
      Looking beyond Horizon City? Compare nearby neighborhoods,
      browse homes for sale, and learn more about the communities
      around El Paso.
    </p>

    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

      <Link
        href="/areas/upper-valley"
        className="rounded-2xl border border-[var(--sandstone-navy)]/10 p-5 transition hover:border-[var(--sandstone-sand-gold)]"
      >
        <h3 className="font-heading text-xl font-bold">
          Upper Valley
        </h3>
        <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/70">
          Luxury homes, mature trees, larger lots and peaceful living.
        </p>
      </Link>

      <Link
        href="/areas/west-el-paso"
        className="rounded-2xl border border-[var(--sandstone-navy)]/10 p-5 transition hover:border-[var(--sandstone-sand-gold)]"
      >
        <h3 className="font-heading text-xl font-bold">
          West El Paso
        </h3>
        <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/70">
          Shopping, dining, mountain views and excellent schools.
        </p>
      </Link>

      <Link
        href="/areas/northeast-el-paso"
        className="rounded-2xl border border-[var(--sandstone-navy)]/10 p-5 transition hover:border-[var(--sandstone-sand-gold)]"
      >
        <h3 className="font-heading text-xl font-bold">
          Northeast El Paso
        </h3>
        <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/70">
          Close to Fort Bliss with affordable homes and short commutes.
        </p>
      </Link>

      <Link
        href="/pcs"
        className="rounded-2xl border border-[var(--sandstone-navy)]/10 p-5 transition hover:border-[var(--sandstone-sand-gold)]"
      >
        <h3 className="font-heading text-xl font-bold">
          PCS to Fort Bliss
        </h3>
        <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/70">
          Military relocation resources and VA home buying guides.
        </p>
      </Link>

      <Link
        href="/blog"
        className="rounded-2xl border border-[var(--sandstone-navy)]/10 p-5 transition hover:border-[var(--sandstone-sand-gold)]"
      >
        <h3 className="font-heading text-xl font-bold">
          Read More Articles
        </h3>
        <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/70">
          Local market updates, neighborhood guides and buying tips.
        </p>
      </Link>

      <Link
        href="/listings"
        className="rounded-2xl border border-[var(--sandstone-navy)]/10 p-5 transition hover:border-[var(--sandstone-sand-gold)]"
      >
        <h3 className="font-heading text-xl font-bold">
          Browse All Listings
        </h3>
        <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/70">
          View every available home across the El Paso area.
        </p>
      </Link>

    </div>
  </div>
</section>

        {/* ── Ready to Buy in Horizon City ─────────────────────────────────── */}
        <LeadCaptureSection
          formType="contact"
          sectionId="contact"
          heading="Ready to Buy in Horizon City?"
          subheading="The Sandstone team knows Horizon City. We help buyers compare neighborhoods, schools, commute times, builder options, and resale homes so they can move with confidence."
          ctaLabel="Schedule a Visit"
          messagePlaceholder="Tell us about your Horizon City search..."
          mappingReference="horizon-city"
          asideEyebrow="Ready. Lifestyle. Real."
          asideTitle="Ready to Make Your Next Move?"
          asideDescription="Schedule a consultation and get a personalized strategy for your Horizon City property search."
          asideCtaLabel="Schedule a Consultation"
          turnstileSiteKey={turnstileSiteKey}
        />

      </main>
      <SiteFooter />
    </>
  );
}
