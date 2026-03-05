import type { Deduction } from "@/data/verificationTemplates";

// Palace → event mapping for 化忌 (Ji) and 化禄 (Lu)
const PALACE_EVENTS: Record<string, { ji: EventTemplate; lu?: EventTemplate }> = {
  官禄: {
    ji: { title: "Career Disruption", titleCn: "事业动荡", icon: "career" },
    lu: { title: "Career Advancement", titleCn: "事业升迁", icon: "career" },
  },
  疾厄: {
    ji: { title: "Health Crisis", titleCn: "健康危机", icon: "health" },
  },
  田宅: {
    ji: { title: "Property/Moving Disruption", titleCn: "房产变动", icon: "transition" },
    lu: { title: "Property Acquisition", titleCn: "置业信号", icon: "wealth" },
  },
  财帛: {
    ji: { title: "Financial Loss", titleCn: "财务损失", icon: "wealth" },
    lu: { title: "Wealth Surge", titleCn: "财运亨通", icon: "wealth" },
  },
  夫妻: {
    ji: { title: "Relationship Crisis", titleCn: "感情危机", icon: "relationship" },
    lu: { title: "Partnership Formation", titleCn: "姻缘到来", icon: "relationship" },
  },
  父母: {
    ji: { title: "Authority Conflict", titleCn: "长辈冲突", icon: "relationship" },
  },
  命宫: {
    ji: { title: "Identity Crisis", titleCn: "自我动荡", icon: "transition" },
  },
  迁移: {
    ji: { title: "Relocation Disruption", titleCn: "迁移变动", icon: "transition" },
    lu: { title: "Geographic Expansion", titleCn: "出行有利", icon: "transition" },
  },
};

interface EventTemplate {
  title: string;
  titleCn: string;
  icon: Deduction["icon"];
}

interface ScoredEvent {
  year: number;
  age: number;
  palace: string;
  mutagen: "忌" | "禄";
  score: number;
  doubleHit: boolean;
  template: EventTemplate;
}

// Priority palaces checked first
const PRIORITY_PALACES = ["官禄", "疾厄", "田宅", "财帛", "夫妻", "父母"];
const SECONDARY_PALACES = ["命宫", "迁移"];
const ALL_PALACES = [...PRIORITY_PALACES, ...SECONDARY_PALACES];

interface PredictorOptions {
  batch?: number; // 0 = first 3, 1 = next 3
}

/**
 * Generate chart-computed deductions using 飞星派 Flying Star analysis.
 * Analyzes 大限 + 流年 四化 to predict specific historical life events.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateChartDeductions(
  astrolabe: any,
  birthYear: number,
  options?: PredictorOptions,
): Deduction[] {
  const batch = options?.batch ?? 0;
  const currentYear = new Date().getFullYear();
  const currentAge = currentYear - birthYear;
  const startAge = Math.max(15, 1); // scan from age 15 (or 1 for very young)
  const endAge = Math.min(currentAge, 120);

  if (endAge < 15) return []; // too young for meaningful predictions

  const events: ScoredEvent[] = [];

  // Iterate each year from age 15 to current age
  for (let age = Math.max(startAge, 15); age <= endAge; age++) {
    const year = birthYear + age;
    const month = 6; // mid-year for representative horoscope
    const day = 15;
    const dateStr = `${year}-${month}-${day}`;

    let h;
    try {
      h = astrolabe.horoscope(dateStr);
    } catch {
      continue; // skip years where horoscope fails
    }
    if (!h) continue;

    for (const palaceName of ALL_PALACES) {
      const palaceConfig = PALACE_EVENTS[palaceName];
      if (!palaceConfig) continue;

      // Check 化忌 (Ji)
      let decadalJi = false;
      let annualJi = false;
      try {
        decadalJi = h.hasHoroscopeMutagen(palaceName, "decadal", "忌");
        annualJi = h.hasHoroscopeMutagen(palaceName, "yearly", "忌");
      } catch {
        // method may not exist for all palace/scope combos
      }

      // Check 化禄 (Lu)
      let decadalLu = false;
      let annualLu = false;
      try {
        decadalLu = h.hasHoroscopeMutagen(palaceName, "decadal", "禄");
        annualLu = h.hasHoroscopeMutagen(palaceName, "yearly", "禄");
      } catch {
        // method may not exist for all palace/scope combos
      }

      // Score 忌 events
      if (decadalJi || annualJi) {
        const doubleHit = decadalJi && annualJi;
        const score = doubleHit ? 92 : decadalJi ? 72 : 67;
        const template = palaceConfig.ji;
        events.push({ year, age, palace: palaceName, mutagen: "忌", score, doubleHit, template });
      }

      // Score 禄 events
      if ((decadalLu || annualLu) && palaceConfig.lu) {
        const doubleHit = decadalLu && annualLu;
        const score = doubleHit ? 88 : decadalLu ? 68 : 63;
        const template = palaceConfig.lu;
        events.push({ year, age, palace: palaceName, mutagen: "禄", score, doubleHit, template });
      }
    }
  }

  // Sort: 忌 first, then by confidence descending
  events.sort((a, b) => {
    if (a.mutagen !== b.mutagen) return a.mutagen === "忌" ? -1 : 1;
    return b.score - a.score;
  });

  // Deduplicate: one event per palace per decade
  const seen = new Set<string>();
  const deduped: ScoredEvent[] = [];
  for (const ev of events) {
    const decade = Math.floor(ev.age / 10);
    const key = `${ev.palace}-${decade}-${ev.mutagen}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(ev);
  }

  // Select batch: batch 0 = items 0-2, batch 1 = items 3-5
  const start = batch * 3;
  const selected = deduped.slice(start, start + 3);

  // Convert to Deduction[]
  return selected.map((ev, i): Deduction => {
    const description = ev.doubleHit
      ? `Around ${ev.year} (age ${ev.age}), a significant ${ev.template.title.toLowerCase()} in your life trajectory. Both decadal and annual indicators converge on this period, suggesting a particularly impactful event.`
      : `Between ${ev.year - 1}–${ev.year + 1} (approximately age ${ev.age - 1}–${ev.age + 1}), a notable ${ev.template.title.toLowerCase()} pattern emerged in your chart. This period carried transformative energy.`;

    return {
      id: `dynamic-${batch}-${i}`,
      title: `${ev.template.title} Detected`,
      titleCn: ev.template.titleCn,
      description,
      yearRange: ev.doubleHit ? `~${ev.age}` : `${ev.age - 1}–${ev.age + 1}`,
      confidence: ev.score,
      icon: ev.template.icon,
    };
  });
}
