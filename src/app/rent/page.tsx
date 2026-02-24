import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LeadCaptureSection } from "@/components/LeadCaptureSection";
import { LeadPageIntro } from "@/components/LeadPageIntro";

export const metadata = {
  title: "Rent My House | Sandstone Real Estate Group",
  description: "Rental expertise in El Paso. We help landlords and tenants find the right fit.",
};

export default function RentPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--sandstone-off-white)]">
        <LeadPageIntro
          eyebrow="Sandstone Rental Services"
          title="Rent My House"
          description="Whether you&apos;re listing a rental or optimizing an existing one, we bring trusted guidance and a streamlined leasing approach."
          highlights={[
            "Rental Positioning",
            "Tenant Quality Focus",
            "Leasing Support",
          ]}
        />

        <LeadCaptureSection
          formType="rent"
          sectionId="rent-lead"
          heading="Rent My House"
          subheading="Share your rental goals and property details, and we&apos;ll help you map the next steps."
          showHeader={false}
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
