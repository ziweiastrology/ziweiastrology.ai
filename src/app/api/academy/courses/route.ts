import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get("level");

    const where = {
      published: true,
      ...(level && { level: level as "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "MASTER" }),
    };

    const courses = await prisma.course.findMany({
      where,
      include: {
        _count: { select: { lessons: true, enrollments: true } },
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ courses });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
