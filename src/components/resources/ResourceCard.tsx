import Link from "next/link";
import { FileText, BookOpen, Database, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";

const TYPE_CONFIG = {
  PDF: { icon: FileText, label: "PDF", color: "text-quantum-red" },
  ARTICLE: { icon: BookOpen, label: "Article", color: "text-gold-400" },
  DATASET: { icon: Database, label: "Dataset", color: "text-quantum-cyan" },
  CASE_STUDY: { icon: FlaskConical, label: "Case Study", color: "text-quantum-green" },
} as const;

interface ResourceCardProps {
  slug: string;
  title: string;
  type: keyof typeof TYPE_CONFIG;
  category: string;
  excerpt?: string | null;
  createdAt: string;
}

export default function ResourceCard({
  slug,
  title,
  type,
  category,
  excerpt,
  createdAt,
}: ResourceCardProps) {
  const config = TYPE_CONFIG[type];
  const Icon = config.icon;

  return (
    <Link
      href={`/resources/${slug}`}
      className="group flex flex-col rounded-lg border border-gold-700/20 bg-celestial-800/30 p-6 transition-all hover:border-gold-700/40 hover:bg-celestial-800/50"
    >
      <div className="mb-3 flex items-center gap-2">
        <Icon className={cn("h-4 w-4", config.color)} />
        <span
          className={cn(
            "rounded-full bg-celestial-700/50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
            config.color
          )}
        >
          {config.label}
        </span>
        <span className="ml-auto text-[10px] text-parchment-700 uppercase tracking-wider">
          {category}
        </span>
      </div>

      <h3
        className="mb-2 text-lg font-semibold text-parchment-200 group-hover:text-gold-400 transition-colors"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        {title}
      </h3>

      {excerpt && (
        <p className="mb-4 flex-1 text-sm leading-relaxed text-parchment-500">
          {excerpt}
        </p>
      )}

      <p className="mt-auto text-xs text-parchment-700">
        {new Date(createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
    </Link>
  );
}
