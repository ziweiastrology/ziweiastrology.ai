import { Suspense } from "react";
import ClaimWizard from "@/components/reading/ClaimWizard";

export default function ThankYouPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      {/* Thank you heading + billing descriptor */}
      <div className="mb-8 text-center">
        <h1
          className="font-heading text-3xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Thank You for Your Purchase!
        </h1>
        <p className="mt-3 text-sm text-muted">
          Your credit card statement will show a charge from{" "}
          <span className="font-semibold text-foreground">CLKBANK*ZiWei AI</span>.
        </p>
      </div>

      {/* Access instructions */}
      <div className="mb-8 rounded-lg border border-gold-700/20 bg-surface/70 p-5 text-sm text-parchment-400 space-y-2">
        <p className="font-semibold text-foreground">How to access your Destiny Reading:</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Verify your purchase below (automatic)</li>
          <li>Create a free account or sign in</li>
          <li>Enter your birth details so we can compute your chart</li>
          <li>Your personalized AI destiny report will be generated instantly</li>
        </ol>
        <p className="text-xs text-muted">
          Your report is a digital document viewable in your browser. You can also download it as a PDF.
        </p>
      </div>

      {/* Claim wizard */}
      <Suspense
        fallback={
          <div className="text-center text-[var(--color-text-muted)]">Loading...</div>
        }
      >
        <ClaimWizard />
      </Suspense>

      {/* Contact + ClickBank disclaimer */}
      <footer className="mt-16 border-t border-border/50 pt-6 text-xs text-parchment-600 space-y-4">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-6">
          <p>
            Need help?{" "}
            <a
              href="mailto:support@ziweiastrology.ai"
              className="text-gold-400 underline hover:text-gold-300"
            >
              Contact Us
            </a>
          </p>
          <p>
            Order support:{" "}
            <a
              href="https://www.clkbank.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 underline hover:text-gold-300"
            >
              ClickBank Order Support
            </a>
          </p>
        </div>

        <p className="mx-auto max-w-xl text-center leading-relaxed">
          ClickBank is the retailer of this product. CLICKBANK® is a registered
          trademark of Click Sales, Inc., a Delaware corporation located at 1444
          S. Entertainment Ave., Suite 410 Boise, ID 83709, USA and used by
          permission. ClickBank&apos;s role as retailer does not constitute an
          endorsement, approval or review of this product or any claim, statement
          or opinion used in promotion of this product.
        </p>
      </footer>
    </div>
  );
}
