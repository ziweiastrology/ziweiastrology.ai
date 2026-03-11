import { NextResponse, after } from "next/server";
import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateFullReport } from "@/lib/reports/generateReport";

export const maxDuration = 300;

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { purchaseId, palaces, meta, birthDate, birthHour, birthGender } =
      await request.json();

    if (!purchaseId || !palaces || !meta || !birthDate || birthHour == null || !birthGender) {
      return NextResponse.json({ error: "missing_data" }, { status: 400 });
    }

    // Verify purchase belongs to user (or claim it atomically if still PENDING)
    let purchase = await prisma.clickBankPurchase.findFirst({
      where: {
        id: purchaseId,
        status: { in: ["CLAIMED", "PENDING"] },
      },
    });

    if (!purchase) {
      return NextResponse.json({ error: "invalid_purchase" }, { status: 403 });
    }

    // Auto-claim if still PENDING and unlinked (or belongs to this user)
    if (purchase.status === "PENDING" && (!purchase.userId || purchase.userId === userId)) {
      purchase = await prisma.clickBankPurchase.update({
        where: { id: purchaseId },
        data: { userId, status: "CLAIMED", claimedAt: new Date() },
      });
    }

    if (purchase.userId !== userId) {
      return NextResponse.json({ error: "invalid_purchase" }, { status: 403 });
    }

    const cookieStore = await cookies();
    const locale = cookieStore.get("locale")?.value || "en";

    // Create report (no credit cost — paid via ClickBank)
    const result = await prisma.$transaction(async (tx) => {
      const report = await tx.chartReport.create({
        data: {
          userId,
          birthDate: new Date(birthDate),
          birthHour,
          birthGender,
          palacesJson: palaces,
          metaJson: meta,
          status: "PREVIEW",
          creditCost: 0,
        },
      });

      await tx.clickBankPurchase.update({
        where: { id: purchaseId },
        data: {
          status: "REPORT_GENERATED",
          reportId: report.id,
        },
      });

      return report;
    });

    // Generate report in background after response
    after(async () => {
      try {
        await generateFullReport(result.id, locale);
      } catch (err) {
        console.error("CB report generation error:", err);
      }
    });

    return NextResponse.json({
      reportId: result.id,
      status: "GENERATING",
    });
  } catch (error) {
    console.error("CB report API error:", error);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
