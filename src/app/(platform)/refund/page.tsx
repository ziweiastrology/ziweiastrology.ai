import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Refund Policy — ziweiastrology.ai",
  description: "Refund and cancellation policy for ziweiastrology.ai memberships.",
  openGraph: {
    title: "Refund Policy — ziweiastrology.ai",
    description: "Refund and cancellation policy for ziweiastrology.ai memberships.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Refund Policy — ziweiastrology.ai",
    description: "Refund and cancellation policy for ziweiastrology.ai memberships.",
  },
};

export default function RefundPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
      <BreadcrumbJsonLd items={[{ name: "Refund Policy", href: "/refund" }]} />
      <PageHeader
        title="Refund Policy"
        subtitle="Last updated: March 2026"
      />

      <article className="prose-ancient">
        <h2>1. Subscription Model</h2>
        <p>
          ziweiastrology.ai operates on a subscription-based model with four
          tiers: Free, Basic, Premium, and Sifu Master. Paid subscriptions are
          billed on a recurring monthly or annual basis through Stripe.
        </p>

        <h2>2. Free Trial &amp; Cancellation</h2>
        <p>
          The Free tier is available indefinitely at no cost. You may cancel any
          paid subscription at any time through your{" "}
          <a href="/settings" className="text-gold-400 hover:text-gold-300">
            Settings
          </a>{" "}
          page or the Stripe billing portal. Upon cancellation, you will retain
          access to your current tier&apos;s benefits until the end of your
          billing period, after which your account reverts to the Free tier.
        </p>

        <h2>3. Refund Within 7 Days</h2>
        <p>
          If you are unsatisfied with your subscription, you may request a
          prorated refund within <strong>7 days</strong> of your initial purchase
          or most recent renewal. To request a refund, email us at{" "}
          <a
            href="mailto:support@ziweiastrology.ai"
            className="text-gold-400 hover:text-gold-300"
          >
            support@ziweiastrology.ai
          </a>{" "}
          with the following information:
        </p>
        <ul>
          <li>Your account email address.</li>
          <li>The subscription tier and billing interval (monthly/annual).</li>
          <li>The reason for your refund request.</li>
        </ul>

        <h2>4. After 7 Days</h2>
        <p>
          Refund requests made after 7 days from the purchase or renewal date
          will not be honored. Your subscription will remain active until the
          end of the current billing period. You may still cancel at any time to
          prevent future charges.
        </p>

        <h2>5. Annual Subscriptions</h2>
        <p>
          Annual subscriptions follow the same 7-day refund window from the date
          of purchase or renewal. After 7 days, the subscription runs until the
          end of the annual billing period with no partial refund.
        </p>

        <h2>6. Payment Processing</h2>
        <p>
          All payments are processed securely by{" "}
          <a
            href="https://stripe.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-400 hover:text-gold-300"
          >
            Stripe
          </a>
          . We do not store your credit card information. Refunds are processed
          through Stripe and typically appear on your statement within 5–10
          business days.
        </p>

        <h2>7. Credit Refunds</h2>
        <p>
          AI message credits are included with your subscription tier and refresh
          daily. Credits are not individually purchasable and are not refundable
          separately from your subscription.
        </p>

        <h2>8. Exceptions</h2>
        <p>
          We reserve the right to issue refunds outside of this policy at our
          sole discretion, including in cases of billing errors, service outages,
          or other exceptional circumstances.
        </p>

        <h2>9. Contact Us</h2>
        <p>
          For refund requests or billing questions, contact us at{" "}
          <a
            href="mailto:support@ziweiastrology.ai"
            className="text-gold-400 hover:text-gold-300"
          >
            support@ziweiastrology.ai
          </a>
          . We aim to respond within 24–48 hours.
        </p>
      </article>
    </div>
  );
}
