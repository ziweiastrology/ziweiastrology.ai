import type { Tier } from "@prisma/client";

// Daily credit grants by tier
export const DAILY_CREDITS: Record<Tier, number> = {
  FREE: 3,
  BASIC: 10,
  PREMIUM: 30,
  SIFU: 100,
};

// Cost per action
export const CREDIT_COSTS = {
  PALACE_UNLOCK: 1,
  CHATBOT_MESSAGE: 1,
  FULL_READING: 8, // Discount vs 9 individual
} as const;

// Earning rules: amount + daily limit
export const EARN_RULES = {
  VERIFICATION_BONUS: { amount: 5, dailyLimit: null }, // one-time
  SOCIAL_SHARE: { amount: 2, dailyLimit: 1 },
  RESOURCE_READ: { amount: 1, dailyLimit: 3 },
  COMMUNITY_POST: { amount: 2, dailyLimit: 2 },
  REFERRAL: { amount: 10, dailyLimit: null }, // unlimited
} as const;

export type SpendAction = keyof typeof CREDIT_COSTS;
export type EarnAction = keyof typeof EARN_RULES;

// Number of top palaces that are free (highest energy)
export const FREE_PALACE_COUNT = 3;

export function isSpendAction(action: string): action is SpendAction {
  return action in CREDIT_COSTS;
}

export function isEarnAction(action: string): action is EarnAction {
  return action in EARN_RULES;
}

export function getStartOfDay(date: Date = new Date()): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}
