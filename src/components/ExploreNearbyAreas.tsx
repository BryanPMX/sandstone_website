"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

// ─── Large card icons ──────────────────────────────────────────────────────────

const IcoMountain = () => (
  <svg width="48" height="36" viewBox="0 0 48 36" fill="none">
    <path d="M2 34L16 8L24 20L32 12L46 34H2Z" stroke="#C5860A" strokeWidth="2" strokeLinejoin="round" />
    <path d="M24 20L30 14" stroke="#C5860A" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const IcoBuildings = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect x="4" y="8" width="14" height="28" rx="1" stroke="#C5860A" strokeWidth="2" />
    <rect x="18" y="16" width="18" height="20" rx="1" stroke="#C5860A" strokeWidth="2" />
    <line x1="8"  y1="14" x2="12" y2="14" stroke="#C5860A" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="8"  y1="20" x2="12" y2="20" stroke="#C5860A" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="8"  y1="26" x2="12" y2="26" stroke="#C5860A" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="23" y1="22" x2="27" y2="22" stroke="#C5860A" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="23" y1="28" x2="27" y2="28" stroke="#C5860A" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const IcoShield = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M20 4L6 10V20C6 28 12 34 20 36C28 34 34 28 34 20V10L20 4Z" stroke="#C5860A" strokeWidth="2" strokeLinejoin="round" />
    <path d="M14 20L18 24L26 16" stroke="#C5860A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IcoLeaf = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M8 32C8 32 10 16 24 12C32 9 35 6 35 6C35 6 35 13 30 19C25 24 16 25 12 32" stroke="#C5860A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 32C12 26 21 21 28 17" stroke="#C5860A" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const IcoFort = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect x="5" y="16" width="30" height="20" rx="1" stroke="#C5860A" strokeWidth="2" />
    <path d="M5 16V9H12V16"  stroke="#C5860A" strokeWidth="2" strokeLinejoin="round" />
    <path d="M28 16V9H35V16" stroke="#C5860A" strokeWidth="2" strokeLinejoin="round" />
    <line x1="17" y1="16" x2="17" y2="9" stroke="#C5860A" strokeWidth="2" />
    <line x1="23" y1="16" x2="23" y2="9" stroke="#C5860A" strokeWidth="2" />
    <rect x="16" y="24" width="8" height="12" stroke="#C5860A" strokeWidth="1.8" />
  </svg>
);
const IcoHouseTree = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M5 20L17 8L29 20" stroke="#C5860A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 17V34H25V17"   stroke="#C5860A" strokeWidth="2" strokeLinejoin="round" />
    <rect x="14" y="24" width="6" height="10" stroke="#C5860A" strokeWidth="1.8" />
    <path d="M28 28C28 24 31 20 34 18C31 18 29 20 28 22C27 20 25 18 22 18C25 20 28 24 28 28Z" stroke="#C5860A" strokeWidth="1.6" strokeLinejoin="round" />
    <line x1="28" y1="28" x2="28" y2="34" stroke="#C5860A" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const IcoCactus = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M20 36V8" stroke="#C5860A" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M20 18H12V11" stroke="#C5860A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 22H28V15" stroke="#C5860A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IcoDowntown = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <rect x="3"  y="20" width="10" height="16" rx="1" stroke="#C5860A" strokeWidth="2" />
    <rect x="13" y="12" width="14" height="24" rx="1" stroke="#C5860A" strokeWidth="2" />
    <rect x="27" y="16" width="10" height="20" rx="1" stroke="#C5860A" strokeWidth="2" />
    <line x1="17" y1="18" x2="23" y2="18" stroke="#C5860A" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="17" y1="24" x2="23" y2="24" stroke="#C5860A" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="17" y="28" width="6"  height="8" stroke="#C5860A" strokeWidth="1.5" />
  </svg>
);

// ─── Bullet icons ──────────────────────────────────────────────────────────────

const BHome = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
    <path d="M1 6.5L7 1.5L13 6.5" stroke="#C5860A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 5.5V12.5H11.5V5.5" stroke="#C5860A" strokeWidth="1.4" strokeLinejoin="round" />
    <rect x="5" y="8.5" width="4" height="4" stroke="#C5860A" strokeWidth="1.2" />
  </svg>
);
const BClock = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
    <circle cx="7" cy="7" r="5.5" stroke="#C5860A" strokeWidth="1.4" />
    <path d="M7 4V7L9 8.5" stroke="#C5860A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const BBag = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
    <rect x="1" y="5" width="12" height="8" rx="1" stroke="#C5860A" strokeWidth="1.4" />
    <path d="M4.5 5V4A2.5 2.5 0 0 1 9.5 4V5" stroke="#C5860A" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
const BBuilding = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
    <rect x="1" y="7" width="5" height="6" rx="0.5" stroke="#C5860A" strokeWidth="1.3" />
    <rect x="5" y="3" width="8" height="10" rx="0.5" stroke="#C5860A" strokeWidth="1.3" />
    <line x1="7" y1="7" x2="11" y2="7" stroke="#C5860A" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);
const BLeaf = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
    <path d="M2 12C2 12 3.5 7 7.5 5C10 4 11.5 2.5 11.5 2.5C11.5 2.5 11.5 5 9.5 7C8 8.5 5 9 3.5 11.5" stroke="#C5860A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 12C4 9.5 7 8 9 6.5" stroke="#C5860A" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);
const BSchool = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
    <path d="M7 1.5L1 4.5L7 7.5L13 4.5L7 1.5Z" stroke="#C5860A" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M3.5 6V9.5C3.5 9.5 5 11 7 11C9 11 10.5 9.5 10.5 9.5V6" stroke="#C5860A" strokeWidth="1.3" strokeLinecap="round" />
    <line x1="13" y1="4.5" x2="13" y2="8" stroke="#C5860A" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);



const IcoHeadphone = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <circle cx="22" cy="22" r="20.5" stroke="#C5860A" strokeWidth="1.8" />
    <path d="M13 24V22C13 17.03 17.03 13 22 13C26.97 13 31 17.03 31 22V24" stroke="#C5860A" strokeWidth="1.8" strokeLinecap="round" />
    <rect x="11" y="24" width="4" height="7" rx="2" stroke="#C5860A" strokeWidth="1.8" />
    <rect x="29" y="24" width="4" height="7" rx="2" stroke="#C5860A" strokeWidth="1.8" />
  </svg>
);

// ─── Types & Data ─────────────────────────────────────────────────────────────

interface AreaCard {
  title:       string;
  description: string;
  href:        string;
  icon:        React.ReactNode;
  price:       string;
  commute:     string;
  feature:     string;
  featIcon:    React.ReactNode;
  noLink?:     boolean;
}

const AREAS: AreaCard[] = [
  {
    title:       "Upper Valley",
    description: "Scenic views, larger lots, and some of El Paso's most established communities.",
    href:        "/areas/upper-valley",
    icon:        <IcoMountain />,
    price:       "Median ~$365K",
    commute:     "~25 min to Fort Bliss",
    feature:     "Top Rated Schools",
    featIcon:    <BSchool />,
  },
  {
    title:       "West El Paso",
    description: "Modern living, top schools, and great shopping near the Franklin Mountains.",
    href:        "/areas/west-el-paso",
    icon:        <IcoBuildings />,
    price:       "Median ~$365K",
    commute:     "~30 min to Fort Bliss",
    feature:     "Shopping & Dining",
    featIcon:    <BBag />,
  },
  {
    title:       "Northeast El Paso",
    description: "Affordable options with the shortest commute to Fort Bliss.",
    href:        "/areas/northeast-el-paso",
    icon:        <IcoShield />,
    price:       "From $180K+",
    commute:     "5–10 min to Fort Bliss",
    feature:     "Closest to Fort Bliss",
    featIcon:    <BBuilding />,
  },
  {
    title:       "Horizon City",
    description: "Growing fast with new construction and family-friendly neighborhoods.",
    href:        "/areas/horizon-city-tx",
    icon:        <IcoLeaf />,
    price:       "From $220K+",
    commute:     "28–32 min to Fort Bliss",
    feature:     "New Construction",
    featIcon:    <BHome />,
  },
  {
    title:       "Lower Valley",
    description: "Established neighborhoods with local charm, close to Downtown and the Ysleta Port of Entry.",
    href:        "/areas/lower-valley",
    icon:        <IcoFort />,
    price:       "From $160K+",
    commute:     "20–25 min to Fort Bliss",
    feature:     "Near Downtown & I-10",
    featIcon:    <BBuilding />,
  },
  {
    title:       "East El Paso",
    description: "Convenient access to major corridors, shopping, and everyday amenities.",
    href:        "/areas/east-el-paso",
    icon:        <IcoHouseTree />,
    price:       "From $200K+",
    commute:     "~25 min to Fort Bliss",
    feature:     "Easy Access & Amenities",
    featIcon:    <BBag />,
  },
  {
    title:       "Canutillo",
    description: "Family-friendly community with great schools and convenient Northwest El Paso access.",
    href:        "/areas/canutillo-tx",
    icon:        <IcoCactus />,
    price:       "From $200K+",
    commute:     "20–25 min to Downtown",
    feature:     "Canutillo ISD Schools",
    featIcon:    <BSchool />,
  },
  {
    title:       "Downtown / UTEP Area",
    description: "Urban living, walkability, cultural landmarks, and strong investment potential.",
    href:        "/areas/downtown-utep",
    icon:        <IcoDowntown />,
    price:       "From $180K+",
    commute:     "10–15 min to Fort Bliss",
    feature:     "UTEP & Culture",
    featIcon:    <BLeaf />,
  },
];



// ─── Component ────────────────────────────────────────────────────────────────

interface ExploreNearbyAreasProps {
  compact?: boolean;
  currentAreaHref?: string;
}

export default function ExploreNearbyAreas({ compact = false, currentAreaHref }: ExploreNearbyAreasProps = {}) {
  const router = useRouter();

  return (
    <section style={{ backgroundColor: "#f5f0eb" }} className={compact ? "py-12" : "py-20"}>
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          {!compact && <IcoMountain />}
          <h2
            className={`font-extrabold tracking-tight leading-tight ${compact ? "mt-0 text-3xl font-heading" : "mt-4 text-[2.6rem]"}`}
            style={{ color: "#111827" }}
          >
            Explore Nearby Areas
          </h2>
          <p className="mt-3 text-[1.05rem]" style={{ color: "#6b7280" }}>
            Find the area that fits your lifestyle, commute, and home goals.
          </p>
        </div>



        <div className={`grid gap-5 ${compact ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
          {AREAS.filter(a => a.href !== currentAreaHref).map((area) => {
            const cardInner = compact ? (
              <div className="p-5 flex items-center gap-4 flex-1">
                <div className="shrink-0 scale-90 origin-left">{area.icon}</div>
                <div className="flex-1">
                  <h3 className="text-[1.05rem] font-bold leading-tight" style={{ color: "#111827" }}>
                    {area.title}
                  </h3>
                  {!area.noLink && (
                    <span className="text-[12px] font-bold mt-1 inline-block" style={{ color: "#C5860A" }}>
                      Explore →
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">{area.icon}</div>
                <h3 className="text-[1.2rem] font-extrabold mb-1.5" style={{ color: "#111827" }}>
                  {area.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#6b7280" }}>
                  {area.description}
                </p>
                <hr className="border-t mb-4" style={{ borderColor: "#e5e7eb" }} />
                <ul className="space-y-2 mb-6 flex-1">
                  <li className="flex items-start gap-2 text-sm" style={{ color: "#374151" }}>
                    <BHome /><span>{area.price}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm" style={{ color: "#374151" }}>
                    <BClock /><span>{area.commute}</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm" style={{ color: "#374151" }}>
                    {area.featIcon}<span>{area.feature}</span>
                  </li>
                </ul>
                {!area.noLink && (
                  <span className="inline-flex items-center gap-1 text-sm font-bold" style={{ color: "#C5860A" }}>
                    Explore Area →
                  </span>
                )}
              </div>
            );

            if (area.noLink) {
              return (
                <div
                  key={area.title}
                  className="bg-white rounded-2xl border flex flex-col"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  {cardInner}
                </div>
              );
            }

            return (
              <Link
                key={area.title}
                href={area.href}
                onMouseEnter={() => router.prefetch(area.href)}
                className="bg-white rounded-2xl border flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ borderColor: "#e5e7eb" }}
              >
                {cardInner}
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        {!compact && (
          <div
            className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl px-8 py-6"
            style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
          >
          <div className="flex items-center gap-4">
            <IcoHeadphone />
            <div>
              <p className="font-bold text-[1.05rem]" style={{ color: "#111827" }}>
                Not sure where to start?
              </p>
              <p className="text-sm mt-0.5" style={{ color: "#6b7280" }}>
                We&apos;re here to help you find the right neighborhood.
              </p>
            </div>
          </div>
          <Link
            href="/#contact"
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg"
            style={{ backgroundColor: "#C5860A" }}
          >
            Schedule a Consultation →
          </Link>
        </div>
        )}

      </div>
    </section>
  );
}