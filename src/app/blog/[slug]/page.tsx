import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getAllPostSlugs, getPostBySlug, getSortedPosts } from "@/services";
import { getCategoryLabel } from "@/config/blog-areas";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function formatBlogDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Sandstone Blog",
    };
  }

  const siteBase = (
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "https://sandstone.homes"
  ).replace(/\/+$/, "");

  const canonicalUrl = `${siteBase}/blog/${slug}`;

  const title =
    post.seoTitle ||
    `${post.title} | Sandstone Real Estate Blog`;

  const description =
    post.metaDescription ||
    post.excerpt;

  const imageUrl = post.coverImage.startsWith("http")
    ? post.coverImage
    : `${siteBase}${post.coverImage}`;

  return {
    title,
    description,
    keywords: post.keywords,

    alternates: {
      canonical: canonicalUrl,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.date,
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          alt: post.coverImageAlt || post.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getSortedPosts();

  const relatedPosts = allPosts
    .filter((item) => item.slug !== post.slug)
    .sort((a, b) => {
      if (a.area === post.area && b.area !== post.area) {
        return -1;
      }

      if (a.area !== post.area && b.area === post.area) {
        return 1;
      }

      return (
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
      );
    })
    .slice(0, 4);

  const siteBase = (
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "https://sandstone.homes"
  ).replace(/\/+$/, "");

  const canonicalUrl = `${siteBase}/blog/${slug}`;

  const imageUrl = post.coverImage.startsWith("http")
    ? post.coverImage
    : `${siteBase}${post.coverImage}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description:
      post.metaDescription ||
      post.excerpt,
    image: imageUrl,
    datePublished: post.date,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },

    author: {
      "@type": "Organization",
      name: "Sandstone Real Estate Group",
      url: siteBase,
    },

    publisher: {
      "@type": "Organization",
      name: "Sandstone Real Estate Group",
      url: siteBase,
    },
  };

  const categoryLabel =
    post.area
      ? getCategoryLabel(post.area) ?? post.area
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <SiteHeader variant="lead" showDesktopCenterLogo={false} />

      <main className="min-h-screen bg-[var(--sandstone-off-white)] pb-20">
        <article className="container mx-auto max-w-4xl px-4 pt-10">
          <Link
            href="/blog"
            className="text-sm font-medium text-[var(--sandstone-sand-gold)] transition hover:underline"
          >
            ← Back to blog
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {post.area && categoryLabel && (
              <Link
                href={`/blog/category/${post.area}`}
                className="rounded-full bg-[var(--sandstone-sand-gold)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--sandstone-sand-gold)] transition-colors hover:bg-[var(--sandstone-sand-gold)]/20"
              >
                {categoryLabel}
              </Link>
            )}

            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--sandstone-sand-gold)]">
              {formatBlogDate(post.date)}
            </p>
          </div>

          <h1 className="mt-3 font-heading text-3xl font-bold leading-tight text-[var(--sandstone-charcoal)] md:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--sandstone-charcoal)]/80 md:text-lg">
            {post.excerpt}
          </p>

          <div className="relative mt-8 h-64 w-full overflow-hidden rounded-3xl border border-[var(--sandstone-navy)]/10 bg-white shadow-[0_24px_70px_-38px_rgba(37,52,113,0.5)] md:h-96">
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>

          <div
            className="prose prose-slate mt-10 max-w-none prose-headings:font-heading prose-headings:text-[var(--sandstone-navy)] prose-a:text-[var(--sandstone-navy)] prose-strong:text-[var(--sandstone-charcoal)]"
            dangerouslySetInnerHTML={{
              __html: post.contentHtml,
            }}
          />

          {relatedPosts.length > 0 && (
            <section className="mt-12 rounded-3xl border border-[var(--sandstone-navy)]/10 bg-white p-6 shadow-sm md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sandstone-sand-gold)]">
                Keep Reading
              </p>

              <h2 className="mt-2 font-heading text-2xl font-bold text-[var(--sandstone-navy)]">
                Related Articles
              </h2>

              <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/70">
                Continue exploring real estate resources, local guides, and
                helpful insights from Sandstone.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {relatedPosts.map((relatedPost) => {
                  const relatedCategoryLabel =
                    relatedPost.area
                      ? getCategoryLabel(relatedPost.area) ?? relatedPost.area
                      : "Sandstone Blog";

                  return (
                    <Link
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className="group rounded-2xl border border-[var(--sandstone-navy)]/10 p-5 transition hover:-translate-y-1 hover:border-[var(--sandstone-sand-gold)]/60 hover:shadow-md"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--sandstone-sand-gold)]">
                        {relatedCategoryLabel}
                      </p>

                      <h3 className="mt-2 font-heading text-lg font-bold text-[var(--sandstone-charcoal)] transition group-hover:text-[var(--sandstone-navy)]">
                        {relatedPost.title}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-[var(--sandstone-charcoal)]/70">
                        {relatedPost.excerpt}
                      </p>

                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--sandstone-navy)]">
                        Read article
                        <span
                          aria-hidden
                          className="transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          <section className="mt-12 rounded-3xl border border-[var(--sandstone-navy)]/10 bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sandstone-sand-gold)]">
              Explore More
            </p>

            <h2 className="mt-2 font-heading text-2xl font-bold text-[var(--sandstone-navy)]">
              Helpful Sandstone Resources
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--sandstone-charcoal)]/70">
              Explore local real estate resources, Fort Bliss PCS guidance,
              VA loan information, home search tools, and El Paso area guides.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href="/pcs"
                className="rounded-2xl border border-[var(--sandstone-navy)]/10 p-4 font-semibold text-[var(--sandstone-charcoal)] transition hover:-translate-y-0.5 hover:border-[var(--sandstone-sand-gold)] hover:text-[var(--sandstone-navy)]"
              >
                Military PCS Resources
              </Link>

              <Link
                href="/va-loans"
                className="rounded-2xl border border-[var(--sandstone-navy)]/10 p-4 font-semibold text-[var(--sandstone-charcoal)] transition hover:-translate-y-0.5 hover:border-[var(--sandstone-sand-gold)] hover:text-[var(--sandstone-navy)]"
              >
                VA Loan Guide
              </Link>

              <Link
                href="/listings?page=1"
                className="rounded-2xl border border-[var(--sandstone-navy)]/10 p-4 font-semibold text-[var(--sandstone-charcoal)] transition hover:-translate-y-0.5 hover:border-[var(--sandstone-sand-gold)] hover:text-[var(--sandstone-navy)]"
              >
                Buy a Home
              </Link>

              <Link
                href="/sell"
                className="rounded-2xl border border-[var(--sandstone-navy)]/10 p-4 font-semibold text-[var(--sandstone-charcoal)] transition hover:-translate-y-0.5 hover:border-[var(--sandstone-sand-gold)] hover:text-[var(--sandstone-navy)]"
              >
                Sell Your Home
              </Link>

              <Link
                href="/areas"
                className="rounded-2xl border border-[var(--sandstone-navy)]/10 p-4 font-semibold text-[var(--sandstone-charcoal)] transition hover:-translate-y-0.5 hover:border-[var(--sandstone-sand-gold)] hover:text-[var(--sandstone-navy)]"
              >
                Explore El Paso Areas
              </Link>

              <Link
                href="/blog"
                className="rounded-2xl border border-[var(--sandstone-navy)]/10 p-4 font-semibold text-[var(--sandstone-charcoal)] transition hover:-translate-y-0.5 hover:border-[var(--sandstone-sand-gold)] hover:text-[var(--sandstone-navy)]"
              >
                More Blog Articles
              </Link>
            </div>
          </section>

          <section className="mt-12 rounded-3xl bg-[var(--sandstone-navy)] px-6 py-10 text-center text-white md:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--sandstone-sand-gold)]">
              Ready to Make a Move?
            </p>

            <h2 className="mx-auto mt-3 max-w-2xl font-heading text-3xl font-bold">
              Let Sandstone help with your next move in El Paso.
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
              Whether you are buying, selling, preparing for a PCS, or
              exploring your VA loan options, our team is here to help.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/#contact"
                className="rounded-full bg-[var(--sandstone-sand-gold)] px-5 py-3 text-sm font-bold text-[var(--sandstone-navy)] transition hover:-translate-y-0.5 hover:opacity-95"
              >
                Contact Us
              </Link>

              <Link
                href="/blog"
                className="rounded-full border border-white/25 px-5 py-3 text-sm font-bold text-white transition hover:border-white/50 hover:bg-white/10"
              >
                Browse More Articles
              </Link>
            </div>
          </section>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}