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
  description: `Review the ${TERMS_AND_CONDITIONS_LABEL} governing use of the ${FOOTER_BRAND} website, real estate services, and SMS communications.`,
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />

      <main className="min-h-screen bg-[var(--sandstone-off-white)]">
        <LegalDocumentLayout
          title={TERMS_AND_CONDITIONS_LABEL}
          summary={`These terms govern your use of the ${FOOTER_BRAND} website, forms, real estate information, and messaging services, including transactional and marketing SMS communications.`}
          lastUpdated={LAST_UPDATED}
        >
          <section>
            <p>
              These Terms and Conditions (&quot;Terms&quot;) govern your access
              to and use of the {FOOTER_BRAND} website, including its forms,
              property information, communications, and services offered by{" "}
              {SMS_DISCLOSURE_BRAND} (&quot;Sandstone,&quot; &quot;we,&quot;
              &quot;us,&quot; or &quot;our&quot;).
            </p>

            <p>
              By accessing or using this website, you agree to these Terms. If
              you do not agree with these Terms, please discontinue use of the
              website.
            </p>
          </section>

          <section>
            <h2>1. Website Use</h2>

            <p>
              You may use this website for lawful purposes related to real
              estate information, inquiries, services, and communication with
              our team.
            </p>

            <p>You agree not to:</p>

            <ul>
              <li>
                Use the website in a manner that violates applicable laws or
                regulations.
              </li>

              <li>
                Attempt to gain unauthorized access to the website, its systems,
                accounts, or connected services.
              </li>

              <li>
                Interfere with the operation, security, availability, or
                performance of the website.
              </li>

              <li>
                Use automated tools to copy, scrape, or extract website content
                except as permitted by law or with our authorization.
              </li>

              <li>
                Submit false, misleading, fraudulent, or unlawful information
                through our forms or services.
              </li>
            </ul>

            <p>
              We may modify, suspend, restrict, or discontinue any portion of
              the website at any time.
            </p>
          </section>

          <section>
            <h2>2. Real Estate Information</h2>

            <p>
              Property listings, market information, pricing, availability,
              photographs, descriptions, and other real estate information
              displayed on this website are provided for general informational
              purposes.
            </p>

            <p>
              Information may be supplied by third parties and may change
              without notice. Although we aim to provide accurate and current
              information, property information is deemed reliable but is not
              guaranteed.
            </p>

            <p>
              Website content does not constitute a guarantee that a property
              remains available or that any transaction will be completed on
              particular terms.
            </p>
          </section>

          <section>
            <h2>3. Forms and Inquiries</h2>

            <p>
              When you submit a contact form, request information, schedule a
              consultation, or otherwise communicate with us, you agree that
              the information you provide is accurate to the best of your
              knowledge.
            </p>

            <p>
              Submitting an inquiry does not create a contractual, agency,
              brokerage, or other professional relationship unless such a
              relationship is separately established through an applicable
              written agreement.
            </p>
          </section>

          <section>
            <h2>4. SMS Program Terms</h2>

            <p>
              {SMS_DISCLOSURE_BRAND} may offer transactional and marketing SMS
              communications. Text messages are sent only in accordance with
              the consent choices presented when you provide your phone number.
            </p>

            <h3>Transactional Messages</h3>

            <p>
              Transactional messages may include responses to inquiries,
              appointment confirmations, reminders, scheduling updates,
              property-related communications, and service notifications.
            </p>

            <h3>Marketing Messages</h3>

            <p>
              Marketing or promotional text messages are sent only when you
              provide the applicable marketing SMS consent.
            </p>

            <ul>
              <li>
                Consent to receive marketing text messages is optional and is
                not a condition of purchasing goods or services.
              </li>

              <li>Message frequency may vary.</li>

              <li>Message and data rates may apply.</li>

              <li>
                Reply <strong>STOP</strong> to opt out of SMS communications.
              </li>

              <li>
                Reply <strong>HELP</strong> for assistance.
              </li>

              <li>
                Wireless carriers are not liable for delayed or undelivered
                messages.
              </li>
            </ul>

            <p>
              Your mobile carrier&apos;s messaging and data terms may also
              apply.
            </p>
          </section>

          <section>
            <h2>5. Privacy and Data Use</h2>

            <p>
              Your use of this website is also subject to our{" "}
              <Link href={PRIVACY_POLICY_HREF}>{PRIVACY_POLICY_LABEL}</Link>,
              which explains how we collect, use, protect, and disclose
              information.
            </p>

            <p>
              Mobile information and SMS opt-in data are not sold, rented, or
              shared with third parties or affiliates for their independent
              marketing or promotional purposes.
            </p>

            <p>
              We may provide information to service providers, messaging
              platforms, telecommunications providers, and other vendors when
              necessary to operate or deliver our services, or when disclosure
              is required by law.
            </p>
          </section>

          <section>
            <h2>6. Intellectual Property</h2>

            <p>
              Unless otherwise indicated, website content including text,
              branding, graphics, logos, photographs, designs, and other
              materials is owned by or licensed to {FOOTER_BRAND} and is
              protected by applicable intellectual property laws.
            </p>

            <p>
              You may view and use website content for personal,
              non-commercial purposes. You may not reproduce, distribute,
              modify, publish, sell, or commercially exploit protected content
              without authorization from the applicable rights holder.
            </p>
          </section>

          <section>
            <h2>7. Third-Party Services and Links</h2>

            <p>
              Our website may contain links to third-party websites, property
              platforms, mapping services, social networks, or other external
              services.
            </p>

            <p>
              We do not control third-party websites or services and are not
              responsible for their content, availability, security, terms, or
              privacy practices. Your use of third-party services is subject to
              the terms and policies of those providers.
            </p>
          </section>

          <section>
            <h2>8. Disclaimer of Warranties</h2>

            <p>
              The website and its content are provided on an &quot;as is&quot;
              and &quot;as available&quot; basis to the extent permitted by
              applicable law.
            </p>

            <p>
              We do not guarantee that the website will always be available,
              uninterrupted, error-free, secure, or that all information
              displayed on the website will always be complete or current.
            </p>
          </section>

          <section>
            <h2>9. Limitation of Liability</h2>

            <p>
              To the fullest extent permitted by applicable law,{" "}
              {SMS_DISCLOSURE_BRAND} and its service providers will not be
              liable for indirect, incidental, special, consequential, or
              similar damages arising from or related to your use of, or
              inability to use, the website or messaging services.
            </p>

            <p>
              Nothing in these Terms excludes or limits liability where doing
              so would not be permitted by applicable law.
            </p>
          </section>

          <section>
            <h2>10. Changes to These Terms</h2>

            <p>
              We may update these Terms periodically to reflect changes to our
              website, services, business practices, or legal requirements.
            </p>

            <p>
              Updated Terms will be posted on this page with a revised
              &quot;Last updated&quot; date. Your continued use of the website
              after updated Terms become effective constitutes acceptance of
              those Terms to the extent permitted by law.
            </p>
          </section>

          <section>
            <h2>11. Contact Us</h2>

            <p>
              Questions about these Terms, the website, or our SMS program may
              be directed to:
            </p>

            <address className="mt-3 not-italic">
              <strong>{FOOTER_BRAND}</strong>
              <br />

              {SITE_ADDRESS.full}
              <br />

              <strong>Email:</strong>{" "}
              <Link href={`mailto:${SITE_CONTACT.email}`}>
                {SITE_CONTACT.email}
              </Link>
              <br />

              <strong>Phone:</strong>{" "}
              <Link href={`tel:${SITE_CONTACT.phoneRaw}`}>
                {SITE_CONTACT.phone}
              </Link>
            </address>

            <p>
              Please review our{" "}
              <Link href={PRIVACY_POLICY_HREF}>{PRIVACY_POLICY_LABEL}</Link> for
              information about our privacy and data-handling practices.
            </p>
          </section>
        </LegalDocumentLayout>
      </main>

      <SiteFooter />
    </>
  );
}