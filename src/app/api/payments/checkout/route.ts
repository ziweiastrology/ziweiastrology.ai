import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

const PRICE_IDS: Record<string, Record<string, string>> = {
  BASIC: {
    month: process.env.STRIPE_BASIC_MONTHLY_PRICE_ID || process.env.STRIPE_BASIC_PRICE_ID || "",
    year: process.env.STRIPE_BASIC_ANNUAL_PRICE_ID || "",
  },
  PREMIUM: {
    month: process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID || process.env.STRIPE_PREMIUM_PRICE_ID || "",
    year: process.env.STRIPE_PREMIUM_ANNUAL_PRICE_ID || "",
  },
  SIFU: {
    month: process.env.STRIPE_SIFU_MONTHLY_PRICE_ID || process.env.STRIPE_SIFU_PRICE_ID || "",
    year: process.env.STRIPE_SIFU_ANNUAL_PRICE_ID || "",
  },
};

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tier, interval = "month" } = await request.json();
    const priceId = PRICE_IDS[tier]?.[interval as string];

    if (!priceId) {
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
    }

    // Get or create Stripe customer
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    let customerId = user?.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: session.user.email!,
        name: session.user.name || undefined,
        metadata: { userId: session.user.id },
      });
      customerId = customer.id;
      await prisma.user.update({
        where: { id: session.user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.AUTH_URL}/thank-you?tier=${tier}`,
      cancel_url: `${process.env.AUTH_URL}/pricing?canceled=true`,
      metadata: { userId: session.user.id, tier },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch {
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
