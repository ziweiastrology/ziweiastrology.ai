import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(request: Request) {
  try {
    // Rate limit to prevent receipt enumeration
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    const { success } = rateLimit(`cb-claim:${ip}`, 10);
    if (!success) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }

    const { cbReceipt, email } = await request.json();

    if (!cbReceipt || !email) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }

    const purchase = await prisma.clickBankPurchase.findUnique({
      where: { cbReceipt },
      select: {
        id: true,
        email: true,
        status: true,
        userId: true,
        reportId: true,
      },
    });

    if (!purchase) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    // Verify email matches (case-insensitive)
    if (purchase.email.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json({ error: "email_mismatch" }, { status: 403 });
    }

    // Already refunded or charged back
    if (purchase.status === "REFUNDED" || purchase.status === "CHARGEBACK") {
      return NextResponse.json({ error: "purchase_invalid", status: purchase.status }, { status: 410 });
    }

    // Check if user is authenticated
    const session = await auth();

    if (session?.user?.id) {
      // Same user revisiting — let them through
      if (purchase.userId === session.user.id) {
        return NextResponse.json({
          purchaseId: purchase.id,
          status: purchase.status,
          authenticated: true,
          reportId: purchase.reportId,
        });
      }

      // Different user already claimed this purchase
      if (purchase.userId) {
        return NextResponse.json({ error: "already_claimed" }, { status: 409 });
      }

      // Link purchase to authenticated user (atomic — only if not already linked)
      const updated = await prisma.clickBankPurchase.updateMany({
        where: { id: purchase.id, userId: null },
        data: {
          userId: session.user.id,
          status: "CLAIMED",
          claimedAt: new Date(),
        },
      });

      if (updated.count === 0) {
        return NextResponse.json({ error: "already_claimed" }, { status: 409 });
      }

      return NextResponse.json({
        purchaseId: purchase.id,
        status: "CLAIMED",
        authenticated: true,
      });
    }

    // Not authenticated — return status for frontend to show auth form
    return NextResponse.json({
      purchaseId: purchase.id,
      status: purchase.status,
      authenticated: false,
      alreadyClaimed: !!purchase.userId,
    });
  } catch (error) {
    console.error("ClickBank claim error:", error);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
