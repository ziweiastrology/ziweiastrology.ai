import { create } from "zustand";
import type { BirthDetails } from "@/types";
import type { Deduction } from "@/data/verificationTemplates";
import type { DeductionResponse } from "@/data/verificationTemplates";

type VerificationResult = "verified" | "needs_retry" | "birth_time_suspect";

interface VerificationState {
  birthDetails: BirthDetails | null;
  deductions: Deduction[];
  responses: Record<string, DeductionResponse>;
  allResponded: boolean;
  currentBatch: number;
  astrolabeRef: any | null;
  birthYearNum: number | null;

  setBirthDetails: (details: BirthDetails) => void;
  setDeductions: (deductions: Deduction[]) => void;
  respondToDeduction: (id: string, response: DeductionResponse) => void;
  setAstrolabeRef: (astrolabe: any, birthYear: number) => void;
  requestNextBatch: () => Deduction[];
  getVerificationResult: () => VerificationResult;
  reset: () => void;
}

export const useVerificationStore = create<VerificationState>((set, get) => ({
  birthDetails: null,
  deductions: [],
  responses: {},
  allResponded: false,
  currentBatch: 0,
  astrolabeRef: null,
  birthYearNum: null,

  setBirthDetails: (details) => set({ birthDetails: details }),

  setDeductions: (deductions) =>
    set({ deductions, responses: {}, allResponded: false }),

  respondToDeduction: (id, response) =>
    set((state) => {
      const newResponses = { ...state.responses, [id]: response };
      return {
        responses: newResponses,
        allResponded: Object.keys(newResponses).length >= state.deductions.length,
      };
    }),

  setAstrolabeRef: (astrolabe, birthYear) =>
    set({ astrolabeRef: astrolabe, birthYearNum: birthYear }),

  requestNextBatch: () => {
    const { astrolabeRef, birthYearNum } = get();
    if (!astrolabeRef || !birthYearNum) return [];

    // Lazy import to avoid circular deps — caller should use the pre-imported function
    // This is handled in the component instead
    set({ currentBatch: 1, responses: {}, allResponded: false });
    return [];
  },

  getVerificationResult: () => {
    const { responses, currentBatch } = get();
    const values = Object.values(responses);
    const yesCount = values.filter((v) => v === "yes").length;
    const noOrUnsureCount = values.filter((v) => v === "no" || v === "unsure").length;

    if (yesCount >= 2) return "verified";
    if (noOrUnsureCount >= 2 && currentBatch === 0) return "needs_retry";
    if (noOrUnsureCount >= 2 && currentBatch === 1) return "birth_time_suspect";
    return "verified"; // default: mixed responses with majority yes
  },

  reset: () =>
    set({
      birthDetails: null,
      deductions: [],
      responses: {},
      allResponded: false,
      currentBatch: 0,
      astrolabeRef: null,
      birthYearNum: null,
    }),
}));
