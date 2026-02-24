import { LeadCaptureSection } from "@/components/LeadCaptureSection";
import { CONTACT_CTA } from "@/constants/site";

export function ContactForm() {
  return (
    <LeadCaptureSection
      formType="contact"
      sectionId="contact"
      heading="How Much Is Your Home Worth?"
      subheading="Share a few details and we'll help you plan your next move with confidence."
      ctaLabel={CONTACT_CTA}
    />
  );
}
