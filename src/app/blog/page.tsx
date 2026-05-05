import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSortedPosts } from "@/services";

export const metadata = {
  title: "Blog | Sandstone Real Estate Group",
  description:
    "Real estate market updates, home buying tips, and community insights from Sandstone Real Estate Group.",
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
      <main className="min-h-screen bg-[var(--sandstone-off-white)] pb-16">
        <section className="container mx-auto max-w-6xl px-4 pt-10">
          <Link
            href="/"
            className="text-sm font-medium text-[var(--sandstone-sand-gold)] hover:underline"
          >
            Back to home
          </Link>
          <h1 className="mt-4 font-heading text-3xl font-bold text-[var(--sandstone-charcoal)] md:text-4xl">
            Sandstone Blog
          </h1>
          <p className="mt-3 max-w-3xl text-[var(--sandstone-charcoal)]/78">
            Market trends, local updates, and practical guidance for buyers and sellers across El Paso.
          </p>

          {posts.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-[var(--sandstone-navy)]/10 bg-white p-6 text-center">
              <p className="text-[var(--sandstone-charcoal)]/85">
                No blog posts published yet.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                    <h2 className="mt-2 font-heading text-xl font-bold text-[var(--sandstone-navy)]">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/80">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-4 inline-flex items-center rounded-full bg-[var(--sandstone-navy)] px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
                    >
                      Read article
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
