import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const category = searchParams.get("category");
    const groupId = searchParams.get("groupId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where = {
      ...(type && { type: type as "DISCUSSION" | "PILLAR_DATA" | "EVENT_ANALYSIS" | "CHART_ANALYSIS" }),
      ...(category && { category }),
      ...(groupId && { groupId }),
    };

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: {
          author: { select: { id: true, name: true, image: true, tier: true } },
          _count: { select: { comments: true, votes: true } },
          votes: { select: { value: true } },
        },
        orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.post.count({ where }),
    ]);

    const postsWithScore = posts.map((post) => ({
      ...post,
      voteScore: post.votes.reduce((sum, v) => sum + v.value, 0),
      votes: undefined,
    }));

    return NextResponse.json({
      posts: postsWithScore,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
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

    // Check tier — PREMIUM or SIFU required to post
    const tier = session.user.tier;
    if (!tier || !["PREMIUM", "SIFU"].includes(tier)) {
      return NextResponse.json({ error: "Premium membership required to post" }, { status: 403 });
    }

    const { success } = rateLimit(`post:${session.user.id}`, 10);
    if (!success) {
      return NextResponse.json(
        { error: "Too many posts. Please slow down." },
        { status: 429 }
      );
    }

    const { title, content, type, category, groupId } = await request.json();

    if (!title || !content || !type) {
      return NextResponse.json({ error: "Title, content, and type are required" }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        type,
        category: category || null,
        groupId: groupId || null,
        authorId: session.user.id,
      },
      include: {
        author: { select: { id: true, name: true, image: true, tier: true } },
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
