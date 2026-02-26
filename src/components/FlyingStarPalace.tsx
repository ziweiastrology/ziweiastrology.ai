"use client";

export default function FlyingStarPalace() {
  // 12 palaces arranged in a 4x4 grid (excluding corners gives 12 positions)
  const palaces = [
    { name: "子女", western: "Children", x: 1, y: 0 },
    { name: "夫妻", western: "Spouse", x: 2, y: 0 },
    { name: "兄弟", western: "Siblings", x: 3, y: 0 },
    { name: "命宮", western: "Self", x: 3, y: 1 },
    { name: "父母", western: "Parents", x: 3, y: 2 },
    { name: "福德", western: "Fortune", x: 3, y: 3 },
    { name: "田宅", western: "Property", x: 2, y: 3 },
    { name: "官祿", western: "Career", x: 1, y: 3 },
    { name: "交友", western: "Friends", x: 0, y: 3 },
    { name: "遷移", western: "Travel", x: 0, y: 2 },
    { name: "疾厄", western: "Health", x: 0, y: 1 },
    { name: "財帛", western: "Wealth", x: 0, y: 0 },
  ];

  const gridSize = 120;
  const padding = 60;
  const totalSize = gridSize * 4 + padding * 2;
  const centerX = totalSize / 2;
  const centerY = totalSize / 2;

  return (
    <div className="flex items-center justify-center">
      <svg
        viewBox={`0 0 ${totalSize} ${totalSize}`}
        className="w-full max-w-[500px] h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Circuit trace pattern */}
          <pattern id="circuitPattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M0 15h10M15 0v10M20 15h10M15 20v10" stroke="rgba(212,165,40,0.06)" strokeWidth="0.5" fill="none" />
            <circle cx="15" cy="15" r="1" fill="rgba(212,165,40,0.04)" />
          </pattern>

          {/* Gold glow filter */}
          <filter id="goldGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Pulse animation gradient */}
          <radialGradient id="pulseGrad">
            <stop offset="0%" stopColor="#d4a528" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#d4a528" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background pattern */}
        <rect width={totalSize} height={totalSize} fill="url(#circuitPattern)" />

        {/* Connection lines — circuit traces between adjacent palaces */}
        {palaces.map((palace, i) => {
          const next = palaces[(i + 1) % palaces.length];
          const x1 = padding + palace.x * gridSize + gridSize / 2;
          const y1 = padding + palace.y * gridSize + gridSize / 2;
          const x2 = padding + next.x * gridSize + gridSize / 2;
          const y2 = padding + next.y * gridSize + gridSize / 2;

          return (
            <line
              key={`line-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(212,165,40,0.25)"
              strokeWidth="1"
              strokeDasharray="4 2"
              style={{
                animation: `glow-line 4s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          );
        })}

        {/* Cross-connections to center (diagonal circuits) */}
        {palaces.filter((_, i) => i % 3 === 0).map((palace, i) => {
          const x1 = padding + palace.x * gridSize + gridSize / 2;
          const y1 = padding + palace.y * gridSize + gridSize / 2;

          return (
            <line
              key={`center-${i}`}
              x1={x1}
              y1={y1}
              x2={centerX}
              y2={centerY}
              stroke="rgba(74,95,194,0.15)"
              strokeWidth="0.5"
              strokeDasharray="2 4"
            />
          );
        })}

        {/* Center element — Tai Ji */}
        <circle cx={centerX} cy={centerY} r="30" fill="none" stroke="rgba(212,165,40,0.3)" strokeWidth="1" />
        <circle cx={centerX} cy={centerY} r="20" fill="none" stroke="rgba(74,95,194,0.2)" strokeWidth="0.5" strokeDasharray="3 2" />
        <circle cx={centerX} cy={centerY} r="4" fill="#d4a528" opacity="0.6">
          <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <text x={centerX} y={centerY + 45} textAnchor="middle" fill="rgba(212,165,40,0.5)" fontSize="8" fontFamily="serif">
          太極 · TAI JI
        </text>

        {/* Palace nodes */}
        {palaces.map((palace, i) => {
          const x = padding + palace.x * gridSize + gridSize / 2;
          const y = padding + palace.y * gridSize + gridSize / 2;

          return (
            <g key={`palace-${i}`}>
              {/* Outer ring */}
              <circle
                cx={x}
                cy={y}
                r="22"
                fill="none"
                stroke="rgba(212,165,40,0.3)"
                strokeWidth="0.5"
              >
                <animate
                  attributeName="r"
                  values="20;24;20"
                  dur={`${3 + (i % 3)}s`}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Main node */}
              <circle
                cx={x}
                cy={y}
                r="16"
                fill="rgba(10,15,46,0.8)"
                stroke="rgba(212,165,40,0.5)"
                strokeWidth="1"
              />

              {/* Inner glow */}
              <circle cx={x} cy={y} r="8" fill="url(#pulseGrad)">
                <animate
                  attributeName="opacity"
                  values="0.3;0.7;0.3"
                  dur={`${2 + i * 0.2}s`}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Chinese name */}
              <text
                x={x}
                y={y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#d4a528"
                fontSize="8"
                fontFamily="serif"
                fontWeight="bold"
              >
                {palace.name}
              </text>

              {/* Western name */}
              <text
                x={x}
                y={y + 32}
                textAnchor="middle"
                fill="rgba(196,182,158,0.6)"
                fontSize="6"
                fontFamily="sans-serif"
                letterSpacing="1"
              >
                {palace.western.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* Rotating outer ring — astronomical clock feel */}
        <circle
          cx={centerX}
          cy={centerY}
          r={totalSize / 2 - 15}
          fill="none"
          stroke="rgba(212,165,40,0.1)"
          strokeWidth="0.5"
          strokeDasharray="2 8"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${centerX} ${centerY}`}
            to={`360 ${centerX} ${centerY}`}
            dur="120s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}
