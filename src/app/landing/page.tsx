import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Talk to a Local Real Estate Expert | Sandstone",
  description: "Get personalized help buying, selling or relocating to El Paso, Fort Bliss and Santa Teresa.",
  robots: { index: false, follow: true },
};

export default function LandingPage() {
  return (
    <>
      <SiteHeader variant="lead" logoOnly />
      <main className="min-h-screen bg-gradient-to-b from-[#f6f2ec] to-white px-4 py-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-3xl font-bold text-[var(--sandstone-navy)] sm:text-4xl">
            Your next move starts with a local expert.
          </h1>
          <p className="mt-4 text-[var(--sandstone-charcoal)]">
            Buying, selling or PCSing? Tell us what you need in El Paso, Fort Bliss or Santa Teresa.
            Our team will help you explore your options, with no obligation.
          </p>
          <Link href="/listings/map" className="mt-5 inline-block font-medium text-sandstone-navy underline underline-offset-4">
            Browse available homes
          </Link>
        </div>
        <ContactForm heading="How can we help?" subheading="Share your goals and our local team will follow up personally." />
      </main>
      <SiteFooter showNav={false} />
    </>
  );
}
