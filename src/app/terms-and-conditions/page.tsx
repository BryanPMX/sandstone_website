import Link from "next/link";
import { readFile } from "fs/promises";
import { join } from "path";
import { ViewOnlyDocument } from "@/components/ViewOnlyDocument";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FOOTER_BRAND, TERMS_AND_CONDITIONS_LABEL } from "@/constants/site";

export const metadata = {
  title: `${TERMS_AND_CONDITIONS_LABEL} | ${FOOTER_BRAND}`,
  description: `${TERMS_AND_CONDITIONS_LABEL} for ${FOOTER_BRAND}.`,
};

export default async function TermsAndConditionsPage() {
  let html: string | null = null;
  try {
    const mammoth = await import("mammoth");
    const path = join(process.cwd(), "public", "terms-and-conditions.docx");
    const buffer = await readFile(path);
    const result = await mammoth.convertToHtml({ buffer });
    html = result.value;
  } catch {
    // mammoth not installed or conversion failed
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[var(--sandstone-off-white)]">
        {html ? (
          <ViewOnlyDocument html={html} title={TERMS_AND_CONDITIONS_LABEL} />
        ) : (
          <FallbackView
            doc="terms-and-conditions"
            title={TERMS_AND_CONDITIONS_LABEL}
          />
        )}
      </main>
      <SiteFooter />
    </>
  );
}

function FallbackView({
  doc,
  title,
}: {
  doc: string;
  title: string;
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-14 pt-24 md:pb-16 md:pt-28">
      <div className="rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white p-6 text-center shadow-lg sm:p-8">
        <h1 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)] md:text-3xl">
          {title}
        </h1>
        <p className="mt-4 text-[var(--sandstone-charcoal)]/90">
          View the document in your browser (view only, no download link).
        </p>
        <Link
          href={`/api/documents/${doc}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full bg-[var(--sandstone-navy)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
        >
          Open {title}
        </Link>
        <p className="mt-6 text-xs text-[var(--sandstone-charcoal)]/70">
          Opens in a new tab. Your browser may still allow downloading based on
          local settings.
        </p>
      </div>
    </section>
  );
}
