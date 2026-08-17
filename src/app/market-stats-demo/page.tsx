export const dynamic = "force-dynamic";

const TOKEN = process.env.SPARK_ACCESS_TOKEN ?? "";
const BASE_URL = process.env.SPARK_API_BASE_URL ?? "https://replication.sparkapi.com";

const AREAS = [
  { label: "Upper Valley El Paso", locationField: "Neighborhood", locationValue: "Upper Valley" },
  { label: "West El Paso",         locationField: "PostalCode",   locationValue: "79912" },
  { label: "Northeast El Paso",    locationField: "PostalCode",   locationValue: "79936" },
  { label: "Horizon City TX",      locationField: "PostalCode",   locationValue: "79928" },
  { label: "Fort Bliss",           locationField: "PostalCode",   locationValue: "79918" },
  { label: "Santa Teresa NM",      locationField: "PostalCode",   locationValue: "88008" },
  { label: "Canutillo TX",         locationField: "PostalCode",   locationValue: "79835" },
];

const HEADERS = {
  Accept: "application/json",
  Authorization: `Bearer ${TOKEN}`,
  "User-Agent": "sandstone-website/1.0",
};

async function fetchStat(type: string, field: string, value: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/v1/marketstatistics/${type}?LocationField=${field}&LocationValue=${encodeURIComponent(value)}`,
      { headers: HEADERS, cache: "no-store" }
    );
    const json = await res.json();
    return json?.D?.Results?.[0] ?? null;
  } catch {
    return null;
  }
}

async function getAllStats() {
  // Fetch city-wide + all 7 areas in parallel
  const cityPrice     = fetchStat("price",     "City", "El Paso");
  const cityInventory = fetchStat("inventory", "City", "El Paso");
  const cityDom       = fetchStat("dom",       "City", "El Paso");

  const areaFetches = AREAS.map((area) =>
    Promise.all([
      fetchStat("price",     area.locationField, area.locationValue),
      fetchStat("inventory", area.locationField, area.locationValue),
      fetchStat("dom",       area.locationField, area.locationValue),
    ])
  );

  const [cp, ci, cd, ...areaSets] = await Promise.all([cityPrice, cityInventory, cityDom, ...areaFetches]);

  return {
    city: { price: cp, inventory: ci, dom: cd },
    areas: AREAS.map((area, i) => ({
      ...area,
      price:     (areaSets[i] as [unknown, unknown, unknown])[0],
      inventory: (areaSets[i] as [unknown, unknown, unknown])[1],
      dom:       (areaSets[i] as [unknown, unknown, unknown])[2],
    })),
  };
}

function fmt$(v: string | number | undefined | null): string {
  if (v == null) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(v));
}

function fmtMonth(d: string): string {
  const [m, , y] = d.split("/");
  return new Date(Number(y), Number(m) - 1).toLocaleDateString("en-US", { month: "short", year: "2-digit" });
}

function priceDelta(prices: string[] | undefined): { pct: string; up: boolean } | null {
  if (!prices || prices.length < 2) return null;
  const curr = Number(prices[0]);
  const prev = Number(prices[1]);
  if (!prev) return null;
  const pct = ((curr - prev) / prev) * 100;
  return { pct: Math.abs(pct).toFixed(1), up: pct >= 0 };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AreaCard({ area }: { area: any }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p = area.price as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inv = area.inventory as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dom = area.dom as any;

  const hasData = p?.ActiveMedianListPrice?.[0] != null;
  const medianPrice = fmt$(p?.ActiveMedianListPrice?.[0]);
  const active = inv?.ActiveListings?.[0]?.toLocaleString() ?? "—";
  const avgDom = dom?.AverageDom?.[0] ?? "—";
  const delta = priceDelta(p?.ActiveMedianListPrice);

  const trend = (p?.Dates ?? []).slice(0, 3).map((d: string, i: number) => ({
    month: fmtMonth(d),
    price: p?.ActiveMedianListPrice?.[i],
  })).reverse();

  return (
    <div className="flex flex-col rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white shadow-sm overflow-hidden">
      {/* Card header */}
      <div className="bg-[var(--sandstone-navy)] px-5 py-4">
        <p className="font-heading text-base font-bold text-white leading-tight">{area.label}</p>
        {area.locationField === "PostalCode" && (
          <p className="mt-0.5 text-xs text-white/50">{area.locationValue}</p>
        )}
      </div>

      {!hasData ? (
        <div className="flex flex-1 items-center justify-center px-5 py-8 text-center">
          <p className="text-sm text-[var(--sandstone-charcoal)]/50">Limited listing data available for this area</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-5">
          {/* Main stats */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--sandstone-sand-gold)]">Median Price</p>
              <p className="mt-1 font-heading text-lg font-bold text-[var(--sandstone-navy)] leading-tight">{medianPrice}</p>
              {delta && (
                <p className={`mt-0.5 text-[10px] font-semibold ${delta.up ? "text-green-600" : "text-red-500"}`}>
                  {delta.up ? "▲" : "▼"} {delta.pct}% MoM
                </p>
              )}
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--sandstone-sand-gold)]">Active</p>
              <p className="mt-1 font-heading text-lg font-bold text-[var(--sandstone-navy)]">{active}</p>
              <p className="mt-0.5 text-[10px] text-[var(--sandstone-charcoal)]/50">listings</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--sandstone-sand-gold)]">Avg DOM</p>
              <p className="mt-1 font-heading text-lg font-bold text-[var(--sandstone-navy)]">{avgDom}</p>
              <p className="mt-0.5 text-[10px] text-[var(--sandstone-charcoal)]/50">days</p>
            </div>
          </div>

          {/* 3-month price trend */}
          {trend.length > 0 && (
            <div className="border-t border-[var(--sandstone-navy)]/8 pt-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--sandstone-charcoal)]/50">3-Month Price Trend</p>
              <div className="space-y-1.5">
                {trend.map(({ month, price }: { month: string; price: string }) => (
                  <div key={month} className="flex items-center justify-between">
                    <span className="text-xs text-[var(--sandstone-charcoal)]/60">{month}</span>
                    <span className="text-xs font-semibold text-[var(--sandstone-navy)]">{fmt$(price)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default async function MarketStatsDemoPage() {
  const { city, areas } = await getAllStats();

  const latestDate = city.price?.Dates?.[0] ? fmtMonth(city.price.Dates[0]).replace("/", " 20") : "—";
  const cityMedian = fmt$(city.price?.ActiveMedianListPrice?.[0]);
  const cityActive = city.inventory?.ActiveListings?.[0]?.toLocaleString() ?? "—";
  const cityNewList = city.inventory?.NewListings?.[0]?.toLocaleString() ?? "—";
  const cityDom = city.dom?.AverageDom?.[0] ?? "—";

  return (
    <main className="min-h-screen bg-[var(--sandstone-off-white)] px-4 py-12">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--sandstone-sand-gold)]">
            Live MLS Data · FlexMLS via Spark API
          </p>
          <h1 className="mt-2 font-heading text-4xl font-bold text-[var(--sandstone-navy)]">
            El Paso Market Statistics
          </h1>
          <p className="mt-2 text-[var(--sandstone-charcoal)]/60">
            Real-time data sourced directly from the MLS · Updated monthly
          </p>
        </div>

        {/* City-wide overview */}
        <div className="mb-10 rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--sandstone-sand-gold)]">El Paso — City Wide</p>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Median List Price", value: cityMedian },
              { label: "Active Listings",   value: cityActive },
              { label: "New This Month",    value: cityNewList },
              { label: "Avg Days on Market", value: `${cityDom} days` },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs text-[var(--sandstone-charcoal)]/60">{label}</p>
                <p className="mt-1 font-heading text-2xl font-bold text-[var(--sandstone-navy)]">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Per-area heading */}
        <div className="mb-5">
          <h2 className="font-heading text-2xl font-bold text-[var(--sandstone-charcoal)]">By Area</h2>
          <p className="mt-1 text-sm text-[var(--sandstone-charcoal)]/60">Each area pulls independent MLS data from FlexMLS</p>
        </div>

        {/* Area cards grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {areas.map((area) => (
            <AreaCard key={area.label} area={area} />
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-[var(--sandstone-charcoal)]/40">
          Data sourced live from FlexMLS · Sandstone Real Estate Group · {latestDate}
        </p>
      </div>
    </main>
  );
}
