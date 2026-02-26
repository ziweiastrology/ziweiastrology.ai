import { create } from "zustand";
import type { TimelineEvent } from "@/types";

interface TimelineState {
  events: TimelineEvent[];
  allVerified: boolean;
  setEvents: (events: TimelineEvent[]) => void;
  verifyEvent: (id: string) => void;
  resetVerifications: () => void;
}

const PLACEHOLDER_EVENTS: TimelineEvent[] = [
  {
    id: "1",
    year: 2019,
    title: "Life Restructuring",
    description:
      "Major life transition: relocation, career shift, or relationship change.",
    verified: false,
  },
  {
    id: "2",
    year: 2020,
    title: "Isolation & Reflection",
    description:
      "Period of withdrawal and deep introspection. Inner transformation began.",
    verified: false,
  },
  {
    id: "3",
    year: 2022,
    title: "Career Acceleration",
    description:
      "Sudden professional breakthrough or recognition. New doors opened.",
    verified: false,
  },
  {
    id: "4",
    year: 2024,
    title: "Resource Convergence",
    description:
      "Financial or relational resources consolidated. Stability increased.",
    verified: false,
  },
  {
    id: "5",
    year: 2025,
    title: "Quantum Shift",
    description:
      "Current inflection point. Multiple timelines are converging now.",
    verified: false,
  },
];

export const useTimelineStore = create<TimelineState>((set, get) => ({
  events: PLACEHOLDER_EVENTS,
  allVerified: false,

  setEvents: (events) =>
    set({
      events,
      allVerified: events.every((e) => e.verified),
    }),

  verifyEvent: (id) =>
    set((state) => {
      const events = state.events.map((e) =>
        e.id === id ? { ...e, verified: true } : e
      );
      return {
        events,
        allVerified: events.every((e) => e.verified),
      };
    }),

  resetVerifications: () =>
    set((state) => ({
      events: state.events.map((e) => ({ ...e, verified: false })),
      allVerified: false,
    })),
}));
