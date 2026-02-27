import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("py-12 text-center", className)}>
      <h1
        className="text-3xl font-bold text-parchment-100 sm:text-4xl"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-parchment-500">{subtitle}</p>
      )}
      <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
    </div>
  );
}
