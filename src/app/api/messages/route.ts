import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTierLimits } from "@/lib/tierLimits";

// GET conversations list
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const conversations = await prisma.dMConversation.findMany({
    where: {
      participants: { some: { id: session.user.id } },
    },
    include: {
      participants: {
        select: { id: true, name: true, image: true, avatarUrl: true, tier: true },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { content: true, senderId: true, createdAt: true, readAt: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(conversations);
}

// POST — start new conversation or send message
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { tier: true },
  });
  const limits = getTierLimits(user?.tier ?? "FREE");

  if (!limits.canSendDm) {
    return NextResponse.json({ error: "tier_required", minTier: "BASIC" }, { status: 403 });
  }

  // Check daily DM limit
  if (limits.dmsPerDay !== Infinity) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sentToday = await prisma.directMessage.count({
      where: {
        senderId: session.user.id,
        createdAt: { gte: today },
      },
    });
    if (sentToday >= limits.dmsPerDay) {
      return NextResponse.json({ error: "dm_limit_reached", limit: limits.dmsPerDay }, { status: 429 });
    }
  }

  const { recipientId, content } = await request.json();

  if (!recipientId || !content?.trim()) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  // Find existing conversation or create new
  let conversation = await prisma.dMConversation.findFirst({
    where: {
      AND: [
        { participants: { some: { id: session.user.id } } },
        { participants: { some: { id: recipientId } } },
      ],
    },
  });

  if (!conversation) {
    conversation = await prisma.dMConversation.create({
      data: {
        participants: {
          connect: [{ id: session.user.id }, { id: recipientId }],
        },
      },
    });
  }

  const message = await prisma.directMessage.create({
    data: {
      conversationId: conversation.id,
      senderId: session.user.id,
      content: content.trim(),
    },
  });

  // Update conversation timestamp
  await prisma.dMConversation.update({
    where: { id: conversation.id },
    data: { updatedAt: new Date() },
  });

  // Notification
  await prisma.notification.create({
    data: {
      userId: recipientId,
      type: "SYSTEM",
      title: "新私信",
      content: `${session.user.name || "Someone"} 给你发了私信`,
      link: `/messages`,
    },
  });

  return NextResponse.json({ conversationId: conversation.id, message });
}
