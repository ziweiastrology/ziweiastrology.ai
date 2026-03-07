import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";
import { getTierLimits } from "@/lib/tierLimits";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const category = searchParams.get("category");
    const groupId = searchParams.get("groupId");
    const sort = searchParams.get("sort") || "new"; // hot | new | following
    const search = searchParams.get("search");
    const cursor = searchParams.get("cursor");
    const tagsParam = searchParams.get("tags");
    const take = 20;

    const session = await auth();

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      ...(type && {
        type: type as
          | "DISCUSSION"
          | "PILLAR_DATA"
          | "EVENT_ANALYSIS"
          | "CHART_ANALYSIS",
      }),
      ...(category && { category }),
      ...(groupId && { groupId }),
    };

    // Search filter
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ];
    }

    // Tags filter
    if (tagsParam) {
      const tags = tagsParam.split(",").map((t) => t.trim()).filter(Boolean);
      if (tags.length > 0) {
        where.tags = { hasSome: tags };
      }
    }

    // Following filter — only posts from users we follow
    if (sort === "following" && session?.user?.id) {
      const follows = await prisma.follow.findMany({
        where: { followerId: session.user.id },
        select: { followingId: true },
      });
      const followingIds = follows.map((f) => f.followingId);
      where.authorId = { in: followingIds };
    }

    // Determine ordering
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let orderBy: any[];
    if (sort === "hot") {
      // Hot: pinned first, then by vote count desc (approximation), then recency
      orderBy = [{ pinned: "desc" }, { viewCount: "desc" }, { createdAt: "desc" }];
    } else {
      // new + following: pinned first, then newest
      orderBy = [{ pinned: "desc" }, { createdAt: "desc" }];
    }

    const posts = await prisma.post.findMany({
      where,
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
        _count: { select: { comments: true } },
        votes: { select: { value: true, userId: true } },
      },
      orderBy,
      take: take + 1, // fetch one extra for cursor
      ...(cursor && {
        cursor: { id: cursor },
        skip: 1, // skip the cursor itself
      }),
    });

    const hasMore = posts.length > take;
    const results = hasMore ? posts.slice(0, take) : posts;
    const nextCursor = hasMore ? results[results.length - 1].id : null;

    // If sorting by "hot", re-sort by actual vote score after fetch
    const postsWithScore = results.map((post) => {
      const voteScore = post.votes.reduce((sum, v) => sum + v.value, 0);
      const userVote =
        session?.user?.id
          ? (post.votes.find((v) => v.userId === session.user.id)?.value ?? null)
          : null;
      return {
        ...post,
        voteScore,
        userVote,
        votes: undefined, // strip raw votes from response
      };
    });

    // For "hot" sort, re-sort by actual score (pinned still first)
    if (sort === "hot") {
      postsWithScore.sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return b.voteScore - a.voteScore;
      });
    }

    return NextResponse.json({
      posts: postsWithScore,
      nextCursor,
      hasMore,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check daily post limit based on tier
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { tier: true },
    });
    const limits = getTierLimits(user?.tier ?? "FREE");
    if (limits.postsPerDay <= 0) {
      return NextResponse.json(
        { error: "Your membership tier cannot create posts" },
        { status: 403 }
      );
    }

    const { success } = rateLimit(`post:${session.user.id}`, 10);
    if (!success) {
      return NextResponse.json(
        { error: "Too many posts. Please slow down." },
        { status: 429 }
      );
    }

    const { title, content, type, category, groupId, tags } =
      await request.json();

    if (!title || !content || !type) {
      return NextResponse.json(
        { error: "Title, content, and type are required" },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        type,
        category: category || null,
        groupId: groupId || null,
        authorId: session.user.id,
        tags: Array.isArray(tags) ? tags : [],
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
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
