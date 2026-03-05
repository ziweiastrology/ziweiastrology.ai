import { create } from "zustand";
import type { DashboardData, CopilotStatus } from "@/types";

type AuthModalReason = "palace" | "copilot" | "full_reading" | null;

interface DashboardState {
  isUnlocked: boolean;
  data: DashboardData;
  copilotStatus: CopilotStatus;
  copilotOpen: boolean;
  copilotInitialPrompt: string | null;
  authModalOpen: boolean;
  authModalReason: AuthModalReason;
  snapshotExpired: boolean;
  setUnlocked: (unlocked: boolean) => void;
  setData: (data: DashboardData) => void;
  setCopilotStatus: (status: CopilotStatus) => void;
  toggleCopilot: () => void;
  setCopilotInitialPrompt: (prompt: string | null) => void;
  openAuthModal: (reason: AuthModalReason) => void;
  closeAuthModal: () => void;
  setSnapshotExpired: (expired: boolean) => void;
}

const PLACEHOLDER_DATA: DashboardData = {
  energyFlow: [
    { name: "Wealth Palace", probability: 78, energy: 85, resonance: 62 },
    { name: "Career Palace", probability: 92, energy: 70, resonance: 88 },
    { name: "Health Palace", probability: 65, energy: 55, resonance: 45 },
    { name: "Relations Palace", probability: 45, energy: 80, resonance: 72 },
    { name: "Travel Palace", probability: 88, energy: 60, resonance: 55 },
    { name: "Fortune Palace", probability: 72, energy: 90, resonance: 68 },
    { name: "Siblings Palace", probability: 55, energy: 45, resonance: 82 },
    { name: "Children Palace", probability: 60, energy: 75, resonance: 40 },
  ],
  palaces: [],
  overallScore: 76,
  activeInsight:
    "Career Palace showing peak resonance. Optimal window for decisive action detected in next 72 hours.",
};

export const useDashboardStore = create<DashboardState>((set) => ({
  isUnlocked: false,
  data: PLACEHOLDER_DATA,
  copilotStatus: "active",
  copilotOpen: false,
  copilotInitialPrompt: null,
  authModalOpen: false,
  authModalReason: null,
  snapshotExpired: false,

  setUnlocked: (unlocked) => set({ isUnlocked: unlocked }),
  setData: (data) => set({ data }),
  setCopilotStatus: (status) => set({ copilotStatus: status }),
  toggleCopilot: () => set((state) => ({ copilotOpen: !state.copilotOpen })),
  setCopilotInitialPrompt: (prompt) => set({ copilotInitialPrompt: prompt }),
  openAuthModal: (reason) => set({ authModalOpen: true, authModalReason: reason }),
  closeAuthModal: () => set({ authModalOpen: false, authModalReason: null }),
  setSnapshotExpired: (expired) => set({ snapshotExpired: expired }),
}));
