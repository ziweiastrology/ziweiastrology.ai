import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();

    const post = await prisma.post.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            avatarUrl: true,
            tier: true,
            headline: true,
            location: true,
            tags: { include: { tag: true }, take: 5 },
          },
        },
        comments: {
          where: { parentId: null },
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
            votes: true,
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
                votes: true,
              },
              orderBy: { createdAt: "asc" as const },
            },
          },
          orderBy: { createdAt: "desc" as const },
        },
        votes: true,
        _count: { select: { comments: true } },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    // Check if current user voted
    let userVote = null;
    if (session?.user?.id) {
      const vote = await prisma.vote.findUnique({
        where: {
          userId_postId: { userId: session.user.id, postId: id },
        },
      });
      userVote = vote?.value ?? null;
    }

    const score = post.votes.reduce((sum, v) => sum + v.value, 0);

    return NextResponse.json({ ...post, score, userVote });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
