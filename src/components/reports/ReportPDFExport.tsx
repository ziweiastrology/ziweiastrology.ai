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
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas-pro"),
        import("jspdf"),
      ]);

      // Create hidden render container
      const container = document.createElement("div");
      container.style.cssText =
        "position:fixed;left:-9999px;top:0;width:794px;padding:40px;background:#0a0e2a;color:#d4c9a8;font-family:Merriweather,serif;line-height:1.8;font-size:13px;";
      document.body.appendChild(container);

      // Cover page
      const cover = document.createElement("div");
      cover.style.cssText =
        "text-align:center;padding:120px 40px 60px;border-bottom:2px solid rgba(212,165,40,0.3);margin-bottom:40px;";
      cover.innerHTML = `
        <h1 style="font-family:Cinzel Decorative,serif;font-size:28px;color:#D4A528;margin-bottom:16px;">Complete Life-Path Analysis</h1>
        <p style="font-size:14px;color:#b8a07a;margin-bottom:8px;">紫微斗数 · Zi Wei Dou Shu</p>
        <div style="margin-top:32px;font-size:12px;color:#8a7d6b;">
          ${[
            report.metaJson.zodiac,
            report.metaJson.fiveElementsClass,
            report.metaJson.soulPalace ? `命宫: ${report.metaJson.soulPalace}` : "",
            report.metaJson.bodyPalace ? `身宫: ${report.metaJson.bodyPalace}` : "",
          ]
            .filter(Boolean)
            .join(" · ")}
        </div>
        <p style="margin-top:16px;font-size:11px;color:#6b6050;">Generated: ${new Date(report.createdAt).toLocaleDateString()}</p>
      `;
      container.appendChild(cover);

      // Render selected sections
      const selectedSections = report.sections.filter((s) =>
        selected.has(s.id)
      );

      for (const section of selectedSections) {
        const sectionEl = document.createElement("div");
        sectionEl.style.cssText =
          "margin-bottom:32px;padding-bottom:24px;border-bottom:1px solid rgba(212,165,40,0.15);page-break-inside:avoid;";

        // Convert markdown-ish content to basic HTML
        const htmlContent = markdownToBasicHTML(section.content);

        sectionEl.innerHTML = `
          <h2 style="font-family:Cinzel Decorative,serif;font-size:18px;color:#D4A528;margin-bottom:12px;">${section.title}</h2>
          <div style="color:#c4b896;line-height:1.9;font-size:12px;">${htmlContent}</div>
        `;
        container.appendChild(sectionEl);
      }

      // Wait for fonts
      await document.fonts.ready;
      // Small delay for rendering
      await new Promise((r) => setTimeout(r, 300));

      // Capture
      const canvas = await html2canvas(container, {
        scale: 2,
        backgroundColor: "#0a0e2a",
        useCORS: true,
        logging: false,
      });

      // Generate PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = 210;
      const pageHeight = 297;
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 0;
      let pageCount = 0;

      while (position < imgHeight) {
        if (pageCount > 0) pdf.addPage();
        pdf.addImage(
          canvas.toDataURL("image/jpeg", 0.95),
          "JPEG",
          0,
          -position,
          imgWidth,
          imgHeight
        );
        position += pageHeight;
        pageCount++;
      }

      pdf.save("zwds-life-path-report.pdf");

      // Cleanup
      document.body.removeChild(container);
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

// Simple markdown → HTML converter for PDF rendering
function markdownToBasicHTML(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 style="font-size:14px;color:#D4A528;margin:16px 0 8px;">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size:16px;color:#D4A528;margin:20px 0 10px;">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#e8d5a3;">$1</strong>')
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, '<div style="padding-left:16px;margin:4px 0;">• $1</div>')
    .replace(/^(\d+)\. (.+)$/gm, '<div style="padding-left:16px;margin:4px 0;">$1. $2</div>')
    .replace(/(\d{1,3})%/g, '<span style="color:#22D3EE;font-family:monospace;">$1%</span>')
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
}
