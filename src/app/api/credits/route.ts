import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DAILY_CREDITS, getStartOfDay } from "@/lib/credits";
import type { Tier } from "@prisma/client";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const tier = (session.user.tier ?? "FREE") as Tier;
    const dailyAmount = DAILY_CREDITS[tier];
    const startOfDay = getStartOfDay();

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { credits: true, lastDailyGrant: true },
    });

    if (!user) {
      return NextResponse.json({ error: "user_not_found" }, { status: 404 });
    }

    // Auto-grant daily credits if not yet granted today
    const needsGrant =
      !user.lastDailyGrant || user.lastDailyGrant < startOfDay;

    if (needsGrant) {
      const updated = await prisma.$transaction(async (tx) => {
        await tx.creditTransaction.create({
          data: {
            userId,
            amount: dailyAmount,
            type: "DAILY_GRANT",
            metadata: { tier, date: startOfDay.toISOString() },
          },
        });

        return tx.user.update({
          where: { id: userId },
          data: {
            credits: { increment: dailyAmount },
            lastDailyGrant: new Date(),
          },
          select: { credits: true },
        });
      });

      return NextResponse.json({
        credits: updated.credits,
        dailyGranted: true,
        dailyAmount,
        tier,
      });
    }

    return NextResponse.json({
      credits: user.credits,
      dailyGranted: false,
      dailyAmount,
      tier,
    });
  } catch (error) {
    console.error("Credits GET error:", error);
    return NextResponse.json(
      { error: "internal_error" },
      { status: 500 }
    );
  }
}
