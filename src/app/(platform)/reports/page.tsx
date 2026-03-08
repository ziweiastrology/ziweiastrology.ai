import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const STATUS_BADGE: Record<string, { icon: typeof CheckCircle; label: string; color: string }> = {
  COMPLETE: { icon: CheckCircle, label: "Complete", color: "text-quantum-green border-quantum-green/30" },
  GENERATING: { icon: Loader2, label: "Generating", color: "text-quantum-cyan border-quantum-cyan/30" },
  FAILED: { icon: AlertCircle, label: "Failed", color: "text-quantum-red border-quantum-red/30" },
  PREVIEW: { icon: Clock, label: "Preview", color: "text-parchment-500 border-parchment-500/30" },
};

export default async function ReportsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/auth/login");

  const reports = await prisma.chartReport.findMany({
    where: { userId: session.user.id },
    include: {
      sections: {
        select: { id: true, type: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1
          className="text-2xl sm:text-3xl font-bold gold-gradient-text"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Your Reports
        </h1>
        <p className="text-sm text-parchment-500 mt-1">
          AI-generated life-path analyses from your Zi Wei chart
        </p>
      </div>

      {reports.length === 0 ? (
        <div className="text-center p-12 rounded-xl border border-gold-700/20 bg-celestial-900/40">
          <FileText className="h-12 w-12 text-gold-700/40 mx-auto mb-4" />
          <p className="text-parchment-400 mb-2">No reports yet</p>
          <p className="text-sm text-parchment-600">
            Generate your first full report from your chart reading page
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => {
            const meta = report.metaJson as { zodiac?: string; fiveElementsClass?: string; soulPalace?: string } | null;
            const badge = STATUS_BADGE[report.status] || STATUS_BADGE.PREVIEW;
            const BadgeIcon = badge.icon;

            return (
              <Link
                key={report.id}
                href={`/reports/${report.id}`}
                className="block rounded-xl border border-gold-700/20 bg-celestial-900/40 p-5 hover:border-gold-500/30 hover:bg-celestial-800/40 transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-base font-semibold text-parchment-200 group-hover:text-gold-400 transition-colors">
                        Life-Path Report
                      </h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] border rounded-sm ${badge.color}`}>
                        <BadgeIcon className={`h-3 w-3 ${report.status === "GENERATING" ? "animate-spin" : ""}`} />
                        {badge.label}
                      </span>
                    </div>
                    <p className="text-xs text-parchment-500">
                      {[
                        meta?.zodiac,
                        meta?.fiveElementsClass,
                        meta?.soulPalace && `命宫: ${meta.soulPalace}`,
                      ]
                        .filter(Boolean)
                        .join(" · ") || "Chart analysis"}
                    </p>
                    <p className="text-[10px] text-parchment-600 mt-1">
                      {new Date(report.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      {" · "}
                      {report.sections.length} sections
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-parchment-600 group-hover:text-gold-500 transition-colors">
                    <FileText className="h-8 w-8" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
