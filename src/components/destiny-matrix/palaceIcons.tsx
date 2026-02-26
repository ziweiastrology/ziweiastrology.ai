import React from "react";

const iconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Self — compass
export function SelfIcon({ stroke = "currentColor" }) {
  return (
    <svg {...iconProps} stroke={stroke}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2" />
      <line x1="12" y1="3" x2="12" y2="7" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="3" y1="12" x2="7" y2="12" />
      <line x1="17" y1="12" x2="21" y2="12" />
    </svg>
  );
}

// Siblings — two stars
export function SiblingsIcon({ stroke = "currentColor" }) {
  return (
    <svg {...iconProps} stroke={stroke}>
      <polygon points="8,2 9.5,7 14,7 10.5,10 11.5,15 8,12 4.5,15 5.5,10 2,7 6.5,7" />
      <polygon points="17,9 18,12 21,12 18.5,14 19.5,17 17,15 14.5,17 15.5,14 13,12 16,12" />
    </svg>
  );
}

// Spouse — yin-yang
export function SpouseIcon({ stroke = "currentColor" }) {
  return (
    <svg {...iconProps} stroke={stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a4.5 4.5 0 010 9 4.5 4.5 0 000 9" />
      <circle cx="12" cy="7.5" r="1.2" fill={stroke} stroke="none" />
      <circle cx="12" cy="16.5" r="1.2" />
    </svg>
  );
}

// Children — seedling
export function ChildrenIcon({ stroke = "currentColor" }) {
  return (
    <svg {...iconProps} stroke={stroke}>
      <path d="M12 22V12" />
      <path d="M12 12C12 8 8 6 5 7c0 4 3 5 7 5z" />
      <path d="M12 12C12 8 16 6 19 7c0 4-3 5-7 5z" />
      <path d="M12 7V4" />
      <circle cx="12" cy="3" r="1" />
    </svg>
  );
}

// Wealth — ripples
export function WealthIcon({ stroke = "currentColor" }) {
  return (
    <svg {...iconProps} stroke={stroke}>
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="12" r="5" opacity="0.7" />
      <circle cx="12" cy="12" r="8" opacity="0.4" />
      <circle cx="12" cy="12" r="10.5" opacity="0.2" />
    </svg>
  );
}

// Health — pulse
export function HealthIcon({ stroke = "currentColor" }) {
  return (
    <svg {...iconProps} stroke={stroke}>
      <polyline points="2,12 6,12 8,6 10,18 12,8 14,14 16,12 22,12" />
    </svg>
  );
}

// Travel — compass rose
export function TravelIcon({ stroke = "currentColor" }) {
  return (
    <svg {...iconProps} stroke={stroke}>
      <circle cx="12" cy="12" r="9" />
      <polygon points="12,4 13.5,10 12,8 10.5,10" fill={stroke} opacity="0.4" />
      <polygon points="12,20 10.5,14 12,16 13.5,14" />
      <polygon points="4,12 10,10.5 8,12 10,13.5" />
      <polygon points="20,12 14,13.5 16,12 14,10.5" fill={stroke} opacity="0.4" />
    </svg>
  );
}

// Friends — constellation
export function FriendsIcon({ stroke = "currentColor" }) {
  return (
    <svg {...iconProps} stroke={stroke}>
      <circle cx="5" cy="6" r="1.5" />
      <circle cx="12" cy="4" r="1.5" />
      <circle cx="19" cy="8" r="1.5" />
      <circle cx="8" cy="14" r="1.5" />
      <circle cx="16" cy="16" r="1.5" />
      <circle cx="12" cy="21" r="1.5" />
      <line x1="5" y1="6" x2="12" y2="4" />
      <line x1="12" y1="4" x2="19" y2="8" />
      <line x1="5" y1="6" x2="8" y2="14" />
      <line x1="8" y1="14" x2="16" y2="16" />
      <line x1="16" y1="16" x2="12" y2="21" />
    </svg>
  );
}

// Career — steps
export function CareerIcon({ stroke = "currentColor" }) {
  return (
    <svg {...iconProps} stroke={stroke}>
      <polyline points="4,20 4,16 9,16 9,12 14,12 14,8 19,8 19,4" />
      <circle cx="19" cy="4" r="1.5" />
    </svg>
  );
}

// Property — gate
export function PropertyIcon({ stroke = "currentColor" }) {
  return (
    <svg {...iconProps} stroke={stroke}>
      <path d="M3 21V8l9-5 9 5v13" />
      <path d="M9 21v-7h6v7" />
      <line x1="3" y1="21" x2="21" y2="21" />
    </svg>
  );
}

// Fortune — infinity
export function FortuneIcon({ stroke = "currentColor" }) {
  return (
    <svg {...iconProps} stroke={stroke}>
      <path d="M6 12c-2-2.5-4-1.5-4 1s2 3.5 4 1 4-5 6-5 4 1.5 4 1.5" />
      <path d="M18 12c2 2.5 4 1.5 4-1s-2-3.5-4-1-4 5-6 5-4-1.5-4-1.5" />
    </svg>
  );
}

// Parents — pillar
export function ParentsIcon({ stroke = "currentColor" }) {
  return (
    <svg {...iconProps} stroke={stroke}>
      <line x1="12" y1="3" x2="12" y2="21" />
      <path d="M8 3h8" />
      <path d="M8 21h8" />
      <path d="M7 7l5 3 5-3" />
      <path d="M7 17l5-3 5 3" />
    </svg>
  );
}

// Icon map for lookup by palace id
export const PALACE_ICON_MAP: Record<string, React.FC<{ stroke?: string }>> = {
  self: SelfIcon,
  siblings: SiblingsIcon,
  spouse: SpouseIcon,
  children: ChildrenIcon,
  wealth: WealthIcon,
  health: HealthIcon,
  travel: TravelIcon,
  friends: FriendsIcon,
  career: CareerIcon,
  property: PropertyIcon,
  fortune: FortuneIcon,
  parents: ParentsIcon,
};
