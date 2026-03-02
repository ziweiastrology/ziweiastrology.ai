import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Calendar, Clock, User, ChevronLeft, ChevronRight } from "lucide-react";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://ziweiastrology.ai"
).trim();

/* ── Static params for SSG ────────────────────────────── */
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

/* ── Dynamic metadata ─────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: `${post.title} — Zi Wei Astrology Blog`,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      siteName: "Zi Wei Astrology AI",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      tags: post.tags,
      ...(post.image && {
        images: [{ url: post.image, alt: post.imageAlt ?? post.title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      ...(post.image && { images: [post.image] }),
    },
    alternates: { canonical: url },
  };
}

/* ── Page component ───────────────────────────────────── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  /* Prev/Next navigation */
  const allPosts = getAllPosts();
  const currentIdx = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIdx < allPosts.length - 1 ? allPosts[currentIdx + 1] : null;
  const nextPost = currentIdx > 0 ? allPosts[currentIdx - 1] : null;

  /* Article JSON-LD */
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Zi Wei Astrology AI",
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
    ...(post.image && { image: post.image }),
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
        {/* ── Header ──────────────────────────────────── */}
        <header className="mb-10 pt-8">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-1 text-sm text-gold-500 transition-colors hover:text-gold-400"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="rounded-full bg-gold-500/10 px-3 py-1 text-xs font-medium text-gold-400 ring-1 ring-gold-500/20 transition-colors hover:bg-gold-500/20"
              >
                {tag}
              </Link>
            ))}
          </div>

          {/* Title */}
          <h1
            className="mb-4 text-3xl font-bold leading-tight text-parchment-100 sm:text-4xl"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            {post.title}
          </h1>

          {/* Description */}
          <p className="mb-6 text-lg leading-relaxed text-parchment-400">
            {post.description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 border-t border-gold-700/20 pt-4 text-sm text-parchment-600">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTime} min read
            </span>
          </div>
        </header>

        {/* ── MDX Content ─────────────────────────────── */}
        <div className="prose-ancient">
          <MDXRemote
            source={post.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>

        {/* ── Prev / Next ─────────────────────────────── */}
        <nav className="mt-16 grid grid-cols-1 gap-4 border-t border-gold-700/20 pt-8 sm:grid-cols-2">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="group flex items-start gap-3 rounded-lg border border-gold-700/20 bg-celestial-900/40 p-4 transition-all hover:border-gold-500/30 hover:bg-celestial-800/50"
            >
              <ChevronLeft className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
              <div>
                <span className="text-xs text-parchment-600">Previous</span>
                <p className="text-sm font-medium text-parchment-200 transition-colors group-hover:text-gold-400">
                  {prevPost.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextPost && (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group flex items-start gap-3 rounded-lg border border-gold-700/20 bg-celestial-900/40 p-4 text-right transition-all hover:border-gold-500/30 hover:bg-celestial-800/50 sm:flex-row-reverse"
            >
              <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
              <div>
                <span className="text-xs text-parchment-600">Next</span>
                <p className="text-sm font-medium text-parchment-200 transition-colors group-hover:text-gold-400">
                  {nextPost.title}
                </p>
              </div>
            </Link>
          )}
        </nav>
      </article>
    </>
  );
}
