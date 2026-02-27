import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";
import { caseCommentSchema } from "@/lib/validations";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ caseId: string }> }
) {
  try {
    const { caseId } = await params;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const [comments, total] = await Promise.all([
      prisma.caseComment.findMany({
        where: { caseId, parentId: null },
        include: {
          author: {
            select: { id: true, name: true, image: true, tier: true },
          },
          replies: {
            include: {
              author: {
                select: { id: true, name: true, image: true, tier: true },
              },
            },
            orderBy: { createdAt: "asc" },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.caseComment.count({ where: { caseId, parentId: null } }),
    ]);

    return NextResponse.json({
      comments,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ caseId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { success } = rateLimit(`case-comment:${session.user.id}`, 10);
    if (!success) {
      return NextResponse.json(
        { error: "Too many comments. Please slow down." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = caseCommentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const { caseId } = await params;
    const { content, parentId } = parsed.data;

    // Validate parent exists and belongs to same case
    if (parentId) {
      const parent = await prisma.caseComment.findFirst({
        where: { id: parentId, caseId },
      });
      if (!parent) {
        return NextResponse.json(
          { error: "Parent comment not found" },
          { status: 404 }
        );
      }
    }

    const comment = await prisma.caseComment.create({
      data: {
        caseId,
        content,
        authorId: session.user.id,
        parentId: parentId || null,
      },
      include: {
        author: {
          select: { id: true, name: true, image: true, tier: true },
        },
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
