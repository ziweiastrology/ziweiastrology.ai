import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Trending tags: aggregate post tags from recent posts, count frequency
    const recentPosts = await prisma.post.findMany({
      select: { tags: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    const tagCounts = new Map<string, number>();
    for (const post of recentPosts) {
      for (const tag of post.tags) {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      }
    }

    const trendingTags = [...tagCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, count]) => ({ name, count }));

    // Groups: top 5 by member count
    const groups = await prisma.group.findMany({
      where: { isPrivate: false },
      select: {
        id: true,
        name: true,
        slug: true,
        _count: { select: { members: true } },
      },
      orderBy: { members: { _count: "desc" } },
      take: 5,
    });

    return NextResponse.json({
      trendingTags,
      groups: groups.map((g) => ({
        id: g.id,
        name: g.name,
        slug: g.slug,
        memberCount: g._count.members,
      })),
    });
  } catch (error) {
    console.error("[GET /api/community/sidebar]", error);
    return NextResponse.json({ trendingTags: [], groups: [] });
  }
}
