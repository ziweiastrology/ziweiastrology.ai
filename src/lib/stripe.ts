import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe() {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return _stripe;
}

// Backward-compatible export — lazy getter
export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export const MEMBERSHIP_TIERS = {
  FREE: {
    name: "Free",
    description: "Basic access to resources and about page",
    features: ["Public articles", "About page", "Academy landing"],
  },
  BASIC: {
    name: "Basic",
    description: "Community read access",
    features: [
      "Everything in Free",
      "Community feed (read)",
      "Pillar data (read)",
      "Analysis posts (read)",
      "Groups (read)",
    ],
  },
  PREMIUM: {
    name: "Premium",
    description: "Full community + academy access",
    features: [
      "Everything in Basic",
      "Post, comment, and vote",
      "Academy courses",
      "Student dashboard",
    ],
  },
  SIFU: {
    name: "Sifu Master",
    description: "Certified master with instructor capabilities",
    features: [
      "Everything in Premium",
      "Certified master badge",
      "Instructor capabilities",
      "Priority support",
    ],
  },
} as const;
