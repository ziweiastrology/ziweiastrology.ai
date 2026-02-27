import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";
import { caseReactionSchema } from "@/lib/validations";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth();
    const { slug: caseId } = await params;

    const reactions = await prisma.caseReaction.groupBy({
      by: ["type"],
      where: { caseId },
      _count: true,
    });

    const counts = {
      INSIGHTFUL: 0,
      MIND_BLOWN: 0,
      RELATABLE: 0,
      WANT_MORE: 0,
    };

    for (const r of reactions) {
      counts[r.type] = r._count;
    }

    let userReaction: string | null = null;
    if (session?.user?.id) {
      const existing = await prisma.caseReaction.findUnique({
        where: { userId_caseId: { userId: session.user.id, caseId } },
      });
      userReaction = existing?.type ?? null;
    }

    return NextResponse.json({ counts, userReaction });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch reactions" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { success } = rateLimit(`case-reaction:${session.user.id}`, 30);
    if (!success) {
      return NextResponse.json(
        { error: "Too many reactions. Please slow down." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = caseReactionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid reaction type" },
        { status: 400 }
      );
    }

    const { slug: caseId } = await params;
    const { type } = parsed.data;

    const existing = await prisma.caseReaction.findUnique({
      where: { userId_caseId: { userId: session.user.id, caseId } },
    });

    if (existing) {
      if (existing.type === type) {
        // Same type → remove
        await prisma.caseReaction.delete({ where: { id: existing.id } });
        return NextResponse.json({ action: "removed", type: null });
      } else {
        // Different type → update
        const updated = await prisma.caseReaction.update({
          where: { id: existing.id },
          data: { type },
        });
        return NextResponse.json({ action: "updated", type: updated.type });
      }
    }

    // No existing → create
    const created = await prisma.caseReaction.create({
      data: { caseId, type, userId: session.user.id },
    });
    return NextResponse.json({ action: "created", type: created.type });
  } catch {
    return NextResponse.json(
      { error: "Failed to toggle reaction" },
      { status: 500 }
    );
  }
}
