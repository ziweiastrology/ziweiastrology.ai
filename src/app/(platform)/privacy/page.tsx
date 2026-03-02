import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Privacy Policy — ziweiastrology.ai",
  description: "How ziweiastrology.ai collects, uses, and protects your personal data.",
  openGraph: {
    title: "Privacy Policy — ziweiastrology.ai",
    description: "How ziweiastrology.ai collects, uses, and protects your personal data.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy — ziweiastrology.ai",
    description: "How ziweiastrology.ai collects, uses, and protects your personal data.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
      <BreadcrumbJsonLd items={[{ name: "Privacy Policy", href: "/privacy" }]} />
      <PageHeader
        title="Privacy Policy"
        subtitle="Last updated: February 2026"
      />

      <article className="prose-ancient">
        <h2>1. Information We Collect</h2>
        <p>
          When you use ziweiastrology.ai, we may collect the following types of
          information:
        </p>
        <ul>
          <li>
            <strong>Account Information:</strong> Name, email address, and
            password when you register. If you sign in via Google OAuth, we
            receive your name, email, and profile picture from Google.
          </li>
          <li>
            <strong>Birth Details:</strong> Birth date, time, location, and
            gender provided for astrological chart generation. This data is used
            solely for Zi Wei Dou Shu calculations and is not shared with third
            parties.
          </li>
          <li>
            <strong>Payment Information:</strong> When you subscribe to a paid
            membership, payment is processed securely by Stripe. We do not store
            your full credit card number. Stripe may collect billing address and
            card details per their own privacy policy.
          </li>
          <li>
            <strong>Usage Data:</strong> Pages visited, features used, and
            anonymized interaction patterns to improve our service.
          </li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To generate personalized Zi Wei Dou Shu charts and readings.</li>
          <li>To manage your account and membership tier.</li>
          <li>To process payments through Stripe.</li>
          <li>To provide access to community features, courses, and resources.</li>
          <li>To improve our platform and develop new features.</li>
          <li>To send important account-related communications.</li>
        </ul>

        <h2>3. Cookies &amp; Tracking</h2>
        <p>
          We use essential cookies for authentication and session management. We
          may also use analytics cookies (such as Google Analytics) to understand
          how visitors use our site. You can manage your cookie preferences
          through the cookie consent banner displayed on your first visit.
        </p>

        <h2>4. Third-Party Services</h2>
        <ul>
          <li>
            <strong>Stripe:</strong> Handles payment processing. Subject to{" "}
            <a
              href="https://stripe.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:text-gold-300"
            >
              Stripe&apos;s Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Google OAuth:</strong> Used for social sign-in. Subject to{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:text-gold-300"
            >
              Google&apos;s Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Google Analytics:</strong> Collects anonymized usage
            statistics. You may opt out via the cookie consent banner.
          </li>
        </ul>

        <h2>5. Data Security</h2>
        <p>
          We implement industry-standard security measures including encrypted
          connections (HTTPS), hashed passwords, and secure session tokens. Your
          birth chart data is stored in encrypted databases and accessible only
          to you.
        </p>

        <h2>6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Request correction of inaccurate data.</li>
          <li>Request deletion of your account and associated data.</li>
          <li>Withdraw consent for optional data processing at any time.</li>
          <li>Export your data in a portable format.</li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{" "}
          <a
            href="mailto:hello@ziweiastrology.ai"
            className="text-gold-400 hover:text-gold-300"
          >
            hello@ziweiastrology.ai
          </a>
          .
        </p>

        <h2>7. Data Retention</h2>
        <p>
          We retain your account data for as long as your account is active. If
          you delete your account, we will remove your personal data within 30
          days, except where retention is required by law.
        </p>

        <h2>8. Children&apos;s Privacy</h2>
        <p>
          Our service is not directed to individuals under the age of 13. We do
          not knowingly collect personal information from children.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of significant changes via email or a notice on our website.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at{" "}
          <a
            href="mailto:hello@ziweiastrology.ai"
            className="text-gold-400 hover:text-gold-300"
          >
            hello@ziweiastrology.ai
          </a>
          .
        </p>
      </article>
    </div>
  );
}
