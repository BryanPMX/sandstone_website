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
              &quot;our&quot;) respects your privacy and is committed to protecting your personal information[cite: 3]. 
              This policy explains how we collect, use, disclose, store, and safeguard your information when you visit 
              our website, submit forms, or communicate with us by phone, email, or SMS[cite: 4].
            </p>
          </section>

          <section>
            <h2>Information We Collect</h2>
            <p>We collect information you voluntarily provide, such as[cite: 7, 8]:</p>
            <ul>
              <li>Full name, email address, and phone number[cite: 16, 17, 19].</li>
              <li>Property preferences, addresses, and communication preferences[cite: 20, 21].</li>
              <li>SMS opt-in selections and any other information you voluntarily provide through contact forms or consultations[cite: 22, 23].</li>
              <li>
                Technical data automatically collected via cookies, including IP addresses, browser types, 
                pages visited, and time spent on our site[cite: 24, 26, 28, 29, 30].
              </li>
            </ul>
          </section>

          <section>
            <h2>How We Use Your Information</h2>
            <ul>
              <li>Responding to inquiries and providing real estate services[cite: 35, 36].</li>
              <li>Scheduling appointments, consultations, and showings[cite: 11, 37].</li>
              <li>Sending confirmations, reminders, and transactional messages[cite: 38, 39].</li>
              <li>
                Sending marketing communications only if you have explicitly opted in[cite: 40].
              </li>
              <li>Improving website functionality and ensuring legal compliance[cite: 41, 42].</li>
            </ul>
          </section>

          <section>
            <h2>SMS Communications & Explicit Consent</h2>
            <p>
              We comply with TCPA, CTIA, and A2P 10DLC requirements[cite: 44]. Entering your phone number 
              alone does not constitute consent to receive text messages[cite: 50].
            </p>
            <ul>
              <li>
                We only send SMS to individuals who provide prior express written consent through a 
                clear, separate, and non-mandatory checkbox[cite: 46].
              </li>
              <li>Consent is not a condition of purchase, and checkboxes are never pre-checked[cite: 47, 48].</li>
              <li>Marketing SMS consent is separate from transactional communications[cite: 49].</li>
              <li>Message frequency varies but typically does not exceed 2-8 messages per month for marketing[cite: 60, 61].</li>
              <li>Message and data rates may apply[cite: 63].</li>
              <li><strong>Reply HELP for assistance or STOP to unsubscribe at any time[cite: 67, 68].</strong></li>
            </ul>
          </section>

          <section>
            <h2>Data Sharing & Privacy</h2>
            <p>
              We do not sell, rent, or trade your personal information[cite: 43]. 
            </p>
            <p>
              <strong>Carrier Requirement:</strong> Mobile information and SMS opt-in data will not be shared, 
              sold, rented, or transferred to third parties or affiliates for marketing or promotional purposes[cite: 73]. 
              We share data only with service providers necessary to deliver messaging services (such as GoHighLevel), 
              who are contractually required to safeguard your data[cite: 74, 78].
            </p>
          </section>

          <section>
            <h2>Data Security & Your Rights</h2>
            <p>
              We implement technical and physical safeguards, including SSL encrypted connections and secure 
              hosting environments, to protect your data[cite: 93, 94, 95].
            </p>
            <p>
              Under the Texas Data Privacy and Security Act (TDPSA), you may have the right to access, 
              correct, or request the deletion of your personal data[cite: 106, 107, 108, 109, 110].
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              Questions about this policy or our privacy practices can be sent to:
            </p>
            <p>
              <strong>Email:</strong> <Link href={`mailto:${SITE_CONTACT.email}`}>{SITE_CONTACT.email}</Link><br />
              <strong>Phone:</strong> <Link href={`tel:${SITE_CONTACT.phoneRaw}`}>{SITE_CONTACT.phone}</Link> [cite: 125, 126]
            </p>
            <p>{SITE_ADDRESS.full} [cite: 124]</p>
            <p>
              Review our{" "}
              <Link href={TERMS_AND_CONDITIONS_HREF}>
                {TERMS_AND_CONDITIONS_LABEL}
              </Link>{" "}
              for complete program terms.
            </p>
          </section>
        </LegalDocumentLayout>
      </main>
      <SiteFooter />
    </>
  );
}
