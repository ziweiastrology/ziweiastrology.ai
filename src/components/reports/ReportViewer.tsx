"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, List, X, Sparkles, BookOpen } from "lucide-react";
import ReportStatusBar from "./ReportStatusBar";
import ReportSectionCard from "./ReportSectionCard";
import MatchingCards from "./MatchingCards";
import ReportPDFExport from "./ReportPDFExport";

interface Section {
  id: string;
  type: string;
  key: string;
  title: string;
  content: string;
  orderIndex: number;
}

interface Report {
  id: string;
  status: string;
  birthDate: string;
  birthGender: string;
  metaJson: {
    soulPalace?: string;
    bodyPalace?: string;
    fiveElementsClass?: string;
    zodiac?: string;
  };
  sections: Section[];
  createdAt: string;
}

interface Props {
  reportId: string;
}

export default function ReportViewer({ reportId }: Props) {
  const router = useRouter();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [tocOpen, setTocOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"simple" | "detailed">("detailed");
  const [cancelling, setCancelling] = useState(false);

  const handleCancel = useCallback(async () => {
    if (cancelling) return;
    if (!confirm("Cancel this report and get your credits back?")) return;
    setCancelling(true);
    try {
      const res = await fetch(`/api/reports/${reportId}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/reports");
      } else {
        const data = await res.json();
        alert(data.error === "cannot_cancel_completed" ? "Completed reports cannot be cancelled." : "Failed to cancel. Please try again.");
        setCancelling(false);
      }
    } catch {
      alert("Failed to cancel. Please try again.");
      setCancelling(false);
    }
  }, [reportId, cancelling, router]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    async function fetchReport() {
      try {
        const res = await fetch(`/api/reports/${reportId}`);
        if (!res.ok) return;
        const data = await res.json();
        setReport(data.report);

        // Default to simple view for completed reports with a simple summary
        if (data.report.status === "COMPLETE" && data.report.sections.some((s: Section) => s.type === "SIMPLE_SUMMARY")) {
          setViewMode("simple");
        }

        // Stop polling when complete or failed
        if (data.report.status === "COMPLETE" || data.report.status === "FAILED") {
          clearInterval(interval);
        }
      } catch {
        // Ignore fetch errors during polling
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
    // Poll every 3s while generating
    interval = setInterval(fetchReport, 3000);

    return () => clearInterval(interval);
  }, [reportId]);

  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-xl border border-gold-700/20 bg-celestial-800/30"
          />
        ))}
      </div>
    );
  }

  if (!report) {
    return (
      <div className="rounded-xl border border-quantum-red/30 bg-quantum-red/5 p-8 text-center">
        <p className="text-sm text-quantum-red">Report not found.</p>
      </div>
    );
  }

  const palaceSections = report.sections.filter((s) => s.type === "PALACE_ANALYSIS");
  const decadeSections = report.sections.filter((s) => s.type === "DECADE_ANALYSIS");
  const overallSections = report.sections.filter((s) => s.type === "OVERALL_ASSESSMENT");
  const narrativeSections = report.sections.filter((s) => s.type === "LIFE_NARRATIVE");
  const deepDiveSections = report.sections.filter((s) => s.type === "TOPIC_DEEP_DIVE");
  const simpleSummary = report.sections.find((s) => s.type === "SIMPLE_SUMMARY");

  // Expected total: 12 palaces + 1 decade + 1 narrative + 1 overall + 1 simple summary = 16
  const expectedTotal = 16;

  // TOC order: overall → decade → narrative → palaces → deep dives
  const tocSectionOrder: Record<string, number> = {
    OVERALL_ASSESSMENT: 0,
    DECADE_ANALYSIS: 1,
    LIFE_NARRATIVE: 2,
    PALACE_ANALYSIS: 3,
    TOPIC_DEEP_DIVE: 4,
  };
  const tocSections = [...report.sections].sort(
    (a, b) => (tocSectionOrder[a.type] ?? 99) - (tocSectionOrder[b.type] ?? 99) || a.orderIndex - b.orderIndex
  );

  const scrollToSection = (key: string) => {
    setActiveSection(key);
    setTocOpen(false);
    const el = document.getElementById(`section-${key}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative">
      {/* Mobile TOC toggle — hidden in simple mode */}
      {viewMode === "detailed" && (
        <button
          onClick={() => setTocOpen(!tocOpen)}
          className="lg:hidden fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-celestial-800 border border-gold-700 shadow-lg flex items-center justify-center"
        >
          {tocOpen ? <X className="h-5 w-5 text-gold-400" /> : <List className="h-5 w-5 text-gold-400" />}
        </button>
      )}

      <div className="flex gap-8">
        {/* TOC Sidebar — hidden in simple mode */}
        <aside
          className={`
            ${viewMode === "simple" ? "hidden" : tocOpen ? "fixed inset-0 z-30 bg-celestial-900/95 p-6 overflow-y-auto" : "hidden"}
            ${viewMode === "simple" ? "" : "lg:block lg:sticky lg:top-28 lg:self-start lg:w-64 lg:flex-shrink-0 lg:relative lg:inset-auto lg:z-auto lg:bg-transparent lg:p-0"}
          `}
        >
          <div className="lg:rounded-xl lg:border lg:border-gold-700/20 lg:bg-celestial-900/40 lg:p-4">
            <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-gold-600 mb-3">
              Table of Contents
            </h4>
            <nav className="space-y-1">
              {tocSections.map((section) => (
                <button
                  key={section.key}
                  onClick={() => scrollToSection(section.key)}
                  className={`w-full text-left flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors ${
                    activeSection === section.key
                      ? "bg-gold-500/10 text-gold-400"
                      : "text-parchment-500 hover:text-parchment-300 hover:bg-celestial-800/50"
                  }`}
                >
                  <ChevronRight className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">{section.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="inline-block px-3 py-1 text-[10px] font-mono tracking-[0.3em] uppercase text-quantum-green/80 border border-quantum-green/30 rounded-sm">
              [FULL REPORT]
            </span>
            <h2
              className="text-2xl sm:text-3xl font-bold gold-gradient-text"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Complete Life-Path Analysis
            </h2>
            {report.metaJson && (
              <p className="text-sm text-parchment-500">
                {[
                  report.metaJson.zodiac,
                  report.metaJson.fiveElementsClass,
                  report.metaJson.soulPalace && `命宫: ${report.metaJson.soulPalace}`,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}

            {/* View mode toggle */}
            {simpleSummary && (
              <div className="flex items-center justify-center gap-2 mt-4">
                <button
                  onClick={() => setViewMode("simple")}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    viewMode === "simple"
                      ? "bg-gold-500/20 text-gold-400 border-gold-500/40"
                      : "text-parchment-500 hover:text-parchment-300 border-transparent"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  精简版 Simple
                </button>
                <button
                  onClick={() => setViewMode("detailed")}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    viewMode === "detailed"
                      ? "bg-gold-500/20 text-gold-400 border-gold-500/40"
                      : "text-parchment-500 hover:text-parchment-300 border-transparent"
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  详细版 Detailed
                </button>
              </div>
            )}
          </div>

          {/* Status bar */}
          <ReportStatusBar
            status={report.status}
            totalSections={expectedTotal}
            completedSections={report.sections.length}
            onCancel={report.status === "GENERATING" || report.status === "FAILED" ? handleCancel : undefined}
            cancelling={cancelling}
          />

          {/* Simple view */}
          {viewMode === "simple" && simpleSummary ? (
            <>
              <div id={`section-${simpleSummary.key}`}>
                <ReportSectionCard
                  title={simpleSummary.title}
                  content={simpleSummary.content}
                  type={simpleSummary.type}
                />
              </div>

              {/* CTA to switch to detailed */}
              <button
                onClick={() => setViewMode("detailed")}
                className="w-full py-4 text-center text-sm text-gold-500 hover:text-gold-400 transition-colors"
              >
                Want the full picture? Switch to Detailed View →
              </button>

              {/* PDF Export */}
              {report.status === "COMPLETE" && (
                <ReportPDFExport report={report} />
              )}
            </>
          ) : (
            <>
              {/* Overall Assessment — first content section (anchoring bias) */}
              {overallSections.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-quantum-green/70">
                    Overall Assessment
                  </h3>
                  {overallSections.map((section) => (
                    <div key={section.id} id={`section-${section.key}`}>
                      <ReportSectionCard
                        title={section.title}
                        content={section.content}
                        type={section.type}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Matching Analysis Cards — visual reinforcement after overview */}
              {report.status === "COMPLETE" && report.sections.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-gold-500/70">
                    Matching Analysis
                  </h3>
                  <MatchingCards sections={report.sections} />
                </div>
              )}

              {/* Decade Analysis — personal life phases */}
              {decadeSections.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-quantum-orange/70">
                    Decade Timeline
                  </h3>
                  {decadeSections.map((section) => (
                    <div key={section.id} id={`section-${section.key}`}>
                      <ReportSectionCard
                        title={section.title}
                        content={section.content}
                        type={section.type}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Life Narrative — emotional hook / personal story */}
              {narrativeSections.length > 0 && (
                <div className="space-y-4">
                  {narrativeSections.map((section) => (
                    <div key={section.id} id={`section-${section.key}`}>
                      <div className="rounded-xl border border-gold-700/20 bg-parchment-900/5 border-l-2 border-l-gold-500/40 overflow-hidden">
                        <div className="px-6 py-5">
                          <h3
                            className="text-xl font-bold gold-gradient-text mb-4"
                            style={{ fontFamily: "var(--font-cinzel)" }}
                          >
                            {section.title}
                          </h3>
                          <div className="prose-ancient text-base text-parchment-300 leading-relaxed whitespace-pre-line">
                            {section.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Palace Analyses — detailed reading (user is primed) */}
              {palaceSections.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-quantum-cyan/70">
                    12 Palace Deep Analysis
                  </h3>
                  {palaceSections.map((section) => (
                    <div key={section.id} id={`section-${section.key}`}>
                      <ReportSectionCard
                        title={section.title}
                        content={section.content}
                        type={section.type}
                        showDeepDiveCTA
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Topic Deep Dives */}
              {deepDiveSections.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-gold-500/70">
                    Topic Deep Dives
                  </h3>
                  {deepDiveSections.map((section) => (
                    <div key={section.id} id={`section-${section.key}`}>
                      <ReportSectionCard
                        title={section.title}
                        content={section.content}
                        type={section.type}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* PDF Export */}
              {report.status === "COMPLETE" && (
                <ReportPDFExport report={report} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
