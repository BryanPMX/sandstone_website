import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AREAS_NAV_MENU } from "@/constants/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "El Paso Areas | Sandstone Real Estate Group",
  description: "Browse homes and market data for every area we serve in El Paso and surrounding communities.",
};

export default function AreasPage() {
  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />
      <main className="min-h-screen bg-[var(--sandstone-off-white)]">
        <div className="mx-auto max-w-4xl px-4 py-20 lg:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--sandstone-sand-gold)]">El Paso &amp; Surrounding Areas</p>
          <h1 className="mt-1 font-heading text-3xl font-bold text-[var(--sandstone-navy)]">Explore Every Area</h1>

          <ul className="mt-10 space-y-3">
            {AREAS_NAV_MENU.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center justify-between rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white px-6 py-4 shadow-sm transition hover:border-[var(--sandstone-sand-gold)]/40 hover:shadow-md"
                >
                  <span className="font-heading text-base font-semibold text-[var(--sandstone-navy)]">{label}</span>
                  <span className="text-[var(--sandstone-sand-gold)]">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
