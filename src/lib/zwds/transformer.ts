import type { PalaceDetail } from "@/types";
import { PALACE_UI_META } from "@/components/destiny-matrix/palaceData";
import { STARS } from "@/data/starData";

// ---------------------------------------------------------------------------
// iztro palace name → our palace ID
// ---------------------------------------------------------------------------
const PALACE_NAME_MAP: Record<string, string> = {
  "命宫": "self",
  "兄弟": "siblings",
  "夫妻": "spouse",
  "子女": "children",
  "财帛": "wealth",
  "疾厄": "health",
  "迁移": "travel",
  "仆役": "friends",
  "官禄": "career",
  "田宅": "property",
  "福德": "fortune",
  "父母": "parents",
};

// ---------------------------------------------------------------------------
// Earthly branch → fixed grid position  (col, row)
// ---------------------------------------------------------------------------
const BRANCH_GRID: Record<string, [number, number]> = {
  "寅": [4, 4], "卯": [4, 3], "辰": [4, 2], "巳": [4, 1],
  "午": [3, 1], "未": [2, 1], "申": [1, 1], "酉": [1, 2],
  "戌": [1, 3], "亥": [1, 4], "子": [2, 4], "丑": [3, 4],
};

// ---------------------------------------------------------------------------
// Brightness → energy score
// ---------------------------------------------------------------------------
const BRIGHTNESS_ENERGY: Record<string, number> = {
  "庙": 95, "旺": 85, "得": 75, "利": 65, "平": 50, "不": 35, "陷": 20,
};

// ---------------------------------------------------------------------------
// Mutagen → state
// ---------------------------------------------------------------------------
const MUTAGEN_STATE: Record<string, PalaceDetail["state"]> = {
  "禄": "lu", "权": "quan", "科": "ke", "忌": "ji",
};

// ---------------------------------------------------------------------------
// Star Chinese name → English display name (from our star catalog)
// ---------------------------------------------------------------------------
const STAR_CN_TO_EN = new Map(STARS.map((s) => [s.nameCn, s.nameEn]));

function formatStar(star: { name: string }): string {
  const en = STAR_CN_TO_EN.get(star.name);
  return en ? `${star.name} ${en}` : star.name;
}

// ---------------------------------------------------------------------------
// Determine dominant state from all stars in a palace
// Priority: ji > lu > quan > ke > neutral
// ---------------------------------------------------------------------------
function dominantState(
  stars: { mutagen?: string }[],
): PalaceDetail["state"] {
  let best: PalaceDetail["state"] = "neutral";
  for (const s of stars) {
    if (!s.mutagen) continue;
    const mapped = MUTAGEN_STATE[s.mutagen];
    if (!mapped) continue;
    if (mapped === "ji") return "ji"; // highest priority — short-circuit
    if (best === "neutral" || mapped === "lu") best = mapped;
    else if (best !== "lu" && mapped === "quan") best = mapped;
  }
  return best;
}

// ---------------------------------------------------------------------------
// Energy = max brightness score among major stars (default 50)
// ---------------------------------------------------------------------------
function maxEnergy(majorStars: { brightness?: string }[]): number {
  if (majorStars.length === 0) return 50;
  let max = 0;
  for (const s of majorStars) {
    const e = s.brightness ? (BRIGHTNESS_ENERGY[s.brightness] ?? 50) : 50;
    if (e > max) max = e;
  }
  return max;
}

// ---------------------------------------------------------------------------
// Transform the iztro astrolabe into our PalaceDetail[]
// ---------------------------------------------------------------------------

/* eslint-disable @typescript-eslint/no-explicit-any */

export function transformAstrolabe(astrolabe: any): PalaceDetail[] {
  const palaces: any[] = astrolabe.palaces ?? [];

  return palaces
    .map((palace: any) => {
      const id = PALACE_NAME_MAP[palace.name];
      if (!id) return null; // skip unknown palaces (e.g., 来因)

      const ui = PALACE_UI_META[id];
      const [gridCol, gridRow] = BRANCH_GRID[palace.earthlyBranch] ?? [1, 1];

      const majors: any[] = palace.majorStars ?? [];
      const minors: any[] = palace.minorStars ?? [];
      const allStars = [...majors, ...minors];

      return {
        id,
        name: ui?.name ?? id,
        nameCn: ui?.nameCn ?? palace.name,
        subtitle: ui?.subtitle ?? "",
        icon: ui?.icon ?? id,
        consciousness: ui?.consciousness ?? "",
        fable: ui?.fable ?? "",
        gridCol,
        gridRow,
        stars: [...majors.map(formatStar), ...minors.map(formatStar)],
        energy: maxEnergy(majors),
        state: dominantState(allStars),
      } satisfies PalaceDetail;
    })
    .filter((p: any): p is PalaceDetail => p !== null);
}
