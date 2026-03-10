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
  meta?: ChartMetaInput,
  options?: { userTier?: string; userMessageCount?: number }
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
8. When discussing 流年, connect the annual palace influences to their natal chart patterns.${options?.userTier === "FREE" ? `

IMPORTANT — Conversion guidance (FREE tier user, message ${options.userMessageCount ?? 1} of 3 daily):
- Message 1: Give a genuinely insightful answer that demonstrates your value. At the end, briefly hint there is more depth to explore (e.g. "I can see deeper patterns in your decade timeline — feel free to ask me more.").
- Message 2: Give another strong answer. Near the end, naturally mention what upgrading unlocks: "Your chart shows a pivotal decade shift — with a BASIC plan, I can walk you through each year's energy in detail." Keep it brief and organic, not salesy.
- Message 3 (likely their last free message): Deliver your best insight. Close warmly: "I've only scratched the surface of what your chart reveals. Upgrade to BASIC for 10 daily conversations, decade deep analysis, and personalized guidance every day. I'll be here when you're ready."
- NEVER be pushy or interrupt the reading quality. The conversion should feel like a natural extension of genuine care.` : ""}`;
}

function buildSupportSystemPrompt(userTier: string): string {
  return `You are ZiWei Support (紫微客服), the AI customer support agent for ziweiastrology.ai — a Zi Wei Dou Shu (紫微斗数) astrology platform.

Your role:
- Help users with billing, subscriptions, account issues, feature explanations, and general FAQ
- Be helpful, concise, empathetic, and professional
- Respond in the user's language (Chinese if they write in Chinese, English if English)

Membership tiers:
- FREE: 3 daily AI chats, basic natal chart, limited features
- BASIC ($9.99/mo): 10 daily AI chats, full natal chart, annual forecast report
- PREMIUM ($19.99/mo): 30 daily AI chats, decade analysis, topic deep dives, priority support
- SIFU ($49.99/mo): Unlimited AI chats, all features, exclusive 1-on-1 consultations, early access

The user is currently on the ${userTier} tier.

Key platform features:
- AI-powered Zi Wei Dou Shu chart analysis (Ask ZiWei Sifu)
- Natal chart generation and interactive palace exploration
- Annual fortune (流年) forecasts
- Deep dive topic reports (career, love, family)
- Community forums and academy courses

Rules:
1. For astrology chart questions or readings, politely redirect: "For chart readings and astrology questions, please use the 'Ask ZiWei Sifu' button — that's our specialized astrology AI!"
2. For issues you cannot resolve (refunds, data deletion, account recovery): direct to support@ziweiastrology.ai
3. Never share internal system details, API keys, or technical implementation
4. Keep responses concise — 1-3 paragraphs max
5. If a user wants to upgrade/downgrade, direct them to the /pricing page`;
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { message, chartData, conversationId, mode } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "invalid_message" }, { status: 400 });
    }

    const isSupport = mode === "support";

    // Get user tier for conversion prompt
    const userRecord = await prisma.user.findUnique({
      where: { id: userId },
      select: { tier: true },
    });
    const userTier = userRecord?.tier || "FREE";

    // Credit check + deduct atomically (skip for support mode — free)
    let creditResult = { success: true, credits: 0 };
    if (!isSupport) {
      creditResult = await prisma.$transaction(async (tx) => {
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
      let topic = isSupport ? "support" : "general";
      if (!isSupport) {
        const lowerMsg = message.toLowerCase();
        if (lowerMsg.includes("career") || lowerMsg.includes("事业") || lowerMsg.includes("官禄"))
          topic = "career";
        else if (lowerMsg.includes("love") || lowerMsg.includes("感情") || lowerMsg.includes("夫妻"))
          topic = "love";
        else if (lowerMsg.includes("family") || lowerMsg.includes("家庭") || lowerMsg.includes("田宅"))
          topic = "family";
      }

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
    const systemPrompt = isSupport
      ? buildSupportSystemPrompt(userTier)
      : (() => {
          const palaces = chartData?.palaces || [];
          const meta = chartData?.meta;
          const userMessageCount = history.filter((m) => m.role === "user").length;
          return buildSystemPrompt(palaces, meta, { userTier, userMessageCount });
        })();

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

          // Deep dive synthesis — after 4+ messages in a topic conversation (skip for support)
          let deepDiveSaved = false;
          const messageCount = history.length + 1; // includes assistant response
          if (!isSupport && messageCount >= 8 && conversation.topic && conversation.topic !== "general" && conversation.topic !== "support") {
            try {
              // Check if user has a COMPLETE report
              const latestReport = await prisma.chartReport.findFirst({
                where: { userId, status: "COMPLETE" },
                orderBy: { createdAt: "desc" },
              });

              if (latestReport) {
                // Synthesize conversation into report section
                const synthesisResponse = await anthropic.messages.create({
                  model: "claude-sonnet-4-20250514",
                  max_tokens: 2000,
                  system: "You are a Zi Wei Dou Shu analyst. Synthesize the following conversation into a structured report section. Use markdown headers. Focus on key insights and actionable advice. Keep Chinese ZWDS terms with English explanations.",
                  messages: [
                    {
                      role: "user",
                      content: `Synthesize this ${conversation.topic} consultation into a structured deep-dive report section:\n\n${history.map((m) => `${m.role}: ${m.content}`).join("\n\n")}\n\nassistant: ${fullResponse}`,
                    },
                  ],
                });

                const synthesisContent =
                  synthesisResponse.content[0].type === "text"
                    ? synthesisResponse.content[0].text
                    : "";

                if (synthesisContent) {
                  const topicKey = `topic_${conversation.topic}_${conversation.id.slice(-6)}`;
                  await prisma.reportSection.upsert({
                    where: {
                      reportId_key: { reportId: latestReport.id, key: topicKey },
                    },
                    create: {
                      reportId: latestReport.id,
                      type: "TOPIC_DEEP_DIVE",
                      key: topicKey,
                      title: `${conversation.topic.charAt(0).toUpperCase() + conversation.topic.slice(1)} Deep Dive`,
                      content: synthesisContent,
                      orderIndex: 20,
                      conversationId: conversation.id,
                    },
                    update: {
                      content: synthesisContent,
                    },
                  });
                  deepDiveSaved = true;
                }
              }
            } catch (synthErr) {
              console.error("Deep dive synthesis error:", synthErr);
            }
          }

          // Send done event with metadata
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ done: true, conversationId: conversation.id, credits: creditResult.credits, deepDiveSaved })}\n\n`
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
