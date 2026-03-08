import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/prisma";
import { buildDMAgentPrompt, type DMUserContext } from "@/lib/dmAgentPrompt";

const anthropic = new Anthropic();

const EDITORIAL_EMAIL =
  process.env.EDITORIAL_USER_EMAIL || "editorial@ziweiastrology.ai";

export async function POST(request: Request) {
  try {
    // Basic auth: only allow internal calls (check for internal secret or same-origin)
    const authHeader = request.headers.get("x-internal-secret");
    if (authHeader !== process.env.AUTH_SECRET) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const { conversationId, userMessage, userId } = await request.json();

    if (!conversationId || !userMessage || !userId) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }

    // Look up editorial user
    const editorialUser = await prisma.user.findFirst({
      where: { email: EDITORIAL_EMAIL },
      select: { id: true },
    });

    if (!editorialUser) {
      console.error("Editorial user not found:", EDITORIAL_EMAIL);
      return NextResponse.json(
        { error: "editorial_user_not_found" },
        { status: 500 }
      );
    }

    // Fetch user context
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        tier: true,
        credits: true,
        birthDate: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "user_not_found" }, { status: 404 });
    }

    const accountAgeDays = Math.floor(
      (Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)
    );

    const userContext: DMUserContext = {
      name: user.name,
      tier: user.tier,
      credits: user.credits,
      accountAgeDays,
      hasBirthData: !!user.birthDate,
      subscriptionStatus: null,
    };

    // Fetch conversation history (last 10 messages)
    const recentMessages = await prisma.directMessage.findMany({
      where: { conversationId },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: { senderId: true, content: true },
    });

    // Build Claude messages (oldest first)
    const history: { role: "user" | "assistant"; content: string }[] =
      recentMessages.reverse().map((m) => ({
        role:
          m.senderId === editorialUser.id
            ? ("assistant" as const)
            : ("user" as const),
        content: m.content,
      }));

    // Call Claude (haiku for cost efficiency)
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system: buildDMAgentPrompt(userContext),
      messages: history,
    });

    const aiReply =
      response.content[0].type === "text" ? response.content[0].text : "";

    if (!aiReply) {
      return NextResponse.json({ error: "empty_response" }, { status: 500 });
    }

    // Save AI reply as a DirectMessage from the editorial user
    const message = await prisma.directMessage.create({
      data: {
        conversationId,
        senderId: editorialUser.id,
        content: aiReply,
      },
    });

    // Update conversation timestamp
    await prisma.dMConversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    // Send notification to the user
    await prisma.notification.create({
      data: {
        userId,
        type: "SYSTEM",
        title: "New Message",
        content: "ZiWei Assistant sent you a reply",
        link: "/messages",
      },
    });

    return NextResponse.json({ success: true, messageId: message.id });
  } catch (error) {
    console.error("Auto-reply error:", error);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
