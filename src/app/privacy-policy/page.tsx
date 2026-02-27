import Link from "next/link";
import { LegalDocumentLayout } from "@/components/LegalDocumentLayout";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  FOOTER_BRAND,
  PRIVACY_POLICY_LABEL,
  SITE_ADDRESS,
  SITE_CONTACT,
  SMS_DISCLOSURE_BRAND,
  TERMS_AND_CONDITIONS_HREF,
  TERMS_AND_CONDITIONS_LABEL,
} from "@/constants/site";

const LAST_UPDATED = "February 27, 2026";

export const metadata = {
  title: `${PRIVACY_POLICY_LABEL} | ${FOOTER_BRAND}`,
  description: `${PRIVACY_POLICY_LABEL} for ${FOOTER_BRAND}.`,
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--sandstone-off-white)]">
        <LegalDocumentLayout
          title={PRIVACY_POLICY_LABEL}
          summary={`This policy explains how ${SMS_DISCLOSURE_BRAND} collects, uses, protects, and shares information submitted through our website and forms, including SMS opt-in choices.`}
          lastUpdated={LAST_UPDATED}
        >
          <section>
            <p>
              {SMS_DISCLOSURE_BRAND} (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) collects personal information when you browse
              our website, submit a form, request real estate services, or opt
              into text messages. By using the site, you acknowledge the
              practices described in this policy.
            </p>
          </section>

          <section>
            <h2>Information We Collect</h2>
            <ul>
              <li>
                Contact details you provide, such as your name, email address,
                phone number, property address, and message content.
              </li>
              <li>
                Inquiry details related to buying, selling, renting, or joining
                our team.
              </li>
              <li>
                Technical information such as IP address, browser type, device
                data, and general site usage information collected through
                cookies or analytics tools.
              </li>
              <li>
                Your SMS consent selections, including whether you opted into
                transactional text messages, marketing text messages, or both.
              </li>
            </ul>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <ul>
              <li>Respond to your inquiries and provide requested services.</li>
              <li>
                Schedule consultations, property tours, showings, and follow-up
                communications.
              </li>
              <li>
                Send transactional updates about your inquiry, appointments, or
                service-related activity when you opt in to SMS.
              </li>
              <li>
                Send promotional or marketing text messages only if you provide
                separate marketing consent.
              </li>
              <li>
                Improve site performance, security, and the user experience.
              </li>
            </ul>
          </section>

          <section>
            <h2>SMS Consent and Messaging</h2>
            <p>
              Entering your phone number alone does not authorize us to send
              text messages. We collect SMS consent only through the separate,
              unchecked SMS options shown on our forms.
            </p>
            <ul>
              <li>
                Transactional messages may include inquiry follow-ups,
                appointment reminders, scheduling updates, and service
                notifications.
              </li>
              <li>
                Marketing messages include promotional and advertising content
                and are sent only if you separately opt in.
              </li>
              <li>Message frequency may vary.</li>
              <li>Message and data rates may apply.</li>
              <li>Reply HELP for help or STOP to opt out at any time.</li>
            </ul>
          </section>

          <section>
            <h2>How We Share Information</h2>
            <p>
              We do not sell or rent your personal information. We may share
              information with trusted service providers that support our
              website, CRM, hosting, analytics, or communications operations,
              and with legal authorities when required by law.
            </p>
            <p>
              Mobile opt-in data and SMS consent are not shared with third
              parties or affiliates for their own marketing or promotional
              purposes. We share that information only with providers that help
              us deliver text messages, such as messaging platforms and mobile
              carriers, or when disclosure is legally required.
            </p>
          </section>

          <section>
            <h2>Your Choices</h2>
            <ul>
              <li>
                You may opt out of marketing emails by using the unsubscribe
                link in the message.
              </li>
              <li>
                You may opt out of text messages at any time by replying STOP.
              </li>
              <li>
                You may request updates or deletion of your information by
                contacting us directly.
              </li>
            </ul>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              Questions about this policy or our messaging practices can be
              sent to <Link href={`mailto:${SITE_CONTACT.email}`}>{SITE_CONTACT.email}</Link>{" "}
              or by calling{" "}
              <Link href={`tel:${SITE_CONTACT.phoneRaw}`}>{SITE_CONTACT.phone}</Link>.
            </p>
            <p>{SITE_ADDRESS.full}</p>
            <p>
              Review our{" "}
              <Link href={TERMS_AND_CONDITIONS_HREF}>
                {TERMS_AND_CONDITIONS_LABEL}
              </Link>{" "}
              for the complete website and SMS program terms.
            </p>
          </section>
        </LegalDocumentLayout>
      </main>
      <SiteFooter />
    </>
  );
}
