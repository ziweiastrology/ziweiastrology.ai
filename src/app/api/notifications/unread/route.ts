import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const [notifCount, dmCount] = await Promise.all([
    prisma.notification.count({
      where: { userId: session.user.id, read: false },
    }),
    prisma.directMessage.count({
      where: {
        conversation: {
          participants: { some: { id: session.user.id } },
        },
        senderId: { not: session.user.id },
        readAt: null,
      },
    }),
  ]);

  return NextResponse.json({ notifications: notifCount, messages: dmCount });
}
