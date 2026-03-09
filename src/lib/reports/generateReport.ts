import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/prisma";
import type { PalaceDetail, ChartMeta } from "@/types";

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

function buildChartContext(palaces: PalaceData[], meta: ChartMeta): string {
  const palaceList = palaces
    .map((p) => {
      const stateLabel =
        p.state !== "neutral"
          ? ` [${p.state === "lu" ? "禄" : p.state === "quan" ? "权" : p.state === "ke" ? "科" : "忌"}]`
          : "";
      return `- ${p.nameCn} ${p.name}: Stars: ${p.stars.join(", ")}${stateLabel} | Energy: ${p.energy}%${p.decadeRange ? ` | 大限: ${p.decadeRange[0]}–${p.decadeRange[1]}` : ""}${p.earthlyBranch ? ` | 地支: ${p.earthlyBranch}` : ""}${p.decadeHeavenlyStem ? ` | 天干: ${p.decadeHeavenlyStem}` : ""}`;
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

const REPORT_SYSTEM_PROMPT = `You are a master Zi Wei Dou Shu (紫微斗数) analyst specializing in 飞星派 Flying Star school.
You write deep, insightful natal chart reports in the "Ancient Quantum" narrative style — blending traditional Chinese metaphysics wisdom with modern, accessible language.

Style guidelines:
- Use Chinese ZWDS terms (宫, 星, 四化) with English explanations
- Be specific: reference exact stars, their brightness levels, and interactions
- Frame insights as tendencies and potential, never absolute predictions
- Use vivid, evocative language — imagine ancient wisdom meeting quantum physics
- Structure with clear markdown headers (##, ###)
- Each palace analysis should be 200-400 words
- Be warm and encouraging while being honest about challenges`;

async function generatePalaceAnalyses(
  palaces: PalaceData[],
  meta: ChartMeta,
  reportId: string
): Promise<void> {
  const chartContext = buildChartContext(palaces, meta);

  // Split 12 palaces into 3 batches of 4
  for (let batch = 0; batch < 3; batch++) {
    const batchPalaces = palaces.slice(batch * 4, (batch + 1) * 4);
    const palaceNames = batchPalaces.map((p) => `${p.nameCn} ${p.name}`).join(", ");

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: REPORT_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `${chartContext}

Generate deep analysis for these 4 palaces: ${palaceNames}

For each palace, write a section with:
1. **Palace Overview** — the palace's role and significance
2. **Star Configuration** — analysis of the stars present, their brightness, and interactions
3. **四化 Transformation Effects** — how the Four Transformations affect this palace
4. **Life Impact** — practical implications for the person's life
5. **Advice** — actionable guidance

Format each palace as a separate section with ## header using the palace name.
Separate each palace section with ---`,
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
  }
}

async function generateDecadeAnalysis(
  palaces: PalaceData[],
  meta: ChartMeta,
  reportId: string
): Promise<void> {
  const chartContext = buildChartContext(palaces, meta);
  const currentYear = new Date().getFullYear();
  const birthYear = meta.birthYear || currentYear - 30;
  const currentAge = currentYear - birthYear;

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
    .map((p) => `${p.nameCn} ${p.name}: Age ${p.decadeRange![0]}-${p.decadeRange![1]} | Stars: ${p.stars.join(", ")}`)
    .join("\n");

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 3000,
    system: REPORT_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `${chartContext}

Current age: ~${currentAge}

Generate a decade-by-decade life timeline analysis covering these decades:
${decadeList}

For each decade:
1. **Theme** — the overarching energy and theme
2. **Key Stars** — which stars dominate and their effects
3. **Opportunities** — what to leverage during this period
4. **Challenges** — what to watch out for
5. **Advice** — strategic guidance for this life chapter

Highlight the CURRENT decade with extra detail. Connect patterns across decades to show the life trajectory.`,
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
  reportId: string
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

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2500,
    system: REPORT_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `${chartContext}

Write a personal life narrative for this person — a "Life Story" (命运故事) in 2nd person ("You are someone who...").

Maximum 500 words. Structure as 3 short chapters:

**Chapter 1 — Origin (起源)**: The childhood energy and core nature from 命宫 (${soulPalace?.nameCn || "命宫"}) with stars: ${soulPalace?.stars.join(", ") || "N/A"}. What kind of child were they? What inner fire or quiet strength did they carry?

**Chapter 2 — Journey (历程)**: Career and relationship patterns from 官禄宫 (${careerPalace?.stars.join(", ") || "N/A"}) and 夫妻宫 (${spousePalace?.stars.join(", ") || "N/A"}). How do they navigate ambition and love? What recurring themes appear?

**Chapter 3 — Destiny (命运)**: Future potential from 福德宫 (${fortunePalace?.stars.join(", ") || "N/A"}) and their decade trajectory. Where is the energy flowing? What is the highest version of themselves?

Key stars to reference specifically: ${keyStars.join(", ")}

Style requirements:
- Warm, vivid, almost poetic — like a wise elder describing who they are
- Reference specific stars by name (both Chinese and English) to make it feel uniquely personal
- Include 1-2 moments of "uncanny accuracy" — specific star combinations that map to specific personality traits
- End with a forward-looking hook that makes them want to read the detailed palace analyses
- Do NOT use headers or markdown formatting — write as flowing prose paragraphs
- Each chapter should be separated by a blank line with the chapter title in bold`,
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
  reportId: string
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
    system: REPORT_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `${chartContext}

Palace analysis summaries:
${summaries}

Generate a comprehensive Overall Life-Path Assessment covering:

## Personality Profile
Core personality traits revealed by 命宫, 福德宫, and key star interactions.

## Career Suitability
Best industries, roles, and work styles based on 官禄宫, 财帛宫, and overall chart energy. Include specific career recommendations.

## Wealth Pattern
Money-making style, investment tendencies, and financial timing based on 财帛宫 and 田宅宫.

## Key Life Timing
Most important years and decades — when to push forward, when to consolidate.

## Relationships
Partnership patterns, compatibility traits, and relationship advice from 夫妻宫 and 福德宫.

## Life Advice
Synthesize all insights into 3-5 key pieces of strategic life advice. Be specific and actionable.`,
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

export async function generateFullReport(reportId: string): Promise<void> {
  try {
    // Update status to GENERATING
    const report = await prisma.chartReport.update({
      where: { id: reportId },
      data: { status: "GENERATING" },
    });

    const palaces = report.palacesJson as unknown as PalaceData[];
    const meta = report.metaJson as unknown as ChartMeta;

    // Generate sections sequentially (each builds on previous)
    await generatePalaceAnalyses(palaces, meta, reportId);   // 0-11
    await generateDecadeAnalysis(palaces, meta, reportId);    // 12
    await generateLifeNarrative(palaces, meta, reportId);     // 13
    await generateOverallAssessment(palaces, meta, reportId); // 14

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
