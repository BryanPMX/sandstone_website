import { LeadCaptureSection } from "@/components/LeadCaptureSection";
import { getTurnstileSiteKey } from "@/config";
import { CONTACT_CTA } from "@/constants/site";

type ContactFormProps = {
  heading?: string;
  subheading?: string;
};

export function ContactForm({
  heading = "Find Out How Much Your Home Is Worth?",
  subheading = "Enter your property information and our team will prepare a personalized home-value estimate.",
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