import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CREDIT_COSTS } from "@/lib/credits";

const anthropic = new Anthropic();

interface PalaceInput {
  name: string;
  nameCn: string;
  stars: string[];
  energy: number;
  state: string;
  consciousness?: string;
  decadeRange?: [number, number];
  earthlyBranch?: string;
}

interface ChartMetaInput {
  soulPalace?: string;
  bodyPalace?: string;
  fiveElementsClass?: string;
  lunarDate?: string;
  zodiac?: string;
  birthYear?: number;
}

function buildSystemPrompt(
  palaces: PalaceInput[],
  meta?: ChartMetaInput
): string {
  const palaceList = palaces
    .map((p) => {
      const stateLabel =
        p.state !== "neutral"
          ? ` [${p.state === "lu" ? "禄" : p.state === "quan" ? "权" : p.state === "ke" ? "科" : "忌"}]`
          : "";
      return `- ${p.nameCn} ${p.name}: Stars: ${p.stars.join(", ")}${stateLabel} | Energy: ${p.energy}%${p.decadeRange ? ` | 大限: ${p.decadeRange[0]}–${p.decadeRange[1]}` : ""}`;
    })
    .join("\n");

  const metaSection = meta
    ? `
Chart Summary:
- 命宫 Soul Palace: ${meta.soulPalace || "N/A"}
- 身宫 Body Palace: ${meta.bodyPalace || "N/A"}
- 五行局: ${meta.fiveElementsClass || "N/A"}
- Lunar Date: ${meta.lunarDate || "N/A"}
- Zodiac: ${meta.zodiac || "N/A"}
- Birth Year: ${meta.birthYear || "N/A"}
`
    : "";

  return `You are ZiWei Sifu (紫微师父), a wise and warm master of Zi Wei Dou Shu (紫微斗数).
You specialize in 飞星派 Flying Star school analysis.

${metaSection}
The user's natal chart — 12 Palaces:
${palaceList}

Rules:
1. Answer in the user's language. If they write in Chinese, reply in Chinese. If English, reply in English.
2. Focus on actionable 流年 (annual fortune) insights for 2026, referencing specific stars and palaces.
3. Ask follow-up questions to personalize advice — collect life context (job, relationship status, goals).
4. Reference specific stars, their brightness, and 四化 (Four Transformations) from their chart.
5. Be warm, wise, and encouraging — like a trusted mentor. Use the tone of an experienced Sifu.
6. Never make absolute predictions — frame as tendencies, potential, and advice.
7. Keep responses concise but insightful — 2-4 paragraphs max.
8. When discussing 流年, connect the annual palace influences to their natal chart patterns.`;
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { message, chartData, conversationId } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "invalid_message" }, { status: 400 });
    }

    // Credit check + deduct atomically
    const creditResult = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { credits: true },
      });

      if (!user || user.credits < CREDIT_COSTS.CHATBOT_MESSAGE) {
        return {
          success: false,
          credits: user?.credits ?? 0,
          needed: CREDIT_COSTS.CHATBOT_MESSAGE,
        };
      }

      await tx.creditTransaction.create({
        data: {
          userId,
          amount: -CREDIT_COSTS.CHATBOT_MESSAGE,
          type: "CHATBOT_MESSAGE",
        },
      });

      const updated = await tx.user.update({
        where: { id: userId },
        data: { credits: { decrement: CREDIT_COSTS.CHATBOT_MESSAGE } },
        select: { credits: true },
      });

      return { success: true, credits: updated.credits };
    });

    if (!creditResult.success) {
      return NextResponse.json(
        { error: "insufficient_credits", ...creditResult },
        { status: 402 }
      );
    }

    // Get or create conversation
    let conversation;
    if (conversationId) {
      conversation = await prisma.conversation.findFirst({
        where: { id: conversationId, userId },
        include: { messages: { orderBy: { createdAt: "asc" }, take: 50 } },
      });
    }

    if (!conversation) {
      // Determine topic from message
      let topic = "general";
      const lowerMsg = message.toLowerCase();
      if (lowerMsg.includes("career") || lowerMsg.includes("事业") || lowerMsg.includes("官禄"))
        topic = "career";
      else if (lowerMsg.includes("love") || lowerMsg.includes("感情") || lowerMsg.includes("夫妻"))
        topic = "love";
      else if (lowerMsg.includes("family") || lowerMsg.includes("家庭") || lowerMsg.includes("田宅"))
        topic = "family";

      conversation = await prisma.conversation.create({
        data: { userId, topic },
        include: { messages: true },
      });
    }

    // Save user message
    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        role: "user",
        content: message,
      },
    });

    // Build conversation history for Claude
    const history: { role: "user" | "assistant"; content: string }[] =
      conversation.messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));
    history.push({ role: "user", content: message });

    // Build system prompt
    const palaces = chartData?.palaces || [];
    const meta = chartData?.meta;
    const systemPrompt = buildSystemPrompt(palaces, meta);

    // Stream Claude response
    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: history,
    });

    // Create a ReadableStream that emits SSE
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        let fullResponse = "";

        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              const text = event.delta.text;
              fullResponse += text;
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text })}\n\n`)
              );
            }
          }

          // Save assistant message
          await prisma.message.create({
            data: {
              conversationId: conversation.id,
              role: "assistant",
              content: fullResponse,
            },
          });

          // Send done event with metadata
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ done: true, conversationId: conversation.id, credits: creditResult.credits })}\n\n`
            )
          );
        } catch (err) {
          console.error("Stream error:", err);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: "stream_error" })}\n\n`
            )
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
