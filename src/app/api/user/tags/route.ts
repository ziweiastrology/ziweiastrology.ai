import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTierLimits } from "@/lib/tierLimits";
import { updateTagsSchema } from "@/lib/validations/profile";

// GET all available tags — nested tree by default, ?flat=true for flat list
export async function GET(request: NextRequest) {
  try {
    const flat = request.nextUrl.searchParams.get("flat") === "true";

    if (flat) {
      const tags = await prisma.tag.findMany({
        where: { depth: { gt: 0 } },
        orderBy: [{ category: "asc" }, { order: "asc" }],
      });
      return NextResponse.json(tags);
    }

    const tree = await prisma.tag.findMany({
      where: { depth: 0 },
      orderBy: { order: "asc" },
      include: {
        children: {
          orderBy: { order: "asc" },
          include: {
            children: {
              orderBy: { order: "asc" },
            },
          },
        },
      },
    });

    return NextResponse.json(tree);
  } catch (error) {
    console.error("[GET /api/user/tags]", error);
    return NextResponse.json({ error: "internal_error", detail: String(error) }, { status: 500 });
  }
}

// PUT user's selected tags
export async function PUT(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = updateTagsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { tier: true },
  });
  if (!user) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const limits = getTierLimits(user.tier);
  if (parsed.data.tagIds.length > limits.maxTags) {
    return NextResponse.json(
      { error: "tag_limit", max: limits.maxTags },
      { status: 403 }
    );
  }

  // Replace all user tags atomically
  await prisma.$transaction([
    prisma.userTag.deleteMany({ where: { userId: session.user.id } }),
    ...parsed.data.tagIds.map((tagId) =>
      prisma.userTag.create({
        data: { userId: session.user.id!, tagId },
      })
    ),
  ]);

  const userTags = await prisma.userTag.findMany({
    where: { userId: session.user.id },
    include: { tag: true },
  });

  return NextResponse.json(userTags);
}
