import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Data Deletion — ziweiastrology.ai",
  description: "Request deletion of your personal data from ziweiastrology.ai.",
  openGraph: {
    title: "Data Deletion — ziweiastrology.ai",
    description: "Request deletion of your personal data from ziweiastrology.ai.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Data Deletion — ziweiastrology.ai",
    description: "Request deletion of your personal data from ziweiastrology.ai.",
  },
};

export default function DataDeletionPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
      <BreadcrumbJsonLd items={[{ name: "Data Deletion", href: "/data-deletion" }]} />
      <PageHeader
        title="Data Deletion"
        subtitle="How to request deletion of your data"
      />

      <article className="prose-ancient">
        <h2>Your Right to Data Deletion</h2>
        <p>
          At ziweiastrology.ai, we respect your privacy and your right to control your personal data.
          You may request the deletion of all personal data associated with your account at any time.
        </p>

        <h2>What Data We Store</h2>
        <p>When you use our services, we may store the following data:</p>
        <ul>
          <li>Account information (name, email address, profile photo)</li>
          <li>Birth details used for Zi Wei Dou Shu chart computation</li>
          <li>AI chat conversation history</li>
          <li>Generated chart reports and analysis</li>
          <li>Community posts, comments, and interactions</li>
          <li>Credit transaction history</li>
        </ul>

        <h2>How to Request Data Deletion</h2>
        <p>You can request deletion of your data through any of the following methods:</p>

        <h3>1. Email Request</h3>
        <p>
          Send an email to{" "}
          <a href="mailto:support@ziweiastrology.ai">support@ziweiastrology.ai</a>{" "}
          with the subject line <strong>&quot;Data Deletion Request&quot;</strong>. Please include the email
          address associated with your account.
        </p>

        <h3>2. Account Settings</h3>
        <p>
          Log into your account, navigate to{" "}
          <a href="/settings">Settings</a>, and use the &quot;Delete Account&quot; option
          to permanently remove your account and all associated data.
        </p>

        <h2>What Happens After a Deletion Request</h2>
        <ul>
          <li>We will verify your identity to protect against unauthorized requests.</li>
          <li>All personal data will be permanently deleted within <strong>30 days</strong> of your verified request.</li>
          <li>This includes data obtained through Facebook Login or Google Login.</li>
          <li>Some anonymized, non-identifiable data may be retained for analytics purposes.</li>
          <li>Data required for legal compliance may be retained as required by law.</li>
        </ul>

        <h2>Facebook Users</h2>
        <p>
          If you signed up using Facebook Login, you can also manage your data through
          Facebook&apos;s settings. When you remove our app from your Facebook settings,
          we will receive a notification and delete your data in accordance with this policy.
        </p>
        <p>
          To remove our app from Facebook: Go to Facebook Settings &rarr; Apps and Websites &rarr;
          find &quot;Ziwei Astrology&quot; &rarr; Remove.
        </p>

        <h2>Contact</h2>
        <p>
          If you have any questions about data deletion or privacy, contact us at{" "}
          <a href="mailto:support@ziweiastrology.ai">support@ziweiastrology.ai</a>.
        </p>
      </article>
    </div>
  );
}
