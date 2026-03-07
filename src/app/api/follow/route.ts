import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { followSchema } from "@/lib/validations/profile";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = followSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  if (parsed.data.targetUserId === session.user.id) {
    return NextResponse.json({ error: "cannot_follow_self" }, { status: 400 });
  }

  // Toggle follow
  const existing = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: session.user.id,
        followingId: parsed.data.targetUserId,
      },
    },
  });

  if (existing) {
    await prisma.follow.delete({ where: { id: existing.id } });
    return NextResponse.json({ following: false });
  }

  await prisma.follow.create({
    data: {
      followerId: session.user.id,
      followingId: parsed.data.targetUserId,
    },
  });

  // Create notification
  await prisma.notification.create({
    data: {
      userId: parsed.data.targetUserId,
      type: "FOLLOW",
      title: "新关注",
      content: `${session.user.name || "Someone"} 关注了你`,
      link: `/profile/${session.user.id}`,
    },
  });

  return NextResponse.json({ following: true });
}
