import { LeadCaptureSection } from "@/components/LeadCaptureSection";
import { getTurnstileSiteKey } from "@/config";
import { CONTACT_CTA } from "@/constants/site";

export function ContactForm() {
  const turnstileSiteKey = getTurnstileSiteKey();

  return (
    <LeadCaptureSection
      formType="contact"
      sectionId="contact"
      heading="How Much Is Your Home Worth?"
      subheading="Share a few details and we'll help you plan your next move with confidence."
      ctaLabel={CONTACT_CTA}
      turnstileSiteKey={turnstileSiteKey}
    />
  );
}
