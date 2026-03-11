import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const [profile, tagTree] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        bio: true,
        headline: true,
        location: true,
        isProfilePublic: true,
        avatarUrl: true,
        tier: true,
        credits: true,
        birthDate: true,
        birthHour: true,
        birthMinute: true,
        birthLocation: true,
        birthGender: true,
        tags: { include: { tag: true } },
      },
    }),
    prisma.tag.findMany({
      where: { depth: 0 },
      orderBy: { order: "asc" },
      include: {
        children: {
          orderBy: { order: "asc" },
          include: {
            children: { orderBy: { order: "asc" } },
          },
        },
      },
    }),
  ]);

  return NextResponse.json({ profile, tagTree });
}
