import Link from "next/link";
import { BLOG_AREAS } from "@/config/blog-areas";

interface BlogAreaTabsProps {
  activeArea?: string;
}

export function BlogAreaTabs({ activeArea }: BlogAreaTabsProps) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
          !activeArea
            ? "bg-[var(--sandstone-navy)] text-white"
            : "border border-[var(--sandstone-navy)]/15 bg-white text-[var(--sandstone-charcoal)] hover:border-[var(--sandstone-navy)]/30 hover:text-[var(--sandstone-navy)]"
        }`}
      >
        All Posts
      </Link>
      {BLOG_AREAS.map((area) => (
        <Link
          key={area.slug}
          href={`/blog/category/${area.slug}`}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            activeArea === area.slug
              ? "bg-[var(--sandstone-navy)] text-white"
              : "border border-[var(--sandstone-navy)]/15 bg-white text-[var(--sandstone-charcoal)] hover:border-[var(--sandstone-navy)]/30 hover:text-[var(--sandstone-navy)]"
          }`}
        >
          {area.label}
        </Link>
      ))}
    </div>
  );
}
