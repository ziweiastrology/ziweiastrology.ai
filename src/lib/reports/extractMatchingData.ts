interface IndustryScore {
  name: string;
  score: number;
}

interface HealthFocus {
  area: string;
  attention: number; // 0-100 scale
}

interface TraitAlignment {
  trait: string;
  alignment: number; // 0-100 scale
}

export interface CareerData {
  industries: IndustryScore[];
  summary: string;
}

export interface HealthData {
  focusAreas: HealthFocus[];
  summary: string;
}

export interface SpouseData {
  traits: TraitAlignment[];
  summary: string;
}

interface Section {
  type: string;
  key: string;
  title: string;
  content: string;
}

function extractPercentages(text: string): number[] {
  const matches = text.match(/(\d{1,3})%/g);
  return matches ? matches.map((m) => parseInt(m)) : [];
}

function extractSummary(content: string): string {
  // Get first sentence or first 120 chars
  const firstSentence = content.match(/[^.!?。！？]*[.!?。！？]/);
  if (firstSentence && firstSentence[0].length < 200) return firstSentence[0].trim();
  return content.slice(0, 120).trim() + "…";
}

export function extractCareerData(sections: Section[]): CareerData {
  const careerSection = sections.find(
    (s) =>
      s.title.includes("官禄") ||
      s.title.toLowerCase().includes("career") ||
      s.key.includes("career")
  );

  const defaultIndustries: IndustryScore[] = [
    { name: "Technology", score: 75 },
    { name: "Finance", score: 68 },
    { name: "Education", score: 72 },
    { name: "Creative Arts", score: 65 },
    { name: "Management", score: 70 },
    { name: "Consulting", score: 67 },
  ];

  if (!careerSection) {
    return { industries: defaultIndustries, summary: "Career analysis pending." };
  }

  const percentages = extractPercentages(careerSection.content);
  const industries = defaultIndustries.map((ind, i) => ({
    ...ind,
    score: percentages[i] ?? ind.score,
  }));

  return {
    industries,
    summary: extractSummary(careerSection.content),
  };
}

export function extractHealthData(sections: Section[]): HealthData {
  const healthSection = sections.find(
    (s) =>
      s.title.includes("疾厄") ||
      s.title.toLowerCase().includes("health") ||
      s.key.includes("health")
  );

  const defaultAreas: HealthFocus[] = [
    { area: "Cardiovascular", attention: 35 },
    { area: "Digestive System", attention: 45 },
    { area: "Respiratory", attention: 25 },
    { area: "Musculoskeletal", attention: 55 },
    { area: "Mental Wellness", attention: 40 },
    { area: "Immune System", attention: 30 },
  ];

  if (!healthSection) {
    return { focusAreas: defaultAreas, summary: "Health analysis pending." };
  }

  const percentages = extractPercentages(healthSection.content);
  const focusAreas = defaultAreas.map((area, i) => ({
    ...area,
    attention: percentages[i] ?? area.attention,
  }));

  return {
    focusAreas,
    summary: extractSummary(healthSection.content),
  };
}

export function extractSpouseData(sections: Section[]): SpouseData {
  const spouseSection = sections.find(
    (s) =>
      s.title.includes("夫妻") ||
      s.title.toLowerCase().includes("spouse") ||
      s.title.toLowerCase().includes("marriage") ||
      s.key.includes("spouse")
  );

  const defaultTraits: TraitAlignment[] = [
    { trait: "Communication", alignment: 72 },
    { trait: "Emotional Bond", alignment: 68 },
    { trait: "Shared Values", alignment: 75 },
    { trait: "Physical Attraction", alignment: 65 },
    { trait: "Growth Together", alignment: 70 },
    { trait: "Conflict Resolution", alignment: 60 },
  ];

  if (!spouseSection) {
    return { traits: defaultTraits, summary: "Spouse analysis pending." };
  }

  const percentages = extractPercentages(spouseSection.content);
  const traits = defaultTraits.map((t, i) => ({
    ...t,
    alignment: percentages[i] ?? t.alignment,
  }));

  return {
    traits,
    summary: extractSummary(spouseSection.content),
  };
}
