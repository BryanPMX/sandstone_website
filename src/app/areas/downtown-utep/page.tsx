import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LeadCaptureSection } from "@/components/LeadCaptureSection";
import ExploreNearbyAreas from "@/components/ExploreNearbyAreas";
import { DowntownUtepListings } from "@/components/areas/DowntownUtepListings";
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
  title: "Downtown / UTEP Area Homes for Sale | Sandstone Real Estate Group",
  description:
    "Explore Downtown El Paso and UTEP area homes for sale, schools, commute times, utilities, and local amenities in the 79901 and 79902 ZIP codes.",
};

export const dynamic = "force-dynamic";

// ── Spark API — market statistics for Downtown / UTEP (ZIP 79902) ──────────
const SPARK_BASE = "https://replication.sparkapi.com";
const SPARK_TOKEN = process.env.SPARK_ACCESS_TOKEN ?? "";
const SPARK_HEADERS = {
  Accept: "application/json",
  Authorization: `Bearer ${SPARK_TOKEN}`,
  "User-Agent": "sandstone-website/1.0",
};

async function fetchDowntownStats() {
  if (!SPARK_TOKEN) {
    return { p: null, i: null, d: null, r: null };
  }

  const qs = "LocationField=PostalCode&LocationValue=79902";
  const opts = {
    headers: SPARK_HEADERS,
    next: { revalidate: 3600 },
  };

  const safeJson = async (res: Response) => {
    if (!res.ok) return null;
    return res.json();
  };

  try {
    const [priceRes, invRes, domRes, ratioRes] = await Promise.all([
      fetch(`${SPARK_BASE}/v1/marketstatistics/price?${qs}`, opts),
      fetch(`${SPARK_BASE}/v1/marketstatistics/inventory?${qs}`, opts),
      fetch(`${SPARK_BASE}/v1/marketstatistics/dom?${qs}`, opts),
      fetch(`${SPARK_BASE}/v1/marketstatistics/ratio?${qs}`, opts),
    ]);

    const [price, inv, dom, ratio] = await Promise.all([
      safeJson(priceRes),
      safeJson(invRes),
      safeJson(domRes),
      safeJson(ratioRes),
    ]);

    return {
      p: price?.D?.Results?.[0] ?? null,
      i: inv?.D?.Results?.[0] ?? null,
      d: dom?.D?.Results?.[0] ?? null,
      r: ratio?.D?.Results?.[0] ?? null,
    };
  } catch (error) {
    console.error("Spark API fetch error:", error);
    return { p: null, i: null, d: null, r: null };
  }
}

const SCHOOLS = {
  elementary: [
    { name: "Aoy Elementary School", district: "El Paso ISD", zip: "79901" },
    { name: "Hart Elementary School", district: "El Paso ISD", zip: "79901" },
    { name: "Mesita Elementary School", district: "El Paso ISD", zip: "79902" },
  ],
  middle: [
    { name: "Guillen Middle School", district: "El Paso ISD", zip: "79901" },
    { name: "El Paso Leadership Academy", district: "Charter", zip: "79901" },
  ],
  high: [
    { name: "El Paso High School", district: "El Paso ISD", zip: "79902" },
    { name: "Bowie High School", district: "El Paso ISD", zip: "79905" },
  ],
} as const;

const NEARBY = {
  hospitals: [
    { name: "Las Palmas Medical Center", time: "5 min", img: "/areas/downtown-utep/Las-Palmas-Medical-Center-_2.png" },
    { name: "The Hospitals of Providence", time: "5 min", img: "/areas/downtown-utep/Providence-Memorial-Hospital_2-.png" },
    { name: "University Medical Center (UMC)", time: "10 min", img: "/areas/downtown-utep/University-Medical-Center_2-.png" },
  ],
  groceries: [
    { name: "Food City", time: "5 min", img: "/icons/areas/icon-grocery.webp" },
    { name: "El Super", time: "8 min", img: "/icons/areas/icon-grocery.webp" },
    { name: "Albertsons", time: "10 min", img: "/icons/areas/icon-grocery.webp" },
  ],
  shopping: [
    { name: "La Nube & Arts District", time: "2 min", img: "/areas/downtown-utep/la-nube-downtown_2.png" },
    { name: "Sunland Park Mall", time: "10 min", img: "/areas/downtown-utep/sunland_2.png" },
    { name: "Cielo Vista Mall", time: "12 min", img: "/areas/west-el-paso/nearby/cielo-vista.jpg" },
  ],
};

const COMMUTE_TIMES = [
  { icon: "/icons/areas/icon-graduation.webp", time: "5 min", label: "UTEP" },
  { icon: "/icons/areas/icon-star.webp", time: "10 - 15 min", label: "Fort Bliss\nMain Gate" },
  { icon: "/icons/areas/icon-office.webp", time: "10 min", label: "Medical\nCenter" },
  { icon: "/icons/areas/icon-airport.webp", time: "15 min", label: "El Paso\nAirport" },
  { icon: "/icons/areas/icon-shopping-bag.webp", time: "10 min", label: "Juarez\nPort of Entry" },
];

const UTILITIES = [
  {
    icon: "/icons/areas/icon-electric.webp",
    title: "Electricity",
    provider: "El Paso Electric",
    description: "Powering homes and businesses across the region.",
    linkLabel: "Visit Website",
    href: "https://www.epelectric.com",
    accent: { bg: "bg-amber-50", text: "text-amber-500", border: "border-amber-400" },
  },
  {
    icon: "/icons/areas/icon-water.webp",
    title: "Water",
    provider: "El Paso Water",
    description: "Providing quality water, wastewater, and stormwater services.",
    linkLabel: "Visit Website",
    href: "https://www.epwater.org",
    accent: { bg: "bg-blue-50", text: "text-blue-500", border: "border-blue-400" },
  },
  {
    icon: "/icons/areas/icon-flame.webp",
    title: "Natural Gas",
    provider: "Texas Gas Service",
    description: "Safe, reliable natural gas service for your home and business.",
    linkLabel: "Visit Website",
    href: "https://www.texasgasservice.com",
    accent: { bg: "bg-violet-50", text: "text-violet-500", border: "border-violet-400" },
  },
  {
    icon: "/icons/areas/icon-trash.webp",
    title: "Trash & Recycling",
    provider: "City of El Paso ESD",
    description: "Waste collection and recycling services to keep our community clean and sustainable.",
    linkLabel: "Visit Website",
    href: "https://www.elpasotexas.gov/environmental-services",
    accent: { bg: "bg-green-50", text: "text-green-600", border: "border-green-500" },
  },
  {
    icon: "/icons/areas/icon-internet.webp",
    title: "Internet Service",
    provider: "Multiple Providers",
    description: "High-speed internet options to keep you connected.",
    linkLabel: "",
    href: "",
    accent: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-500" },
  },
] as const;

const FAQS = [
  { icon: "/icons/areas/icon-home.webp", q: "Is Downtown El Paso a good place to live?", a: "Downtown and the adjacent UTEP/Kern Place areas offer a unique, vibrant lifestyle. It is highly walkable, packed with historic architecture, close to cultural landmarks, and perfect for students, young professionals, and investors." },
  { icon: "/icons/areas/icon-dollar.webp", q: "What is the median home price in the Downtown/UTEP area?", a: "Pricing varies significantly. The 79902 area includes luxury historic homes in Kern Place that can exceed $500K, while closer to UTEP and downtown, you can find condos and smaller homes starting around $150K–$200K." },
  { icon: "/icons/areas/icon-graduation.webp", q: "Which schools serve the Downtown/UTEP area?", a: "The area is primarily served by the El Paso Independent School District (EPISD). Historic El Paso High School, one of the most architecturally significant high schools in Texas, serves the 79902 ZIP code." },
  { icon: "/icons/areas/icon-shield.webp", q: "Is the Downtown area safe?", a: "El Paso consistently ranks as one of the safest large cities in the United States. The downtown and university areas are heavily patrolled and feature active community associations, though standard urban precautions apply." },
  { icon: "/icons/areas/icon-diamond.webp", q: "Are there historic homes in this area?", a: "Yes. Kern Place and Sunset Heights (both in 79902) are two of El Paso&apos;s most famous historic districts, offering stunning architectural styles ranging from Mediterranean Revival to classic bungalows." },
  { icon: "/icons/areas/icon-location.webp", q: "How far is Downtown from Fort Bliss?", a: "Downtown El Paso is very close to Fort Bliss, typically a 10–15 minute drive via US-54 or I-10 depending on which gate you need to access." },
  { icon: "/icons/areas/icon-horse.webp", q: "What makes the Downtown/UTEP area different?", a: "It is the cultural and historical heart of the city. You have the Cincinnati Entertainment District, the Sun Bowl, Southwest University Park (home of the Chihuahuas), museums, theaters, and a true urban feel you won't find in the suburbs." },
  { icon: "/icons/areas/icon-water.webp", q: "What shopping and dining is nearby?", a: "Downtown features numerous local boutiques, cafes, and restaurants. For major retail, Bassett Place and Cielo Vista Mall are a short 10-15 minute drive on I-10." },
];

const CX0 = 48, CY0 = 12, CX1 = 348, CY1 = 162;

export default async function DowntownUtepPage() {
  const turnstileSiteKey = getTurnstileSiteKey();
  const { p, i, d, r } = await fetchDowntownStats();

  const fmtUSD = (v: unknown, fallback: string) =>
    v != null
      ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(v))
      : fallback;

  const period = p?.Dates?.[0]
    ? (() => {
        const [m, , y] = (p.Dates[0] as string).split("/");
        return new Date(Number(y), Number(m) - 1).toLocaleDateString("en-US", { month: "short", year: "numeric" });
      })()
    : "Current";

  const medianPrice = fmtUSD(p?.ActiveMedianListPrice?.[0], "Contact Us");
  const activeInventory = String(i?.ActiveListings?.[0] ?? "N/A");
  const newListings = String(i?.NewListings?.[0] ?? "N/A");
  const avgDom = d?.AverageDom?.[0] ? String(Math.round(Number(d.AverageDom[0]))) : "N/A";
  const listPriceReceived = r?.SaleToOriginalListPriceRatio?.[0]
    ? `${Number(r.SaleToOriginalListPriceRatio[0]).toFixed(1)}%`
    : "N/A";

  const moPct = (curr: unknown, prev: unknown) => {
    const c = Number(curr), p2 = Number(prev);
    if (!curr || !prev || !p2) return null;
    const pct = ((c - p2) / p2) * 100;
    return { pct: `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`, up: pct >= 0 };
  };
  const domChange = moPct(d?.AverageDom?.[0], d?.AverageDom?.[1]);
  const ratioChange = moPct(r?.SaleToOriginalListPriceRatio?.[0], r?.SaleToOriginalListPriceRatio?.[1]);
  const invChange = moPct(i?.ActiveListings?.[0], i?.ActiveListings?.[1]);
  const newChange = moPct(i?.NewListings?.[0], i?.NewListings?.[1]);

  const STATS_TOP = [
    { label: "Median Price", value: medianPrice, sub: null },
    { label: "Fort Bliss Commute", value: "10–15", sub: "min / approx." },
  ];

  const PRICE_CARD = { current: medianPrice, projection: "View Listings", period };

  const STAT_CARDS = [
    { icon: Clock, label: "Median Days\\non Market", value: avgDom, change: domChange?.pct, up: domChange?.up },
    { icon: BadgePercent, label: "List Price\\nReceived", value: listPriceReceived, change: ratioChange?.pct, up: ratioChange?.up },
    { icon: Home, label: "New Listings", value: newListings, change: newChange?.pct, up: newChange?.up },
    { icon: ArrowUpDown, label: "Active\\nInventory", value: activeInventory, change: invChange?.pct, up: invChange?.up },
  ];

  const rawDates = (p?.Dates as string[] | undefined) ?? [];
  const rawPrices = (p?.ActiveMedianListPrice as string[] | undefined) ?? [];
  const chartDates = [...rawDates].slice(0, 12).reverse();
  const chartPricesK = [...rawPrices].slice(0, 12).reverse().map(v => Number(v) / 1000);

  const allK = chartPricesK.length ? chartPricesK : [150, 350];
  const Y_MIN = Math.floor(Math.min(...allK) / 50) * 50;
  const Y_MAX = Math.ceil(Math.max(...allK) / 50) * 50 + 50;
  const total = chartPricesK.length || 7;

  const toSvgX = (idx: number) => CX0 + (idx / Math.max(total - 1, 1)) * (CX1 - CX0);
  const toSvgY = (priceK: number) => CY1 - ((priceK - Y_MIN) / (Y_MAX - Y_MIN)) * (CY1 - CY0);

  const pts = chartPricesK.map((pk, idx) => [toSvgX(idx), toSvgY(pk)] as [number, number]);
  const linePath = pts.map(([x, y], idx) => `${idx === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const areaPath = pts.length ? `${linePath} L${pts[pts.length - 1][0]},${CY1} L${pts[0][0]},${CY1} Z` : "";

  const Y_STEPS = Math.round((Y_MAX - Y_MIN) / 50);
  const Y_LABELS = Array.from({ length: Y_STEPS + 1 }, (_, k) => Y_MIN + k * 50).reverse();

  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const xLabels = chartDates.map(dt => {
    const [m, , y] = dt.split("/");
    return `${MONTHS[Number(m) - 1]}'${y.slice(2)}`;
  });

  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />
      <main className="min-h-screen bg-[var(--sandstone-off-white)]">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative flex min-h-[600px] items-end overflow-hidden lg:min-h-[720px]">
          <div className="absolute inset-0">
            <Image
              src="/areas/downtown-utep/downtown_2.png"
              alt="Downtown El Paso and UTEP area skyline"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--sandstone-navy)] via-[var(--sandstone-navy)]/50 to-[var(--sandstone-navy)]/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/25 to-transparent" />

          <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-16 pt-36 lg:px-6 lg:pb-20">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[var(--sandstone-sand-gold)]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--sandstone-sand-gold)]">
                Downtown / UTEP Area · El Paso, TX
              </span>
            </div>

            <h1 className="max-w-2xl font-heading text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-6xl">
              Homes for Sale in<br />
              Downtown & UTEP Area
            </h1>

            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/65">
              Historic charm, urban walkability, and cultural vibrancy. Explore living in the heart of El Paso, from Kern Place to the downtown core.
            </p>

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

        {/* ── Market Snapshot ──────────────────────────────────────────────── */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-4 lg:px-6">
            <div className="mb-10 text-center">
              <h2 className="font-heading text-3xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
                Downtown / UTEP Area Market Snapshot
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--sandstone-charcoal)]/60">
                Explore homes for sale in ZIP codes 79901 and 79902. Learn about neighborhoods, schools, home prices, commute times, and browse the latest listings in El Paso&apos;s urban core.
              </p>
            </div>

            {/* Top 2 stat cards */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {STATS_TOP.map(({ label, value, sub }) => (
                <div key={label} className="rounded-2xl border border-[var(--sandstone-navy)]/12 bg-white px-6 py-7 shadow-sm">
                  <p className="text-sm font-bold text-[var(--sandstone-navy)]">{label}</p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-heading text-4xl font-bold text-[var(--sandstone-sand-gold)]">{value}</span>
                    {sub && <span className="text-sm font-medium text-[var(--sandstone-charcoal)]/55">{sub}</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Price detail card + chart */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
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
                      Area Insight
                    </p>
                    <p className="mt-1 font-heading text-2xl font-bold text-[var(--sandstone-navy)]">
                      {PRICE_CARD.projection}
                    </p>
                    <p className="mt-1 text-[9px] italic text-[var(--sandstone-charcoal)]/35">Prices vary by neighborhood</p>
                  </div>
                </div>
                <p className="mt-5 text-xs italic text-[var(--sandstone-charcoal)]/40">
                  Includes historic districts and downtown condos
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--sandstone-navy)]/12 bg-white px-6 py-7 shadow-sm">
                <p className="mb-4 text-sm font-bold text-[var(--sandstone-navy)]">
                  Downtown/UTEP Median List Price — 12 Months
                </p>
                <svg viewBox={`0 0 ${CX1 + 16} ${CY1 + 24}`} className="w-full" aria-label="Downtown UTEP home price trend — last 12 months">
                  <defs>
                    <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#b79678" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#b79678" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  <path d={areaPath} fill="url(#chartFill)" />
                  {Y_LABELS.map((price) => {
                    const y = toSvgY(price);
                    return (
                      <g key={price}>
                        <line x1={CX0} y1={y} x2={CX1} y2={y} stroke="#e5e7eb" strokeWidth="1" />
                        <text x={CX0 - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#9ca3af">\${price}K</text>
                      </g>
                    );
                  })}
                  {xLabels.map((label, idx) =>
                    idx % 2 === 0 || idx === xLabels.length - 1 ? (
                      <text key={idx} x={toSvgX(idx)} y={CY1 + 14} textAnchor="middle" fontSize="9" fill="#9ca3af">{label}</text>
                    ) : null
                  )}
                  <path d={linePath} fill="none" stroke="#b79678" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  {pts.map(([x, y], idx) => (
                    <circle key={idx} cx={x} cy={y} r="4" fill="#b79678" />
                  ))}
                </svg>
              </div>
            </div>

            {/* Bottom 4 stat cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STAT_CARDS.map(({ icon: Icon, label, value, change, up }) => (
                <div key={label} className="flex flex-col items-center rounded-2xl border border-[var(--sandstone-navy)]/12 bg-white px-3 py-5 text-center shadow-sm">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--sandstone-navy)]/12 bg-[var(--sandstone-off-white)]">
                    <Icon size={18} className="text-[var(--sandstone-navy)]" strokeWidth={1.75} />
                  </div>
                  <p className="whitespace-pre-line text-[10px] font-semibold leading-snug text-[var(--sandstone-charcoal)]/60">{label}</p>
                  <p className="mt-2 font-heading text-2xl font-bold text-[var(--sandstone-sand-gold)]">{value}</p>
                  {change ? (
                    <span className={`mt-1.5 inline-flex items-center gap-0.5 text-[10px] font-bold ${up ? "text-green-600" : "text-red-500"}`}>
                      {change} {up ? "↑" : "↓"}
                    </span>
                  ) : (
                    <span className="mt-1.5 text-[10px] text-[var(--sandstone-charcoal)]/30">—</span>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-[11px] text-[var(--sandstone-charcoal)]/35">
              Live data: GEPAR MLS via Spark API · ZIP 79902 · Refreshes hourly
            </p>
          </div>
        </section>

        {/* ── Browse Listings ──────────────────────────────────────────────── */}
        <section id="listings" className="bg-white py-16 scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 lg:px-6">
            <div className="mb-6">
              <h2 className="font-heading text-3xl font-bold text-[var(--sandstone-navy)]">
                Browse Downtown & UTEP Listings
              </h2>
              <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/60">
                Explore active properties and rentals across the Downtown and UTEP areas.
              </p>
            </div>
            <DowntownUtepListings />
          </div>
        </section>

        {/* ── Schools ──────────────────────────────────────────────────────── */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-4 lg:px-6">
            <div className="mb-10 text-center">
              <h2 className="font-heading text-3xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
                Schools Near Downtown/UTEP
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--sandstone-charcoal)]/60">
                The downtown and UTEP areas fall within the El Paso Independent School District (EPISD) and are anchored by historic schools like El Paso High.
              </p>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row">
              {/* Left: school photos */}
              <div className="w-full lg:sticky lg:top-[116px] lg:self-start lg:flex lg:w-[58%] lg:flex-col">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src="/areas/downtown-utep/el-paso-hs_2.png"
                    alt="El Paso High School"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <p className="absolute bottom-4 left-4 font-heading text-xl font-bold text-white drop-shadow">
                    El Paso High School
                  </p>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="relative aspect-square overflow-hidden rounded-2xl">
                    <Image
                      src="/areas/downtown-utep/guillen-middle-school_2.png"
                      alt="Guillen Middle School"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 27vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <p className="absolute bottom-3 left-3 font-heading text-[15px] font-bold leading-snug text-white drop-shadow">
                      Guillen<br />Middle School
                    </p>
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-2xl">
                    <Image
                      src="/areas/downtown-utep/Aoy-elementary_2.png"
                      alt="Aoy Elementary School"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 27vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <p className="absolute bottom-3 left-3 font-heading text-[15px] font-bold leading-snug text-white drop-shadow">
                      Aoy Elementary<br />School
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: school tables */}
              <div className="flex-1 space-y-7">
                {(["elementary", "middle", "high"] as const).map((level) => {
                  const titles = { elementary: "Elementary Schools", middle: "Middle Schools", high: "High Schools" };
                  return (
                    <div key={level}>
                      <h3 className="mb-2 font-heading text-[15px] font-bold text-[var(--sandstone-navy)]">{titles[level]}</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[480px]">
                          <thead>
                            <tr className="border-b border-[var(--sandstone-navy)]/10">
                              <th className="pb-2 text-left text-[11px] font-semibold uppercase tracking-wide text-[var(--sandstone-charcoal)]/40">School</th>
                              <th className="pb-2 text-left text-[11px] font-semibold uppercase tracking-wide text-[var(--sandstone-charcoal)]/40">District</th>
                              <th className="pb-2 text-right text-[11px] font-semibold uppercase tracking-wide text-[var(--sandstone-charcoal)]/40">Primary ZIP*</th>
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
                        </table>
                      </div>
                    </div>
                  );
                })}

                <p className="text-[12px] italic leading-relaxed text-[var(--sandstone-charcoal)]/50">
                  School zoning may change. Buyers should verify attendance boundaries directly with El Paso ISD.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Convenience at Your Doorstep ─────────────────────────────────── */}
        <section className="bg-[var(--sandstone-off-white)] py-16">
          <div className="mx-auto max-w-5xl px-4 lg:px-6">
            <div className="mb-10 text-center">
              <h2 className="font-heading text-3xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
                Convenience at Your Doorstep
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--sandstone-charcoal)]/60">
                Downtown El Paso offers easy access to major hospitals, arts, entertainment, and everyday essentials.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Hospitals */}
              <div className="flex flex-col rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl">
                    <Image src="/icons/areas/icon-hospital.webp" alt="" width={48} height={48} className="object-cover" />
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
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl">
                    <Image src="/icons/areas/icon-grocery.webp" alt="" width={48} height={48} className="object-cover" />
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
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[var(--sandstone-navy)]/8 bg-[var(--sandstone-off-white)]">
                        <Image src={item.img} alt={item.name} fill sizes="40px" className="object-contain p-2" />
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
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl">
                    <Image src="/icons/areas/icon-shopping-bag.webp" alt="" width={48} height={48} className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-heading text-[15px] font-bold text-[var(--sandstone-navy)]">Shopping & Arts</h3>
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

            {/* Commute Times */}
            <div className="mt-4 flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm lg:flex-row lg:items-center">
              <div className="flex shrink-0 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl">
                  <Image src="/icons/areas/icon-car.webp" alt="" width={48} height={48} className="object-cover" />
                </div>
                <div>
                  <p className="font-heading text-[15px] font-bold text-[var(--sandstone-navy)]">Commute Times</p>
                  <p className="text-[11px] text-[var(--sandstone-charcoal)]/50">Quick access to everything that matters.</p>
                </div>
              </div>
              <div className="hidden w-px self-stretch bg-[var(--sandstone-navy)]/10 lg:block" />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                {COMMUTE_TIMES.map((c) => (
                  <div key={c.label} className="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-1.5 sm:text-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full">
                      <Image src={c.icon} alt="" width={40} height={40} className="object-cover" />
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

        {/* ── Why Buyers Choose Downtown ───────────────────────────────── */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-4 lg:px-6">
            <h2 className="mb-10 text-center font-heading text-3xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
              Why Buyers Choose Downtown El Paso & UTEP Area
            </h2>

            <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
              {/* Left: editorial text */}
              <div className="flex-1 space-y-7">
                <div>
                  <p className="text-[14px] leading-relaxed text-[var(--sandstone-charcoal)]/65">
                    The Downtown and UTEP areas represent the vibrant core of El Paso. From the historic, tree-lined streets of Kern Place to the revitalized downtown center, this area offers a walkable, culturally rich lifestyle. It&apos;s home to the Sun Bowl, Southwest University Park, and the bustling Cincinnati Entertainment District.
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--sandstone-charcoal)]/65">
                    Buyers are drawn to this area for its unique character. Investors and students often look near the University of Texas at El Paso (UTEP), while professionals and families seek out the historic charm and architectural diversity of Sunset Heights and Kern Place.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)]">
                    Downtown/UTEP Home Prices
                  </h2>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--sandstone-charcoal)]/65">
                    Real estate in 79901 and 79902 varies widely. You can find modern downtown lofts, affordable condos near the university, and multi-million dollar historic estates. Because of this diversity, It&apos;s essential to work with an agent who understands the hyper-local market of Central El Paso.
                  </p>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)]">
                    Is Downtown El Paso Right for You?
                  </h2>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--sandstone-charcoal)]/65">
                    The downtown area is an excellent fit if you prefer an urban environment, cultural amenities, and historic architecture. It&apos;s especially popular with:
                  </p>
                  <ul className="mt-3 space-y-2">
                    {[
                      "Students, faculty, and investors wanting to be near UTEP",
                      "Professionals seeking a walkable lifestyle close to the Medical Center and downtown business district",
                      "Lovers of historic architecture and vibrant arts and entertainment scenes",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-[var(--sandstone-charcoal)]/65">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sandstone-sand-gold)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: lifestyle photos */}
              <div className="flex flex-col gap-4 lg:w-[38%] lg:self-start lg:sticky lg:top-[116px]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src="/areas/downtown-utep/san-jacinto_2.png"
                    alt="San Jacinto Plaza and Downtown El Paso"
                    fill
                    sizes="(max-width: 1024px) 100vw, 38vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src="/areas/downtown-utep/la-nube-downtown_2.png"
                    alt="La Nube and Downtown Arts District"
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
            <div className="mb-10 text-center">
              <h2 className="font-heading text-3xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
                Utilities & Local Services
              </h2>
              <p className="mt-3 text-sm text-[var(--sandstone-charcoal)]/60">
                Utility providers for the downtown area.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {UTILITIES.map(({ icon, title, provider, description, linkLabel, href, accent }) => (
                <div key={title} className="flex flex-col items-center rounded-2xl bg-white p-5 text-center shadow-sm">
                  <div className="mb-4 h-20 w-20 overflow-hidden rounded-full">
                    <Image src={icon} alt="" width={80} height={80} className="object-cover" />
                  </div>
                  <h3 className="font-heading text-[15px] font-bold text-[var(--sandstone-navy)]">{title}</h3>
                  <p className={`mt-1 text-[13px] font-semibold ${accent.text}`}>{provider}</p>
                  <p className="mt-3 flex-1 text-[12px] leading-relaxed text-[var(--sandstone-charcoal)]/55">{description}</p>
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
            <p className="mt-6 flex items-center justify-center gap-1.5 text-[12px] text-[var(--sandstone-charcoal)]/40">
              <Info size={14} strokeWidth={1.75} />
              Providers and service availability may vary depending on the specific address and subdivision.
            </p>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-4xl px-4 lg:px-6">
            <h2 className="mb-10 text-center font-heading text-3xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 items-start">
              {FAQS.map(({ icon, q, a }, i) => (
                <details key={i} className="group rounded-2xl bg-white shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                      <Image src={icon} alt="" width={48} height={48} className="object-cover" />
                    </div>
                    <span className="flex-1 text-[14px] font-semibold text-[var(--sandstone-navy)]">{q}</span>
                    <ChevronDown
                      size={18}
                      strokeWidth={2}
                      className="shrink-0 text-[var(--sandstone-navy)]/50 transition-transform duration-200 group-open:rotate-180"
                    />
                  </summary>
                  <div className="border-t border-[var(--sandstone-navy)]/8 px-5 py-4 pl-[76px]">
                    <p className="text-[13px] leading-relaxed text-[var(--sandstone-charcoal)]/65">{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Explore More El Paso Areas ───────────────────────── */}
        <ExploreNearbyAreas compact currentAreaHref="/areas/downtown-utep" />

        {/* ── Form ─────────────────────────────────────────────────────────── */}
        <LeadCaptureSection
          formType="contact"
          sectionId="contact"
          heading="Ready to Buy in Downtown El Paso?"
          subheading="The Sandstone team knows the Downtown and UTEP areas inside and out. Reach out and we'll help you find the right home."
          ctaLabel="Schedule a Visit"
          messagePlaceholder="Tell us about your Downtown El Paso search..."
          mappingReference="downtown-utep"
          asideEyebrow="Ready. Lifestyle. Real."
          asideTitle="Ready to Make Your Next Move?"
          asideDescription="Schedule a consultation and get a personalized strategy for your Downtown El Paso property search."
          asideCtaLabel="Schedule a Consultation"
          turnstileSiteKey={turnstileSiteKey}
        />
      </main>
      <SiteFooter />
    </>
  );
}
