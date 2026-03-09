/**
 * One-time Stripe setup script.
 * Creates products, prices (monthly + annual), and a webhook endpoint.
 *
 * Usage: npx tsx scripts/stripe-setup.ts
 */

import Stripe from "stripe";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ STRIPE_SECRET_KEY is not set in .env");
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ziweiastrology.ai";

interface TierConfig {
  name: string;
  description: string;
  monthlyPrice: number; // in dollars
  annualPrice: number; // in dollars
  envPrefix: string;
}

const TIERS: TierConfig[] = [
  {
    name: "Basic",
    description: "Community read access — Zi Wei Astrology AI",
    monthlyPrice: 8.88,
    annualPrice: 88.88,
    envPrefix: "BASIC",
  },
  {
    name: "Premium",
    description: "Full community + academy access — Zi Wei Astrology AI",
    monthlyPrice: 18.88,
    annualPrice: 188.88,
    envPrefix: "PREMIUM",
  },
  {
    name: "Sifu Master",
    description: "Certified master with instructor capabilities — Zi Wei Astrology AI",
    monthlyPrice: 38.88,
    annualPrice: 388.88,
    envPrefix: "SIFU",
  },
];

const WEBHOOK_EVENTS: Stripe.WebhookEndpointCreateParams.EnabledEvent[] = [
  "checkout.session.completed",
  "customer.subscription.updated",
  "customer.subscription.deleted",
];

async function setup() {
  console.log("🚀 Setting up Stripe products, prices, and webhook...\n");

  const envLines: string[] = [];

  // ── Create Products & Prices ──────────────────────────────────────────
  for (const tier of TIERS) {
    console.log(`📦 Creating product: ${tier.name}`);
    const product = await stripe.products.create({
      name: tier.name,
      description: tier.description,
      metadata: { tier: tier.envPrefix },
    });

    // Monthly price
    const monthlyPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(tier.monthlyPrice * 100), // cents
      currency: "usd",
      recurring: { interval: "month" },
      metadata: { tier: tier.envPrefix, interval: "month" },
    });

    // Annual price
    const annualPrice = await stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(tier.annualPrice * 100), // cents
      currency: "usd",
      recurring: { interval: "year" },
      metadata: { tier: tier.envPrefix, interval: "year" },
    });

    console.log(`  ✅ Monthly: ${monthlyPrice.id} ($${tier.monthlyPrice}/mo)`);
    console.log(`  ✅ Annual:  ${annualPrice.id} ($${tier.annualPrice}/yr)`);
    console.log();

    envLines.push(`STRIPE_${tier.envPrefix}_MONTHLY_PRICE_ID="${monthlyPrice.id}"`);
    envLines.push(`STRIPE_${tier.envPrefix}_ANNUAL_PRICE_ID="${annualPrice.id}"`);
  }

  // ── Create Webhook Endpoint ───────────────────────────────────────────
  const webhookUrl = `${SITE_URL}/api/payments/webhook`;
  console.log(`🔗 Creating webhook endpoint: ${webhookUrl}`);

  const endpoint = await stripe.webhookEndpoints.create({
    url: webhookUrl,
    enabled_events: WEBHOOK_EVENTS,
    description: "Zi Wei Astrology AI — subscription events",
  });

  console.log(`  ✅ Webhook ID: ${endpoint.id}`);
  console.log(`  🔑 Webhook Secret: ${endpoint.secret}`);
  console.log();

  envLines.push(`STRIPE_WEBHOOK_SECRET="${endpoint.secret}"`);

  // ── Output ────────────────────────────────────────────────────────────
  console.log("═".repeat(60));
  console.log("Add these to your .env and Vercel environment variables:");
  console.log("═".repeat(60));
  console.log();
  for (const line of envLines) {
    console.log(line);
  }
  console.log();
  console.log("═".repeat(60));
  console.log("✅ Done! Next steps:");
  console.log("  1. Copy the env vars above into .env");
  console.log("  2. Add them to Vercel: npx vercel env add <NAME>");
  console.log("  3. Redeploy: npx vercel --prod");
  console.log("═".repeat(60));
}

setup().catch((err) => {
  console.error("❌ Setup failed:", err.message);
  process.exit(1);
});
