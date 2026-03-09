import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Contact Us — ziweiastrology.ai",
  description: "Get in touch with the ziweiastrology.ai team for support, questions, or feedback.",
  openGraph: {
    title: "Contact Us — ziweiastrology.ai",
    description: "Get in touch with the ziweiastrology.ai team for support, questions, or feedback.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Us — ziweiastrology.ai",
    description: "Get in touch with the ziweiastrology.ai team for support, questions, or feedback.",
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
      <BreadcrumbJsonLd items={[{ name: "Contact Us", href: "/contact" }]} />
      <PageHeader
        title="Contact Us"
        subtitle="We'd love to hear from you"
      />

      <article className="prose-ancient">
        <h2>Get in Touch</h2>
        <p>
          For questions, support requests, or feedback, reach out to us at{" "}
          <a
            href="mailto:support@ziweiastrology.ai"
            className="text-gold-400 hover:text-gold-300"
          >
            support@ziweiastrology.ai
          </a>
          .
        </p>

        <h2>Response Time</h2>
        <p>
          We aim to respond to all inquiries within <strong>24–48 hours</strong>{" "}
          during business days. Priority support members (Sifu tier) receive
          faster response times.
        </p>

        <h2>What to Include in Your Message</h2>
        <p>To help us assist you as quickly as possible, please include:</p>
        <ul>
          <li>
            <strong>Your account email</strong> — so we can look up your account
            and membership status.
          </li>
          <li>
            <strong>A clear description</strong> of your question or issue.
          </li>
          <li>
            <strong>Screenshots</strong> (if applicable) — especially for
            technical issues or payment problems.
          </li>
          <li>
            <strong>Device and browser info</strong> — if you&apos;re
            experiencing a bug or display issue.
          </li>
        </ul>

        <h2>Common Topics</h2>
        <ul>
          <li>
            <strong>Account &amp; Login Issues:</strong> Password resets, Google
            OAuth problems, account recovery.
          </li>
          <li>
            <strong>Billing &amp; Subscriptions:</strong> Payment questions,
            plan changes, refund requests. See our{" "}
            <a href="/refund" className="text-gold-400 hover:text-gold-300">
              Refund Policy
            </a>{" "}
            for details.
          </li>
          <li>
            <strong>Chart &amp; Reading Questions:</strong> Birth time
            verification, chart accuracy, interpretation help.
          </li>
          <li>
            <strong>Feature Requests &amp; Feedback:</strong> We welcome
            suggestions for improving the platform.
          </li>
        </ul>

        <h2>Community Support</h2>
        <p>
          For general Zi Wei Dou Shu discussions and peer support, visit our{" "}
          <a href="/community" className="text-gold-400 hover:text-gold-300">
            Community
          </a>{" "}
          section where practitioners worldwide share insights and help each
          other.
        </p>
      </article>
    </div>
  );
}
