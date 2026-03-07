import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTierLimits } from "@/lib/tierLimits";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await params;
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { tier: true, name: true },
    });
    const limits = getTierLimits(user?.tier ?? "FREE");
    if (!limits.canComment) {
      return NextResponse.json(
        { error: "tier_required", minTier: "BASIC" },
        { status: 403 }
      );
    }

    const { content, parentId } = await request.json();
    if (!content?.trim()) {
      return NextResponse.json({ error: "invalid_input" }, { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        authorId: session.user.id,
        postId,
        parentId: parentId || null,
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

    // Notify post author (non-blocking, don't fail the request on notification error)
    try {
      const post = await prisma.post.findUnique({
        where: { id: postId },
        select: { authorId: true, title: true },
      });
      if (post && post.authorId !== session.user.id) {
        await prisma.notification.create({
          data: {
            userId: post.authorId,
            type: "COMMENT",
            title: "新评论",
            content: `${user?.name || "Someone"} 评论了你的帖子「${post.title}」`,
            link: `/community/post/${postId}`,
          },
        });
      }

      // Notify parent comment author if replying
      if (parentId) {
        const parentComment = await prisma.comment.findUnique({
          where: { id: parentId },
          select: { authorId: true },
        });
        if (
          parentComment &&
          parentComment.authorId !== session.user.id
        ) {
          await prisma.notification.create({
            data: {
              userId: parentComment.authorId,
              type: "COMMENT",
              title: "新回复",
              content: `${user?.name || "Someone"} 回复了你的评论`,
              link: `/community/post/${postId}`,
            },
          });
        }
      }
    } catch {
      // Notification failure should not break the comment creation
      console.error("Failed to create notification for comment");
    }

    return NextResponse.json(comment, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
