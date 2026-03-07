import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTierLimits } from "@/lib/tierLimits";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      image: true,
      bio: true,
      headline: true,
      location: true,
      isProfilePublic: true,
      avatarUrl: true,
      tier: true,
      createdAt: true,
      tags: { include: { tag: true } },
      _count: {
        select: {
          posts: true,
          followers: true,
          following: true,
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  // Check if viewer follows this user
  let isFollowing = false;
  if (session?.user?.id && session.user.id !== userId) {
    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: userId,
        },
      },
    });
    isFollowing = !!follow;
  }

  // Check match score if viewer has premium+
  let matchScore = null;
  if (session?.user?.id && session.user.id !== userId) {
    const viewer = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { tier: true },
    });
    const limits = getTierLimits(viewer?.tier ?? "FREE");

    if (limits.canViewMatchScore) {
      matchScore = await prisma.userMatch.findFirst({
        where: {
          OR: [
            { userAId: session.user.id, userBId: userId },
            { userAId: userId, userBId: session.user.id },
          ],
        },
      });
    }
  }

  return NextResponse.json({ ...user, isFollowing, matchScore });
}
