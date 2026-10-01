"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

export function FloatingWhatsAppBubble() {
  const phoneNumber = "9152776707";

  const whatsappHref = `https://wa.me/1${phoneNumber}?text=${encodeURIComponent(
    "Hi, I would like more information about your listings."
  )}`;

  // The fixed mobile "Call" and WhatsApp bubbles sit in the bottom-right
  // corner of the viewport. That same corner is where any lead-capture
  // form's SMS-consent text and submit button end up once the user scrolls
  // that far — the bubbles were visually covering them. Hide both bubbles
  // whenever ANY <form> on the page (contact, sell, rent, PCS pages, area
  // pages, listing inquiry, giveaways, etc.) is in view, so they never
  // overlap a form anywhere on the site — not just the main contact form.
  const [hideForContactForm, setHideForContactForm] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const intersectingForms = new Set<Element>();
    const observedForms = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingForms.add(entry.target);
          } else {
            intersectingForms.delete(entry.target);
          }
        });
        setHideForContactForm(intersectingForms.size > 0);
      },
      // Only react once the lower portion of the form (where the bubble
      // would overlap) scrolls into the lower part of the viewport.
      { rootMargin: "0px 0px -15% 0px", threshold: 0 }
    );

    const observeForm = (form: Element) => {
      if (!observedForms.has(form)) {
        observedForms.add(form);
        observer.observe(form);
      }
    };

    document.querySelectorAll("form").forEach(observeForm);

    // Some forms (modals, popups like the giveaway signup) only mount into
    // the DOM after user interaction. Watch for those too so they're covered.
    const mutationObserver =
      typeof MutationObserver !== "undefined"
        ? new MutationObserver(() => {
            document.querySelectorAll("form").forEach(observeForm);
          })
        : null;

    mutationObserver?.observe(document.body, {
      childList: true,
      subtree: true,
    });


  return () => {
      observer.disconnect();
      mutationObserver?.disconnect();
    };
  }, []);

  useEffect(() => {
    const trackContactClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const eventName = href.startsWith("tel:") ? "phone_click"
        : /^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href) ? "whatsapp_click" : null;
      if (!eventName) return;
      const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
      w.gtag?.("event", eventName, { contact_method: eventName === "phone_click" ? "phone" : "whatsapp" });
    };
    document.addEventListener("click", trackContactClick, true);
    return () => document.removeEventListener("click", trackContactClick, true);
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
        className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[160] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#1e40af] text-white shadow-[0_16px_36px_-16px_rgba(0,0,0,0.6)] transition hover:scale-[1.03] hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1e40af] sm:hidden ${
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
