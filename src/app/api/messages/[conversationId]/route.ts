import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ conversationId: string }> }
) {
  const { conversationId } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // Verify user is participant
  const conversation = await prisma.dMConversation.findFirst({
    where: {
      id: conversationId,
      participants: { some: { id: session.user.id } },
    },
    include: {
      participants: {
        select: { id: true, name: true, image: true, avatarUrl: true, tier: true },
      },
    },
  });

  if (!conversation) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const messages = await prisma.directMessage.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
    include: {
      sender: {
        select: { id: true, name: true, image: true, avatarUrl: true },
      },
    },
  });

  // Mark messages from other person as read
  await prisma.directMessage.updateMany({
    where: {
      conversationId,
      senderId: { not: session.user.id },
      readAt: null,
    },
    data: { readAt: new Date() },
  });

  return NextResponse.json({ conversation, messages });
}
