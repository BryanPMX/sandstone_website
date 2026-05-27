import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getAllPostSlugs, getPostBySlug } from "@/services";

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
    return {
      title: "Post Not Found | Sandstone Blog",
    };
  }

  return {
    title: `${post.title} | Sandstone Blog`,
    description: post.excerpt,
    keywords: post.keywords,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <SiteHeader variant="lead" showDesktopCenterLogo={false} />
      <main className="min-h-screen bg-[var(--sandstone-off-white)] pb-20">
        <article className="container mx-auto max-w-4xl px-4 pt-10">
          <Link
            href="/blog"
            className="text-sm font-medium text-[var(--sandstone-sand-gold)] hover:underline"
          >
            Back to blog
          </Link>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--sandstone-sand-gold)]">
            {formatBlogDate(post.date)}
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold text-[var(--sandstone-charcoal)] md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base text-[var(--sandstone-charcoal)]/80 md:text-lg">
            {post.excerpt}
          </p>

          <div className="relative mt-8 h-64 w-full overflow-hidden rounded-3xl border border-[var(--sandstone-navy)]/10 bg-white shadow-[0_24px_70px_-38px_rgba(37,52,113,0.5)] md:h-96">
            <Image
              src={post.coverImage}
              alt={post.title}
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
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
