import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tier = session.user.tier;
    if (!tier || !["PREMIUM", "SIFU"].includes(tier)) {
      return NextResponse.json(
        { error: "Premium membership required for courses" },
        { status: 403 }
      );
    }

    const { courseId } = await request.json();
    if (!courseId) {
      return NextResponse.json({ error: "Course ID required" }, { status: 400 });
    }

    const existing = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId: session.user.id, courseId },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Already enrolled", enrollment: existing },
        { status: 409 }
      );
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId: session.user.id,
        courseId,
      },
    });

    return NextResponse.json(enrollment, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to enroll" },
      { status: 500 }
    );
  }
}
