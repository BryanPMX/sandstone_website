import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Sell My House | Sandstone Real Estate Group",
  description: "Sell your home with confidence. Strategy-first guidance and cinematic marketing in El Paso.",
};

export default function SellPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--sandstone-off-white)] py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h1 className="font-heading text-3xl font-bold text-[var(--sandstone-charcoal)] md:text-4xl">
            Sell My House
          </h1>
          <p className="mt-4 text-[var(--sandstone-charcoal)]/80">
            Step inside your next chapter — we&apos;ll help you prepare, price, and present your home so every detail feels designed for you.
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
