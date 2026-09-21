"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

export function FloatingWhatsAppBubble() {
  const phoneNumber = "9152776707";

  const whatsappHref = `https://wa.me/1${phoneNumber}?text=${encodeURIComponent(
    "Hi, I would like more information about your listings."
  )}`;

  // The fixed mobile "Call" bubble sits in the bottom-right corner of the
  // viewport. On pages with a lead-capture form (id="contact"), that same
  // corner is where the SMS-consent text and submit button end up once the
  // user scrolls that far — the bubble was visually covering them. Hide the
  // bubble while the contact form is in view so it never overlaps the form.
  const [hideForContactForm, setHideForContactForm] = useState(false);

  useEffect(() => {
    const contactSection = document.getElementById("contact");

    if (!contactSection || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setHideForContactForm(entry.isIntersecting),
      // Only react once the lower portion of the form (where the bubble
      // would overlap) scrolls into the lower part of the viewport.
      { rootMargin: "0px 0px -15% 0px", threshold: 0 }
    );

    observer.observe(contactSection);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Mobile Only Call Button */}
      <Link
        href={`tel:${phoneNumber}`}
        aria-label="Call Sandstone Real Estate"
        title="Call Sandstone"
        aria-hidden={hideForContactForm}
        tabIndex={hideForContactForm ? -1 : undefined}
        className={`fixed bottom-[5.5rem] right-4 z-[160] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#1e40af] text-white shadow-[0_16px_36px_-16px_rgba(0,0,0,0.6)] transition hover:scale-[1.03] hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1e40af] sm:hidden ${
          hideForContactForm
            ? "pointer-events-none opacity-0"
            : "opacity-100"
        }`}
      >
        <Phone size={24} />
      </Link>

      {/* WhatsApp Button - All Devices */}
      <Link
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Sandstone on WhatsApp"
        title="Chat on WhatsApp"
        aria-hidden={hideForContactForm}
        tabIndex={hideForContactForm ? -1 : undefined}
        className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[160] hidden h-14 w-14 items-center justify-center rounded-full bg-[#21b94f] text-white shadow-[0_16px_36px_-16px_rgba(0,0,0,0.6)] transition hover:scale-[1.03] hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#21b94f] sm:inline-flex sm:right-5 ${
          hideForContactForm
            ? "pointer-events-none opacity-0"
            : "opacity-100"
        }`}
      >
        <MessageCircle size={24} />
      </Link>
    </>
  );
}
