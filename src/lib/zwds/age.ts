/**
 * 虚岁 (nominal age): Chinese traditional age, starts at 1 at birth.
 * iztro returns all decade ranges and 小限 ages in 虚岁.
 */
export function getNominalAge(birthYear: number): number {
  return new Date().getFullYear() - birthYear + 1;
}
