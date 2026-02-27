import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";
import { celebritySubmissionSchema } from "@/lib/validations";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Admin only" }, { status: 403 });
    }

    const submissions = await prisma.celebritySubmission.findMany({
      include: {
        submittedBy: {
          select: { id: true, name: true, email: true, tier: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ submissions });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { success } = rateLimit(`submission:${session.user.id}`, 3);
    if (!success) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait before trying again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = celebritySubmissionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const submission = await prisma.celebritySubmission.create({
      data: {
        subjectName: data.subjectName,
        subjectNameCn: data.subjectNameCn || null,
        birthDate: new Date(data.birthDate),
        birthTime: data.birthTime || null,
        birthLocation: data.birthLocation || null,
        birthTimeVerified: data.birthTimeVerified ?? false,
        category: data.category,
        context: data.context || null,
        sourceUrl: data.sourceUrl || null,
        submittedById: session.user.id,
      },
    });

    return NextResponse.json(submission, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create submission" },
      { status: 500 }
    );
  }
}
