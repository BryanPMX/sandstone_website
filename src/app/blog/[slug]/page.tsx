import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getAllPostSlugs, getPostBySlug } from "@/services";
import { getAreaLabel } from "@/config/blog-areas";

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
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found | Sandstone Blog" };
  }

  const siteBase = (
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://sandstone.homes"
  ).replace(/\/+$/, "");

  const canonicalUrl = `${siteBase}/blog/${slug}`;
  const title = post.seoTitle || `${post.title} | Sandstone Blog`;
  const description = post.metaDescription || post.excerpt;
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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const siteBase = (
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://sandstone.homes"
  ).replace(/\/+$/, "");

  const canonicalUrl = `${siteBase}/blog/${slug}`;
  const imageUrl = post.coverImage.startsWith("http")
    ? post.coverImage
    : `${siteBase}${post.coverImage}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader variant="lead" showDesktopCenterLogo={false} />

      <main className="min-h-screen bg-[var(--sandstone-off-white)] pb-20">
        <article className="container mx-auto max-w-4xl px-4 pt-10">
          <Link
            href="/blog"
            className="text-sm font-medium text-[var(--sandstone-sand-gold)] hover:underline"
          >
            ← Back to blog
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {post.area && (
              <Link
                href={`/blog/category/${post.area}`}
                className="rounded-full bg-[var(--sandstone-sand-gold)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--sandstone-sand-gold)] transition-colors hover:bg-[var(--sandstone-sand-gold)]/20"
              >
                {getAreaLabel(post.area) ?? post.area}
              </Link>
            )}

            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--sandstone-sand-gold)]">
              {formatBlogDate(post.date)}
            </p>
          </div>

          <h1 className="mt-2 font-heading text-3xl font-bold text-[var(--sandstone-charcoal)] md:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 max-w-3xl text-base text-[var(--sandstone-charcoal)]/80 md:text-lg">
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
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <section className="mt-12 rounded-3xl border border-[var(--sandstone-navy)]/10 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-2xl font-bold text-[var(--sandstone-navy)]">
              Helpful Sandstone Links
            </h2>

            <p className="mt-2 text-sm text-[var(--sandstone-charcoal)]/70">
              Explore more local resources, home search tools, and area guides
              from Sandstone Real Estate Group.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link
                href="/pcs"
                className="rounded-2xl border border-[var(--sandstone-navy)]/10 p-4 font-semibold text-[var(--sandstone-charcoal)] transition hover:border-[var(--sandstone-sand-gold)] hover:text-[var(--sandstone-navy)]"
              >
                PCS Move Guide
              </Link>

              <Link
                href="/listings"
                className="rounded-2xl border border-[var(--sandstone-navy)]/10 p-4 font-semibold text-[var(--sandstone-charcoal)] transition hover:border-[var(--sandstone-sand-gold)] hover:text-[var(--sandstone-navy)]"
              >
                View El Paso Homes
              </Link>

              <Link
                href="/areas/upper-valley"
                className="rounded-2xl border border-[var(--sandstone-navy)]/10 p-4 font-semibold text-[var(--sandstone-charcoal)] transition hover:border-[var(--sandstone-sand-gold)] hover:text-[var(--sandstone-navy)]"
              >
                Upper Valley Area Guide
              </Link>

              <Link
                href="/areas/horizon-city-tx"
                className="rounded-2xl border border-[var(--sandstone-navy)]/10 p-4 font-semibold text-[var(--sandstone-charcoal)] transition hover:border-[var(--sandstone-sand-gold)] hover:text-[var(--sandstone-navy)]"
              >
                Horizon City Area Guide
              </Link>

              <Link
                href="/blog"
                className="rounded-2xl border border-[var(--sandstone-navy)]/10 p-4 font-semibold text-[var(--sandstone-charcoal)] transition hover:border-[var(--sandstone-sand-gold)] hover:text-[var(--sandstone-navy)]"
              >
                More Blog Articles
              </Link>

              <Link
                href="/sell"
                className="rounded-2xl border border-[var(--sandstone-navy)]/10 p-4 font-semibold text-[var(--sandstone-charcoal)] transition hover:border-[var(--sandstone-sand-gold)] hover:text-[var(--sandstone-navy)]"
              >
                Sell Your Home
              </Link>
            </div>
          </section>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}