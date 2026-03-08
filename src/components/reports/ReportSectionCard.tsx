"use client";

import { Star, Calendar, TrendingUp, MessageCircle } from "lucide-react";

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

export default function ReportSectionCard({ title, content, type, showDeepDiveCTA }: Props) {
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.PALACE_ANALYSIS;
  const Icon = config.icon;

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
        <div className="prose-ancient text-sm text-parchment-300/90 leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      </div>

      {/* Deep Dive CTA */}
      {showDeepDiveCTA && (
        <div className="px-6 pb-4">
          <button
            className="flex items-center gap-2 text-xs text-gold-400 hover:text-gold-300 transition-colors"
            onClick={() => {
              // Open copilot with this palace context
              const event = new CustomEvent("openCopilot", { detail: { topic: title } });
              window.dispatchEvent(event);
            }}
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Deep Dive with Sifu →
          </button>
        </div>
      )}
    </div>
  );
}
