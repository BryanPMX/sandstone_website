import Link from "next/link";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Luxury Homes Coming Soon | Sandstone Real Estate Team",
  description:
    "Sandstone Real Estate Team is preparing a luxury homes experience for buyers and sellers in El Paso and the surrounding region.",
};

export default function LuxuryHomesPage() {
  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />

      <main className="min-h-screen bg-white text-[#071a33]">
        <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden px-6 py-24 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(213,170,94,0.12),_transparent_45%)]" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#d5aa5e]">
              Sandstone Real Estate Team
            </p>

            <h1 className="font-serif text-5xl font-semibold tracking-wide sm:text-6xl md:text-7xl">
              Luxury Homes
            </h1>

            <div className="mx-auto my-8 h-px w-32 bg-[#d5aa5e]" />

            <h2 className="text-2xl font-semibold sm:text-3xl">
              Coming Soon
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#071a33]/70 sm:text-lg">
              We are creating a dedicated luxury real estate experience
              featuring exceptional homes, private showings, and personalized
              service throughout El Paso and the surrounding region.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center bg-[#d5aa5e] px-7 py-3 font-semibold text-[#071a33] transition hover:bg-[#e4bf78]"
              >
                Return Home
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}