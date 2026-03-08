import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PostDetailClient from "./PostDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  // Try slug first, then fall back to ID for backwards compatibility
  const post = await prisma.post.findFirst({
    where: {
      OR: [{ slug }, { id: slug }],
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
          avatarUrl: true,
          tier: true,
        },
      },
      comments: {
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
              avatarUrl: true,
              tier: true,
            },
          },
          replies: {
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  avatarUrl: true,
                  tier: true,
                },
              },
            },
            orderBy: { createdAt: "asc" },
          },
        },
        where: { parentId: null },
        orderBy: { createdAt: "asc" },
      },
      votes: { select: { value: true, userId: true } },
      _count: { select: { comments: true } },
    },
  });

  if (post) {
    // Increment view count (fire-and-forget)
    prisma.post.update({
      where: { id: post.id },
      data: { viewCount: { increment: 1 } },
    }).catch(() => {});
  }

  return post;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const description = post.content.slice(0, 160).replace(/\n/g, " ").trim();
  const url = `https://www.ziweiastrology.ai/community/post/${post.slug || post.id}`;

  return {
    title: `${post.title} — ZiWei Astrology Community`,
    description,
    openGraph: {
      title: post.title,
      description,
      url,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      authors: [post.author.name || "ZiWei Community"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
    },
    alternates: { canonical: url },
  };
}

export default async function PostSlugPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  // SEO: redirect ID-based URLs to slug-based URLs (301 permanent)
  if (post.slug && slug !== post.slug) {
    redirect(`/community/post/${post.slug}`);
  }

  const voteScore = post.votes.reduce((sum, v) => sum + v.value, 0);

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: post.author.name || "ZiWei Community",
    },
    publisher: {
      "@type": "Organization",
      name: "ZiWei Astrology",
      url: "https://www.ziweiastrology.ai",
    },
    description: post.content.slice(0, 160).replace(/\n/g, " ").trim(),
    mainEntityOfPage: `https://www.ziweiastrology.ai/community/post/${post.slug || post.id}`,
    keywords: post.tags.join(", "),
    commentCount: post._count.comments,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostDetailClient
        post={{
          id: post.id,
          slug: post.slug,
          title: post.title,
          content: post.content,
          type: post.type,
          tags: post.tags,
          viewCount: post.viewCount,
          createdAt: post.createdAt.toISOString(),
          author: post.author,
          comments: post.comments.map((c) => ({
            ...c,
            createdAt: c.createdAt.toISOString(),
            updatedAt: c.updatedAt.toISOString(),
            replies: c.replies.map((r) => ({
              ...r,
              createdAt: r.createdAt.toISOString(),
              updatedAt: r.updatedAt.toISOString(),
            })),
          })),
          _count: post._count,
          score: voteScore,
        }}
      />
    </>
  );
}
