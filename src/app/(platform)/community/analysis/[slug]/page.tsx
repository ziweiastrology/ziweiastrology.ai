import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AnalysisDetailPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link
        href="/community/analysis"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-parchment-500 transition-colors hover:text-gold-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Analysis
      </Link>

      <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-8">
        <h1
          className="mb-4 text-2xl font-bold text-parchment-100"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Analysis Detail
        </h1>
        <p className="text-parchment-500">
          Full analysis content with ZiWei chart breakdowns will be loaded from
          the database. Connect a PostgreSQL database and seed data to populate.
        </p>
      </div>
    </div>
  );
}
