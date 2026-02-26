import { create } from "zustand";
import type { Star } from "@/data/starData";

interface StarLibraryState {
  activeCategory: Star["category"];
  selectedStar: Star | null;
  randomStar: Star | null;
  isRandomDialogOpen: boolean;

  setCategory: (category: Star["category"]) => void;
  selectStar: (star: Star | null) => void;
  triggerRandomStar: (star: Star) => void;
  closeRandomDialog: () => void;
}

export const useStarLibraryStore = create<StarLibraryState>((set) => ({
  activeCategory: "main",
  selectedStar: null,
  randomStar: null,
  isRandomDialogOpen: false,

  setCategory: (category) => set({ activeCategory: category }),
  selectStar: (star) => set({ selectedStar: star }),
  triggerRandomStar: (star) => set({ randomStar: star, isRandomDialogOpen: true }),
  closeRandomDialog: () => set({ isRandomDialogOpen: false }),
}));
