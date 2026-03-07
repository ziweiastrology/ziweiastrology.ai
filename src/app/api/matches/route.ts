import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTierLimits } from "@/lib/tierLimits";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { tier: true },
  });
  const limits = getTierLimits(user?.tier ?? "FREE");
  if (limits.matchesPerDay === 0) {
    return NextResponse.json({ error: "tier_required", minTier: "BASIC" }, { status: 403 });
  }

  const limit = Math.min(
    parseInt(request.nextUrl.searchParams.get("limit") || "3"),
    limits.matchesPerDay === Infinity ? 20 : limits.matchesPerDay
  );

  const matches = await prisma.userMatch.findMany({
    where: {
      OR: [
        { userAId: session.user.id },
        { userBId: session.user.id },
      ],
    },
    orderBy: { overallScore: "desc" },
    take: limit,
    include: {
      userA: {
        select: {
          id: true, name: true, image: true, avatarUrl: true,
          tier: true, headline: true, location: true,
          tags: { include: { tag: true }, take: 5 },
        },
      },
      userB: {
        select: {
          id: true, name: true, image: true, avatarUrl: true,
          tier: true, headline: true, location: true,
          tags: { include: { tag: true }, take: 5 },
        },
      },
    },
  });

  const results = matches.map((m) => {
    const otherUser = m.userAId === session.user.id ? m.userB : m.userA;
    return {
      user: otherUser,
      overallScore: m.overallScore,
      bizScore: m.bizScore,
      friendScore: m.friendScore,
      guirenScore: m.guirenScore,
      sharedTags: m.sharedTags,
    };
  });

  return NextResponse.json(results);
}
