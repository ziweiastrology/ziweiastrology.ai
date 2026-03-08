import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  computeFlowDayData,
  generateDailyInsight,
} from "@/lib/zwds/dailyInsight";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

    // Check cache first
    const cached = await prisma.dailyInsight.findUnique({
      where: { userId_date: { userId, date: today } },
    });

    if (cached) {
      return NextResponse.json({
        insight: cached.content,
        palaceKey: cached.palaceKey,
        cached: true,
      });
    }

    // Fetch user birth data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        birthDate: true,
        birthHour: true,
        birthGender: true,
      },
    });

    if (!user?.birthDate || user.birthHour == null || !user.birthGender) {
      return NextResponse.json(
        { error: "no_birth_data" },
        { status: 400 }
      );
    }

    // Compute flow-day data
    let flowDayData;
    try {
      flowDayData = await computeFlowDayData(
        user.birthDate,
        user.birthHour,
        user.birthGender,
        today,
      );
    } catch (e) {
      const msg = e instanceof Error ? e.message : "unknown";
      console.error("Flow-day computation error:", msg);
      return NextResponse.json(
        { error: "computation_failed", detail: msg },
        { status: 500 }
      );
    }

    // Generate AI insight
    let insight;
    try {
      insight = await generateDailyInsight(flowDayData, user.name);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "unknown";
      console.error("AI generation error:", msg);
      return NextResponse.json(
        { error: "ai_generation_failed", detail: msg },
        { status: 500 }
      );
    }

    if (!insight) {
      return NextResponse.json(
        { error: "empty_insight" },
        { status: 500 }
      );
    }

    // Cache in DB
    const saved = await prisma.dailyInsight.create({
      data: {
        userId,
        date: today,
        content: insight,
        palaceKey: flowDayData.primaryPalaceId,
      },
    });

    return NextResponse.json({
      insight: saved.content,
      palaceKey: saved.palaceKey,
      cached: false,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown";
    console.error("Daily insight error:", message, error);
    return NextResponse.json(
      { error: "internal_error", detail: message },
      { status: 500 }
    );
  }
}
