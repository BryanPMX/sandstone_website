import { getBlogPosts } from "@/lib/blog";

export default async function BlogSection() {
  const posts = await getBlogPosts();
  const featuredPosts = posts.slice(0, 3);

  return (
    <section className="bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_42%),linear-gradient(180deg,_rgba(255,255,255,0.05),_rgba(255,255,255,0))] py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.36em] text-[var(--sandstone-sand-gold)]">
            From the blog
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-white">
            Real estate insights for your next move
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-base text-white/75">
            Discover the latest stories, market trends, and expert advice from our team.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredPosts.length === 0 ? (
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center text-white/80">
              No blog posts available yet.
            </div>
          ) : (
            featuredPosts.map((post) => (
              <article
                key={post.filename}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:bg-white/10"
              >
                {post.imageUrl ? (
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="flex h-52 items-center justify-center bg-slate-900/70 text-white">
                    <span className="text-xl font-semibold">No image</span>
                  </div>
                )}

                <div className="p-6">
                  <p className="text-sm uppercase tracking-[0.24em] text-[var(--sandstone-sand-gold)]">
                    Blog post
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">
                    {post.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-white/70">
                    {post.description}
                  </p>
                  <div className="mt-6">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/80">
                      Read more
                    </span>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
