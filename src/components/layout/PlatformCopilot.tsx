"use client";

import dynamic from "next/dynamic";

const AICopilotWidget = dynamic(
  () => import("@/components/AICopilotWidget"),
  { ssr: false }
);

export function PlatformCopilot() {
  return <AICopilotWidget />;
}
