/**
 * Convert True Solar Time hour to a Chinese 时辰 index (0–12) for iztro.
 *
 * Index | 时辰     | Time Range
 * ------|----------|------------
 *   0   | 早子时   | 00:00–00:59
 *   1   | 丑时     | 01:00–02:59
 *   2   | 寅时     | 03:00–04:59
 *   3   | 卯时     | 05:00–06:59
 *   4   | 辰时     | 07:00–08:59
 *   5   | 巳时     | 09:00–10:59
 *   6   | 午时     | 11:00–12:59
 *   7   | 未时     | 13:00–14:59
 *   8   | 申时     | 15:00–16:59
 *   9   | 酉时     | 17:00–18:59
 *  10   | 戌时     | 19:00–20:59
 *  11   | 亥时     | 21:00–22:59
 *  12   | 晚子时   | 23:00–23:59
 */
export function tstToTimeIndex(hour: number): number {
  if (hour === 23) return 12;
  return Math.ceil(hour / 2);
}
