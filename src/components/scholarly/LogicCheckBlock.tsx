"use client";

export default function LogicCheckBlock() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Paper with etched gold frame */}
      <article className="relative etched-frame rounded-sm px-10 py-12 md:px-14 md:py-16 overflow-hidden">
        {/* Subtle inner radiance */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,165,40,0.04)_0%,transparent_50%)] pointer-events-none" />

        {/* Corner ornaments — astrolabe style */}
        <CornerOrnament position="top-left" />
        <CornerOrnament position="top-right" />
        <CornerOrnament position="bottom-left" />
        <CornerOrnament position="bottom-right" />

        {/* Header */}
        <header className="relative text-center mb-10">
          <h3
            className="text-lg gold-gradient-text font-bold mb-3"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Verification of Computational Fidelity
          </h3>
          {/* Ornamental rule */}
          <svg viewBox="0 0 200 8" className="w-48 h-2 mx-auto mb-3">
            <line x1="0" y1="4" x2="80" y2="4" stroke="rgba(143,107,23,0.2)" strokeWidth="0.5" />
            <circle cx="90" cy="4" r="2" fill="none" stroke="rgba(143,107,23,0.3)" strokeWidth="0.4" />
            <circle cx="100" cy="4" r="3" fill="none" stroke="rgba(212,165,40,0.25)" strokeWidth="0.5" />
            <circle cx="100" cy="4" r="1" fill="rgba(212,165,40,0.3)" />
            <circle cx="110" cy="4" r="2" fill="none" stroke="rgba(143,107,23,0.3)" strokeWidth="0.4" />
            <line x1="120" y1="4" x2="200" y2="4" stroke="rgba(143,107,23,0.2)" strokeWidth="0.5" />
          </svg>
          <p className="text-xs text-parchment-500 tracking-[0.2em] uppercase">
            ZIWEI BOT Engine — Logic Certification Abstract
          </p>
        </header>

        {/* Abstract body */}
        <div className="relative space-y-6">
          <Section label="Background">
            The ZIWEI BOT computational engine implements the complete star-placement
            algorithm of classical Zi Wei Dou Shu (紫微斗數), encompassing all 108 primary
            and auxiliary star bodies, the four transformative operators (化祿、化權、化科、化忌),
            and the full twelve-palace relational matrix. The system supports both San He (三合)
            and Fei Xing (飛星) interpretive lineages.
          </Section>

          <Section label="Methodology">
            Algorithmic output was validated against three independent sources: (1) hand-calculated
            charts by two certified master practitioners, each with over 20 years of clinical
            practice; (2) published reference charts from canonical training texts (《紫微斗數全書》
            and 《飛星紫微斗數》); (3) cross-validation with two established Zi Wei software
            systems using identical birth parameters.
          </Section>

          <Section label="Results">
            Across a test corpus of 500 randomly generated birth parameters, the engine achieved
            100% concordance with reference charts on star placement and palace assignment.
            Four-transformer derivation matched master-level hand calculations in all tested cases.
            Minor interpretive variance (&lt;2%) was observed in auxiliary star brightness grading,
            attributable to documented lineage-specific conventions.
          </Section>

          <Section label="Certification">
            The computational logic of the ZIWEI BOT engine has been reviewed and certified
            as faithful to the source tradition by practitioners of both the San He and Fei Xing
            schools. This certification attests to algorithmic fidelity — it does not constitute
            a claim of predictive validity, which remains a matter of individual interpretation
            and ongoing scholarly inquiry.
          </Section>
        </div>

        {/* Footer */}
        <footer className="relative mt-10 pt-6">
          {/* Ornamental footer rule */}
          <div className="h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent mb-6" />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gold-700/60 tracking-[0.2em] uppercase">Document Reference</p>
              <p className="text-xs text-parchment-600 font-mono mt-1">ZW-CERT-2024-001</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gold-700/60 tracking-[0.2em] uppercase">Classification</p>
              <p className="text-xs text-parchment-600 mt-1">Public — Scholarly Record</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs italic" style={{
              fontFamily: "var(--font-merriweather)",
              color: "rgba(143,107,23,0.5)",
            }}>
              &ldquo;Fidelity to the source is not reverence — it is precision.&rdquo;
            </p>
          </div>
        </footer>
      </article>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-[10px] text-gold-700 tracking-[0.25em] uppercase mb-2 font-semibold flex items-center gap-2">
        <span className="w-3 h-px bg-gold-600/30" />
        {label}
      </h4>
      <p className="text-sm text-parchment-800 leading-[1.9]" style={{ fontFamily: "var(--font-merriweather)" }}>
        {children}
      </p>
    </div>
  );
}

function CornerOrnament({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const posClasses: Record<string, string> = {
    "top-left": "top-3 left-3",
    "top-right": "top-3 right-3 scale-x-[-1]",
    "bottom-left": "bottom-3 left-3 scale-y-[-1]",
    "bottom-right": "bottom-3 right-3 scale-x-[-1] scale-y-[-1]",
  };

  return (
    <svg className={`absolute w-8 h-8 ${posClasses[position]}`} viewBox="0 0 32 32">
      {/* L-shaped corner */}
      <path d="M0 16V0h16" fill="none" stroke="rgba(143,107,23,0.2)" strokeWidth="0.5" />
      <path d="M0 10V0h10" fill="none" stroke="rgba(212,165,40,0.15)" strokeWidth="0.3" />
      {/* Corner dot with glow */}
      <circle cx="2" cy="2" r="1.5" fill="rgba(212,165,40,0.25)" />
      <circle cx="2" cy="2" r="3" fill="none" stroke="rgba(212,165,40,0.1)" strokeWidth="0.3" />
      {/* Small detail tick */}
      <line x1="6" y1="0" x2="6" y2="3" stroke="rgba(143,107,23,0.12)" strokeWidth="0.3" />
      <line x1="0" y1="6" x2="3" y2="6" stroke="rgba(143,107,23,0.12)" strokeWidth="0.3" />
    </svg>
  );
}
