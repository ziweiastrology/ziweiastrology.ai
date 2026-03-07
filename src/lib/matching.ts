import { TagCategory } from "@prisma/client";

interface UserForMatch {
  id: string;
  location: string | null;
  tags: { tag: { name: string; category: TagCategory } }[];
  chartPalaces?: {
    name: string;
    stars: string[];
    energy: number;
    state: string;
  }[];
}

interface MatchResult {
  overallScore: number;
  bizScore: number;
  friendScore: number;
  guirenScore: number;
  sharedTags: string[];
}

export function computeMatch(userA: UserForMatch, userB: UserForMatch): MatchResult {
  const tagScore = computeTagScore(userA, userB);
  const goalScore = computeGoalScore(userA, userB);
  const geoScore = computeGeoScore(userA, userB);
  const chartScore = computeChartScore(userA, userB);

  const sharedTags = getSharedTags(userA, userB);

  const overall = Math.round(
    chartScore.overall * 0.4 +
    tagScore * 0.3 +
    goalScore * 0.2 +
    geoScore * 0.1
  );

  return {
    overallScore: Math.min(100, Math.max(0, overall)),
    bizScore: chartScore.biz,
    friendScore: chartScore.friend,
    guirenScore: chartScore.guiren,
    sharedTags,
  };
}

function computeTagScore(a: UserForMatch, b: UserForMatch): number {
  const aTags = new Set(a.tags.filter((t) => t.tag.category !== "GOAL").map((t) => t.tag.name));
  const bTags = new Set(b.tags.filter((t) => t.tag.category !== "GOAL").map((t) => t.tag.name));
  if (aTags.size === 0 && bTags.size === 0) return 50;
  const intersection = [...aTags].filter((t) => bTags.has(t)).length;
  const union = new Set([...aTags, ...bTags]).size;
  return Math.round((intersection / union) * 100);
}

function computeGoalScore(a: UserForMatch, b: UserForMatch): number {
  const aGoals = new Set(a.tags.filter((t) => t.tag.category === "GOAL").map((t) => t.tag.name));
  const bGoals = new Set(b.tags.filter((t) => t.tag.category === "GOAL").map((t) => t.tag.name));
  if (aGoals.size === 0 && bGoals.size === 0) return 50;
  const intersection = [...aGoals].filter((g) => bGoals.has(g)).length;
  const union = new Set([...aGoals, ...bGoals]).size;
  return Math.round((intersection / union) * 100);
}

function computeGeoScore(a: UserForMatch, b: UserForMatch): number {
  if (!a.location || !b.location) return 30;
  if (a.location === b.location) return 100;
  const aCountry = a.location.split(",").pop()?.trim();
  const bCountry = b.location.split(",").pop()?.trim();
  if (aCountry && bCountry && aCountry === bCountry) return 60;
  return 20;
}

function computeChartScore(a: UserForMatch, b: UserForMatch) {
  if (!a.chartPalaces?.length || !b.chartPalaces?.length) {
    return { overall: 50, biz: 50, friend: 50, guiren: 50 };
  }

  const getPalace = (palaces: typeof a.chartPalaces, name: string) =>
    palaces?.find((p) => p.name === name);

  const bizScore = computePalaceSynergy(
    [getPalace(a.chartPalaces, "Life"), getPalace(a.chartPalaces, "Wealth")],
    [getPalace(b.chartPalaces, "Career"), getPalace(b.chartPalaces, "Wealth")]
  );

  const friendScore = computePalaceSynergy(
    [getPalace(a.chartPalaces, "Friends"), getPalace(a.chartPalaces, "Karma")],
    [getPalace(b.chartPalaces, "Friends"), getPalace(b.chartPalaces, "Karma")]
  );

  const guirenScore = computeGuirenScore(a.chartPalaces!, b.chartPalaces!);

  const overall = Math.round((bizScore + friendScore + guirenScore) / 3);

  return { overall, biz: bizScore, friend: friendScore, guiren: guirenScore };
}

function computePalaceSynergy(
  myPalaces: (undefined | { energy: number; state: string })[],
  theirPalaces: (undefined | { energy: number; state: string })[]
): number {
  let score = 50;

  for (let i = 0; i < myPalaces.length; i++) {
    const mine = myPalaces[i];
    const theirs = theirPalaces[i];
    if (!mine || !theirs) continue;

    if (mine.energy < 50 && theirs.energy >= 70) score += 15;
    if (mine.energy >= 70 && theirs.energy >= 70) score += 5;

    if (theirs.state === "lu" || theirs.state === "quan") score += 10;
    if (theirs.state === "ji") score -= 10;
  }

  return Math.min(100, Math.max(0, score));
}

function computeGuirenScore(
  myPalaces: NonNullable<UserForMatch["chartPalaces"]>,
  theirPalaces: NonNullable<UserForMatch["chartPalaces"]>
): number {
  let score = 50;
  const theirLife = theirPalaces.find((p) => p.name === "Life");
  if (theirLife && theirLife.energy >= 70) score += 10;
  if (theirLife?.state === "lu") score += 15;
  if (theirLife?.state === "quan") score += 10;

  const myKeyPalaces = ["Life", "Career", "Wealth"];
  for (const p of theirPalaces) {
    if ((p.state === "lu" || p.state === "quan") && myKeyPalaces.includes(p.name)) {
      score += 10;
    }
    if (p.state === "ji" && myKeyPalaces.includes(p.name)) {
      score -= 8;
    }
  }

  return Math.min(100, Math.max(0, score));
}

function getSharedTags(a: UserForMatch, b: UserForMatch): string[] {
  const aTags = new Set(a.tags.map((t) => t.tag.name));
  return b.tags.filter((t) => aTags.has(t.tag.name)).map((t) => t.tag.name);
}
