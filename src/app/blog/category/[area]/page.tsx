import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { BlogAreaTabs } from "@/components/BlogAreaTabs";
import { getSortedPosts } from "@/services";
import { BLOG_AREAS, getAreaLabel, isValidAreaSlug } from "@/config/blog-areas";

interface CategoryPageProps {
  params: Promise<{ area: string }>;
}

export async function generateStaticParams() {
  return BLOG_AREAS.map((area) => ({ area: area.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { area } = await params;
  if (!isValidAreaSlug(area)) return { title: "Not Found" };
  const label = getAreaLabel(area)!;
  return {
    title: `${label} Real Estate Blog | Sandstone`,
    description: `Local market updates, community guides, and home buying tips for ${label}. Brought to you by Sandstone Real Estate Group.`,
    alternates: {
      canonical: `https://sandstone.homes/blog/category/${area}`,
    },
    openGraph: {
      title: `${label} Real Estate Blog | Sandstone`,
      description: `Local market updates, community guides, and home buying tips for ${label}.`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${label} Real Estate Blog | Sandstone`,
      description: `Local market updates, community guides, and home buying tips for ${label}.`,
    },
  };
}

function formatBlogDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

export default async function BlogCategoryPage({ params }: CategoryPageProps) {
  const { area } = await params;
  if (!isValidAreaSlug(area)) notFound();

  const allPosts = await getSortedPosts();
  const posts = allPosts.filter((p) => p.area === area);
  const label = getAreaLabel(area)!;

  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />
      <main className="min-h-screen bg-[var(--sandstone-off-white)] pb-16">
        <section className="container mx-auto max-w-6xl px-4 pt-10">
          <Link
            href="/blog"
            className="text-sm font-medium text-[var(--sandstone-sand-gold)] hover:underline"
          >
            ← All posts
          </Link>
          <h1 className="mt-4 font-heading text-3xl font-bold text-[var(--sandstone-charcoal)] md:text-4xl">
            {label}
          </h1>
          <p className="mt-3 max-w-3xl text-[var(--sandstone-charcoal)]/78">
            Local market updates, community guides, and home buying tips for {label}.
          </p>

          <BlogAreaTabs activeArea={area} />

          {posts.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white p-8 text-center">
              <p className="font-heading text-lg font-semibold text-[var(--sandstone-navy)]">
                Coming soon
              </p>
              <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/70">
                We&apos;re working on content for this area. Check back soon or browse all posts.
              </p>
              <Link
                href="/blog"
                className="mt-4 inline-flex items-center rounded-full bg-[var(--sandstone-navy)] px-5 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Browse all posts
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="overflow-hidden rounded-3xl border border-[var(--sandstone-navy)]/10 bg-white shadow-[0_20px_60px_-42px_rgba(37,52,113,0.55)] transition-all duration-200 hover:-translate-y-1"
                >
                  <article>
                    <div className="relative h-44 w-full bg-[var(--sandstone-navy)]/8">
                      <Image
                        src={post.coverImage}
                        alt={post.coverImageAlt || post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--sandstone-sand-gold)]">
                        {formatBlogDate(post.date)}
                      </p>
                      <h2 className="mt-2 font-heading text-xl font-bold text-[var(--sandstone-navy)]">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/80">
                        {post.excerpt}
                      </p>
                      <span className="mt-4 inline-flex items-center rounded-full bg-[var(--sandstone-navy)] px-4 py-2 text-sm font-semibold text-white hover:opacity-95">
                        Read article
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
