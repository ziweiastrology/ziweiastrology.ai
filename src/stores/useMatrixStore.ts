import { create } from "zustand";
import type { PalaceDetail, ChartMeta } from "@/types";
import { DEFAULT_PALACES } from "@/components/destiny-matrix/palaceData";

interface MatrixState {
  palaces: PalaceDetail[];
  chartMeta: ChartMeta | null;
  isComputed: boolean;
  selectedPalaceId: string | null;
  sidebarOpen: boolean;
  selectPalace: (id: string) => void;
  closeSidebar: () => void;
  setPalaces: (palaces: PalaceDetail[]) => void;
  setChartMeta: (meta: ChartMeta) => void;
  setComputed: (val: boolean) => void;
}

export const useMatrixStore = create<MatrixState>((set) => ({
  palaces: DEFAULT_PALACES,
  chartMeta: null,
  isComputed: false,
  selectedPalaceId: null,
  sidebarOpen: false,

  selectPalace: (id) => set({ selectedPalaceId: id, sidebarOpen: true }),
  closeSidebar: () => set({ sidebarOpen: false }),
  setPalaces: (palaces) => set({ palaces }),
  setChartMeta: (meta) => set({ chartMeta: meta }),
  setComputed: (val) => set({ isComputed: val }),
}));
