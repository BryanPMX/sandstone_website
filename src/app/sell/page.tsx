import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LeadCaptureSection } from "@/components/LeadCaptureSection";

export const metadata = {
  title: "Sell My House | Sandstone Real Estate Group",
  description: "Sell your home with confidence. Strategy-first guidance and cinematic marketing in El Paso.",
};

export default function SellPage() {
  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />
      <main className="min-h-screen">
        <LeadCaptureSection
          formType="sell"
          sectionId="sell-lead"
          heading="Sell a Property"
          subheading="Tell us about your property and timeline, and we&apos;ll reach out with a tailored selling strategy."
          showAside={false}
          hero
          heroBackgroundUrl="/hero1.webp"
          ctaLabel="REQUEST A SELLER CONSULTATION"
          messagePlaceholder="Share your address, timing, and any details about the property..."
        />

        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="font-heading text-3xl font-bold text-[var(--sandstone-navy)] sm:text-4xl">
              Marketing Excellence
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[var(--sandstone-charcoal)]/80">
              High-end, modern marketing to showcase your home to the world.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <article className="rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white p-4 shadow-[0_10px_20px_-8px_rgba(37,52,113,0.20)]">
                <img src="/Sell_A_Property_Imgs/sandstone-video.webp" alt="Professional Video" className="h-44 w-full rounded-xl object-cover" />
                <h3 className="mt-4 text-xl font-semibold text-[var(--sandstone-navy)]">Professional Video</h3>
                <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/85">
                  Cinematic, high-definition videos that capture the essence of your property.
                </p>
              </article>

              <article className="rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white p-4 shadow-[0_10px_20px_-8px_rgba(37,52,113,0.20)]">
                <img src="/Sell_A_Property_Imgs/sandstone-video-2.webp" alt="Drones" className="h-44 w-full rounded-xl object-cover" />
                <h3 className="mt-4 text-xl font-semibold text-[var(--sandstone-navy)]">Drones</h3>
                <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/85">
                  Aerial footage provides a breathtaking perspective of your home’s exterior.
                </p>
              </article>

              <article className="rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white p-4 shadow-[0_10px_20px_-8px_rgba(37,52,113,0.20)]">
                <img src="/Sell_A_Property_Imgs/sandstone-video-3.webp" alt="Global Reach" className="h-44 w-full rounded-xl object-cover" />
                <h3 className="mt-4 text-xl font-semibold text-[var(--sandstone-navy)]">Global Reach</h3>
                <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/85">
                  Your property will be promoted to our international network of qualified buyers.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-[var(--sandstone-off-white)] py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 lg:grid lg:grid-cols-2 lg:items-center lg:gap-10">
            <img src="/Sell_A_Property_Imgs/sandstone-sellers-banner1.webp" alt="Listing Presentation" className="rounded-2xl object-cover w-full shadow-lg" />
            <div className="mt-8 lg:mt-0">
              <h3 className="text-3xl font-bold text-[var(--sandstone-navy)]">Download Our Exclusive Marketing Plan</h3>
              <p className="mt-4 text-base text-[var(--sandstone-charcoal)]/85">
                Get our proven strategies to sell your home for top dollar. This complete guide outlines our signature listing plan and digital marketing system.
              </p>
              <button className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--sandstone-sand-gold)] px-7 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-95">
                Download PDF
              </button>
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-[var(--sandstone-navy)] sm:text-4xl">Our Process</h2>
              <p className="mx-auto mt-3 max-w-2xl text-base text-[var(--sandstone-charcoal)]/80">
                A strategic, step-by-step approach designed to maximize your home’s value and simplify your experience from day one to closing.
              </p>
            </div>

            <ul className="mt-10 grid grid-cols-2 gap-4">
              <li className="flex items-start gap-3 rounded-2xl border border-[#dce3f1] bg-[var(--sandstone-off-white)] p-5 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[var(--sandstone-navy)] text-sm font-bold text-white">1</span>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--sandstone-navy)]">Listing</h3>
                  <p className="mt-1 text-sm text-[var(--sandstone-charcoal)]">We start with a strategic market analysis and professional staging to price your home perfectly, ensuring maximum interest and top-dollar returns from day one.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 rounded-2xl border border-[#dce3f1] bg-[var(--sandstone-off-white)] p-5 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[var(--sandstone-navy)] text-sm font-bold text-white">2</span>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--sandstone-navy)]">Marketing</h3>
                  <p className="mt-1 text-sm text-[var(--sandstone-charcoal)]">We transform your home into a premium digital experience using cinematic video and global social targeting to reach the most qualified buyers everywhere.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 rounded-2xl border border-[#dce3f1] bg-[var(--sandstone-off-white)] p-5 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[var(--sandstone-navy)] text-sm font-bold text-white">3</span>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--sandstone-navy)]">Negotiation</h3>
                  <p className="mt-1 text-sm text-[var(--sandstone-charcoal)]">We aggressively defend your home’s value, expertly managing multiple offers and complex terms to secure the highest price and most favorable conditions.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 rounded-2xl border border-[#dce3f1] bg-[var(--sandstone-off-white)] p-5 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-[var(--sandstone-navy)] text-sm font-bold text-white">4</span>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--sandstone-navy)]">Closing</h3>
                  <p className="mt-1 text-sm text-[var(--sandstone-charcoal)]">We manage every detail, from inspections to final paperwork, ensuring a stress-free transition so you can focus on your next move with total peace of mind.</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-16 lg:py-20 text-black">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">Recently Sold</h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600">Homes we’ve sold quickly and for strong results.</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <img src="/Sell_A_Property_Imgs/sandstone-sellers-house1.webp" alt="Recently sold home 1" className="h-52 w-full rounded-xl object-cover" />
              <img src="/Sell_A_Property_Imgs/sandstone-sellers-house2.webp" alt="Recently sold home 2" className="h-52 w-full rounded-xl object-cover" />
              <img src="/Sell_A_Property_Imgs/sandstone-hero-1.webp" alt="Recently sold home 3" className="h-52 w-full rounded-xl object-cover" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
