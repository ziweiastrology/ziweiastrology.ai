"use client";

export default function LineageStatement() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative p-10 md:p-14 rounded-sm bg-parchment-200/60 border border-parchment-400/30">
        {/* Decorative quotation marks */}
        <svg
          className="absolute top-4 left-6 w-10 h-10 text-gold-500/20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
        </svg>

        {/* Quote content */}
        <blockquote className="relative">
          <p
            className="text-lg md:text-xl leading-relaxed text-celestial-800 mb-6 italic"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            The computational logic underlying ziweiastrology.ai is rooted in
            over one thousand years of Zi Wei Dou Shu (紫微斗數) tradition — a
            system first codified during the Song Dynasty and refined through
            successive generations of master practitioners. Our algorithms
            translate this classical framework into high-precision probability
            models, preserving the integrity of the original star placement
            methodology while extending its analytical power through modern
            computational methods.
          </p>

          <p
            className="text-base leading-relaxed text-parchment-700 mb-8"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            Every calculation has been verified against the canonical texts and
            certified by master-level practitioners (三合派 & 飛星派) to ensure
            fidelity to the source tradition. This is not an approximation — it
            is a precise digital rendering of an ancient instrument.
          </p>

          {/* Attribution */}
          <footer className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-gold-500/40 to-transparent" />
            <cite
              className="text-sm text-gold-700 not-italic tracking-widest uppercase"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              The Zi Wei Research Foundation
            </cite>
            <div className="h-px flex-1 bg-gradient-to-l from-gold-500/40 to-transparent" />
          </footer>
        </blockquote>

        {/* Corner ornaments */}
        <CornerOrnament position="top-left" />
        <CornerOrnament position="top-right" />
        <CornerOrnament position="bottom-left" />
        <CornerOrnament position="bottom-right" />
      </div>
    </div>
  );
}

function CornerOrnament({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 scale-x-[-1]",
    "bottom-left": "bottom-0 left-0 scale-y-[-1]",
    "bottom-right": "bottom-0 right-0 scale-x-[-1] scale-y-[-1]",
  };

  return (
    <svg
      className={`absolute w-8 h-8 text-gold-500/30 ${positionClasses[position]}`}
      viewBox="0 0 32 32"
    >
      <path
        d="M0 0v16c0-8 8-16 16-16z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <path
        d="M0 0v8c0-4 4-8 8-8z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <circle cx="2" cy="2" r="1" fill="currentColor" />
    </svg>
  );
}
