"use client";

import { useState, useCallback } from "react";
import { Download, Loader2, CheckSquare, Square } from "lucide-react";

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
  report: Report;
}

const SECTION_TYPE_LABELS: Record<string, string> = {
  PALACE_ANALYSIS: "Palace Analyses",
  DECADE_ANALYSIS: "Decade Timeline",
  LIFE_NARRATIVE: "Your Life Story",
  OVERALL_ASSESSMENT: "Overall Assessment",
  TOPIC_DEEP_DIVE: "Topic Deep Dives",
  SIMPLE_SUMMARY: "Quick Summary",
};

export default function ReportPDFExport({ report }: Props) {
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(report.sections.map((s) => s.id))
  );
  const [generating, setGenerating] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const allSelected = selected.size === report.sections.length;

  const toggleAll = () => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(report.sections.map((s) => s.id)));
    }
  };

  const toggleSection = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const generatePDF = useCallback(async () => {
    if (selected.size === 0) return;
    setGenerating(true);

    try {
      const [{ pdf }, { default: ReportPDFDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/lib/reports/ReportPDFDocument"),
      ]);
      const blob = await pdf(
        <ReportPDFDocument report={report} selectedSectionIds={selected} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "zwds-life-path-report.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setGenerating(false);
    }
  }, [selected, report]);

  // Group sections by type
  const grouped = new Map<string, Section[]>();
  for (const s of report.sections) {
    const list = grouped.get(s.type) || [];
    list.push(s);
    grouped.set(s.type, list);
  }

  return (
    <div className="rounded-xl border border-gold-700/20 bg-celestial-900/40 overflow-hidden">
      <div className="px-6 py-4 border-b border-gold-700/15 bg-celestial-800/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Download className="h-5 w-5 text-gold-400" />
          <h3
            className="text-lg font-bold text-parchment-100"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Export PDF
          </h3>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-gold-500 hover:text-gold-400 transition-colors"
        >
          {expanded ? "Hide sections" : "Select sections"}
        </button>
      </div>

      {expanded && (
        <div className="px-6 py-4 space-y-3">
          <button
            onClick={toggleAll}
            className="text-xs text-gold-500 hover:text-gold-400 transition-colors flex items-center gap-1.5"
          >
            {allSelected ? (
              <CheckSquare className="h-3.5 w-3.5" />
            ) : (
              <Square className="h-3.5 w-3.5" />
            )}
            {allSelected ? "Deselect All" : "Select All"}
          </button>

          {Array.from(grouped.entries()).map(([type, sections]) => (
            <div key={type}>
              <p className="text-[10px] font-mono tracking-[0.15em] uppercase text-parchment-600 mb-1.5">
                {SECTION_TYPE_LABELS[type] || type}
              </p>
              <div className="space-y-1">
                {sections.map((s) => (
                  <label
                    key={s.id}
                    className="flex items-center gap-2 text-xs text-parchment-400 hover:text-parchment-300 cursor-pointer"
                  >
                    <button onClick={() => toggleSection(s.id)}>
                      {selected.has(s.id) ? (
                        <CheckSquare className="h-3.5 w-3.5 text-gold-500" />
                      ) : (
                        <Square className="h-3.5 w-3.5 text-parchment-600" />
                      )}
                    </button>
                    {s.title}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="px-6 py-4">
        <button
          onClick={generatePDF}
          disabled={generating || selected.size === 0}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gold-600/20 border border-gold-500/30 text-gold-300 hover:bg-gold-600/30 hover:border-gold-500/50 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium"
        >
          {generating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating PDF…
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download PDF ({selected.size} section
              {selected.size !== 1 ? "s" : ""})
            </>
          )}
        </button>
      </div>
    </div>
  );
}