import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LeadCaptureSection } from "@/components/LeadCaptureSection";
import { ModelShowcase } from "@/components/areas/ModelShowcase";
import { getTurnstileSiteKey } from "@/config";
import { ExternalLink, Info, ChevronDown } from "lucide-react";
import type { HomeModel } from "@/components/areas/ModelShowcase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sandstone's New Builds | Sandstone Home Builders",
  description:
    "New construction luxury homes by Sandstone Home Builders in Midland, TX. Explore the Maribel and Clarissa floor plans — custom-built in the Greenwood ISD community.",
};

const BASE = "/areas/sandstones-new-builds";

const SPEC_BOXES = (prefix: string) => [
  { icon: `${BASE}/icons/sqft.jpg`,   value: "3,600 SF", label: "Living Area"    },
  { icon: `${BASE}/icons/beds.jpg`,   value: "4",        label: "Bedrooms"       },
  { icon: `${BASE}/icons/baths.jpg`,  value: "4",        label: "Full Bathrooms" },
  { icon: `${BASE}/icons/garage.jpg`, value: "3-Car",    label: "Garage"         },
  { icon: `${BASE}/icons/patio.jpg`,  value: "787 SF",   label: "Covered Patio"  },
  { icon: `${BASE}/icons/star.jpg`,   value: "Luxury",   label: "Custom Home"    },
];

const MODELS: HomeModel[] = [
  {
    id:          "maribel",
    label:       "Maribel",
    name:        "MARIBEL",
    community:   "SANDSTONE HOME BUILDERS · MIDLAND, TX",
    specsLine:   "4 Bedrooms | 4 Bathrooms | 3,600 Sq Ft Living Area | 3-Car Garage",
    description: "A luxury single-story residence designed for modern living. Featuring soaring vaulted ceilings, an open-concept layout, a private owner’s suite, and an expansive covered patio built for entertaining and enjoying West Texas sunsets.",
    price:       "$XXX,XXX",
    photos: [
      { src: `${BASE}/model/maribel-1.webp`, alt: "Maribel photo 1" },
      { src: `${BASE}/model/maribel-2.webp`, alt: "Maribel photo 2" },
      { src: `${BASE}/model/maribel-3.webp`, alt: "Maribel photo 3" },
      { src: `${BASE}/model/maribel-4.webp`, alt: "Maribel photo 4" },
      { src: `${BASE}/model/maribel-5.webp`, alt: "Maribel photo 5" },
      { src: `${BASE}/model/maribel-6.webp`, alt: "Maribel photo 6" },
      { src: `${BASE}/model/maribel-7.webp`, alt: "Maribel photo 7" },
    ],
    specBoxes: SPEC_BOXES("maribel"),
  },
  {
    id:          "clarissa",
    label:       "Clarissa",
    name:        "CLARISSA",
    community:   "SANDSTONE HOME BUILDERS · MIDLAND, TX",
    specsLine:   "4 Bedrooms | 4 Bathrooms | 3,600 Sq Ft Living Area | 3-Car Garage",
    description: "A refined single-story home that blends open-concept design with intimate gathering spaces. The Clarissa features a chef’s kitchen, expansive owner’s retreat, and seamless indoor-outdoor living — crafted for those who demand both elegance and everyday comfort.",
    price:       "$XXX,XXX",
    photos: [
      { src: `${BASE}/model/clarissa-1.webp`,  alt: "Clarissa photo 1"  },
      { src: `${BASE}/model/clarissa-2.webp`,  alt: "Clarissa photo 2"  },
      { src: `${BASE}/model/clarissa-3.webp`,  alt: "Clarissa photo 3"  },
      { src: `${BASE}/model/clarissa-4.webp`,  alt: "Clarissa photo 4"  },
      { src: `${BASE}/model/clarissa-5.webp`,  alt: "Clarissa photo 5"  },
      { src: `${BASE}/model/clarissa-6.webp`,  alt: "Clarissa photo 6"  },
      { src: `${BASE}/model/clarissa-7.webp`,  alt: "Clarissa photo 7"  },
      { src: `${BASE}/model/clarissa-8.webp`,  alt: "Clarissa photo 8"  },
      { src: `${BASE}/model/clarissa-9.webp`,  alt: "Clarissa photo 9"  },
      { src: `${BASE}/model/clarissa-10.webp`, alt: "Clarissa photo 10" },
    ],
    specBoxes: SPEC_BOXES("clarissa"),
  },
];

const SCHOOLS = {
  elementary: [
    { name: "Greenwood Elementary School",  district: "Greenwood ISD", zip: "79706" },
  ],
  middle: [
    { name: "Greenwood Junior High School", district: "Greenwood ISD", zip: "79706" },
  ],
  high: [
    { name: "Greenwood High School",        district: "Greenwood ISD", zip: "79706" },
  ],
} as const;

const NEARBY = {
  hospitals: [
    { name: "Midland Memorial Hospital West Campus", time: "10 min", img: `${BASE}/nearby/hospital-1.jpg` },
    { name: "Midland Memorial Hospital (Main)",      time: "15 min", img: `${BASE}/nearby/hospital-2.jpg` },
    { name: "Midland Health Clinic",                 time: "8 min",  img: `${BASE}/nearby/hospital-1.jpg` },
  ],
  groceries: [
    { name: "H-E-B",         time: "8 min",  img: `${BASE}/logos/heb.jpg`           },
    { name: "Market Street", time: "10 min", img: `${BASE}/logos/market-street.jpg`  },
    { name: "Walmart",       time: "12 min", img: `${BASE}/logos/walmart.jpg`        },
    { name: "Sam's Club",    time: "12 min", img: `${BASE}/logos/sams-club.jpg`      },
  ],
  shopping: [
    { name: "Shops at Midland Park",  time: "15 min", img: `${BASE}/nearby/shopping-center.jpg` },
    { name: "La Palmilla at Midland", time: "12 min", img: `${BASE}/nearby/shopping-center.jpg` },
    { name: "Westridge Marketplace",  time: "8 min",  img: `${BASE}/nearby/dining.jpg`           },
  ],
};

const COMMUTE_TIMES = [
  { icon: `${BASE}/icons/downtown.jpg`, time: "15 min", label: "Downtown\nMidland"      },
  { icon: `${BASE}/icons/college.jpg`,  time: "12 min", label: "Midland\nCollege"       },
  { icon: `${BASE}/icons/medical.jpg`,  time: "10 min", label: "Medical\nCenter"        },
  { icon: `${BASE}/icons/airplane.jpg`, time: "18 min", label: "Midland\nAirport"       },
  { icon: `${BASE}/icons/shopping.jpg`, time: "8 min",  label: "H-E-B /\nMarket Street" },
];

const UTILITIES = [
  {
    icon:      `${BASE}/icons/electric.jpg`,
    title:     "Electricity",
    provider:  "AEP Texas",
    description: "Distribution by AEP Texas. Choose your retail electricity provider in this deregulated market.",
    linkLabel: "Visit AEP Texas",
    href:      "https://www.aeptexas.com",
  },
  {
    icon:      `${BASE}/icons/water.jpg`,
    title:     "Water",
    provider:  "City of Midland",
    description: "Water and wastewater services provided by the City of Midland Water Utilities.",
    linkLabel: "Visit Website",
    href:      "https://www.midlandtexas.gov/190/Water-Utilities",
  },
  {
    icon:      `${BASE}/icons/gas.jpg`,
    title:     "Natural Gas",
    provider:  "Atmos Energy",
    description: "Safe, reliable natural gas service for your home throughout the Permian Basin.",
    linkLabel: "Visit Website",
    href:      "https://www.atmosenergy.com",
  },
  {
    icon:      `${BASE}/icons/trash.jpg`,
    title:     "Trash & Recycling",
    provider:  "City of Midland",
    description: "Waste collection and recycling services by City of Midland Sanitation.",
    linkLabel: "Visit Website",
    href:      "https://www.midlandtexas.gov/196/Sanitation",
  },
  {
    icon:      `${BASE}/icons/internet.jpg`,
    title:     "Internet Service",
    provider:  "Multiple Providers",
    description: "High-speed options from Optimum, AT&T Fiber, and Sparklight.",
    linkLabel: "",
    href:      "",
  },
] as const;

const FAQS = [
  {
    icon: `${BASE}/icons/faq-home.jpg`,
    q:    "What is Sandstone's New Builds?",
    a:    "Sandstone's New Builds is a new construction program by Sandstone Home Builders offering premium custom homes in Midland, TX. The current community is located in the Greenwood area and features luxury single-story floor plans designed for West Texas living.",
  },
  {
    icon: `${BASE}/icons/faq-location.jpg`,
    q:    "Where are these homes located?",
    a:    "Our current new build community is located in the Greenwood area of Midland, TX — one of the most sought-after neighborhoods in the Permian Basin. The community offers peaceful surroundings with convenient access to shopping, dining, healthcare, and Greenwood ISD schools.",
  },
  {
    icon: `${BASE}/icons/faq-school.jpg`,
    q:    "What school district serves this community?",
    a:    "Our community is served by Greenwood Independent School District (ISD), which includes Greenwood High School, Greenwood Junior High, and Greenwood Elementary. Greenwood ISD is known for its strong academics, athletics, and close-knit community feel.",
  },
  {
    icon: `${BASE}/icons/faq-work.jpg`,
    q:    "What home models are available?",
    a:    "Sandstone Home Builders is currently offering two models: the Maribel and the Clarissa — both 4-bedroom, 4-bathroom homes with 3,600 sq ft of living area and a 3-car garage. Additional models and lot options are being planned. Contact us to be among the first to hear about new releases.",
  },
  {
    icon: `${BASE}/icons/faq-price.jpg`,
    q:    "How much do these homes cost?",
    a:    "Pricing starts from the mid $XXX,XXXs depending on model, lot selection, finishes, and upgrades. Contact Sandstone Home Builders for a personalized quote and to learn about current incentives.",
  },
  {
    icon: `${BASE}/icons/faq-build.jpg`,
    q:    "Is this a new construction community?",
    a:    "Yes — every home is brand-new construction built by Sandstone Home Builders. Buyers benefit from modern floor plans, energy-efficient building practices, and full builder warranties from day one.",
  },
  {
    icon: `${BASE}/icons/faq-safety.jpg`,
    q:    "How safe is the Greenwood area of Midland?",
    a:    "The Greenwood area is one of Midland's most established and family-friendly communities. It is known for quiet residential streets, a strong sense of community, and excellent schools — making it a top choice for families relocating to the Permian Basin.",
  },
  {
    icon: `${BASE}/icons/faq-dollar.jpg`,
    q:    "Can I customize my Sandstone home?",
    a:    "Sandstone Home Builders offers a range of finish and fixture options so you can personalize your home. Structural customizations vary by phase. Schedule a design consultation to explore what's available for your specific build.",
  },
  {
    icon: `${BASE}/icons/faq-community.jpg`,
    q:    "What is the lifestyle like in this community?",
    a:    "Life here combines wide-open West Texas space with the comfort of a thoughtfully planned community. Residents enjoy low-density living, easy access to Midland amenities, and the pride of owning a custom-built Sandstone home.",
  },
  {
    icon: `${BASE}/icons/faq-trend.jpg`,
    q:    "Is now a good time to buy new construction in Midland, TX?",
    a:    "Midland's real estate market has shown steady long-term strength driven by Permian Basin activity. New construction allows buyers to lock in today's pricing, enjoy builder incentives, and avoid bidding wars common in resale markets. Early buyers often benefit most from community appreciation.",
  },
];

export default function SandstoneNewBuildsPage() {
  const turnstileSiteKey = getTurnstileSiteKey();

  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />
      <main className="min-h-screen bg-[var(--sandstone-off-white)]">

        {/* ── Home Models ──────────────────────────────────────────────────── */}
        <section id="models" className="bg-white pb-16 pt-32 lg:pb-20 lg:pt-40">
          <div className="mx-auto max-w-5xl px-4 lg:px-6">

            <div className="mb-8 flex flex-col items-center text-center">
              <span className="mb-3 block h-px w-10 bg-[var(--sandstone-sand-gold)]" />
              <h1 className="font-heading text-3xl font-bold text-[var(--sandstone-navy)] md:text-4xl lg:text-5xl">
                Explore Our Home Models
              </h1>
              <p className="mt-2 text-[15px] italic text-[var(--sandstone-sand-gold)]">
                New construction by Sandstone Home Builders · Midland, TX
              </p>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[var(--sandstone-charcoal)]/50">
                Explore distinctive floor plans crafted for West Texas living. Select a model below to tour its design and features.
              </p>
            </div>

            <ModelShowcase models={MODELS} />

          </div>
        </section>

        {/* ── Schools ──────────────────────────────────────────────────────── */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-4 lg:px-6">

            <div className="mb-10 text-center">
              <h2 className="font-heading text-3xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
                Schools Near Our Community
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--sandstone-charcoal)]/60">
                Our new builds are served by the Greenwood Independent School District — a close-knit, highly regarded district in the Greenwood area of Midland, TX.
              </p>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row">

              <div className="w-full lg:sticky lg:top-[116px] lg:self-start lg:flex lg:w-[55%] lg:flex-col">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={`${BASE}/schools/greenwood-high.jpg`}
                    alt="Greenwood High School"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <p className="absolute bottom-4 left-4 font-heading text-xl font-bold text-white drop-shadow">
                    Greenwood High School
                  </p>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="relative aspect-square overflow-hidden rounded-2xl">
                    <Image
                      src={`${BASE}/schools/greenwood-elementary.jpg`}
                      alt="Greenwood Elementary School"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 27vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <p className="absolute bottom-3 left-3 font-heading text-[15px] font-bold leading-snug text-white drop-shadow">
                      Greenwood<br />Elementary
                    </p>
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-2xl">
                    <Image
                      src={`${BASE}/schools/greenwood-isd.jpg`}
                      alt="Greenwood ISD Administration"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 27vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <p className="absolute bottom-3 left-3 font-heading text-[15px] font-bold leading-snug text-white drop-shadow">
                      Greenwood ISD<br />Administration
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-7">
                {(["elementary", "middle", "high"] as const).map((level) => {
                  const titles = { elementary: "Elementary Schools", middle: "Junior High", high: "High Schools" };
                  return (
                    <div key={level}>
                      <h3 className="mb-2 font-heading text-[15px] font-bold text-[var(--sandstone-navy)]">{titles[level]}</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[400px]">
                          <thead>
                            <tr className="border-b border-[var(--sandstone-navy)]/10">
                              <th className="pb-2 text-left text-[11px] font-semibold uppercase tracking-wide text-[var(--sandstone-charcoal)]/40">School</th>
                              <th className="pb-2 text-left text-[11px] font-semibold uppercase tracking-wide text-[var(--sandstone-charcoal)]/40">District</th>
                              <th className="pb-2 text-right text-[11px] font-semibold uppercase tracking-wide text-[var(--sandstone-charcoal)]/40">ZIP</th>
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
                  Greenwood ISD is widely recognized for its strong academics, competitive athletics, and family-oriented culture. Buyers should verify attendance boundaries directly with Greenwood ISD prior to purchase.
                </p>
                <a
                  href="https://www.greenwood.esc18.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--sandstone-sand-gold)] hover:underline"
                >
                  Visit Greenwood ISD Website
                  <ExternalLink size={13} strokeWidth={2.5} />
                </a>
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
                Our community puts Midland&apos;s best healthcare, grocery, and shopping destinations within easy reach.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

              <div className="flex flex-col rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl">
                    <Image src={`${BASE}/icons/hospital.jpg`} alt="" width={48} height={48} className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-heading text-[15px] font-bold text-[var(--sandstone-navy)]">Hospitals</h3>
                    <p className="mt-0.5 text-[12px] leading-snug text-[var(--sandstone-charcoal)]/55">Top-rated Permian Basin medical care close by.</p>
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
                  <Link href="#contact" className="text-[12px] font-semibold text-[var(--sandstone-sand-gold)] hover:underline">
                    Ask about nearby healthcare →
                  </Link>
                </div>
              </div>

              <div className="flex flex-col rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl">
                    <Image src={`${BASE}/icons/grocery.jpg`} alt="" width={48} height={48} className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-heading text-[15px] font-bold text-[var(--sandstone-navy)]">Grocery Stores</h3>
                    <p className="mt-0.5 text-[12px] leading-snug text-[var(--sandstone-charcoal)]/55">Everything from daily essentials to specialty items.</p>
                  </div>
                </div>
                <div className="my-4 border-t border-[var(--sandstone-navy)]/8" />
                <div className="flex-1 space-y-3">
                  {NEARBY.groceries.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[var(--sandstone-navy)]/8">
                        <Image src={item.img} alt={item.name} fill sizes="40px" className="object-contain p-1" />
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
                  <Link href="#contact" className="text-[12px] font-semibold text-[var(--sandstone-sand-gold)] hover:underline">
                    View more grocery options →
                  </Link>
                </div>
              </div>

              <div className="flex flex-col rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl">
                    <Image src={`${BASE}/icons/shopping-bag.jpg`} alt="" width={48} height={48} className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-heading text-[15px] font-bold text-[var(--sandstone-navy)]">Shopping &amp; Dining</h3>
                    <p className="mt-0.5 text-[12px] leading-snug text-[var(--sandstone-charcoal)]/55">Retail, restaurants, and entertainment close at hand.</p>
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
                  <Link href="#contact" className="text-[12px] font-semibold text-[var(--sandstone-sand-gold)] hover:underline">
                    View more shopping options →
                  </Link>
                </div>
              </div>

            </div>

            <div className="mt-4 flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm lg:flex-row lg:items-center">
              <div className="flex shrink-0 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl">
                  <Image src={`${BASE}/icons/downtown.jpg`} alt="" width={48} height={48} className="object-cover" />
                </div>
                <div>
                  <p className="font-heading text-[15px] font-bold text-[var(--sandstone-navy)]">Commute Times</p>
                  <p className="text-[11px] text-[var(--sandstone-charcoal)]/50">Quick access from Greenwood.</p>
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

        {/* ── Why Buyers Choose Sandstone's New Builds ─────────────────────── */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-4 lg:px-6">

            <h2 className="mb-10 text-center font-heading text-3xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
              Why Buyers Choose Sandstone&apos;s New Builds
            </h2>

            <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">

              <div className="flex-1 space-y-7">
                <div>
                  <p className="text-[14px] leading-relaxed text-[var(--sandstone-charcoal)]/65">
                    Sandstone&apos;s New Builds is redefining what new construction means in the Permian Basin. We bring premium materials, thoughtful floor plans, and attention to detail that goes well beyond the standard builder spec — delivering a home that looks and feels custom without the custom price tag.
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--sandstone-charcoal)]/65">
                    Our community&apos;s location in the Greenwood area puts residents within the boundaries of one of West Texas&apos;s most respected school districts, minutes from top medical care, and close to the everyday shopping and dining Midland has to offer.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)]">
                    Built for the Permian Basin Lifestyle
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--sandstone-charcoal)]/65">
                    Whether you&apos;re relocating for work, putting down roots for your family, or making a long-term investment in West Texas real estate, our homes offer something resale simply can&apos;t — brand-new construction built to your preferences, with no deferred maintenance and a full builder warranty from day one.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)]">
                    Who Are These Homes For?
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[var(--sandstone-charcoal)]/65">
                    Our new builds are an exceptional fit for:
                  </p>
                  <ul className="mt-3 space-y-2">
                    {[
                      "Families prioritizing Greenwood ISD and a close-knit school community",
                      "Permian Basin professionals and executives seeking a premium custom-quality home",
                      "Buyers who want new construction without compromise — on lot size, finishes, or location",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-[var(--sandstone-charcoal)]/65">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--sandstone-sand-gold)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-4 lg:w-[38%] lg:self-start lg:sticky lg:top-[116px]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={`${BASE}/entrance-sign.jpg`}
                    alt="Community entrance monument sign"
                    fill
                    sizes="(max-width: 1024px) 100vw, 38vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={`${BASE}/model/maribel-exterior.jpg`}
                    alt="Luxury new construction home exterior"
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
                Utilities &amp; Local Services
              </h2>
              <p className="mt-3 text-sm text-[var(--sandstone-charcoal)]/60">
                Utility providers may vary depending on the specific address and lot.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {UTILITIES.map(({ icon, title, provider, description, linkLabel, href }) => (
                <div key={title} className="flex flex-col items-center rounded-2xl bg-white p-5 text-center shadow-sm">
                  <div className="mb-4 h-20 w-20 overflow-hidden rounded-full">
                    <Image src={icon} alt="" width={80} height={80} className="object-cover" />
                  </div>
                  <h3 className="font-heading text-[15px] font-bold text-[var(--sandstone-navy)]">{title}</h3>
                  <p className="mt-1 text-[13px] font-semibold text-[var(--sandstone-sand-gold)]">{provider}</p>
                  <p className="mt-3 flex-1 text-[12px] leading-relaxed text-[var(--sandstone-charcoal)]/55">{description}</p>
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[var(--sandstone-navy)]/20 px-3 py-2.5 text-[12px] font-semibold text-[var(--sandstone-navy)] transition hover:border-[var(--sandstone-sand-gold)] hover:text-[var(--sandstone-sand-gold)]"
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
              Providers and availability may vary by specific address and subdivision phase.
            </p>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 items-start">
          <div className="mx-auto max-w-5xl px-4 lg:px-6">

            <div className="mb-10 text-center">
              <h2 className="font-heading text-3xl font-bold text-[var(--sandstone-navy)] md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-sm text-[var(--sandstone-charcoal)]/60">
                Common questions about our home models and the building process.
              </p>
              <p className="mt-1 text-sm text-[var(--sandstone-charcoal)]/60">
                Have more questions?{" "}
                <Link href="#contact" className="font-semibold text-[var(--sandstone-sand-gold)] hover:underline">
                  We&apos;re here to help.
                </Link>
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {FAQS.map(({ icon, q, a }) => (
                <details key={q} className="group rounded-2xl bg-white shadow-sm">
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

        {/* ── Contact Form ─────────────────────────────────────────────────── */}
        <LeadCaptureSection
          formType="contact"
          sectionId="contact"
          heading="Ready to Build with Sandstone?"
          subheading="Our team is ready to walk you through available lots, floor plan options, finish selections, and everything you need to make your new Sandstone home a reality. Reach out today."
          ctaLabel="Schedule a Consultation"
          messagePlaceholder="Tell us about your interest in our new builds..."
          mappingReference="sandstones-new-builds"
          asideEyebrow="Build. Belong. Thrive."
          asideTitle="Your Dream Home Starts Here"
          asideDescription="Schedule a consultation and get a personalized walkthrough of available lots, floor plan options, and the building process."
          asideCtaLabel="Schedule a Consultation"
          turnstileSiteKey={turnstileSiteKey}
        />

      </main>
      <SiteFooter />
    </>
  );
}
