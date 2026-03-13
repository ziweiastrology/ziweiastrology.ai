import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/prisma";
import type { PalaceDetail, ChartMeta } from "@/types";
import {
  getReportSystemPrompt,
  getPalaceAnalysisPrompt,
  getDecadeAnalysisPrompt,
  getLifeNarrativePrompt,
  getOverallAssessmentPrompt,
  getSimpleSummarySystemPrompt,
  getSimpleSummaryUserPrompt,
} from "./reportPrompts";

const anthropic = new Anthropic();

interface PalaceData {
  name: string;
  nameCn: string;
  stars: string[];
  energy: number;
  state: string;
  consciousness?: string;
  decadeRange?: [number, number];
  decadeHeavenlyStem?: string;
  earthlyBranch?: string;
}

function ageRangeToYears(ageRange: [number, number], birthYear: number): [number, number] {
  // iztro uses 虚岁 (nominal age, starts at 1). Calendar year = birthYear + age - 1
  return [birthYear + ageRange[0] - 1, birthYear + ageRange[1] - 1];
}

function buildChartContext(palaces: PalaceData[], meta: ChartMeta): string {
  const palaceList = palaces
    .map((p) => {
      const stateLabel =
        p.state !== "neutral"
          ? ` [${p.state === "lu" ? "禄" : p.state === "quan" ? "权" : p.state === "ke" ? "科" : "忌"}]`
          : "";
      const decadeLabel = (() => {
        if (!p.decadeRange) return "";
        const birthYear = meta.birthYear || new Date().getFullYear() - 30;
        const [yearStart, yearEnd] = ageRangeToYears(p.decadeRange, birthYear);
        return ` | 大限: Age ${p.decadeRange[0]}–${p.decadeRange[1]} (${yearStart}–${yearEnd})`;
      })();
      return `- ${p.nameCn} ${p.name}: Stars: ${p.stars.join(", ")}${stateLabel} | Energy: ${p.energy}%${decadeLabel}${p.earthlyBranch ? ` | 地支: ${p.earthlyBranch}` : ""}${p.decadeHeavenlyStem ? ` | 天干: ${p.decadeHeavenlyStem}` : ""}`;
    })
    .join("\n");

  return `Zi Wei Dou Shu (紫微斗数) Natal Chart — 飞星派 Flying Star School

Chart Summary:
- 命宫 Soul Palace: ${meta.soulPalace || "N/A"}
- 身宫 Body Palace: ${meta.bodyPalace || "N/A"}
- 五行局: ${meta.fiveElementsClass || "N/A"}
- Lunar Date: ${meta.lunarDate || "N/A"}
- Zodiac: ${meta.zodiac || "N/A"}
- Birth Year: ${meta.birthYear || "N/A"}

12 Palaces:
${palaceList}`;
}

async function generatePalaceAnalyses(
  palaces: PalaceData[],
  meta: ChartMeta,
  reportId: string,
  locale: string
): Promise<void> {
  const chartContext = buildChartContext(palaces, meta);

  // Run all 3 batches of 4 palaces in parallel
  await Promise.all(
    Array.from({ length: 3 }, (_, batch) => {
      const batchPalaces = palaces.slice(batch * 4, (batch + 1) * 4);
      const palaceNames = batchPalaces.map((p) => `${p.nameCn} ${p.name}`).join(", ");

      return (async () => {
        const response = await anthropic.messages.create({
          model: "claude-sonnet-4-20250514",
          max_tokens: 3000,
          system: getReportSystemPrompt(locale),
          messages: [
            {
              role: "user",
              content: getPalaceAnalysisPrompt(locale, chartContext, palaceNames),
            },
          ],
        });

        const content =
          response.content[0].type === "text" ? response.content[0].text : "";

        // Split by --- and save each palace section
        const sections = content.split(/\n---\n/).filter((s) => s.trim());

        for (let i = 0; i < batchPalaces.length && i < sections.length; i++) {
          const palace = batchPalaces[i];
          const sectionContent = sections[i].trim();
          const orderIndex = batch * 4 + i;

          await prisma.reportSection.upsert({
            where: {
              reportId_key: { reportId, key: `palace_${palace.name.toLowerCase().replace(/\s+/g, "_")}` },
            },
            create: {
              reportId,
              type: "PALACE_ANALYSIS",
              key: `palace_${palace.name.toLowerCase().replace(/\s+/g, "_")}`,
              title: `${palace.nameCn} ${palace.name}`,
              content: sectionContent,
              orderIndex,
            },
            update: {
              content: sectionContent,
              title: `${palace.nameCn} ${palace.name}`,
            },
          });
        }
      })();
    })
  );
}

async function generateDecadeAnalysis(
  palaces: PalaceData[],
  meta: ChartMeta,
  reportId: string,
  locale: string
): Promise<void> {
  const chartContext = buildChartContext(palaces, meta);
  const currentYear = new Date().getFullYear();
  const birthYear = meta.birthYear || currentYear - 30;
  const currentAge = currentYear - birthYear + 1; // 虚岁: nominal age for iztro compatibility

  // Find relevant decades (current ± 2)
  const decadePalaces = palaces
    .filter((p) => p.decadeRange)
    .sort((a, b) => (a.decadeRange?.[0] ?? 0) - (b.decadeRange?.[0] ?? 0));

  const relevantDecades = decadePalaces.filter((p) => {
    if (!p.decadeRange) return false;
    return Math.abs(p.decadeRange[0] - currentAge) <= 20 ||
           (p.decadeRange[0] <= currentAge && p.decadeRange[1] >= currentAge);
  });

  const decadeList = (relevantDecades.length > 0 ? relevantDecades : decadePalaces)
    .map((p) => {
      const [yearStart, yearEnd] = ageRangeToYears(p.decadeRange!, birthYear);
      return `${p.nameCn} ${p.name}: Age ${p.decadeRange![0]}-${p.decadeRange![1]} (Years ${yearStart}-${yearEnd}) | Stars: ${p.stars.join(", ")}`;
    })
    .join("\n");

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2500,
    system: getReportSystemPrompt(locale),
    messages: [
      {
        role: "user",
        content: getDecadeAnalysisPrompt(locale, chartContext, currentAge, decadeList),
      },
    ],
  });

  const content =
    response.content[0].type === "text" ? response.content[0].text : "";

  await prisma.reportSection.upsert({
    where: {
      reportId_key: { reportId, key: "decade_timeline" },
    },
    create: {
      reportId,
      type: "DECADE_ANALYSIS",
      key: "decade_timeline",
      title: "Decade-by-Decade Life Timeline",
      content,
      orderIndex: 12,
    },
    update: { content },
  });
}

async function generateLifeNarrative(
  palaces: PalaceData[],
  meta: ChartMeta,
  reportId: string,
  locale: string
): Promise<void> {
  const chartContext = buildChartContext(palaces, meta);

  // Find key palaces for the narrative
  const soulPalace = palaces.find((p) => p.name.toLowerCase().includes("soul") || p.nameCn === "命宫");
  const careerPalace = palaces.find((p) => p.name.toLowerCase().includes("career") || p.nameCn === "官禄宫");
  const spousePalace = palaces.find((p) => p.name.toLowerCase().includes("spouse") || p.nameCn === "夫妻宫");
  const fortunePalace = palaces.find((p) => p.name.toLowerCase().includes("fortune") || p.nameCn === "福德宫");

  const keyStars = [
    ...(soulPalace?.stars || []),
    ...(careerPalace?.stars || []),
    ...(fortunePalace?.stars || []),
  ].filter((v, i, a) => a.indexOf(v) === i).slice(0, 8);

  const soulPalaceNameCn = soulPalace?.nameCn || "命宫";
  const soulStars = soulPalace?.stars.join(", ") || "N/A";
  const careerStars = careerPalace?.stars.join(", ") || "N/A";
  const spouseStars = spousePalace?.stars.join(", ") || "N/A";
  const fortuneStars = fortunePalace?.stars.join(", ") || "N/A";

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    system: getReportSystemPrompt(locale),
    messages: [
      {
        role: "user",
        content: getLifeNarrativePrompt(
          locale,
          chartContext,
          soulPalaceNameCn,
          soulStars,
          careerStars,
          spouseStars,
          fortuneStars,
          keyStars.join(", ")
        ),
      },
    ],
  });

  const content =
    response.content[0].type === "text" ? response.content[0].text : "";

  await prisma.reportSection.upsert({
    where: {
      reportId_key: { reportId, key: "life_narrative" },
    },
    create: {
      reportId,
      type: "LIFE_NARRATIVE",
      key: "life_narrative",
      title: "Your Life Story · 你的命运故事",
      content,
      orderIndex: 13,
    },
    update: { content },
  });
}

async function generateOverallAssessment(
  palaces: PalaceData[],
  meta: ChartMeta,
  reportId: string,
  locale: string
): Promise<void> {
  const chartContext = buildChartContext(palaces, meta);

  // Gather palace summaries from already-generated sections
  const existingSections = await prisma.reportSection.findMany({
    where: { reportId, type: "PALACE_ANALYSIS" },
    select: { title: true, content: true },
    orderBy: { orderIndex: "asc" },
  });

  const summaries = existingSections
    .map((s) => `### ${s.title}\n${s.content.slice(0, 300)}...`)
    .join("\n\n");

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 3000,
    system: getReportSystemPrompt(locale),
    messages: [
      {
        role: "user",
        content: getOverallAssessmentPrompt(locale, chartContext, summaries),
      },
    ],
  });

  const content =
    response.content[0].type === "text" ? response.content[0].text : "";

  await prisma.reportSection.upsert({
    where: {
      reportId_key: { reportId, key: "overall_assessment" },
    },
    create: {
      reportId,
      type: "OVERALL_ASSESSMENT",
      key: "overall_assessment",
      title: "Overall Life-Path Assessment",
      content,
      orderIndex: 14,
    },
    update: { content },
  });
}

async function generateSimpleSummary(
  palaces: PalaceData[],
  meta: ChartMeta,
  reportId: string,
  locale: string
): Promise<void> {
  // Fetch all completed sections for context
  const existingSections = await prisma.reportSection.findMany({
    where: { reportId },
    select: { title: true, content: true },
    orderBy: { orderIndex: "asc" },
  });

  const summaries = existingSections
    .map((s) => `### ${s.title}\n${s.content.slice(0, 400)}`)
    .join("\n\n");

  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1500,
    system: getSimpleSummarySystemPrompt(locale),
    messages: [
      {
        role: "user",
        content: getSimpleSummaryUserPrompt(locale, summaries),
      },
    ],
  });

  const content =
    response.content[0].type === "text" ? response.content[0].text : "";

  await prisma.reportSection.upsert({
    where: {
      reportId_key: { reportId, key: "simple_summary" },
    },
    create: {
      reportId,
      type: "SIMPLE_SUMMARY",
      key: "simple_summary",
      title: "Your Chart at a Glance",
      content,
      orderIndex: -1,
    },
    update: { content },
  });
}

export async function generateFullReport(reportId: string, locale: string = "en"): Promise<void> {
  try {
    // Update status to GENERATING
    const report = await prisma.chartReport.update({
      where: { id: reportId },
      data: { status: "GENERATING" },
    });

    const palaces = report.palacesJson as unknown as PalaceData[];
    const meta = report.metaJson as unknown as ChartMeta;

    // Phase 1: All independent sections in parallel (5 concurrent API calls)
    await Promise.all([
      generatePalaceAnalyses(palaces, meta, reportId, locale),
      generateDecadeAnalysis(palaces, meta, reportId, locale),
      generateLifeNarrative(palaces, meta, reportId, locale),
    ]);

    // Phase 2: Overall assessment + simple summary in parallel
    // Both read from DB but are independent of each other
    await Promise.all([
      generateOverallAssessment(palaces, meta, reportId, locale),
      generateSimpleSummary(palaces, meta, reportId, locale),
    ]);

    // Mark complete
    await prisma.chartReport.update({
      where: { id: reportId },
      data: { status: "COMPLETE" },
    });
  } catch (error) {
    console.error("Report generation failed:", error);
    await prisma.chartReport.update({
      where: { id: reportId },
      data: { status: "FAILED" },
    });
  }
}
