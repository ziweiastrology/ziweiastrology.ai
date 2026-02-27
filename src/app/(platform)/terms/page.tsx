import PageHeader from "@/components/layout/PageHeader";

export const metadata = {
  title: "Terms of Service — ziweiastrology.ai",
  description: "Terms and conditions for using ziweiastrology.ai.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
      <PageHeader
        title="Terms of Service"
        subtitle="Last updated: February 2026"
      />

      <article className="prose-ancient">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using ziweiastrology.ai (&quot;the Service&quot;), you
          agree to be bound by these Terms of Service. If you do not agree, you
          may not use the Service.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          ziweiastrology.ai provides Zi Wei Dou Shu (Purple Star Astrology)
          chart generation, educational resources, community features, and
          academy courses. The Service is available through free and paid
          membership tiers.
        </p>

        <h2>3. Astrology Disclaimer</h2>
        <p>
          <strong>
            The astrological readings, charts, and analyses provided by
            ziweiastrology.ai are for entertainment and educational purposes
            only.
          </strong>{" "}
          They do not constitute professional advice of any kind, including but
          not limited to medical, financial, legal, or psychological advice. You
          should not make important life decisions based solely on astrological
          readings. Always consult qualified professionals for matters requiring
          expert guidance.
        </p>

        <h2>4. User Accounts</h2>
        <ul>
          <li>You must provide accurate information when creating an account.</li>
          <li>
            You are responsible for maintaining the security of your account
            credentials.
          </li>
          <li>
            You must be at least 13 years of age to create an account.
          </li>
          <li>
            One person may not maintain more than one account.
          </li>
        </ul>

        <h2>5. Membership &amp; Payments</h2>
        <ul>
          <li>
            Paid memberships (Basic, Premium, Sifu) are billed on a recurring
            basis through Stripe.
          </li>
          <li>
            You may cancel your subscription at any time through your account
            settings or the Stripe billing portal.
          </li>
          <li>
            Refunds are handled on a case-by-case basis. Contact us within 14
            days of purchase for refund requests.
          </li>
          <li>
            We reserve the right to change pricing with 30 days&apos; advance
            notice.
          </li>
        </ul>

        <h2>6. User Conduct</h2>
        <p>When using community features, you agree not to:</p>
        <ul>
          <li>Post offensive, harassing, or discriminatory content.</li>
          <li>Share misleading or fraudulent astrological claims.</li>
          <li>Spam, advertise, or solicit other users.</li>
          <li>Impersonate another person or entity.</li>
          <li>Attempt to access other users&apos; accounts or data.</li>
          <li>Use the Service for any illegal purpose.</li>
        </ul>
        <p>
          We reserve the right to suspend or terminate accounts that violate
          these guidelines.
        </p>

        <h2>7. Intellectual Property</h2>
        <ul>
          <li>
            All content, design, code, and branding on ziweiastrology.ai are
            owned by or licensed to us and protected by intellectual property
            laws.
          </li>
          <li>
            Course materials, articles, and resources may not be reproduced or
            redistributed without written permission.
          </li>
          <li>
            User-generated content (posts, comments) remains yours, but you
            grant us a non-exclusive license to display it on the platform.
          </li>
        </ul>

        <h2>8. Limitation of Liability</h2>
        <p>
          ziweiastrology.ai is provided &quot;as is&quot; without warranties of
          any kind. We are not liable for any damages arising from your use of
          the Service, including but not limited to decisions made based on
          astrological readings or chart interpretations.
        </p>

        <h2>9. Privacy</h2>
        <p>
          Your use of the Service is also governed by our{" "}
          <a href="/privacy" className="text-gold-400 hover:text-gold-300">
            Privacy Policy
          </a>
          , which describes how we collect and use your data.
        </p>

        <h2>10. Modifications</h2>
        <p>
          We may update these Terms from time to time. Continued use of the
          Service after changes constitutes acceptance of the revised Terms.
          We will notify you of material changes via email or on-site notice.
        </p>

        <h2>11. Governing Law</h2>
        <p>
          These Terms are governed by applicable law. Any disputes arising from
          these Terms or the Service will be resolved through binding
          arbitration.
        </p>

        <h2>12. Contact</h2>
        <p>
          For questions about these Terms, contact us at{" "}
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
