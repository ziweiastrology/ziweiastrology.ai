import { create } from "zustand";
import type { PalaceDetail } from "@/types";
import { DEFAULT_PALACES } from "@/components/destiny-matrix/palaceData";

interface MatrixState {
  palaces: PalaceDetail[];
  selectedPalaceId: string | null;
  sidebarOpen: boolean;
  selectPalace: (id: string) => void;
  closeSidebar: () => void;
  setPalaces: (palaces: PalaceDetail[]) => void;
}

export const useMatrixStore = create<MatrixState>((set) => ({
  palaces: DEFAULT_PALACES,
  selectedPalaceId: null,
  sidebarOpen: false,

  selectPalace: (id) => set({ selectedPalaceId: id, sidebarOpen: true }),
  closeSidebar: () => set({ sidebarOpen: false }),
  setPalaces: (palaces) => set({ palaces }),
}));
