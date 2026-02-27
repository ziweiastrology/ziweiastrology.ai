import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import type Stripe from "stripe";
import type { Tier } from "@prisma/client";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const tier = session.metadata?.tier as Tier;
      const subscriptionId = session.subscription as string;

      if (!userId || !tier) break;

      const subResponse = await stripe.subscriptions.retrieve(subscriptionId);
      const periodEnd = (subResponse as unknown as { current_period_end: number }).current_period_end;

      await prisma.$transaction([
        prisma.subscription.upsert({
          where: { userId },
          update: {
            stripeSubscriptionId: subscriptionId,
            tier,
            status: "ACTIVE",
            currentPeriodEnd: new Date(periodEnd * 1000),
          },
          create: {
            userId,
            stripeSubscriptionId: subscriptionId,
            tier,
            status: "ACTIVE",
            currentPeriodEnd: new Date(periodEnd * 1000),
          },
        }),
        prisma.user.update({
          where: { id: userId },
          data: { tier, role: "MEMBER" },
        }),
      ]);
      break;
    }

    case "customer.subscription.updated": {
      const subObj = event.data.object as Stripe.Subscription & { current_period_end: number };
      const existing = await prisma.subscription.findUnique({
        where: { stripeSubscriptionId: subObj.id },
      });

      if (existing) {
        const status =
          subObj.status === "active"
            ? "ACTIVE"
            : subObj.status === "past_due"
              ? "PAST_DUE"
              : subObj.status === "canceled"
                ? "CANCELED"
                : "INCOMPLETE";

        await prisma.subscription.update({
          where: { stripeSubscriptionId: subObj.id },
          data: {
            status,
            currentPeriodEnd: new Date(subObj.current_period_end * 1000),
          },
        });
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const sub = await prisma.subscription.findUnique({
        where: { stripeSubscriptionId: subscription.id },
      });

      if (sub) {
        await prisma.$transaction([
          prisma.subscription.update({
            where: { stripeSubscriptionId: subscription.id },
            data: { status: "CANCELED" },
          }),
          prisma.user.update({
            where: { id: sub.userId },
            data: { tier: "FREE", role: "FREE" },
          }),
        ]);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
