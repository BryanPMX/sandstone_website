import Link from "next/link";
import { BLOG_CATEGORIES } from "@/config/blog-areas";

interface BlogCategoryTabsProps {
  activeCategory?: string;
}

export function BlogAreaTabs({
  activeCategory,
}: BlogCategoryTabsProps) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
          !activeCategory
            ? "bg-[var(--sandstone-navy)] text-white"
            : "border border-[var(--sandstone-navy)]/15 bg-white text-[var(--sandstone-charcoal)] hover:border-[var(--sandstone-navy)]/30 hover:text-[var(--sandstone-navy)]"
        }`}
      >
        All Posts
      </Link>

      {BLOG_CATEGORIES.map((category) => (
        <Link
          key={category.slug}
          href={`/blog/category/${category.slug}`}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            activeCategory === category.slug
              ? "bg-[var(--sandstone-navy)] text-white"
              : "border border-[var(--sandstone-navy)]/15 bg-white text-[var(--sandstone-charcoal)] hover:border-[var(--sandstone-navy)]/30 hover:text-[var(--sandstone-navy)]"
          }`}
        >
          {category.label}
        </Link>
      ))}
    </div>
  );
}