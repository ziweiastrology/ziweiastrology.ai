import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CREDIT_COSTS } from "@/lib/credits";
import { generateFullReport } from "@/lib/reports/generateReport";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { palaces, meta, birthDate, birthHour, birthGender } = await request.json();

    if (!palaces || !meta || !birthDate || birthHour == null || !birthGender) {
      return NextResponse.json({ error: "missing_data" }, { status: 400 });
    }

    const cost = CREDIT_COSTS.REPORT_GENERATION;

    // Credit check + deduct atomically
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { credits: true },
      });

      if (!user || user.credits < cost) {
        return { success: false, credits: user?.credits ?? 0, needed: cost };
      }

      await tx.creditTransaction.create({
        data: {
          userId,
          amount: -cost,
          type: "REPORT_GENERATION",
        },
      });

      const updated = await tx.user.update({
        where: { id: userId },
        data: { credits: { decrement: cost } },
        select: { credits: true },
      });

      const report = await tx.chartReport.create({
        data: {
          userId,
          birthDate: new Date(birthDate),
          birthHour,
          birthGender,
          palacesJson: palaces,
          metaJson: meta,
          status: "PREVIEW",
          creditCost: cost,
        },
      });

      return { success: true, credits: updated.credits, reportId: report.id };
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "insufficient_credits", credits: result.credits, needed: result.needed },
        { status: 402 }
      );
    }

    // Trigger generation in background (non-blocking)
    generateFullReport(result.reportId!).catch((err) =>
      console.error("Background report generation error:", err)
    );

    return NextResponse.json({
      reportId: result.reportId,
      status: "GENERATING",
      credits: result.credits,
    });
  } catch (error) {
    console.error("Report API error:", error);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const reports = await prisma.chartReport.findMany({
      where: { userId: session.user.id },
      include: {
        sections: {
          select: { id: true, type: true, key: true, title: true },
          orderBy: { orderIndex: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ reports });
  } catch (error) {
    console.error("Report list error:", error);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
