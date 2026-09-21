import { LeadCaptureSection } from "@/components/LeadCaptureSection";
import { getTurnstileSiteKey } from "@/config";
import { CONTACT_CTA } from "@/constants/site";

type ContactFormProps = {
  heading?: string;
  subheading?: string;
};

export function ContactForm({
  heading = "Have a Question or Ready to Get Started?",
  subheading = "Tell us a bit about what you're looking for — buying, selling, renting, or just exploring — and our team will follow up personally.",
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