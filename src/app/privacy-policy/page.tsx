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
              {SMS_DISCLOSURE_BRAND} (&quot;Sandstone,&quot; &quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) respects your privacy and is committed to protecting your personal information. 
              This policy explains how we collect, use, disclose, store, and safeguard your information when you visit 
              our website, submit forms, or communicate with us by phone, email, or SMS.
            </p>
          </section>

          <section>
            <h2>1. Information We Collect</h2>
            <p>We collect personal information you voluntarily provide, including:</p>
            <ul>
              <li>Contact details such as full name, email address, and phone number.</li>
              <li>Property preferences, physical addresses, and communication preferences.</li>
              <li>SMS opt-in selections and any other information you voluntarily provide through contact forms or consultations.</li>
              <li>
                Technical data automatically collected via cookies, including IP addresses, browser types, 
                pages visited, and time spent on our site.
              </li>
            </ul>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>Responding to inquiries and providing requested real estate services.</li>
              <li>Scheduling appointments, consultations, and property showings.</li>
              <li>Sending confirmations, reminders, and transactional messages.</li>
              <li>
                Sending marketing communications only if you have explicitly opted in.
              </li>
              <li>Improving website functionality and ensuring legal compliance.</li>
            </ul>
          </section>

          <section>
            <h2>3. SMS Communications & Explicit Consent</h2>
            <p>
              We comply with TCPA, CTIA, and A2P 10DLC standards. Entering your phone number 
              alone does not authorize us to send text messages.
            </p>
            <ul>
              <li>
                We only send SMS to individuals who provide prior express written consent through a 
                clear, separate, and non-mandatory checkbox.
              </li>
              <li>Consent is not a condition of purchase, and checkboxes are never pre-checked.</li>
              <li>Marketing SMS consent is separate from transactional communications.</li>
              <li>Message frequency varies but typically does not exceed 2-8 messages per month for marketing.</li>
              <li>Message and data rates may apply.</li>
              <li><strong>Reply HELP for assistance or STOP to unsubscribe at any time.</strong></li>
            </ul>
          </section>

          <section>
            <h2>4. Data Sharing Statement</h2>
            <p>
              We do not sell, rent, or trade your personal information. 
            </p>
            <p>
              <strong>Mobile Privacy Clause:</strong> Mobile information and SMS opt-in data will not be shared, 
              sold, rented, or transferred to third parties or affiliates for marketing or promotional purposes. 
              We share data only with service providers necessary to deliver messaging services (such as GoHighLevel), 
              who are contractually required to safeguard your data.
            </p>
          </section>

          <section>
            <h2>5. Data Security & Your Rights</h2>
            <p>
              We implement technical and physical safeguards, including SSL encrypted connections and secure 
              hosting environments, to protect your data. 
            </p>
            <p>
              Under the Texas Data Privacy and Security Act (TDPSA), you may have the right to access, 
              correct, or request the deletion of your personal data. To exercise these rights, please contact us via email.
            </p>
          </section>

          <section>
            <h2>6. Contact Us</h2>
            <p>
              If you have questions about this policy or our privacy practices, please reach out:
            </p>
            <p>
              <strong>Email:</strong> <Link href={`mailto:${SITE_CONTACT.email}`}>{SITE_CONTACT.email}</Link><br />
              <strong>Phone:</strong> <Link href={`tel:${SITE_CONTACT.phoneRaw}`}>{SITE_CONTACT.phone}</Link>
            </p>
            <p>{SITE_ADDRESS.full}</p>
            <p>
              Review our{" "}
              <Link href={TERMS_AND_CONDITIONS_HREF}>
                {TERMS_AND_CONDITIONS_LABEL}
              </Link>{" "}
              for complete website and program terms.
            </p>
          </section>
        </LegalDocumentLayout>
      </main>
      <SiteFooter />
    </>
  );
}
