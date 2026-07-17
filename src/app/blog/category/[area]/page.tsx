import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { BlogAreaTabs } from "@/components/BlogAreaTabs";
import { getSortedPosts } from "@/services";
import {
  BLOG_CATEGORIES,
  getCategoryLabel,
  isValidCategorySlug,
} from "@/config/blog-areas";

interface CategoryPageProps {
  params: Promise<{ area: string }>;
}

export async function generateStaticParams() {
  return BLOG_CATEGORIES.map((category) => ({
    area: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps) {
  const { area } = await params;

  if (!isValidCategorySlug(area)) {
    return {
      title: "Not Found",
    };
  }

  const label = getCategoryLabel(area)!;

  const descriptionMap: Record<string, string> = {
    "military-pcs":
      "Fort Bliss PCS guides, military relocation resources, and practical advice for service members and families moving to El Paso.",
    "va-loans":
      "VA loan guidance, home financing resources, and helpful information for veterans and military homebuyers in El Paso.",
    "buying-a-home":
      "Home buying tips, local market guidance, and practical resources for buyers searching for a home in El Paso.",
    "selling-a-home":
      "Home selling tips, pricing guidance, and real estate resources for homeowners preparing to sell in El Paso.",
    "el-paso-neighborhoods":
      "Explore El Paso neighborhoods, communities, nearby cities, and local area guides from Sandstone Real Estate Group.",
    "things-to-do-in-el-paso":
      "Discover things to do, local events, attractions, and lifestyle resources throughout El Paso and the surrounding area.",
    "market-updates":
      "El Paso real estate market updates, housing trends, and local insights for buyers, sellers, and homeowners.",
  };

  const description =
    descriptionMap[area] ||
    `Real estate resources and local insights from Sandstone Real Estate Group about ${label}.`;

  return {
    title: `${label} | El Paso Real Estate Blog | Sandstone`,
    description,

    alternates: {
      canonical: `https://sandstone.homes/blog/category/${area}`,
    },

    openGraph: {
      title: `${label} | El Paso Real Estate Blog | Sandstone`,
      description,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `${label} | El Paso Real Estate Blog | Sandstone`,
      description,
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

export default async function BlogCategoryPage({
  params,
}: CategoryPageProps) {
  const { area } = await params;

  if (!isValidCategorySlug(area)) {
    notFound();
  }

  const allPosts = await getSortedPosts();

  const posts = allPosts.filter(
    (post) => post.area === area
  );

  const label = getCategoryLabel(area)!;

  const introMap: Record<string, string> = {
    "military-pcs":
      "Planning a PCS to Fort Bliss or moving away from El Paso? Explore military relocation guides, local housing resources, and practical advice to help make your move easier.",

    "va-loans":
      "Learn more about VA loans, military home financing, eligibility, the buying process, and resources for veterans and service members purchasing a home.",

    "buying-a-home":
      "Explore practical home buying advice, market guidance, financing information, and resources designed to help you buy with confidence in El Paso.",

    "selling-a-home":
      "Get useful guidance on preparing, pricing, marketing, and selling your home in the El Paso real estate market.",

    "el-paso-neighborhoods":
      "Explore neighborhoods, communities, and nearby areas throughout El Paso to find the location that best fits your lifestyle and goals.",

    "things-to-do-in-el-paso":
      "Discover local events, attractions, restaurants, activities, and community highlights that make living in El Paso unique.",

    "market-updates":
      "Stay informed with local housing trends, market updates, and real estate insights for buyers, sellers, and homeowners throughout El Paso.",
  };

  const intro =
    introMap[area] ||
    `Explore the latest Sandstone articles and resources about ${label}.`;

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-[var(--sandstone-off-white)] pb-20">
        <section className="container mx-auto max-w-6xl px-4 pt-10">
          <Link
            href="/blog"
            className="text-sm font-medium text-[var(--sandstone-sand-gold)] transition hover:underline"
          >
            ← All articles
          </Link>

          <div className="mt-6 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--sandstone-sand-gold)]">
              El Paso Real Estate Blog
            </p>

            <h1 className="mt-2 font-heading text-4xl font-bold text-[var(--sandstone-charcoal)] md:text-5xl">
              {label}
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--sandstone-charcoal)]/75 md:text-lg">
              {intro}
            </p>
          </div>

          <BlogAreaTabs activeCategory={area} />

          {posts.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-[var(--sandstone-navy)]/10 bg-white p-10 text-center shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sandstone-sand-gold)]">
                Coming Soon
              </p>

              <h2 className="mt-2 font-heading text-2xl font-bold text-[var(--sandstone-navy)]">
                New {label} articles are on the way
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--sandstone-charcoal)]/70">
                We are working on more helpful resources for this topic.
                Browse all of our latest articles in the meantime.
              </p>

              <Link
                href="/blog"
                className="mt-6 inline-flex items-center rounded-full bg-[var(--sandstone-navy)] px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-95"
              >
                Browse all articles
              </Link>
            </div>
          ) : (
            <>
              <div className="mt-10 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sandstone-sand-gold)]">
                    Latest Resources
                  </p>

                  <h2 className="mt-1 font-heading text-2xl font-bold text-[var(--sandstone-navy)] md:text-3xl">
                    {label} Articles
                  </h2>
                </div>

                <p className="hidden text-sm text-[var(--sandstone-charcoal)]/60 sm:block">
                  {posts.length}{" "}
                  {posts.length === 1 ? "article" : "articles"}
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
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
                          <span className="rounded-full bg-[var(--sandstone-sand-gold)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--sandstone-sand-gold)]">
                            {label}
                          </span>

                          <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-[var(--sandstone-charcoal)]/55">
                            {formatBlogDate(post.date)}
                          </p>
                        </div>

                        <h3 className="mt-4 font-heading text-xl font-bold leading-snug text-[var(--sandstone-navy)] transition group-hover:text-[var(--sandstone-sand-gold)]">
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
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      <SiteFooter />
    </>
  );
}