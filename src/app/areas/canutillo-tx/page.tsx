import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canutillo TX | Sandstone Real Estate Group",
};

export default function CanutilloPage() {
  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />
      <main className="flex min-h-screen items-center justify-center bg-[var(--sandstone-off-white)]">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--sandstone-sand-gold)]">Canutillo, TX</p>
          <h1 className="mt-2 font-heading text-3xl font-bold text-[var(--sandstone-navy)]">Coming Soon</h1>
          <p className="mt-3 text-sm text-[var(--sandstone-charcoal)]/60">This area page is under construction.</p>
          <Link href="/areas" className="mt-6 inline-block text-sm font-semibold text-[var(--sandstone-sand-gold)] underline">← Back to Areas</Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
