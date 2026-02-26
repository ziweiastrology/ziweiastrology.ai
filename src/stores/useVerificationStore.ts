import { create } from "zustand";
import type { BirthDetails } from "@/types";
import type { Deduction } from "@/data/verificationTemplates";
import type { DeductionResponse } from "@/data/verificationTemplates";

interface VerificationState {
  birthDetails: BirthDetails | null;
  deductions: Deduction[];
  responses: Record<string, DeductionResponse>;
  allResponded: boolean;

  setBirthDetails: (details: BirthDetails) => void;
  setDeductions: (deductions: Deduction[]) => void;
  respondToDeduction: (id: string, response: DeductionResponse) => void;
  reset: () => void;
}

export const useVerificationStore = create<VerificationState>((set, get) => ({
  birthDetails: null,
  deductions: [],
  responses: {},
  allResponded: false,

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

  reset: () =>
    set({ birthDetails: null, deductions: [], responses: {}, allResponded: false }),
}));
