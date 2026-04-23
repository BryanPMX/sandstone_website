import Image from "next/image";
import Link from "next/link";
import type { BlogPostListItem } from "@/types";

interface BlogTeaserSectionProps {
  posts: BlogPostListItem[];
}

function formatBlogDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

export function BlogTeaserSection({ posts }: BlogTeaserSectionProps) {
  return (
    <section className="bg-gradient-to-b from-white via-[var(--sandstone-off-white)] to-white pb-16 pt-0 md:pb-20 md:pt-0">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--sandstone-sand-gold)]">
              Market Intelligence
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-[var(--sandstone-charcoal)] md:text-[2.15rem]">
              From The Sandstone Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center rounded-full border border-[var(--sandstone-navy)]/16 bg-white px-5 py-2.5 text-sm font-semibold text-[var(--sandstone-navy)] transition hover:border-[var(--sandstone-navy)]/25 hover:bg-[var(--sandstone-off-white)]"
          >
            View all articles
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-[var(--sandstone-navy)]/12 bg-white p-8 text-center">
            <p className="text-sm font-medium text-[var(--sandstone-charcoal)]/80">
              Blog posts are not available yet. Please publish a post from the CMS and refresh.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="overflow-hidden rounded-3xl border border-[var(--sandstone-navy)]/10 bg-white shadow-[0_20px_60px_-42px_rgba(37,52,113,0.55)]"
              >
                <div className="relative h-44 w-full bg-[var(--sandstone-navy)]/8">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--sandstone-sand-gold)]">
                    {formatBlogDate(post.date)}
                  </p>
                  <h3 className="mt-2 font-heading text-xl font-bold text-[var(--sandstone-navy)]">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-[var(--sandstone-charcoal)]/80">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex items-center text-sm font-semibold text-[var(--sandstone-navy)] hover:underline"
                  >
                    Read article
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
