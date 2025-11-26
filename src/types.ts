export type Pillar =
  | "Talent Flywheel"
  | "AI-First"
  | "Tech Excellence – Platform"
  | "Tech Excellence – Decisions"
  | "Tech Excellence – Models";

export type FunctionKey = "BA" | "DS" | "AE" | "Cross";

export type KpiType = "Primary" | "Secondary";

export type Unit = "percent" | "index" | "count" | "days";

export interface Kpi {
  id: string;
  name: string;
  pillar: Pillar;
  type: KpiType;
  function: FunctionKey; // "owner" function
  unit: Unit;
}

export interface KpiValue {
  kpiId: string;
  month: string;        // "2025-12", "2026-01", "2026-02"
  bu: string;           // "Brazil Ops", "Mkt & Growth Mexico", "Lending", "NuCel"
  function: FunctionKey;// BA / DS / AE / Cross
  value: number;        // actual
  target: number;       // 2026 target (can be same for all months)
}

export interface FilterState {
  pillar: string; // "All" or specific pillar
  function: string; // "All" or specific function
  bu: string; // "All" or specific BU
  month: string; // "All" or specific month
}
