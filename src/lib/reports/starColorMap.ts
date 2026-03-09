import { STARS } from "@/data/starData";

// Star Chinese name → hex color lookup
export const STAR_COLOR_MAP: Map<string, string> = new Map(
  STARS.map((s) => [s.nameCn, s.accentColor])
);

// Also map English names
export const STAR_EN_COLOR_MAP: Map<string, string> = new Map(
  STARS.map((s) => [s.nameEn, s.accentColor])
);

// 12 Palace Chinese names
export const PALACE_NAMES = [
  "命宫", "兄弟宫", "夫妻宫", "子女宫", "财帛宫", "疾厄宫",
  "迁移宫", "交友宫", "官禄宫", "田宅宫", "福德宫", "父母宫",
] as const;

// Common ZWDS terminology
export const ZWDS_TERMS = [
  "四化", "化禄", "化权", "化科", "化忌",
  "大限", "流年", "流月", "流日",
  "三方四正", "对宫", "暗合",
  "庙旺", "得地", "平和", "落陷",
  "飞星", "自化", "生年四化",
  "禄存", "天马", "禄马交驰",
  "空劫", "刑忌", "煞星",
  "命主", "身主", "身宫",
  "五行局", "纳音", "天干", "地支",
] as const;

// Set for O(1) lookups
export const PALACE_NAME_SET = new Set<string>(PALACE_NAMES);
export const ZWDS_TERM_SET = new Set<string>(ZWDS_TERMS);

// Combined set of all clickable terms (star names + palace names + ZWDS terms)
export const ALL_STAR_NAMES = new Set<string>(STARS.map((s) => s.nameCn));
