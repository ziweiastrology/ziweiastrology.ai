import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const report = await prisma.chartReport.findFirst({
      where: { id, userId: session.user.id },
      include: {
        sections: {
          orderBy: { orderIndex: "asc" },
        },
      },
    });

    if (!report) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    return NextResponse.json({ report });
  } catch (error) {
    console.error("Report fetch error:", error);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const userId = session.user.id;

    const report = await prisma.chartReport.findFirst({
      where: { id, userId },
      select: { id: true, status: true, creditCost: true },
    });

    if (!report) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    // Only allow cancelling reports that are generating or failed
    if (report.status !== "GENERATING" && report.status !== "FAILED" && report.status !== "PREVIEW") {
      return NextResponse.json({ error: "cannot_cancel_completed" }, { status: 400 });
    }

    // Delete report + sections and refund credits atomically
    await prisma.$transaction(async (tx) => {
      // Delete sections first (FK constraint)
      await tx.reportSection.deleteMany({ where: { reportId: id } });

      // Delete the report
      await tx.chartReport.delete({ where: { id } });

      // Refund credits
      if (report.creditCost > 0) {
        await tx.creditTransaction.create({
          data: {
            userId,
            amount: report.creditCost,
            type: "REPORT_REFUND",
          },
        });

        await tx.user.update({
          where: { id: userId },
          data: { credits: { increment: report.creditCost } },
        });
      }
    });

    return NextResponse.json({ success: true, refunded: report.creditCost });
  } catch (error) {
    console.error("Report cancel error:", error);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
