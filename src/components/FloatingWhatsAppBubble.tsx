import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { SITE_CONTACT } from "@/constants";

function normalizeDialTarget(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  if (trimmed.startsWith("+")) {
    const digits = trimmed.slice(1).replace(/\D/g, "");
    return digits ? `+${digits}` : undefined;
  }

  const digits = trimmed.replace(/\D/g, "");
  return digits || undefined;
}

export function FloatingWhatsAppBubble() {
  const dialTarget = normalizeDialTarget(SITE_CONTACT.phoneRaw) || SITE_CONTACT.phoneRaw;
  const whatsappNumber = dialTarget.replace(/^\+/, "").length === 10
    ? `1${dialTarget.replace(/^\+/, "")}`
    : dialTarget.replace(/^\+/, "");
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi, I would like more information about your listings."
  )}`;

  return (
    <Link
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Sandstone on WhatsApp"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[160] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#21b94f] text-white shadow-[0_16px_36px_-16px_rgba(0,0,0,0.6)] transition hover:scale-[1.03] hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#21b94f] sm:right-5"
    >
      <MessageCircle size={24} />
    </Link>
  );
}
