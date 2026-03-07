import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { birthDate, birthHour, birthMinute, birthLocation, birthGender } =
      await request.json();

    // Validate
    if (birthDate && isNaN(Date.parse(birthDate))) {
      return NextResponse.json({ error: "Invalid birth date" }, { status: 400 });
    }
    if (birthHour != null && (birthHour < 0 || birthHour > 23)) {
      return NextResponse.json({ error: "Invalid birth hour" }, { status: 400 });
    }
    if (birthGender && !["male", "female"].includes(birthGender)) {
      return NextResponse.json({ error: "Invalid gender" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        birthDate: birthDate ? new Date(birthDate) : null,
        birthHour: birthHour != null ? parseInt(birthHour) : null,
        birthMinute: birthMinute != null ? parseInt(birthMinute) : null,
        birthLocation: birthLocation || null,
        birthGender: birthGender || null,
      },
      select: {
        birthDate: true,
        birthHour: true,
        birthMinute: true,
        birthLocation: true,
        birthGender: true,
      },
    });

    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { error: "Failed to update birth info" },
      { status: 500 }
    );
  }
}
