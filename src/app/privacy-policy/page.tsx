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

const LAST_UPDATED = "July 30, 2026";

export const metadata = {
  title: `${PRIVACY_POLICY_LABEL} | ${FOOTER_BRAND}`,
  description: `Learn how ${FOOTER_BRAND} collects, uses, protects, and manages personal information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />

      <main className="min-h-screen bg-[var(--sandstone-off-white)]">
        <LegalDocumentLayout
          title={PRIVACY_POLICY_LABEL}
          summary={`This Privacy Policy explains how ${SMS_DISCLOSURE_BRAND} collects, uses, protects, and shares information when you use our website, submit a form, or communicate with us.`}
          lastUpdated={LAST_UPDATED}
        >
          <section>
            <p>
              {SMS_DISCLOSURE_BRAND} (&quot;Sandstone,&quot; &quot;we,&quot;
              &quot;us,&quot; or &quot;our&quot;) respects your privacy and is
              committed to protecting the personal information you provide to
              us.
            </p>

            <p>
              This Privacy Policy describes the types of information we may
              collect, how we use that information, when it may be disclosed,
              and the choices available to you when you interact with our
              website, forms, real estate services, email communications, and
              SMS messaging programs.
            </p>
          </section>

          <section>
            <h2>1. Information We Collect</h2>

            <p>
              We may collect information that you voluntarily provide to us,
              including:
            </p>

            <ul>
              <li>
                Your name, email address, phone number, and other contact
                information.
              </li>

              <li>
                Property interests, preferences, addresses, and information
                related to your real estate inquiry.
              </li>

              <li>
                Appointment, consultation, or property-showing information.
              </li>

              <li>
                Communication preferences, including SMS opt-in selections.
              </li>

              <li>
                Information you include in forms, messages, emails, or other
                communications with us.
              </li>
            </ul>

            <h3>Information Collected Automatically</h3>

            <p>
              When you use our website, certain technical information may be
              collected automatically through cookies and similar
              technologies. This may include your IP address, browser type,
              device information, pages viewed, referring pages, and general
              website usage information.
            </p>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>

            <p>We may use the information we collect to:</p>

            <ul>
              <li>Respond to inquiries and requests for information.</li>

              <li>
                Provide real estate services, property information, and
                assistance requested by you.
              </li>

              <li>
                Schedule consultations, appointments, and property showings.
              </li>

              <li>
                Send confirmations, reminders, service updates, and other
                transactional communications.
              </li>

              <li>
                Send marketing communications when you have provided the
                appropriate consent.
              </li>

              <li>
                Maintain, operate, secure, and improve our website and services.
              </li>

              <li>
                Comply with applicable legal, regulatory, and operational
                requirements.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. SMS Communications and Consent</h2>

            <p>
              Providing a phone number through our website does not, by itself,
              constitute consent to receive marketing text messages.
            </p>

            <p>
              Where SMS consent is requested, the applicable form will provide
              information about the type of messages you may receive and allow
              you to make the appropriate opt-in selection.
            </p>

            <ul>
              <li>
                SMS consent is optional and is not a condition of purchasing
                goods or services.
              </li>

              <li>
                Marketing SMS consent is obtained separately from other form
                submissions where applicable.
              </li>

              <li>SMS consent selections are not pre-checked.</li>

              <li>Message frequency may vary.</li>

              <li>Message and data rates may apply.</li>

              <li>
                Reply <strong>HELP</strong> for assistance or{" "}
                <strong>STOP</strong> to opt out of text messages.
              </li>
            </ul>
          </section>

          <section>
            <h2>4. How We Share Information</h2>

            <p>
              We do not sell or rent your personal information for third-party
              marketing purposes.
            </p>

            <p>
              We may share information with service providers that perform
              services on our behalf, such as website hosting, customer
              relationship management, communications, analytics, and
              messaging services.
            </p>

            <h3>Mobile Information and SMS Consent</h3>

            <p>
              Mobile information and SMS opt-in data are not sold, rented, or
              shared with third parties or affiliates for their independent
              marketing or promotional purposes.
            </p>

            <p>
              Information may be provided to service providers, messaging
              platforms, telecommunications providers, or other vendors when
              necessary to operate and deliver our messaging services.
            </p>

            <p>
              We may also disclose information when required by law, legal
              process, regulation, or governmental request.
            </p>
          </section>

          <section>
            <h2>5. Cookies and Website Analytics</h2>

            <p>
              Our website may use cookies and similar technologies to remember
              preferences, understand how visitors use the site, improve
              performance, and measure website activity.
            </p>

            <p>
              You may be able to control or disable cookies through your browser
              settings. Disabling certain cookies may affect the functionality
              of some portions of the website.
            </p>
          </section>

          <section>
            <h2>6. Data Security</h2>

            <p>
              We use reasonable administrative, technical, and organizational
              safeguards designed to protect personal information from
              unauthorized access, disclosure, alteration, or destruction.
            </p>

            <p>
              No internet transmission or electronic storage system can be
              guaranteed to be completely secure, and we cannot guarantee the
              absolute security of information transmitted through our website.
            </p>
          </section>

          <section>
            <h2>7. Your Privacy Choices</h2>

            <p>
              Depending on your location and applicable law, you may have
              certain rights regarding your personal information, including the
              ability to request access to, correction of, or deletion of
              certain information.
            </p>

            <p>
              You may also unsubscribe from marketing emails through the
              unsubscribe option provided in those messages and opt out of SMS
              communications by replying <strong>STOP</strong>.
            </p>

            <p>
              To submit a privacy-related request, contact us using the
              information below.
            </p>
          </section>

          <section>
            <h2>8. Third-Party Services and Links</h2>

            <p>
              Our website may contain links to websites or services operated by
              third parties. Their privacy practices are governed by their own
              policies, and we are not responsible for the privacy practices or
              content of third-party services.
            </p>
          </section>

          <section>
            <h2>9. Changes to This Privacy Policy</h2>

            <p>
              We may update this Privacy Policy periodically to reflect changes
              to our practices, services, or legal requirements.
            </p>

            <p>
              When changes are made, the updated version will be posted on this
              page with a revised &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2>10. Contact Us</h2>

            <p>
              For questions about this Privacy Policy, our privacy practices, or
              your personal information, contact us at:
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
              Please also review our{" "}
              <Link href={TERMS_AND_CONDITIONS_HREF}>
                {TERMS_AND_CONDITIONS_LABEL}
              </Link>{" "}
              for additional website and messaging program terms.
            </p>
          </section>
        </LegalDocumentLayout>
      </main>

      <SiteFooter />
    </>
  );
}