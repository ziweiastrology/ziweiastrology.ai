import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tier = session.user.tier;
    if (!tier || tier === "FREE") {
      return NextResponse.json(
        { error: "Bookmarks require BASIC membership or above" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const targetType = searchParams.get("targetType");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where = {
      userId: session.user.id,
      ...(targetType && { targetType }),
    };

    const [bookmarks, total] = await Promise.all([
      prisma.bookmark.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.bookmark.count({ where }),
    ]);

    return NextResponse.json({
      bookmarks,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch bookmarks" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tier = session.user.tier;
    if (!tier || tier === "FREE") {
      return NextResponse.json(
        { error: "Bookmarks require BASIC membership or above" },
        { status: 403 }
      );
    }

    const { targetType, targetId } = await request.json();

    if (!targetType || !targetId) {
      return NextResponse.json(
        { error: "targetType and targetId are required" },
        { status: 400 }
      );
    }

    const validTypes = ["post", "resource", "course", "case_study"];
    if (!validTypes.includes(targetType)) {
      return NextResponse.json(
        { error: "Invalid targetType" },
        { status: 400 }
      );
    }

    const bookmark = await prisma.bookmark.upsert({
      where: {
        userId_targetType_targetId: {
          userId: session.user.id,
          targetType,
          targetId,
        },
      },
      update: {},
      create: {
        userId: session.user.id,
        targetType,
        targetId,
      },
    });

    return NextResponse.json(bookmark, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create bookmark" },
      { status: 500 }
    );
  }
}
