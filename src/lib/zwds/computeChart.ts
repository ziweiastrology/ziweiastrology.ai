import type { BirthDetails, PalaceDetail } from "@/types";
import type { ChartMeta } from "@/types";
import { tstToTimeIndex } from "./timeIndex";
import { transformAstrolabe } from "./transformer";

export interface ChartResult {
  palaces: PalaceDetail[];
  meta: ChartMeta;
}

export async function computeChart(
  details: BirthDetails,
): Promise<ChartResult> {
  // Dynamic import keeps iztro out of the initial JS bundle
  const { astro } = await import("iztro");

  // Resolve True Solar Time hour (fall back to raw birth hour)
  const hour = parseInt(details.trueSolarHour ?? details.birthHour, 10);
  const timeIndex = tstToTimeIndex(hour);

  // Format solar date for iztro: "YYYY-M-D"
  const year = parseInt(details.birthYear, 10);
  const month = parseInt(details.birthMonth, 10);
  const day = parseInt(details.birthDay, 10);
  const solarDate = `${year}-${month}-${day}`;

  // Map gender (default to male if empty)
  const gender = details.gender === "female" ? "女" : "男";

  // Compute the astrolabe
  const astrolabe = astro.bySolar(solarDate, timeIndex, gender, true, "zh-CN");

  // Transform iztro output → our PalaceDetail[]
  const palaces = transformAstrolabe(astrolabe);

  const meta: ChartMeta = {
    soulPalace: astrolabe.earthlyBranchOfSoulPalace,
    bodyPalace: astrolabe.earthlyBranchOfBodyPalace,
    fiveElementsClass: astrolabe.fiveElementsClass,
    lunarDate: astrolabe.lunarDate,
    zodiac: astrolabe.zodiac,
    sign: astrolabe.sign,
  };

  return { palaces, meta };
}
