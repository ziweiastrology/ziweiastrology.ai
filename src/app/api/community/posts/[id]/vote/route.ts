import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tier = session.user.tier;
    if (!tier || !["PREMIUM", "SIFU"].includes(tier)) {
      return NextResponse.json({ error: "Premium membership required" }, { status: 403 });
    }

    const { id: postId } = await params;
    const { value, commentId } = await request.json();

    if (value !== 1 && value !== -1) {
      return NextResponse.json({ error: "Value must be 1 or -1" }, { status: 400 });
    }

    // Comment vote
    if (commentId) {
      const existingVote = await prisma.vote.findUnique({
        where: { userId_commentId: { userId: session.user.id, commentId } },
      });

      if (existingVote) {
        if (existingVote.value === value) {
          await prisma.vote.delete({ where: { id: existingVote.id } });
          return NextResponse.json({ action: "removed" });
        } else {
          await prisma.vote.update({
            where: { id: existingVote.id },
            data: { value },
          });
          return NextResponse.json({ action: "updated", value });
        }
      }

      await prisma.vote.create({
        data: { value, userId: session.user.id, commentId },
      });

      return NextResponse.json({ action: "created", value }, { status: 201 });
    }

    // Post vote
    const existingVote = await prisma.vote.findUnique({
      where: { userId_postId: { userId: session.user.id, postId } },
    });

    if (existingVote) {
      if (existingVote.value === value) {
        await prisma.vote.delete({ where: { id: existingVote.id } });
        return NextResponse.json({ action: "removed" });
      } else {
        await prisma.vote.update({
          where: { id: existingVote.id },
          data: { value },
        });
        return NextResponse.json({ action: "updated", value });
      }
    }

    await prisma.vote.create({
      data: { value, userId: session.user.id, postId },
    });

    return NextResponse.json({ action: "created", value }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to process vote" },
      { status: 500 }
    );
  }
}
