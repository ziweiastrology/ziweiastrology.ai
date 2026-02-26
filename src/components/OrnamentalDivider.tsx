"use client";

interface OrnamentalDividerProps {
  variant?: "gold" | "celestial" | "parchment";
}

export default function OrnamentalDivider({ variant = "parchment" }: OrnamentalDividerProps) {
  const colors = {
    gold: { line: "rgba(212,165,40,0.3)", dot: "rgba(212,165,40,0.5)", detail: "rgba(212,165,40,0.2)" },
    celestial: { line: "rgba(74,95,194,0.25)", dot: "rgba(74,95,194,0.4)", detail: "rgba(74,95,194,0.15)" },
    parchment: { line: "rgba(143,107,23,0.2)", dot: "rgba(143,107,23,0.35)", detail: "rgba(143,107,23,0.12)" },
  };
  const c = colors[variant];

  return (
    <div className="flex items-center justify-center py-6">
      <svg viewBox="0 0 400 24" className="w-full max-w-md h-6" xmlns="http://www.w3.org/2000/svg">
        {/* Left arm */}
        <line x1="0" y1="12" x2="155" y2="12" stroke={c.line} strokeWidth="0.5" />
        <line x1="100" y1="10" x2="155" y2="10" stroke={c.detail} strokeWidth="0.3" />
        <line x1="100" y1="14" x2="155" y2="14" stroke={c.detail} strokeWidth="0.3" />
        {/* Left arc detail */}
        <path d="M140 6 Q155 12 140 18" fill="none" stroke={c.detail} strokeWidth="0.4" />

        {/* Center ornament — astrolabe rosette */}
        <circle cx="200" cy="12" r="8" fill="none" stroke={c.line} strokeWidth="0.5" />
        <circle cx="200" cy="12" r="4" fill="none" stroke={c.dot} strokeWidth="0.4" />
        <circle cx="200" cy="12" r="1.5" fill={c.dot} />
        {/* Cross axes */}
        <line x1="192" y1="12" x2="208" y2="12" stroke={c.detail} strokeWidth="0.3" />
        <line x1="200" y1="4" x2="200" y2="20" stroke={c.detail} strokeWidth="0.3" />
        {/* Diagonal axes */}
        <line x1="194.3" y1="6.3" x2="205.7" y2="17.7" stroke={c.detail} strokeWidth="0.2" />
        <line x1="205.7" y1="6.3" x2="194.3" y2="17.7" stroke={c.detail} strokeWidth="0.2" />
        {/* Tick marks on outer ring */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 200 + 7 * Math.cos(rad);
          const y1 = 12 + 7 * Math.sin(rad);
          const x2 = 200 + 9.5 * Math.cos(rad);
          const y2 = 12 + 9.5 * Math.sin(rad);
          return (
            <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={c.dot} strokeWidth="0.3" />
          );
        })}

        {/* Right arc detail */}
        <path d="M260 6 Q245 12 260 18" fill="none" stroke={c.detail} strokeWidth="0.4" />
        {/* Right arm */}
        <line x1="245" y1="12" x2="400" y2="12" stroke={c.line} strokeWidth="0.5" />
        <line x1="245" y1="10" x2="300" y2="10" stroke={c.detail} strokeWidth="0.3" />
        <line x1="245" y1="14" x2="300" y2="14" stroke={c.detail} strokeWidth="0.3" />
      </svg>
    </div>
  );
}
