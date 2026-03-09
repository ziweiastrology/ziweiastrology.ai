"use client";

import { Star, Calendar, TrendingUp, MessageCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { useDashboardStore } from "@/stores/useDashboardStore";
import {
  STAR_COLOR_MAP,
  ALL_STAR_NAMES,
  PALACE_NAME_SET,
  ZWDS_TERM_SET,
} from "@/lib/reports/starColorMap";

interface Props {
  title: string;
  content: string;
  type: string;
  showDeepDiveCTA?: boolean;
}

const TYPE_CONFIG: Record<string, { icon: typeof Star; color: string }> = {
  PALACE_ANALYSIS: { icon: Star, color: "text-quantum-cyan" },
  DECADE_ANALYSIS: { icon: Calendar, color: "text-quantum-orange" },
  OVERALL_ASSESSMENT: { icon: TrendingUp, color: "text-quantum-green" },
  TOPIC_DEEP_DIVE: { icon: MessageCircle, color: "text-gold-400" },
};

function askSifu(term: string) {
  const store = useDashboardStore.getState();
  store.setCopilotInitialPrompt(`Tell me more about ${term} in my chart`);
  if (!store.copilotOpen) store.toggleCopilot();
}

// Wrap percentage patterns in cyan pill badges
function renderTextWithBadges(text: string): (string | React.ReactElement)[] {
  const parts = text.split(/(\d{1,3}%)/g);
  return parts.map((part, i) => {
    if (/^\d{1,3}%$/.test(part)) {
      return (
        <span
          key={i}
          className="inline-flex items-center bg-quantum-cyan/15 text-quantum-cyan border border-quantum-cyan/30 rounded-full px-1.5 py-0.5 text-xs font-mono"
        >
          {part}
        </span>
      );
    }
    return part;
  });
}

// Scan text for ZWDS terms and palace names, wrap in clickable spans
function renderTextWithTermLinks(text: string): (string | React.ReactElement)[] {
  // Build regex from all clickable terms (sorted by length desc to match longest first)
  const allTerms = [
    ...Array.from(PALACE_NAME_SET),
    ...Array.from(ZWDS_TERM_SET),
  ].sort((a, b) => b.length - a.length);

  if (allTerms.length === 0) return [text];

  const pattern = new RegExp(`(${allTerms.map(escapeRegex).join("|")})`, "g");
  const parts = text.split(pattern);

  return parts.map((part, i) => {
    if (PALACE_NAME_SET.has(part) || ZWDS_TERM_SET.has(part)) {
      return (
        <button
          key={i}
          onClick={() => askSifu(part)}
          className="text-gold-400 underline decoration-dotted decoration-gold-700/50 hover:text-gold-300 cursor-pointer transition-colors"
        >
          {part}
        </button>
      );
    }
    return part;
  });
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Recursively extract plain text from React children
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractText(node: any): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node?.props?.children) return extractText(node.props.children);
  return "";
}

// Process text node: apply % badges and term links
function processTextNode(text: string): (string | React.ReactElement)[] {
  // First split by percentages
  const withBadges = renderTextWithBadges(text);
  // Then scan each string part for term links
  const result: (string | React.ReactElement)[] = [];
  for (const part of withBadges) {
    if (typeof part === "string") {
      result.push(...renderTextWithTermLinks(part));
    } else {
      result.push(part);
    }
  }
  return result;
}

export default function ReportSectionCard({
  title,
  content,
  type,
  showDeepDiveCTA,
}: Props) {
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.PALACE_ANALYSIS;
  const Icon = config.icon;

  const mdComponents: Components = {
    h2: ({ children }) => (
      <h2
        className="text-lg font-bold gold-gradient-text mt-6 mb-3"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="text-base font-bold gold-gradient-text mt-5 mb-2"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        {children}
      </h3>
    ),
    strong: ({ children }) => {
      // Extract plain text from children (may be string or React nodes)
      const text = extractText(children);
      // Check if this bold text contains a star name
      for (const [starName, color] of STAR_COLOR_MAP) {
        if (text.includes(starName)) {
          return (
            <button
              onClick={() => askSifu(starName)}
              className="font-bold underline decoration-dotted decoration-gold-700/50 hover:opacity-80 cursor-pointer transition-opacity"
              style={{ color }}
            >
              {children}
            </button>
          );
        }
      }
      return <strong>{children}</strong>;
    },
    p: ({ children }) => {
      // Process children to add % badges and term links
      const processed = processChildren(children);
      return <p className="mb-3 leading-relaxed">{processed}</p>;
    },
    li: ({ children }) => {
      const processed = processChildren(children);
      return <li className="leading-relaxed">{processed}</li>;
    },
  };

  return (
    <div className="rounded-xl border border-gold-700/20 bg-celestial-900/40 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gold-700/15 bg-celestial-800/30">
        <Icon className={`h-5 w-5 ${config.color}`} />
        <h3
          className="text-lg font-bold text-parchment-100"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          {title}
        </h3>
      </div>

      {/* Content */}
      <div className="px-6 py-5">
        <div className="prose-ancient text-sm text-parchment-300/90 leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
            {content}
          </ReactMarkdown>
        </div>
      </div>

      {/* Deep Dive CTA */}
      {showDeepDiveCTA && (
        <div className="px-6 pb-4">
          <button
            className="flex items-center gap-2 text-xs text-gold-400 hover:text-gold-300 transition-colors"
            onClick={() => askSifu(title)}
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Deep Dive with Sifu →
          </button>
        </div>
      )}
    </div>
  );
}

// Helper: recursively process React children to add badges/links to text nodes
function processChildren(children: React.ReactNode): React.ReactNode {
  if (typeof children === "string") {
    return processTextNode(children);
  }
  if (Array.isArray(children)) {
    return children.map((child, i) => {
      if (typeof child === "string") {
        return <span key={i}>{processTextNode(child)}</span>;
      }
      return child;
    });
  }
  return children;
}
