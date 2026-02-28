import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CREDIT_COSTS, isSpendAction } from "@/lib/credits";
import type { CreditActionType } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { action, palaceId } = body as {
      action: string;
      palaceId?: string;
    };

    if (!action || !isSpendAction(action)) {
      return NextResponse.json(
        { error: "invalid_action" },
        { status: 400 }
      );
    }

    const cost = CREDIT_COSTS[action];
    const userId = session.user.id;

    // Atomic: check balance + decrement + log in one transaction
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { credits: true },
      });

      if (!user || user.credits < cost) {
        return {
          success: false,
          error: "insufficient_credits" as const,
          credits: user?.credits ?? 0,
          needed: cost,
        };
      }

      await tx.creditTransaction.create({
        data: {
          userId,
          amount: -cost,
          type: action as CreditActionType,
          metadata: palaceId ? { palaceId } : undefined,
        },
      });

      const updated = await tx.user.update({
        where: { id: userId },
        data: { credits: { decrement: cost } },
        select: { credits: true },
      });

      return { success: true, credits: updated.credits };
    });

    if (!result.success) {
      return NextResponse.json(result, { status: 402 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Credits spend error:", error);
    return NextResponse.json(
      { error: "internal_error" },
      { status: 500 }
    );
  }
}
