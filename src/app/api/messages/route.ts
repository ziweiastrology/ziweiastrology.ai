import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getTierLimits } from "@/lib/tierLimits";

const EDITORIAL_EMAIL =
  process.env.EDITORIAL_USER_EMAIL || "editorial@ziweiastrology.ai";

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

  const { recipientId, conversationId: existingConvId, content } = await request.json();

  if (!content?.trim()) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }

  if (!recipientId && !existingConvId) {
    return NextResponse.json({ error: "recipientId or conversationId required" }, { status: 400 });
  }

  let conversation;
  let recipientUserId = recipientId;

  if (existingConvId) {
    // Sending to an existing conversation
    conversation = await prisma.dMConversation.findFirst({
      where: {
        id: existingConvId,
        participants: { some: { id: session.user.id } },
      },
      include: {
        participants: { select: { id: true } },
      },
    });
    if (!conversation) {
      return NextResponse.json({ error: "conversation_not_found" }, { status: 404 });
    }
    // Find the other participant for notification
    recipientUserId = conversation.participants.find(
      (p: { id: string }) => p.id !== session.user.id
    )?.id;
  } else {
    // Find existing conversation or create new
    conversation = await prisma.dMConversation.findFirst({
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
  if (recipientUserId) {
    await prisma.notification.create({
      data: {
        userId: recipientUserId,
        type: "SYSTEM",
        title: "New Message",
        content: `${session.user.name || "Someone"} sent you a message`,
        link: `/messages`,
      },
    });
  }

  // Auto-reply: if recipient is the editorial account, trigger AI response
  if (recipientUserId) {
    const recipient = await prisma.user.findUnique({
      where: { id: recipientUserId },
      select: { email: true },
    });

    if (recipient?.email === EDITORIAL_EMAIL) {
      // Fire-and-forget with 3-5s delay for natural feel
      const delay = 3000 + Math.random() * 2000;
      const baseUrl = process.env.AUTH_URL || "http://localhost:3000";

      setTimeout(() => {
        fetch(`${baseUrl}/api/messages/auto-reply`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-internal-secret": process.env.AUTH_SECRET || "",
          },
          body: JSON.stringify({
            conversationId: conversation.id,
            userMessage: content.trim(),
            userId: session.user!.id,
          }),
        }).catch((err) => console.error("Auto-reply trigger failed:", err));
      }, delay);
    }
  }

  return NextResponse.json({ conversationId: conversation.id, message });
}
