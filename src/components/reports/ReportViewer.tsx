"use client";

import { useState, useEffect } from "react";
import { ChevronRight, List, X } from "lucide-react";
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
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [tocOpen, setTocOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    async function fetchReport() {
      try {
        const res = await fetch(`/api/reports/${reportId}`);
        if (!res.ok) return;
        const data = await res.json();
        setReport(data.report);

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
  const deepDiveSections = report.sections.filter((s) => s.type === "TOPIC_DEEP_DIVE");

  // Expected total: 12 palaces + 1 decade + 1 overall = 14
  const expectedTotal = 14;

  const scrollToSection = (key: string) => {
    setActiveSection(key);
    setTocOpen(false);
    const el = document.getElementById(`section-${key}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative">
      {/* Mobile TOC toggle */}
      <button
        onClick={() => setTocOpen(!tocOpen)}
        className="lg:hidden fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-celestial-800 border border-gold-700 shadow-lg flex items-center justify-center"
      >
        {tocOpen ? <X className="h-5 w-5 text-gold-400" /> : <List className="h-5 w-5 text-gold-400" />}
      </button>

      <div className="flex gap-8">
        {/* TOC Sidebar */}
        <aside
          className={`
            ${tocOpen ? "fixed inset-0 z-30 bg-celestial-900/95 p-6 overflow-y-auto" : "hidden"}
            lg:block lg:sticky lg:top-28 lg:self-start lg:w-64 lg:flex-shrink-0 lg:relative lg:inset-auto lg:z-auto lg:bg-transparent lg:p-0
          `}
        >
          <div className="lg:rounded-xl lg:border lg:border-gold-700/20 lg:bg-celestial-900/40 lg:p-4">
            <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-gold-600 mb-3">
              Table of Contents
            </h4>
            <nav className="space-y-1">
              {report.sections.map((section) => (
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
          </div>

          {/* Status bar */}
          <ReportStatusBar
            status={report.status}
            totalSections={expectedTotal}
            completedSections={report.sections.length}
          />

          {/* Palace Analyses */}
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

          {/* Decade Analysis */}
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

          {/* Overall Assessment */}
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

          {/* Matching Analysis Cards */}
          {report.status === "COMPLETE" && report.sections.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-gold-500/70">
                Matching Analysis
              </h3>
              <MatchingCards sections={report.sections} />
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
        </div>
      </div>
    </div>
  );
}
