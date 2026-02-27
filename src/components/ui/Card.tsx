import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glow" | "parchment";
}

export function Card({
  className,
  variant = "default",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border p-6",
        {
          "bg-celestial-800/50 border-gold-700/20": variant === "default",
          "bg-celestial-800/50 border-gold-700/30 shadow-lg shadow-gold-500/5 glow-border":
            variant === "glow",
          "bg-parchment-100 border-gold-300/30 text-celestial-900":
            variant === "parchment",
        },
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-parchment-100",
        className
      )}
      style={{ fontFamily: "var(--font-cinzel)" }}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-parchment-400", className)} {...props} />;
}
