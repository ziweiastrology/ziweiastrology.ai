import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, name: true, image: true, tier: true } },
        comments: {
          where: { parentId: null },
          include: {
            author: { select: { id: true, name: true, image: true, tier: true } },
            replies: {
              include: {
                author: { select: { id: true, name: true, image: true, tier: true } },
                votes: { select: { value: true } },
              },
            },
            votes: { select: { value: true } },
          },
          orderBy: { createdAt: "asc" },
        },
        votes: { select: { value: true, userId: true } },
        _count: { select: { comments: true } },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const voteScore = post.votes.reduce((sum, v) => sum + v.value, 0);

    return NextResponse.json({ ...post, voteScore });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
