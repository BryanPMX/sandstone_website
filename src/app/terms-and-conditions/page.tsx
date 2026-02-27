import Link from "next/link";
import { LegalDocumentLayout } from "@/components/LegalDocumentLayout";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  FOOTER_BRAND,
  PRIVACY_POLICY_HREF,
  PRIVACY_POLICY_LABEL,
  SITE_ADDRESS,
  SITE_CONTACT,
  SMS_DISCLOSURE_BRAND,
  TERMS_AND_CONDITIONS_LABEL,
} from "@/constants/site";

const LAST_UPDATED = "February 27, 2026";

export const metadata = {
  title: `${TERMS_AND_CONDITIONS_LABEL} | ${FOOTER_BRAND}`,
  description: `${TERMS_AND_CONDITIONS_LABEL} for ${FOOTER_BRAND}.`,
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--sandstone-off-white)]">
        <LegalDocumentLayout
          title={TERMS_AND_CONDITIONS_LABEL}
          summary={`These terms govern your use of the ${FOOTER_BRAND} website and describe the rules for our transactional and marketing SMS programs.`}
          lastUpdated={LAST_UPDATED}
        >
          <section>
            <p>
              These Terms and Conditions govern your access to and use of the
              {" "}{FOOTER_BRAND} website and any forms, listings, and messaging
              services offered by {SMS_DISCLOSURE_BRAND}. By using this site,
              you agree to these terms.
            </p>
          </section>

          <section>
            <h2>Website Use</h2>
            <ul>
              <li>
                You agree to use this site only for lawful purposes related to
                real estate information, inquiries, and services.
              </li>
              <li>
                Listing information and other site content are provided for
                general informational purposes and may change without notice.
              </li>
              <li>
                We may update, suspend, or remove site features at any time.
              </li>
            </ul>
          </section>

          <section>
            <h2>SMS Program Terms</h2>
            <p>
              {SMS_DISCLOSURE_BRAND} sends text messages only when you provide
              clear consent through the SMS options on our website forms.
            </p>
            <ul>
              <li>
                Transactional messages may include inquiry replies,
                appointment reminders, scheduling updates, and service
                notifications.
              </li>
              <li>
                Marketing or promotional messages are sent only if you
                separately opt in to marketing SMS.
              </li>
              <li>
                Consent to receive SMS is optional and is not required to submit
                an inquiry or use our services.
              </li>
              <li>Message frequency may vary.</li>
              <li>Message and data rates may apply.</li>
              <li>Reply HELP for help or STOP to opt out.</li>
              <li>
                Carriers are not liable for delayed or undelivered messages.
              </li>
            </ul>
          </section>

          <section>
            <h2>Privacy and Data Use</h2>
            <p>
              Your use of this site is also subject to our{" "}
              <Link href={PRIVACY_POLICY_HREF}>{PRIVACY_POLICY_LABEL}</Link>.
            </p>
            <p>
              Mobile opt-in data and SMS consent are not sold, rented, or
              shared with third parties or affiliates for their own marketing
              purposes. We may share that information only with providers that
              help us operate the messaging service, such as messaging
              platforms, vendors, and mobile carriers, or when required by law.
            </p>
          </section>

          <section>
            <h2>Intellectual Property and Content</h2>
            <ul>
              <li>
                Site text, branding, graphics, and media are owned by or
                licensed to {FOOTER_BRAND} and may not be copied or reused
                without permission.
              </li>
              <li>
                Property information is deemed reliable but is not guaranteed.
              </li>
            </ul>
          </section>

          <section>
            <h2>Disclaimer and Limitation of Liability</h2>
            <p>
              This site is provided on an &quot;as is&quot; and &quot;as
              available&quot; basis. We do not guarantee uninterrupted access,
              accuracy, or suitability for every use case.
            </p>
            <p>
              To the fullest extent permitted by law, {SMS_DISCLOSURE_BRAND} is
              not liable for indirect, incidental, or consequential damages
              arising from your use of the site or messaging services.
            </p>
          </section>

          <section>
            <h2>Contact Information</h2>
            <p>
              Questions about these terms or our SMS program can be sent to{" "}
              <Link href={`mailto:${SITE_CONTACT.email}`}>{SITE_CONTACT.email}</Link>{" "}
              or by calling{" "}
              <Link href={`tel:${SITE_CONTACT.phoneRaw}`}>{SITE_CONTACT.phone}</Link>.
            </p>
            <p>{SITE_ADDRESS.full}</p>
          </section>
        </LegalDocumentLayout>
      </main>
      <SiteFooter />
    </>
  );
}
