import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LeadCaptureSection } from "@/components/LeadCaptureSection";

export const metadata = {
  title: "Rent My House | Sandstone Real Estate Group",
  description: "Rental expertise in El Paso. We help landlords and tenants find the right fit.",
};

export default function RentPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--sandstone-off-white)]">
        <section className="px-4 pb-6 pt-16">
          <div className="container mx-auto max-w-2xl text-center">
            <h1 className="font-heading text-3xl font-bold text-[var(--sandstone-charcoal)] md:text-4xl">
              Rent My House
            </h1>
            <p className="mt-4 text-[var(--sandstone-charcoal)]/80">
              Whether you&apos;re listing a rental or optimizing an existing one, we bring trusted guidance and a streamlined leasing approach.
            </p>
          </div>
        </section>

        <LeadCaptureSection
          formType="rent"
          sectionId="rent-lead"
          heading="Rent My House"
          subheading="Share your rental goals and property details, and we&apos;ll help you map the next steps."
          ctaLabel="START MY RENTAL CONSULTATION"
          messagePlaceholder="Tell us about the rental property, availability, and what kind of support you need..."
          asideTitle="Rent Smarter, Not Harder"
          asideDescription="We help landlords protect value, attract qualified tenants, and create a smooth leasing experience."
        />
      </main>
      <SiteFooter />
    </>
  );
}
