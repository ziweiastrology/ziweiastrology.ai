import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { EARN_RULES, isEarnAction, getStartOfDay, type EarnAction } from "@/lib/credits";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { action, metadata } = body as {
      action: string;
      metadata?: Record<string, unknown>;
    };

    if (!action || !isEarnAction(action)) {
      return NextResponse.json(
        { error: "invalid_action" },
        { status: 400 }
      );
    }

    const rule = EARN_RULES[action];
    const userId = session.user.id;
    const startOfDay = getStartOfDay();

    // Check daily frequency limits
    if (rule.dailyLimit !== null) {
      const todayCount = await prisma.creditTransaction.count({
        where: {
          userId,
          type: action as EarnAction,
          createdAt: { gte: startOfDay },
        },
      });

      if (todayCount >= rule.dailyLimit) {
        return NextResponse.json(
          { error: "limit_reached", earned: 0 },
          { status: 429 }
        );
      }
    }

    // One-time actions: check if already claimed
    if (action === "VERIFICATION_BONUS") {
      const existing = await prisma.creditTransaction.findFirst({
        where: { userId, type: "VERIFICATION_BONUS" },
      });
      if (existing) {
        return NextResponse.json(
          { error: "already_claimed", earned: 0 },
          { status: 409 }
        );
      }
    }

    // Grant credits
    const result = await prisma.$transaction(async (tx) => {
      await tx.creditTransaction.create({
        data: {
          userId,
          amount: rule.amount,
          type: action as EarnAction,
          metadata: metadata ? (metadata as Record<string, string>) : undefined,
        },
      });

      return tx.user.update({
        where: { id: userId },
        data: { credits: { increment: rule.amount } },
        select: { credits: true },
      });
    });

    return NextResponse.json({
      credits: result.credits,
      earned: rule.amount,
    });
  } catch (error) {
    console.error("Credits earn error:", error);
    return NextResponse.json(
      { error: "internal_error" },
      { status: 500 }
    );
  }
}
