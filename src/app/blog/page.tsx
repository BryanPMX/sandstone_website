import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { BlogAreaTabs } from "@/components/BlogAreaTabs";
import { getSortedPosts } from "@/services";
import { getCategoryLabel } from "@/config/blog-areas";

export const metadata = {
  title: "El Paso Real Estate Blog | Sandstone Real Estate Group",
  description:
    "Explore El Paso real estate insights, Fort Bliss PCS resources, VA loan guidance, home buying and selling tips, neighborhood guides, market updates, and local lifestyle content from Sandstone Real Estate Group.",
  alternates: {
    canonical: "https://sandstone.homes/blog",
  },
};

function formatBlogDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

export default async function BlogIndexPage() {
  const posts = await getSortedPosts();

  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />

      <main className="min-h-screen bg-[var(--sandstone-off-white)] pb-20">
        <section className="container mx-auto max-w-6xl px-4 pt-10">
          <Link
            href="/"
            className="text-sm font-medium text-[var(--sandstone-sand-gold)] transition hover:underline"
          >
            ← Back to home
          </Link>

          <div className="mt-6 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--sandstone-sand-gold)]">
              Resources & Insights
            </p>

            <h1 className="mt-2 font-heading text-4xl font-bold text-[var(--sandstone-charcoal)] md:text-5xl">
              El Paso Real Estate Blog
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--sandstone-charcoal)]/75 md:text-lg">
              Local real estate insights, Fort Bliss PCS resources, VA loan
              guidance, neighborhood guides, market updates, and practical
              advice for buyers and sellers throughout El Paso.
            </p>
          </div>

          <BlogAreaTabs />

          {posts.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-[var(--sandstone-navy)]/10 bg-white p-10 text-center shadow-sm">
              <h2 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)]">
                New resources are coming soon
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-[var(--sandstone-charcoal)]/75">
                Check back soon for El Paso real estate insights, military PCS
                guides, VA loan resources, neighborhood information, and local
                market updates.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-10 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sandstone-sand-gold)]">
                    Latest Resources
                  </p>

                  <h2 className="mt-1 font-heading text-2xl font-bold text-[var(--sandstone-navy)] md:text-3xl">
                    Latest Articles
                  </h2>
                </div>

                <p className="hidden text-sm text-[var(--sandstone-charcoal)]/60 sm:block">
                  {posts.length} {posts.length === 1 ? "article" : "articles"}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => {
                  const categoryLabel = post.area
                    ? getCategoryLabel(post.area) ?? post.area
                    : null;

                  return (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group overflow-hidden rounded-3xl border border-[var(--sandstone-navy)]/10 bg-white shadow-[0_20px_60px_-42px_rgba(37,52,113,0.55)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--sandstone-sand-gold)]/40 hover:shadow-[0_28px_70px_-38px_rgba(37,52,113,0.45)]"
                    >
                      <article className="flex h-full flex-col">
                        <div className="relative h-52 w-full overflow-hidden bg-[var(--sandstone-navy)]/8">
                          <Image
                            src={post.coverImage}
                            alt={post.coverImageAlt || post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>

                        <div className="flex flex-1 flex-col p-5">
                          <div className="flex flex-wrap items-center gap-2">
                            {categoryLabel && (
                              <span className="rounded-full bg-[var(--sandstone-sand-gold)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--sandstone-sand-gold)]">
                                {categoryLabel}
                              </span>
                            )}

                            <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-[var(--sandstone-charcoal)]/55">
                              {formatBlogDate(post.date)}
                            </p>
                          </div>

                          <h3 className="mt-4 font-heading text-xl font-bold leading-snug text-[var(--sandstone-navy)] transition-colors group-hover:text-[var(--sandstone-sand-gold)]">
                            {post.title}
                          </h3>

                          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--sandstone-charcoal)]/75">
                            {post.excerpt}
                          </p>

                          <div className="mt-auto pt-5">
                            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--sandstone-navy)] px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-[var(--sandstone-sand-gold)]">
                              Read article
                              <span
                                aria-hidden
                                className="transition-transform group-hover:translate-x-1"
                              >
                                →
                              </span>
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </section>
      </main>

      <SiteFooter />
    </>
  );
}