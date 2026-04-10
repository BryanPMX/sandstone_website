import { LeadCaptureSection } from "@/components/LeadCaptureSection";
import { getTurnstileSiteKey } from "@/config";
import { CONTACT_CTA } from "@/constants/site";

interface ContactFormProps {
  sectionId?: string;
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  leadSource?: string;
}

export function ContactForm({
  sectionId = "contact",
  heading = "How Much Is Your Home Worth?",
  subheading = "Share a few details and we'll help you plan your next move with confidence.",
  ctaLabel = CONTACT_CTA,
  leadSource,
}: ContactFormProps = {}) {
  const turnstileSiteKey = getTurnstileSiteKey();

  return (
    <LeadCaptureSection
      formType="contact"
      sectionId={sectionId}
      leadSource={leadSource}
      heading={heading}
      subheading={subheading}
      ctaLabel={ctaLabel}
      turnstileSiteKey={turnstileSiteKey}
    />
  );
}
