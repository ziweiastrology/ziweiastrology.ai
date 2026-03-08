import Anthropic from "@anthropic-ai/sdk";
import { tstToTimeIndex } from "./timeIndex";

const anthropic = new Anthropic();

// Palace names for iteration
const PALACE_NAMES = [
  "命宫", "兄弟", "夫妻", "子女", "财帛", "疾厄",
  "迁移", "仆役", "官禄", "田宅", "福德", "父母",
];

const PALACE_EN: Record<string, string> = {
  命宫: "Life Palace (命宫)",
  兄弟: "Siblings Palace (兄弟宫)",
  夫妻: "Spouse Palace (夫妻宫)",
  子女: "Children Palace (子女宫)",
  财帛: "Wealth Palace (财帛宫)",
  疾厄: "Health Palace (疾厄宫)",
  迁移: "Travel Palace (迁移宫)",
  仆役: "Friends Palace (交友宫)",
  官禄: "Career Palace (官禄宫)",
  田宅: "Property Palace (田宅宫)",
  福德: "Fortune Palace (福德宫)",
  父母: "Parents Palace (父母宫)",
};

const PALACE_ID: Record<string, string> = {
  命宫: "self", 兄弟: "siblings", 夫妻: "spouse", 子女: "children",
  财帛: "wealth", 疾厄: "health", 迁移: "travel", 仆役: "friends",
  官禄: "career", 田宅: "property", 福德: "fortune", 父母: "parents",
};

const MUTAGEN_EN: Record<string, string> = {
  禄: "Lu (禄) — prosperity/abundance",
  权: "Quan (权) — authority/power",
  科: "Ke (科) — recognition/wisdom",
  忌: "Ji (忌) — tension/caution",
};

interface FlowDayData {
  dailyMutagenHits: Array<{
    palace: string;
    palaceEn: string;
    mutagen: string;
    mutagenEn: string;
    scope: "daily" | "monthly" | "yearly";
  }>;
  primaryPalace: string | null;
  primaryPalaceId: string | null;
}

/**
 * Compute flow-day (流日) ZWDS data for a given user's birth info and today's date.
 */
export async function computeFlowDayData(
  birthDate: Date,
  birthHour: number,
  birthGender: string,
  today: string, // "YYYY-MM-DD"
): Promise<FlowDayData> {
  const { astro } = await import("iztro");

  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  const solarDate = `${year}-${month}-${day}`;
  const timeIndex = tstToTimeIndex(birthHour);
  const gender = birthGender === "female" ? "女" : "男";

  const astrolabe = astro.bySolar(solarDate, timeIndex, gender, true, "zh-CN");
  const horoscope = astrolabe.horoscope(today);

  const hits: FlowDayData["dailyMutagenHits"] = [];

  for (const palace of PALACE_NAMES) {
    for (const [mutagen, mutagenEn] of Object.entries(MUTAGEN_EN)) {
      // Check daily (流日) scope
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((horoscope as any).hasHoroscopeMutagen(palace, "daily", mutagen)) {
          hits.push({
            palace,
            palaceEn: PALACE_EN[palace] || palace,
            mutagen,
            mutagenEn,
            scope: "daily",
          });
        }
      } catch {
        // method may not exist for all palace/scope combos
      }

      // Also check monthly (流月) for added context
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((horoscope as any).hasHoroscopeMutagen(palace, "monthly", mutagen)) {
          hits.push({
            palace,
            palaceEn: PALACE_EN[palace] || palace,
            mutagen,
            mutagenEn,
            scope: "monthly",
          });
        }
      } catch {
        // skip
      }
    }
  }

  // Primary palace = first daily 禄 or 忌 hit
  const primary =
    hits.find((h) => h.scope === "daily" && h.mutagen === "禄") ||
    hits.find((h) => h.scope === "daily" && h.mutagen === "忌") ||
    hits.find((h) => h.scope === "daily") ||
    null;

  return {
    dailyMutagenHits: hits,
    primaryPalace: primary?.palace || null,
    primaryPalaceId: primary ? (PALACE_ID[primary.palace] || null) : null,
  };
}

/**
 * Generate a natural-language daily insight using Claude Haiku.
 */
export async function generateDailyInsight(
  flowDayData: FlowDayData,
  userName: string | null,
): Promise<string> {
  const dailyHits = flowDayData.dailyMutagenHits
    .filter((h) => h.scope === "daily")
    .map((h) => `- ${h.palaceEn}: ${h.mutagenEn}`)
    .join("\n");

  const monthlyHits = flowDayData.dailyMutagenHits
    .filter((h) => h.scope === "monthly")
    .map((h) => `- ${h.palaceEn}: ${h.mutagenEn}`)
    .join("\n");

  const prompt = `You are a warm, wise ZWDS (紫微斗数) mentor writing a personalized daily insight.

Today's flow-day (流日) four transformations for this user:
${dailyHits || "No significant daily activations detected."}

This month's flow-month (流月) context:
${monthlyHits || "No significant monthly activations detected."}

Write a 2-3 sentence daily insight in English with Chinese ZWDS terms in parentheses where relevant.
- Lead with the most significant palace activation and what it means practically
- Include one specific, actionable suggestion
- If there's a 忌 (Ji/tension), mention it with a gentle caution
- Tone: warm mentor, encouraging but honest — like a trusted Sifu
- Do NOT use greetings or the user's name
- Do NOT use bullet points or lists — write flowing prose
- STRICT: Maximum 50 words total. Be concise.`;

  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 200,
    messages: [{ role: "user", content: prompt }],
  });

  return response.content[0].type === "text"
    ? response.content[0].text.trim()
    : "";
}
