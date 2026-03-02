import Link from "next/link";
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react";
import { getAllPosts, getAllTags } from "@/lib/blog";
import PageHeader from "@/components/layout/PageHeader";

export default function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  return <BlogIndex searchParamsPromise={searchParams} />;
}

async function BlogIndex({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<{ tag?: string }>;
}) {
  const { tag: activeTag } = await searchParamsPromise;
  const allPosts = getAllPosts();
  const allTags = getAllTags();

  const posts = activeTag
    ? allPosts.filter((p) => p.tags.includes(activeTag))
    : allPosts;

  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
      <PageHeader
        title="Blog"
        subtitle="In-depth articles on Zi Wei Dou Shu — history, star analysis, celebrity case studies, and the mathematics behind the cosmos."
      />

      {/* Tag filter */}
      {allTags.length > 0 && (
        <div className="mb-10 flex flex-wrap items-center gap-2">
          <Tag className="h-4 w-4 text-gold-500" />
          <Link
            href="/blog"
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              !activeTag
                ? "bg-gold-500/20 text-gold-400 ring-1 ring-gold-500/40"
                : "bg-celestial-800/50 text-parchment-500 hover:bg-celestial-700/60"
            }`}
          >
            All
          </Link>
          {allTags.map((t) => (
            <Link
              key={t}
              href={`/blog?tag=${encodeURIComponent(t)}`}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeTag === t
                  ? "bg-gold-500/20 text-gold-400 ring-1 ring-gold-500/40"
                  : "bg-celestial-800/50 text-parchment-500 hover:bg-celestial-700/60"
              }`}
            >
              {t}
            </Link>
          ))}
        </div>
      )}

      {/* Post grid */}
      {posts.length === 0 ? (
        <p className="py-20 text-center text-parchment-600">
          No posts yet. Check back soon!
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group relative rounded-xl border border-gold-700/20 bg-celestial-900/40 p-6 transition-all hover:border-gold-500/30 hover:bg-celestial-800/50"
            >
              <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-parchment-600">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readingTime} min read
                </span>
              </div>

              <h2
                className="mb-2 text-lg font-bold text-parchment-100 transition-colors group-hover:text-gold-400"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                  {post.title}
                </Link>
              </h2>

              <p className="mb-4 text-sm leading-relaxed text-parchment-500">
                {post.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-celestial-800/60 px-2 py-0.5 text-[10px] text-parchment-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <ArrowRight className="h-4 w-4 text-gold-500 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
