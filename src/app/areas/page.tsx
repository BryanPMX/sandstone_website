import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AREAS_NAV_MENU } from "@/constants/site";
import { SITE_ORIGIN } from "@/constants/seo";
export const metadata = {
  title: "El Paso & Santa Teresa Neighborhoods | Sandstone",
  description: "Explore Sandstone neighborhood guides for El Paso, Horizon City, Canutillo and Santa Teresa. Compare local amenities and browse homes in each area.",
  alternates: { canonical: `${SITE_ORIGIN}/areas` },
};
export default function AreasPage() {
  return <><SiteHeader variant="lead" showDesktopCenterLogo={false} />
    <main className="min-h-screen bg-[var(--sandstone-off-white)]">
      <section className="container mx-auto max-w-6xl px-4 py-16">
        <h1 className="font-heading text-4xl font-bold text-[var(--sandstone-navy)]">Explore Our Neighborhoods</h1>
        <p className="mt-4 max-w-3xl text-lg">Find local guides for El Paso and the surrounding communities. Explore amenities, neighborhood information and home searches, or contact our team for help choosing an area.</p>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS_NAV_MENU.map(area => <li key={area.href}><Link href={area.href} className="block rounded-2xl bg-white p-6 font-heading text-xl text-[var(--sandstone-navy)] shadow-sm hover:underline">{area.label}</Link></li>)}
        </ul>
        <Link href="/areas/sandstones-new-builds" className="mt-8 inline-block underline">Explore Sandstone new builds</Link>
      </section>
    </main><SiteFooter /></>;
}
