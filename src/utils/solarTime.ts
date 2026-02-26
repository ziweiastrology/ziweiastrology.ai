import type { CityEntry } from "@/data/cityLongitudes";

export interface TSTResult {
  totalOffsetMinutes: number;
  sign: "+" | "-";
  offsetAbsMinutes: number;
  offsetSeconds: number;
  trueSolarHour: number;
  trueSolarMinute: number;
  longitudeOffsetMinutes: number;
  eotMinutes: number;
  cityResolved: boolean;
}

/**
 * Day of year (1-based), with leap year handling.
 */
export function dayOfYear(year: number, month: number, day: number): number {
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const daysInMonth = [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let doy = 0;
  for (let i = 0; i < month - 1; i++) {
    doy += daysInMonth[i];
  }
  return doy + day;
}

/**
 * Equation of Time using Spencer (1971) Fourier approximation.
 * Returns minutes (positive = sundial ahead of clock).
 * Accuracy: ±1 minute.
 *
 * Reference: Spencer, J.W. (1971) "Fourier series representation of the
 * position of the sun". Search 2(5):172.
 */
export function equationOfTime(doy: number): number {
  // Fractional year in radians (B angle)
  const B = ((2 * Math.PI) / 365) * (doy - 81);

  // Spencer's formula (returns minutes)
  const eot =
    9.87 * Math.sin(2 * B) -
    7.53 * Math.cos(B) -
    1.5 * Math.sin(B);

  return eot;
}

/**
 * Longitude offset in minutes.
 * Each degree of longitude = 4 minutes of time.
 * Positive = east of standard meridian (sun arrives earlier → local solar time is ahead).
 */
export function longitudeOffset(longitude: number, standardMeridian: number): number {
  return (longitude - standardMeridian) * 4;
}

/**
 * Compute True Solar Time from clock time and city data.
 *
 * Formula: TST = Clock Time + longitudeOffset + EoT
 *
 * @param hour - Clock hour (0-23)
 * @param minute - Clock minute (0-59)
 * @param year - Birth year
 * @param month - Birth month (1-12)
 * @param day - Birth day (1-31)
 * @param city - Resolved city entry (or null for fallback)
 */
export function computeTrueSolarTime(
  hour: number,
  minute: number,
  year: number,
  month: number,
  day: number,
  city: CityEntry | null,
): TSTResult {
  const doy = dayOfYear(year, month, day);
  const eot = equationOfTime(doy);

  // Longitude offset: 0 if no city resolved (fallback)
  const lonOffset = city ? longitudeOffset(city.longitude, city.standardMeridian) : 0;

  // Total offset in minutes (fractional)
  const totalOffset = lonOffset + eot;

  // Apply offset to clock time
  const clockTotalMinutes = hour * 60 + minute;
  let solarTotalMinutes = clockTotalMinutes + totalOffset;

  // Wrap around midnight
  if (solarTotalMinutes < 0) solarTotalMinutes += 1440;
  if (solarTotalMinutes >= 1440) solarTotalMinutes -= 1440;

  const solarHour = Math.floor(solarTotalMinutes / 60);
  const solarMinute = Math.floor(solarTotalMinutes % 60);

  // Format the offset
  const absOffset = Math.abs(totalOffset);
  const offsetAbsMinutes = Math.floor(absOffset);
  const offsetSeconds = Math.round((absOffset - offsetAbsMinutes) * 60);

  return {
    totalOffsetMinutes: totalOffset,
    sign: totalOffset >= 0 ? "+" : "-",
    offsetAbsMinutes,
    offsetSeconds,
    trueSolarHour: solarHour,
    trueSolarMinute: solarMinute,
    longitudeOffsetMinutes: lonOffset,
    eotMinutes: eot,
    cityResolved: city !== null,
  };
}

/**
 * Format the TST offset for display in the scan log.
 * Example: "+18min 07sec"
 */
export function formatOffsetForLog(result: TSTResult): string {
  return `${result.sign}${result.offsetAbsMinutes}min ${String(result.offsetSeconds).padStart(2, "0")}sec`;
}
