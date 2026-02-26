// === Timeline Types ===

export interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  verified: boolean;
}

// === Dashboard Types ===

export interface EnergyDataPoint {
  name: string;
  probability: number;
  energy: number;
  resonance: number;
}

export interface PalaceData {
  id: string;
  name: string;
  nameCn: string;
  stars: string[];
  energy: number;
  state: "lu" | "quan" | "ke" | "ji" | "neutral";
}

export interface DashboardData {
  energyFlow: EnergyDataPoint[];
  palaces: PalaceData[];
  overallScore: number;
  activeInsight: string;
}

// === Four States Types ===

export interface FourState {
  id: string;
  chineseName: string;
  westernName: string;
  symbol: string;
  description: string;
  color: string;
  glowColor: string;
}

// === Birth Details Types ===

export interface BirthDetails {
  fullName: string;
  gender: "male" | "female" | "";
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  birthHour: string;
  birthMinute: string;
  birthLocation: string;
}

// === Destiny Matrix Types ===

export interface PalaceDetail {
  id: string;
  name: string;
  nameCn: string;
  icon: string;
  consciousness: string;
  fable: string;
  gridCol: number;
  gridRow: number;
  stars: string[];
  energy: number;
  state: "lu" | "quan" | "ke" | "ji" | "neutral";
}

// === Co-pilot Types ===

export type CopilotStatus = "active" | "monitoring" | "analyzing" | "idle";
