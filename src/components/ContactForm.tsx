import { LeadCaptureSection } from "@/components/LeadCaptureSection";
import { getTurnstileSiteKey } from "@/config";
import { CONTACT_CTA } from "@/constants/site";

type ContactFormProps = {
  heading?: string;
  subheading?: string;
};

export function ContactForm({
  heading = "How Much Is Your Home Worth?",
  subheading = "Share a few details and we'll help you plan your next move with confidence.",
}: ContactFormProps) {
  const turnstileSiteKey = getTurnstileSiteKey();

  return (
    <LeadCaptureSection
      formType="contact"
      sectionId="contact"
      heading={heading}
      subheading={subheading}
      ctaLabel={CONTACT_CTA}
      turnstileSiteKey={turnstileSiteKey}
    />
  );
}