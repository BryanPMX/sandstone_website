import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

export function FloatingWhatsAppBubble() {
  const phoneNumber = "9152776707";

  const whatsappHref = `https://wa.me/1${phoneNumber}?text=${encodeURIComponent(
    "Hi, I would like more information about your listings."
  )}`;

  return (
    <>
      {/* Call Button */}
      <Link
        href={`tel:${phoneNumber}`}
        aria-label="Call Sandstone Real Estate"
        title="Call Sandstone"
        className="fixed bottom-[5.5rem] right-4 z-[160] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#1e40af] text-white shadow-[0_16px_36px_-16px_rgba(0,0,0,0.6)] transition hover:scale-[1.03] hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1e40af] sm:right-5"
      >
        <Phone size={24} />
      </Link>

      {/* WhatsApp Button */}
      <Link
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Sandstone on WhatsApp"
        title="Chat on WhatsApp"
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[160] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#21b94f] text-white shadow-[0_16px_36px_-16px_rgba(0,0,0,0.6)] transition hover:scale-[1.03] hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#21b94f] sm:right-5"
      >
        <MessageCircle size={24} />
      </Link>
    </>
  );
}