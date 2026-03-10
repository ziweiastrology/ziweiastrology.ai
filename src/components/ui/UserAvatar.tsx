import Image from "next/image";
import { cn } from "@/lib/utils";

const SIZE_MAP = {
  xs: { px: 16, text: "text-[8px]" },
  sm: { px: 24, text: "text-[10px]" },
  md: { px: 32, text: "text-xs" },
  lg: { px: 40, text: "text-sm" },
  xl: { px: 80, text: "text-2xl" },
} as const;

interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  size?: keyof typeof SIZE_MAP;
  className?: string;
}

export default function UserAvatar({ src, name, size = "md", className }: UserAvatarProps) {
  const { px, text } = SIZE_MAP[size];
  const initials = (name || "?").slice(0, 2).toUpperCase();

  if (src) {
    return (
      <Image
        src={src}
        alt={name || "Avatar"}
        width={px}
        height={px}
        className={cn("rounded-full object-cover shrink-0", className)}
        style={{ width: px, height: px }}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border border-gold-700/30 bg-celestial-700/50 font-bold text-gold-400",
        text,
        className
      )}
      style={{ width: px, height: px }}
    >
      {initials}
    </div>
  );
}
