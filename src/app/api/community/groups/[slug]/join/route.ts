import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTierLimits } from "@/lib/tierLimits";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const group = await prisma.group.findUnique({ where: { slug } });
  if (!group) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { tier: true },
  });
  const limits = getTierLimits(user?.tier ?? "FREE");

  // Check if already a member
  const existing = await prisma.groupMember.findUnique({
    where: { userId_groupId: { userId: session.user.id, groupId: group.id } },
  });

  if (existing) {
    // Leave
    await prisma.groupMember.delete({ where: { id: existing.id } });
    return NextResponse.json({ joined: false });
  }

  // Check group limit
  if (limits.groupsJoin !== Infinity) {
    const memberCount = await prisma.groupMember.count({
      where: { userId: session.user.id },
    });
    if (memberCount >= limits.groupsJoin) {
      return NextResponse.json(
        { error: "group_limit", max: limits.groupsJoin },
        { status: 403 }
      );
    }
  }

  await prisma.groupMember.create({
    data: { userId: session.user.id, groupId: group.id },
  });

  return NextResponse.json({ joined: true });
}
