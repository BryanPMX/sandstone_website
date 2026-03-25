import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LeadCaptureSection } from "@/components/LeadCaptureSection";

const marketingFeatures = [
  {
    title: "Professional Video",
    description:
      "Cinematic, high-definition videos that capture the character, flow, and value of your property.",
    image: "/Sell_A_Property_Imgs/sandstone-video.webp",
    alt: "Interior video production setup inside a luxury home",
  },
  {
    title: "Drone Coverage",
    description:
      "Aerial footage adds context, scale, and curb-appeal moments that static photography cannot match.",
    image: "/Sell_A_Property_Imgs/sandstone-video-2.webp",
    alt: "Drone footage capturing the exterior of a listed home",
  },
  {
    title: "Global Reach",
    description:
      "Your home is positioned across digital channels and qualified buyer networks to maximize visibility.",
    image: "/Sell_A_Property_Imgs/sandstone-video-3.webp",
    alt: "Luxury home marketing visual representing international reach",
  },
] as const;

const sellerProcess = [
  {
    step: "1",
    title: "Listing Strategy",
    description:
      "We begin with pricing, presentation, and positioning so your home enters the market with confidence and leverage.",
  },
  {
    step: "2",
    title: "Launch Marketing",
    description:
      "We package the home with elevated visuals and targeted exposure designed to attract serious buyers quickly.",
  },
  {
    step: "3",
    title: "Negotiation",
    description:
      "We manage offers, terms, and timing with a clear focus on protecting value and reducing friction.",
  },
  {
    step: "4",
    title: "Closing Support",
    description:
      "From inspections through final signatures, we coordinate the details so your sale stays smooth and on track.",
  },
] as const;

const recentlySoldHomes = [
  {
    image: "/Sell_A_Property_Imgs/sandstone-sellers-house1.webp",
    alt: "Recently sold Sandstone home exterior",
  },
  {
    image: "/Sell_A_Property_Imgs/sandstone-sellers-house2.webp",
    alt: "Recently sold Sandstone property with front entry",
  },
  {
    image: "/Sell_A_Property_Imgs/sandstone-hero-1.webp",
    alt: "Recently sold luxury home represented by Sandstone",
  },
] as const;

export const metadata = {
  title: "Sell My Home | Sandstone Real Estate Group",
  description:
    "Sell your home with confidence. Strategy-first guidance and cinematic marketing in El Paso.",
};

export default function SellPage() {
  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />
      <main className="min-h-screen bg-[var(--sandstone-off-white)]">
        <LeadCaptureSection
          formType="sell"
          sectionId="sell-lead"
          heading="Sell My Home"
          headingTag="h1"
          subheading="Tell us about your property and timeline, and we&apos;ll reach out with a tailored selling strategy."
          showAside={false}
          hero
          heroBackgroundUrl="/Sell_A_Property_Imgs/hero1.webp"
          heroCtaLabel="See Our Marketing Plan"
          heroCtaHref="#seller-plan"
          ctaLabel="REQUEST A SELLER CONSULTATION"
          messagePlaceholder="Share your address, timing, and any details about the property..."
        />

        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="font-heading text-3xl font-bold text-[var(--sandstone-navy)] sm:text-4xl">
              Marketing Excellence
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[var(--sandstone-charcoal)]/80">
              A premium presentation strategy designed to help your home stand
              out from the first impression forward.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {marketingFeatures.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white p-4 shadow-[0_10px_20px_-8px_rgba(37,52,113,0.20)]"
                >
                  <div className="relative h-44 overflow-hidden rounded-xl">
                    <Image
                      src={feature.image}
                      alt={feature.alt}
                      fill
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-[var(--sandstone-navy)]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/85">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="seller-plan"
          className="bg-[var(--sandstone-off-white)] py-14 sm:py-16 lg:py-20"
        >
          <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-2 lg:items-center lg:gap-10">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/Sell_A_Property_Imgs/sandstone-sellers-banner1.webp"
                alt="Sandstone listing presentation for home sellers"
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="font-heading text-3xl font-bold text-[var(--sandstone-navy)]">
                Request Our Exclusive Marketing Plan
              </h2>
              <p className="mt-4 text-base text-[var(--sandstone-charcoal)]/85">
                We&apos;ll walk you through the strategy we use to position homes
                for strong offers, standout exposure, and a smoother selling
                experience.
              </p>
              <p className="mt-3 text-sm text-[var(--sandstone-charcoal)]/72">
                Share your property details and we&apos;ll send the right next
                steps with your consultation.
              </p>
              <Link
                href="#sell-lead"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--sandstone-sand-gold)] px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-95"
              >
                Request the Full Marketing Plan
              </Link>
            </div>
          </div>
        </section>

        <section
          id="seller-process"
          className="bg-white py-14 sm:py-16 lg:py-20"
        >
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-[var(--sandstone-navy)] sm:text-4xl">
                Our Process
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-base text-[var(--sandstone-charcoal)]/80">
                A strategic, step-by-step approach designed to maximize value
                and simplify the path from listing day to closing day.
              </p>
            </div>

            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              {sellerProcess.map((item) => (
                <li
                  key={item.step}
                  className="flex items-start gap-3 rounded-2xl border border-[#dce3f1] bg-[var(--sandstone-off-white)] p-5 shadow-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[var(--sandstone-navy)] text-sm font-bold text-white">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--sandstone-navy)]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--sandstone-charcoal)]">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white py-14 text-black sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">
              Recently Sold
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600">
              Homes we&apos;ve represented with a strategy built for strong
              results.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recentlySoldHomes.map((home) => (
                <div
                  key={home.image}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl"
                >
                  <Image
                    src={home.image}
                    alt={home.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
