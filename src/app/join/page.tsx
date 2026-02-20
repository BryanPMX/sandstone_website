import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Join the Team | Sandstone Real Estate Group",
  description: "Join Sandstone Real Estate Group. Build your career with a team that elevates lifestyles.",
};

export default function JoinPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--sandstone-off-white)] py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h1 className="font-heading text-3xl font-bold text-[var(--sandstone-charcoal)] md:text-4xl">
            Join the Team
          </h1>
          <p className="mt-4 text-[var(--sandstone-charcoal)]/80">
            We&apos;re building the most recognizable and trusted real estate brand in the region. If you share our values — integrity, lifestyle-driven service, and excellence — we&apos;d love to hear from you.
          </p>
          <Link
            href="/#contact"
            className="mt-8 inline-block rounded-full bg-[var(--sandstone-sand-gold)] px-6 py-3 font-semibold text-white hover:opacity-95"
          >
            Get in touch
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
