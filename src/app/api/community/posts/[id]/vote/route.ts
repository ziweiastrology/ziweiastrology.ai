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
      select: { tier: true },
    });
    const limits = getTierLimits(user?.tier ?? "FREE");
    if (!limits.canVote) {
      return NextResponse.json(
        { error: "tier_required", minTier: "BASIC" },
        { status: 403 }
      );
    }

    const { value, commentId } = await request.json();
    if (value !== 1 && value !== -1) {
      return NextResponse.json({ error: "invalid_value" }, { status: 400 });
    }

    // Comment vote
    if (commentId) {
      const existing = await prisma.vote.findUnique({
        where: {
          userId_commentId: { userId: session.user.id, commentId },
        },
      });

      if (existing) {
        if (existing.value === value) {
          await prisma.vote.delete({ where: { id: existing.id } });
        } else {
          await prisma.vote.update({
            where: { id: existing.id },
            data: { value },
          });
        }
      } else {
        await prisma.vote.create({
          data: { userId: session.user.id, commentId, value },
        });
      }

      // Return updated comment score
      const commentVotes = await prisma.vote.findMany({
        where: { commentId },
      });
      const score = commentVotes.reduce((sum, v) => sum + v.value, 0);
      const userVote =
        commentVotes.find((v) => v.userId === session.user.id)?.value ?? null;

      return NextResponse.json({ score, userVote });
    }

    // Post vote
    const existing = await prisma.vote.findUnique({
      where: { userId_postId: { userId: session.user.id, postId } },
    });

    if (existing) {
      if (existing.value === value) {
        // Same vote = remove it
        await prisma.vote.delete({ where: { id: existing.id } });
      } else {
        // Different vote = update
        await prisma.vote.update({
          where: { id: existing.id },
          data: { value },
        });
      }
    } else {
      await prisma.vote.create({
        data: { userId: session.user.id, postId, value },
      });
    }

    // Get updated score
    const votes = await prisma.vote.findMany({ where: { postId } });
    const score = votes.reduce((sum, v) => sum + v.value, 0);
    const userVote =
      votes.find((v) => v.userId === session.user.id)?.value ?? null;

    return NextResponse.json({ score, userVote });
  } catch {
    return NextResponse.json(
      { error: "Failed to process vote" },
      { status: 500 }
    );
  }
}
