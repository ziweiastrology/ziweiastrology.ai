import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateAffiliateCode } from "@/lib/affiliates/generateCode";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Check if already an affiliate
    const existing = await prisma.affiliate.findUnique({
      where: { userId },
    });

    if (existing) {
      return NextResponse.json({
        error: "already_applied",
        status: existing.status,
        code: existing.code,
      }, { status: 409 });
    }

    const { payoutEmail, bio, website } = await request.json();

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true },
    });

    // Generate unique code (retry if collision)
    let code = generateAffiliateCode(user?.name ?? null);
    let attempts = 0;
    while (attempts < 5) {
      const exists = await prisma.affiliate.findUnique({ where: { code } });
      if (!exists) break;
      code = generateAffiliateCode(user?.name ?? null);
      attempts++;
    }

    const affiliate = await prisma.affiliate.create({
      data: {
        userId,
        code,
        status: "PENDING",
        payoutEmail: payoutEmail || null,
        bio: bio || null,
        website: website || null,
      },
    });

    return NextResponse.json({
      id: affiliate.id,
      code: affiliate.code,
      status: affiliate.status,
    }, { status: 201 });
  } catch (error) {
    console.error("Affiliate apply error:", error);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
