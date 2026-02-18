import Link from "next/link";
import { readFile } from "fs/promises";
import { join } from "path";
import { ViewOnlyDocument } from "@/components/ViewOnlyDocument";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Privacy Policy - Sandstone Real Estate Team",
  description: "Privacy Policy for Sandstone Real Estate Team.",
};

export default async function PrivacyPolicyPage() {
  let html: string | null = null;
  try {
    const mammoth = await import("mammoth");
    const path = join(process.cwd(), "public", "privacy-policy.docx");
    const buffer = await readFile(path);
    const result = await mammoth.convertToHtml({ buffer });
    html = result.value;
  } catch {
    // mammoth not installed or conversion failed
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-gradient-to-br from-sandstone-bg via-sandstone-base/95 to-sandstone-bronze/40">
        {html ? (
          <ViewOnlyDocument html={html} title="Privacy Policy" />
        ) : (
          <FallbackView doc="privacy-policy" title="Privacy Policy" />
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
    <div className="mx-auto max-w-2xl px-4 py-12 text-center">
      <h1 className="font-heading text-2xl font-bold text-sandstone-gold">
        {title}
      </h1>
      <p className="mt-4 text-sandstone-text/90">
        View the document in your browser (view only, no download).
      </p>
      <Link
        href={`/api/documents/${doc}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block rounded-full bg-sandstone-navy px-6 py-3 text-sm font-semibold text-white hover:bg-sandstone-maroon"
      >
        Open {title}
      </Link>
      <p className="mt-6 text-xs text-sandstone-text/70">
        Opens in a new tab. Your browser may display or download the document
        depending on your settings.
      </p>
    </div>
  );
}
