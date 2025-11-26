import type { Kpi, KpiValue } from "./types";

export const BUS = [
  "Brazil Ops",
  "Mkt & Growth Mexico",
  "Lending",
  "NuCel",
] as const;

export const MONTHS = ["2025-12", "2026-01", "2026-02"] as const;

// -----------------------------------------------------------------------------
// KPI DEFINITIONS
// -----------------------------------------------------------------------------

export const kpis: Kpi[] = [
  // Talent Flywheel – Primary
  {
    id: "TF_P1",
    name: "% of early-talent hires (BA/DS)",
    pillar: "Talent Flywheel",
    type: "Primary",
    function: "Cross",
    unit: "percent",
    targetDirection: "above",
  },
  {
    id: "TF_P2",
    name: "Regretted turnover rate (annualized)",
    pillar: "Talent Flywheel",
    type: "Primary",
    function: "Cross",
    unit: "percent",
    targetDirection: "below",
  },
  {
    id: "TF_P3",
    name: "% of new hires rated 'meets+' at 1st checkpoint",
    pillar: "Talent Flywheel",
    type: "Primary",
    function: "Cross",
    unit: "percent",
    targetDirection: "above",
  },

  // Talent Flywheel – Secondary
  {
    id: "TF_S1",
    name: "Trainings viewed per FTE per month",
    pillar: "Talent Flywheel",
    type: "Secondary",
    function: "Cross",
    unit: "count",
    targetDirection: "above",
  },
  {
    id: "TF_S2",
    name: "Health pyramid index (junior / mid / senior balance)",
    pillar: "Talent Flywheel",
    type: "Secondary",
    function: "Cross",
    unit: "index",
    targetDirection: "above",
  },
  {
    id: "TF_S3",
    name: "% of 'analytics managers' trained/mentored",
    pillar: "Talent Flywheel",
    type: "Secondary",
    function: "Cross",
    unit: "percent",
    targetDirection: "above",
  },
  {
    id: "TF_S4",
    name: "# of mentorship pairs (active)",
    pillar: "Talent Flywheel",
    type: "Secondary",
    function: "Cross",
    unit: "count",
    targetDirection: "above",
  },
  {
    id: "TF_S5",
    name: "% of BA IC7+ with clear career path",
    pillar: "Talent Flywheel",
    type: "Secondary",
    function: "BA",
    unit: "percent",
    targetDirection: "above",
  },
  {
    id: "TF_S6",
    name: "Senior MH+ turnover rate (DS)",
    pillar: "Talent Flywheel",
    type: "Secondary",
    function: "DS",
    unit: "percent",
    targetDirection: "below",
  },
  {
    id: "TF_S7",
    name: "Time-to-hire for AEs (days)",
    pillar: "Talent Flywheel",
    type: "Secondary",
    function: "AE",
    unit: "days",
    targetDirection: "below",
  },

  // AI-First – Primary
  {
    id: "AI_P1",
    name: "% of Analytics people using AI weekly",
    pillar: "AI-First",
    type: "Primary",
    function: "Cross",
    unit: "percent",
    targetDirection: "above",
  },
  {
    id: "AI_P2",
    name: "AI use cases shipped to production (per quarter)",
    pillar: "AI-First",
    type: "Primary",
    function: "Cross",
    unit: "count",
    targetDirection: "above",
  },
  {
    id: "AI_P3",
    name: "Productivity uplift vs 2025 baseline (sample tasks)",
    pillar: "AI-First",
    type: "Primary",
    function: "Cross",
    unit: "percent",
    targetDirection: "above",
  },

  // AI-First – Secondary
  {
    id: "AI_S1",
    name: "AI trainings / learning events completed",
    pillar: "AI-First",
    type: "Secondary",
    function: "Cross",
    unit: "count",
    targetDirection: "above",
  },
  {
    id: "AI_S2",
    name: "% of BUs with AI models/agents in production",
    pillar: "AI-First",
    type: "Secondary",
    function: "Cross",
    unit: "percent",
    targetDirection: "above",
  },

  // Tech Excellence – Platform – Primary
  {
    id: "TE_PLAT_P1",
    name: "% of Itaipu data volume migrated to Archipelago",
    pillar: "Tech Excellence – Platform",
    type: "Primary",
    function: "AE",
    unit: "percent",
    targetDirection: "above",
  },

  // Tech Excellence – Platform – Secondary
  {
    id: "TE_PLAT_S1",
    name: "% of critical datasets with contracts + docs + lineage",
    pillar: "Tech Excellence – Platform",
    type: "Secondary",
    function: "AE",
    unit: "percent",
    targetDirection: "above",
  },
  {
    id: "TE_PLAT_S2",
    name: "% of core business metrics with owners + definitions",
    pillar: "Tech Excellence – Platform",
    type: "Secondary",
    function: "AE",
    unit: "percent",
    targetDirection: "above",
  },

  // Tech Excellence – Decisions – Primary
  {
    id: "TE_DEC_P1",
    name: "% of BUs following decision governance",
    pillar: "Tech Excellence – Decisions",
    type: "Primary",
    function: "BA",
    unit: "percent",
    targetDirection: "above",
  },
  {
    id: "TE_DEC_P2",
    name: "Decision documentation coverage",
    pillar: "Tech Excellence – Decisions",
    type: "Primary",
    function: "BA",
    unit: "percent",
    targetDirection: "above",
  },

  // Tech Excellence – Decisions – Secondary
  {
    id: "TE_DEC_S1",
    name: "# of personalized decisions supported by AI models/agents",
    pillar: "Tech Excellence – Decisions",
    type: "Secondary",
    function: "BA",
    unit: "count",
    targetDirection: "above",
  },

  // Tech Excellence – Models – Primary
  {
    id: "TE_MOD_P1",
    name: "% of BUs following model governance",
    pillar: "Tech Excellence – Models",
    type: "Primary",
    function: "DS",
    unit: "percent",
    targetDirection: "above",
  },

  // Tech Excellence – Models – Secondary
  {
    id: "TE_MOD_S1",
    name: "% of key models with eval + monitoring + tech-debt backlog",
    pillar: "Tech Excellence – Models",
    type: "Secondary",
    function: "DS",
    unit: "percent",
    targetDirection: "above",
  },
];

// -----------------------------------------------------------------------------
// KPI VALUES (FAKE DATA) – 4 BUs × 3 months × all KPIs
// -----------------------------------------------------------------------------

export const kpiValues: KpiValue[] = [
  // ---------------------------------------------------------------------------
  // TALENT FLYWHEEL – PRIMARY
  // ---------------------------------------------------------------------------
  // TF_P1 – % of early-talent hires (BA/DS) – target ~40% (NuCel 35)
  { kpiId: "TF_P1", month: "2025-12", bu: "Brazil Ops",          function: "Cross", value: 32,  target: 40 },
  { kpiId: "TF_P1", month: "2026-01", bu: "Brazil Ops",          function: "Cross", value: 35,  target: 40 },
  { kpiId: "TF_P1", month: "2026-02", bu: "Brazil Ops",          function: "Cross", value: 38,  target: 40 },

  { kpiId: "TF_P1", month: "2025-12", bu: "Mkt & Growth Mexico", function: "Cross", value: 25,  target: 40 },
  { kpiId: "TF_P1", month: "2026-01", bu: "Mkt & Growth Mexico", function: "Cross", value: 30,  target: 40 },
  { kpiId: "TF_P1", month: "2026-02", bu: "Mkt & Growth Mexico", function: "Cross", value: 34,  target: 40 },

  { kpiId: "TF_P1", month: "2025-12", bu: "Lending",             function: "Cross", value: 36,  target: 40 },
  { kpiId: "TF_P1", month: "2026-01", bu: "Lending",             function: "Cross", value: 38,  target: 40 },
  { kpiId: "TF_P1", month: "2026-02", bu: "Lending",             function: "Cross", value: 40,  target: 40 },

  { kpiId: "TF_P1", month: "2025-12", bu: "NuCel",               function: "Cross", value: 20,  target: 35 },
  { kpiId: "TF_P1", month: "2026-01", bu: "NuCel",               function: "Cross", value: 26,  target: 35 },
  { kpiId: "TF_P1", month: "2026-02", bu: "NuCel",               function: "Cross", value: 32,  target: 35 },

  // TF_P2 – Regretted turnover rate (lower is better, target ~6–8%)
  { kpiId: "TF_P2", month: "2025-12", bu: "Brazil Ops",          function: "Cross", value: 10,   target: 6 },
  { kpiId: "TF_P2", month: "2026-01", bu: "Brazil Ops",          function: "Cross", value: 8.5,  target: 6 },
  { kpiId: "TF_P2", month: "2026-02", bu: "Brazil Ops",          function: "Cross", value: 7.5,  target: 6 },

  { kpiId: "TF_P2", month: "2025-12", bu: "Mkt & Growth Mexico", function: "Cross", value: 12,   target: 7 },
  { kpiId: "TF_P2", month: "2026-01", bu: "Mkt & Growth Mexico", function: "Cross", value: 10,   target: 7 },
  { kpiId: "TF_P2", month: "2026-02", bu: "Mkt & Growth Mexico", function: "Cross", value: 9,    target: 7 },

  { kpiId: "TF_P2", month: "2025-12", bu: "Lending",             function: "Cross", value: 9,    target: 6 },
  { kpiId: "TF_P2", month: "2026-01", bu: "Lending",             function: "Cross", value: 8,    target: 6 },
  { kpiId: "TF_P2", month: "2026-02", bu: "Lending",             function: "Cross", value: 7,    target: 6 },

  { kpiId: "TF_P2", month: "2025-12", bu: "NuCel",               function: "Cross", value: 15,   target: 8 },
  { kpiId: "TF_P2", month: "2026-01", bu: "NuCel",               function: "Cross", value: 13,   target: 8 },
  { kpiId: "TF_P2", month: "2026-02", bu: "NuCel",               function: "Cross", value: 11,   target: 8 },

  // TF_P3 – % new hires "meets+" (target ~85–90%)
  { kpiId: "TF_P3", month: "2025-12", bu: "Brazil Ops",          function: "Cross", value: 80,   target: 88 },
  { kpiId: "TF_P3", month: "2026-01", bu: "Brazil Ops",          function: "Cross", value: 83,   target: 88 },
  { kpiId: "TF_P3", month: "2026-02", bu: "Brazil Ops",          function: "Cross", value: 86,   target: 88 },

  { kpiId: "TF_P3", month: "2025-12", bu: "Mkt & Growth Mexico", function: "Cross", value: 75,   target: 85 },
  { kpiId: "TF_P3", month: "2026-01", bu: "Mkt & Growth Mexico", function: "Cross", value: 78,   target: 85 },
  { kpiId: "TF_P3", month: "2026-02", bu: "Mkt & Growth Mexico", function: "Cross", value: 82,   target: 85 },

  { kpiId: "TF_P3", month: "2025-12", bu: "Lending",             function: "Cross", value: 82,   target: 90 },
  { kpiId: "TF_P3", month: "2026-01", bu: "Lending",             function: "Cross", value: 85,   target: 90 },
  { kpiId: "TF_P3", month: "2026-02", bu: "Lending",             function: "Cross", value: 88,   target: 90 },

  { kpiId: "TF_P3", month: "2025-12", bu: "NuCel",               function: "Cross", value: 70,   target: 85 },
  { kpiId: "TF_P3", month: "2026-01", bu: "NuCel",               function: "Cross", value: 75,   target: 85 },
  { kpiId: "TF_P3", month: "2026-02", bu: "NuCel",               function: "Cross", value: 80,   target: 85 },

  // ---------------------------------------------------------------------------
  // TALENT FLYWHEEL – SECONDARY
  // ---------------------------------------------------------------------------
  // TF_S1 – Trainings viewed per FTE per month (target ~3–4)
  { kpiId: "TF_S1", month: "2025-12", bu: "Brazil Ops",          function: "Cross", value: 2.1, target: 3.5 },
  { kpiId: "TF_S1", month: "2026-01", bu: "Brazil Ops",          function: "Cross", value: 2.6, target: 3.5 },
  { kpiId: "TF_S1", month: "2026-02", bu: "Brazil Ops",          function: "Cross", value: 3.0, target: 3.5 },

  { kpiId: "TF_S1", month: "2025-12", bu: "Mkt & Growth Mexico", function: "Cross", value: 1.5, target: 3.0 },
  { kpiId: "TF_S1", month: "2026-01", bu: "Mkt & Growth Mexico", function: "Cross", value: 2.0, target: 3.0 },
  { kpiId: "TF_S1", month: "2026-02", bu: "Mkt & Growth Mexico", function: "Cross", value: 2.4, target: 3.0 },

  { kpiId: "TF_S1", month: "2025-12", bu: "Lending",             function: "Cross", value: 2.4, target: 4.0 },
  { kpiId: "TF_S1", month: "2026-01", bu: "Lending",             function: "Cross", value: 2.9, target: 4.0 },
  { kpiId: "TF_S1", month: "2026-02", bu: "Lending",             function: "Cross", value: 3.3, target: 4.0 },

  { kpiId: "TF_S1", month: "2025-12", bu: "NuCel",               function: "Cross", value: 1.2, target: 2.5 },
  { kpiId: "TF_S1", month: "2026-01", bu: "NuCel",               function: "Cross", value: 1.7, target: 2.5 },
  { kpiId: "TF_S1", month: "2026-02", bu: "NuCel",               function: "Cross", value: 2.1, target: 2.5 },

  // TF_S2 – Health pyramid index (0–100, higher = healthier mix)
  { kpiId: "TF_S2", month: "2025-12", bu: "Brazil Ops",          function: "Cross", value: 68,  target: 80 },
  { kpiId: "TF_S2", month: "2026-01", bu: "Brazil Ops",          function: "Cross", value: 72,  target: 80 },
  { kpiId: "TF_S2", month: "2026-02", bu: "Brazil Ops",          function: "Cross", value: 75,  target: 80 },

  { kpiId: "TF_S2", month: "2025-12", bu: "Mkt & Growth Mexico", function: "Cross", value: 60,  target: 78 },
  { kpiId: "TF_S2", month: "2026-01", bu: "Mkt & Growth Mexico", function: "Cross", value: 64,  target: 78 },
  { kpiId: "TF_S2", month: "2026-02", bu: "Mkt & Growth Mexico", function: "Cross", value: 69,  target: 78 },

  { kpiId: "TF_S2", month: "2025-12", bu: "Lending",             function: "Cross", value: 70,  target: 82 },
  { kpiId: "TF_S2", month: "2026-01", bu: "Lending",             function: "Cross", value: 73,  target: 82 },
  { kpiId: "TF_S2", month: "2026-02", bu: "Lending",             function: "Cross", value: 77,  target: 82 },

  { kpiId: "TF_S2", month: "2025-12", bu: "NuCel",               function: "Cross", value: 55,  target: 75 },
  { kpiId: "TF_S2", month: "2026-01", bu: "NuCel",               function: "Cross", value: 60,  target: 75 },
  { kpiId: "TF_S2", month: "2026-02", bu: "NuCel",               function: "Cross", value: 65,  target: 75 },

  // TF_S3 – % of analytics managers trained/mentored
  { kpiId: "TF_S3", month: "2025-12", bu: "Brazil Ops",          function: "Cross", value: 45,  target: 80 },
  { kpiId: "TF_S3", month: "2026-01", bu: "Brazil Ops",          function: "Cross", value: 55,  target: 80 },
  { kpiId: "TF_S3", month: "2026-02", bu: "Brazil Ops",          function: "Cross", value: 62,  target: 80 },

  { kpiId: "TF_S3", month: "2025-12", bu: "Mkt & Growth Mexico", function: "Cross", value: 35,  target: 75 },
  { kpiId: "TF_S3", month: "2026-01", bu: "Mkt & Growth Mexico", function: "Cross", value: 44,  target: 75 },
  { kpiId: "TF_S3", month: "2026-02", bu: "Mkt & Growth Mexico", function: "Cross", value: 52,  target: 75 },

  { kpiId: "TF_S3", month: "2025-12", bu: "Lending",             function: "Cross", value: 50,  target: 85 },
  { kpiId: "TF_S3", month: "2026-01", bu: "Lending",             function: "Cross", value: 58,  target: 85 },
  { kpiId: "TF_S3", month: "2026-02", bu: "Lending",             function: "Cross", value: 66,  target: 85 },

  { kpiId: "TF_S3", month: "2025-12", bu: "NuCel",               function: "Cross", value: 30,  target: 70 },
  { kpiId: "TF_S3", month: "2026-01", bu: "NuCel",               function: "Cross", value: 38,  target: 70 },
  { kpiId: "TF_S3", month: "2026-02", bu: "NuCel",               function: "Cross", value: 45,  target: 70 },

  // TF_S4 – # of mentorship pairs
  { kpiId: "TF_S4", month: "2025-12", bu: "Brazil Ops",          function: "Cross", value: 25,  target: 60 },
  { kpiId: "TF_S4", month: "2026-01", bu: "Brazil Ops",          function: "Cross", value: 32,  target: 60 },
  { kpiId: "TF_S4", month: "2026-02", bu: "Brazil Ops",          function: "Cross", value: 40,  target: 60 },

  { kpiId: "TF_S4", month: "2025-12", bu: "Mkt & Growth Mexico", function: "Cross", value: 10,  target: 40 },
  { kpiId: "TF_S4", month: "2026-01", bu: "Mkt & Growth Mexico", function: "Cross", value: 15,  target: 40 },
  { kpiId: "TF_S4", month: "2026-02", bu: "Mkt & Growth Mexico", function: "Cross", value: 22,  target: 40 },

  { kpiId: "TF_S4", month: "2025-12", bu: "Lending",             function: "Cross", value: 28,  target: 55 },
  { kpiId: "TF_S4", month: "2026-01", bu: "Lending",             function: "Cross", value: 35,  target: 55 },
  { kpiId: "TF_S4", month: "2026-02", bu: "Lending",             function: "Cross", value: 43,  target: 55 },

  { kpiId: "TF_S4", month: "2025-12", bu: "NuCel",               function: "Cross", value: 8,   target: 30 },
  { kpiId: "TF_S4", month: "2026-01", bu: "NuCel",               function: "Cross", value: 12,  target: 30 },
  { kpiId: "TF_S4", month: "2026-02", bu: "NuCel",               function: "Cross", value: 18,  target: 30 },

  // TF_S5 – % BA IC7+ with clear career path
  { kpiId: "TF_S5", month: "2025-12", bu: "Brazil Ops",          function: "BA",    value: 40,  target: 90 },
  { kpiId: "TF_S5", month: "2026-01", bu: "Brazil Ops",          function: "BA",    value: 55,  target: 90 },
  { kpiId: "TF_S5", month: "2026-02", bu: "Brazil Ops",          function: "BA",    value: 65,  target: 90 },

  { kpiId: "TF_S5", month: "2025-12", bu: "Mkt & Growth Mexico", function: "BA",    value: 30,  target: 85 },
  { kpiId: "TF_S5", month: "2026-01", bu: "Mkt & Growth Mexico", function: "BA",    value: 45,  target: 85 },
  { kpiId: "TF_S5", month: "2026-02", bu: "Mkt & Growth Mexico", function: "BA",    value: 55,  target: 85 },

  { kpiId: "TF_S5", month: "2025-12", bu: "Lending",             function: "BA",    value: 50,  target: 92 },
  { kpiId: "TF_S5", month: "2026-01", bu: "Lending",             function: "BA",    value: 60,  target: 92 },
  { kpiId: "TF_S5", month: "2026-02", bu: "Lending",             function: "BA",    value: 70,  target: 92 },

  { kpiId: "TF_S5", month: "2025-12", bu: "NuCel",               function: "BA",    value: 20,  target: 80 },
  { kpiId: "TF_S5", month: "2026-01", bu: "NuCel",               function: "BA",    value: 32,  target: 80 },
  { kpiId: "TF_S5", month: "2026-02", bu: "NuCel",               function: "BA",    value: 45,  target: 80 },

  // TF_S6 – Senior MH+ turnover (DS)
  { kpiId: "TF_S6", month: "2025-12", bu: "Brazil Ops",          function: "DS",    value: 14,  target: 8 },
  { kpiId: "TF_S6", month: "2026-01", bu: "Brazil Ops",          function: "DS",    value: 12,  target: 8 },
  { kpiId: "TF_S6", month: "2026-02", bu: "Brazil Ops",          function: "DS",    value: 10,  target: 8 },

  { kpiId: "TF_S6", month: "2025-12", bu: "Mkt & Growth Mexico", function: "DS",    value: 16,  target: 9 },
  { kpiId: "TF_S6", month: "2026-01", bu: "Mkt & Growth Mexico", function: "DS",    value: 14,  target: 9 },
  { kpiId: "TF_S6", month: "2026-02", bu: "Mkt & Growth Mexico", function: "DS",    value: 12,  target: 9 },

  { kpiId: "TF_S6", month: "2025-12", bu: "Lending",             function: "DS",    value: 12,  target: 8 },
  { kpiId: "TF_S6", month: "2026-01", bu: "Lending",             function: "DS",    value: 10,  target: 8 },
  { kpiId: "TF_S6", month: "2026-02", bu: "Lending",             function: "DS",    value: 9,   target: 8 },

  { kpiId: "TF_S6", month: "2025-12", bu: "NuCel",               function: "DS",    value: 18,  target: 10 },
  { kpiId: "TF_S6", month: "2026-01", bu: "NuCel",               function: "DS",    value: 16,  target: 10 },
  { kpiId: "TF_S6", month: "2026-02", bu: "NuCel",               function: "DS",    value: 14,  target: 10 },

  // TF_S7 – Time-to-hire for AEs (days)
  { kpiId: "TF_S7", month: "2025-12", bu: "Brazil Ops",          function: "AE",    value: 75,  target: 50 },
  { kpiId: "TF_S7", month: "2026-01", bu: "Brazil Ops",          function: "AE",    value: 68,  target: 50 },
  { kpiId: "TF_S7", month: "2026-02", bu: "Brazil Ops",          function: "AE",    value: 60,  target: 50 },

  { kpiId: "TF_S7", month: "2025-12", bu: "Mkt & Growth Mexico", function: "AE",    value: 85,  target: 55 },
  { kpiId: "TF_S7", month: "2026-01", bu: "Mkt & Growth Mexico", function: "AE",    value: 80,  target: 55 },
  { kpiId: "TF_S7", month: "2026-02", bu: "Mkt & Growth Mexico", function: "AE",    value: 72,  target: 55 },

  { kpiId: "TF_S7", month: "2025-12", bu: "Lending",             function: "AE",    value: 70,  target: 45 },
  { kpiId: "TF_S7", month: "2026-01", bu: "Lending",             function: "AE",    value: 64,  target: 45 },
  { kpiId: "TF_S7", month: "2026-02", bu: "Lending",             function: "AE",    value: 58,  target: 45 },

  { kpiId: "TF_S7", month: "2025-12", bu: "NuCel",               function: "AE",    value: 95,  target: 60 },
  { kpiId: "TF_S7", month: "2026-01", bu: "NuCel",               function: "AE",    value: 90,  target: 60 },
  { kpiId: "TF_S7", month: "2026-02", bu: "NuCel",               function: "AE",    value: 82,  target: 60 },

  // ---------------------------------------------------------------------------
  // AI-FIRST – PRIMARY
  // ---------------------------------------------------------------------------
  // AI_P1 – % using AI weekly (já tínhamos)
  { kpiId: "AI_P1", month: "2025-12", bu: "Brazil Ops",          function: "Cross", value: 72,  target: 90 },
  { kpiId: "AI_P1", month: "2026-01", bu: "Brazil Ops",          function: "Cross", value: 78,  target: 90 },
  { kpiId: "AI_P1", month: "2026-02", bu: "Brazil Ops",          function: "Cross", value: 82,  target: 90 },

  { kpiId: "AI_P1", month: "2025-12", bu: "Mkt & Growth Mexico", function: "Cross", value: 60,  target: 85 },
  { kpiId: "AI_P1", month: "2026-01", bu: "Mkt & Growth Mexico", function: "Cross", value: 68,  target: 85 },
  { kpiId: "AI_P1", month: "2026-02", bu: "Mkt & Growth Mexico", function: "Cross", value: 75,  target: 85 },

  { kpiId: "AI_P1", month: "2025-12", bu: "Lending",             function: "Cross", value: 80,  target: 92 },
  { kpiId: "AI_P1", month: "2026-01", bu: "Lending",             function: "Cross", value: 84,  target: 92 },
  { kpiId: "AI_P1", month: "2026-02", bu: "Lending",             function: "Cross", value: 88,  target: 92 },

  { kpiId: "AI_P1", month: "2025-12", bu: "NuCel",               function: "Cross", value: 55,  target: 80 },
  { kpiId: "AI_P1", month: "2026-01", bu: "NuCel",               function: "Cross", value: 62,  target: 80 },
  { kpiId: "AI_P1", month: "2026-02", bu: "NuCel",               function: "Cross", value: 70,  target: 80 },

  // AI_P2 – # AI use cases shipped (quarter running)
  { kpiId: "AI_P2", month: "2025-12", bu: "Brazil Ops",          function: "Cross", value: 3,   target: 12 },
  { kpiId: "AI_P2", month: "2026-01", bu: "Brazil Ops",          function: "Cross", value: 5,   target: 12 },
  { kpiId: "AI_P2", month: "2026-02", bu: "Brazil Ops",          function: "Cross", value: 7,   target: 12 },

  { kpiId: "AI_P2", month: "2025-12", bu: "Mkt & Growth Mexico", function: "Cross", value: 1,   target: 8 },
  { kpiId: "AI_P2", month: "2026-01", bu: "Mkt & Growth Mexico", function: "Cross", value: 2,   target: 8 },
  { kpiId: "AI_P2", month: "2026-02", bu: "Mkt & Growth Mexico", function: "Cross", value: 4,   target: 8 },

  { kpiId: "AI_P2", month: "2025-12", bu: "Lending",             function: "Cross", value: 4,   target: 15 },
  { kpiId: "AI_P2", month: "2026-01", bu: "Lending",             function: "Cross", value: 7,   target: 15 },
  { kpiId: "AI_P2", month: "2026-02", bu: "Lending",             function: "Cross", value: 10,  target: 15 },

  { kpiId: "AI_P2", month: "2025-12", bu: "NuCel",               function: "Cross", value: 0,   target: 6 },
  { kpiId: "AI_P2", month: "2026-01", bu: "NuCel",               function: "Cross", value: 1,   target: 6 },
  { kpiId: "AI_P2", month: "2026-02", bu: "NuCel",               function: "Cross", value: 2,   target: 6 },

  // AI_P3 – Productivity uplift vs 2025 baseline (%)
  { kpiId: "AI_P3", month: "2025-12", bu: "Brazil Ops",          function: "Cross", value: 5,   target: 20 },
  { kpiId: "AI_P3", month: "2026-01", bu: "Brazil Ops",          function: "Cross", value: 8,   target: 20 },
  { kpiId: "AI_P3", month: "2026-02", bu: "Brazil Ops",          function: "Cross", value: 11,  target: 20 },

  { kpiId: "AI_P3", month: "2025-12", bu: "Mkt & Growth Mexico", function: "Cross", value: 3,   target: 18 },
  { kpiId: "AI_P3", month: "2026-01", bu: "Mkt & Growth Mexico", function: "Cross", value: 5,   target: 18 },
  { kpiId: "AI_P3", month: "2026-02", bu: "Mkt & Growth Mexico", function: "Cross", value: 8,   target: 18 },

  { kpiId: "AI_P3", month: "2025-12", bu: "Lending",             function: "Cross", value: 6,   target: 22 },
  { kpiId: "AI_P3", month: "2026-01", bu: "Lending",             function: "Cross", value: 9,   target: 22 },
  { kpiId: "AI_P3", month: "2026-02", bu: "Lending",             function: "Cross", value: 13,  target: 22 },

  { kpiId: "AI_P3", month: "2025-12", bu: "NuCel",               function: "Cross", value: 2,   target: 15 },
  { kpiId: "AI_P3", month: "2026-01", bu: "NuCel",               function: "Cross", value: 4,   target: 15 },
  { kpiId: "AI_P3", month: "2026-02", bu: "NuCel",               function: "Cross", value: 7,   target: 15 },

  // ---------------------------------------------------------------------------
  // AI-FIRST – SECONDARY
  // ---------------------------------------------------------------------------
  // AI_S1 – AI trainings / learning events completed
  { kpiId: "AI_S1", month: "2025-12", bu: "Brazil Ops",          function: "Cross", value: 40,  target: 120 },
  { kpiId: "AI_S1", month: "2026-01", bu: "Brazil Ops",          function: "Cross", value: 55,  target: 120 },
  { kpiId: "AI_S1", month: "2026-02", bu: "Brazil Ops",          function: "Cross", value: 70,  target: 120 },

  { kpiId: "AI_S1", month: "2025-12", bu: "Mkt & Growth Mexico", function: "Cross", value: 18,  target: 80 },
  { kpiId: "AI_S1", month: "2026-01", bu: "Mkt & Growth Mexico", function: "Cross", value: 28,  target: 80 },
  { kpiId: "AI_S1", month: "2026-02", bu: "Mkt & Growth Mexico", function: "Cross", value: 40,  target: 80 },

  { kpiId: "AI_S1", month: "2025-12", bu: "Lending",             function: "Cross", value: 45,  target: 130 },
  { kpiId: "AI_S1", month: "2026-01", bu: "Lending",             function: "Cross", value: 60,  target: 130 },
  { kpiId: "AI_S1", month: "2026-02", bu: "Lending",             function: "Cross", value: 80,  target: 130 },

  { kpiId: "AI_S1", month: "2025-12", bu: "NuCel",               function: "Cross", value: 12,  target: 60 },
  { kpiId: "AI_S1", month: "2026-01", bu: "NuCel",               function: "Cross", value: 20,  target: 60 },
  { kpiId: "AI_S1", month: "2026-02", bu: "NuCel",               function: "Cross", value: 30,  target: 60 },

  // AI_S2 – % of BUs with AI models/agents (vamos fingir "scope interno" por BU)
  { kpiId: "AI_S2", month: "2025-12", bu: "Brazil Ops",          function: "Cross", value: 40,  target: 90 },
  { kpiId: "AI_S2", month: "2026-01", bu: "Brazil Ops",          function: "Cross", value: 55,  target: 90 },
  { kpiId: "AI_S2", month: "2026-02", bu: "Brazil Ops",          function: "Cross", value: 65,  target: 90 },

  { kpiId: "AI_S2", month: "2025-12", bu: "Mkt & Growth Mexico", function: "Cross", value: 30,  target: 80 },
  { kpiId: "AI_S2", month: "2026-01", bu: "Mkt & Growth Mexico", function: "Cross", value: 40,  target: 80 },
  { kpiId: "AI_S2", month: "2026-02", bu: "Mkt & Growth Mexico", function: "Cross", value: 50,  target: 80 },

  { kpiId: "AI_S2", month: "2025-12", bu: "Lending",             function: "Cross", value: 50,  target: 95 },
  { kpiId: "AI_S2", month: "2026-01", bu: "Lending",             function: "Cross", value: 60,  target: 95 },
  { kpiId: "AI_S2", month: "2026-02", bu: "Lending",             function: "Cross", value: 70,  target: 95 },

  { kpiId: "AI_S2", month: "2025-12", bu: "NuCel",               function: "Cross", value: 20,  target: 75 },
  { kpiId: "AI_S2", month: "2026-01", bu: "NuCel",               function: "Cross", value: 30,  target: 75 },
  { kpiId: "AI_S2", month: "2026-02", bu: "NuCel",               function: "Cross", value: 40,  target: 75 },

  // ---------------------------------------------------------------------------
  // TECH EXCELLENCE – PLATFORM – PRIMARY & SECONDARY
  // ---------------------------------------------------------------------------
  // TE_PLAT_P1 – % Itaipu → Archipelago (já tínhamos)
  { kpiId: "TE_PLAT_P1", month: "2025-12", bu: "Brazil Ops",          function: "AE", value: 30, target: 70 },
  { kpiId: "TE_PLAT_P1", month: "2026-01", bu: "Brazil Ops",          function: "AE", value: 38, target: 70 },
  { kpiId: "TE_PLAT_P1", month: "2026-02", bu: "Brazil Ops",          function: "AE", value: 45, target: 70 },

  { kpiId: "TE_PLAT_P1", month: "2025-12", bu: "Mkt & Growth Mexico", function: "AE", value: 20, target: 65 },
  { kpiId: "TE_PLAT_P1", month: "2026-01", bu: "Mkt & Growth Mexico", function: "AE", value: 28, target: 65 },
  { kpiId: "TE_PLAT_P1", month: "2026-02", bu: "Mkt & Growth Mexico", function: "AE", value: 35, target: 65 },

  { kpiId: "TE_PLAT_P1", month: "2025-12", bu: "Lending",             function: "AE", value: 35, target: 75 },
  { kpiId: "TE_PLAT_P1", month: "2026-01", bu: "Lending",             function: "AE", value: 42, target: 75 },
  { kpiId: "TE_PLAT_P1", month: "2026-02", bu: "Lending",             function: "AE", value: 50, target: 75 },

  { kpiId: "TE_PLAT_P1", month: "2025-12", bu: "NuCel",               function: "AE", value: 10, target: 60 },
  { kpiId: "TE_PLAT_P1", month: "2026-01", bu: "NuCel",               function: "AE", value: 20, target: 60 },
  { kpiId: "TE_PLAT_P1", month: "2026-02", bu: "NuCel",               function: "AE", value: 28, target: 60 },

  // TE_PLAT_S1 – % critical datasets with contracts/docs/lineage
  { kpiId: "TE_PLAT_S1", month: "2025-12", bu: "Brazil Ops",          function: "AE", value: 40, target: 85 },
  { kpiId: "TE_PLAT_S1", month: "2026-01", bu: "Brazil Ops",          function: "AE", value: 50, target: 85 },
  { kpiId: "TE_PLAT_S1", month: "2026-02", bu: "Brazil Ops",          function: "AE", value: 58, target: 85 },

  { kpiId: "TE_PLAT_S1", month: "2025-12", bu: "Mkt & Growth Mexico", function: "AE", value: 30, target: 80 },
  { kpiId: "TE_PLAT_S1", month: "2026-01", bu: "Mkt & Growth Mexico", function: "AE", value: 40, target: 80 },
  { kpiId: "TE_PLAT_S1", month: "2026-02", bu: "Mkt & Growth Mexico", function: "AE", value: 48, target: 80 },

  { kpiId: "TE_PLAT_S1", month: "2025-12", bu: "Lending",             function: "AE", value: 45, target: 88 },
  { kpiId: "TE_PLAT_S1", month: "2026-01", bu: "Lending",             function: "AE", value: 55, target: 88 },
  { kpiId: "TE_PLAT_S1", month: "2026-02", bu: "Lending",             function: "AE", value: 64, target: 88 },

  { kpiId: "TE_PLAT_S1", month: "2025-12", bu: "NuCel",               function: "AE", value: 20, target: 75 },
  { kpiId: "TE_PLAT_S1", month: "2026-01", bu: "NuCel",               function: "AE", value: 30, target: 75 },
  { kpiId: "TE_PLAT_S1", month: "2026-02", bu: "NuCel",               function: "AE", value: 40, target: 75 },

  // TE_PLAT_S2 – % core metrics with owner + definition
  { kpiId: "TE_PLAT_S2", month: "2025-12", bu: "Brazil Ops",          function: "AE", value: 50, target: 90 },
  { kpiId: "TE_PLAT_S2", month: "2026-01", bu: "Brazil Ops",          function: "AE", value: 60, target: 90 },
  { kpiId: "TE_PLAT_S2", month: "2026-02", bu: "Brazil Ops",          function: "AE", value: 68, target: 90 },

  { kpiId: "TE_PLAT_S2", month: "2025-12", bu: "Mkt & Growth Mexico", function: "AE", value: 40, target: 85 },
  { kpiId: "TE_PLAT_S2", month: "2026-01", bu: "Mkt & Growth Mexico", function: "AE", value: 50, target: 85 },
  { kpiId: "TE_PLAT_S2", month: "2026-02", bu: "Mkt & Growth Mexico", function: "AE", value: 58, target: 85 },

  { kpiId: "TE_PLAT_S2", month: "2025-12", bu: "Lending",             function: "AE", value: 55, target: 92 },
  { kpiId: "TE_PLAT_S2", month: "2026-01", bu: "Lending",             function: "AE", value: 64, target: 92 },
  { kpiId: "TE_PLAT_S2", month: "2026-02", bu: "Lending",             function: "AE", value: 72, target: 92 },

  { kpiId: "TE_PLAT_S2", month: "2025-12", bu: "NuCel",               function: "AE", value: 30, target: 80 },
  { kpiId: "TE_PLAT_S2", month: "2026-01", bu: "NuCel",               function: "AE", value: 40, target: 80 },
  { kpiId: "TE_PLAT_S2", month: "2026-02", bu: "NuCel",               function: "AE", value: 48, target: 80 },

  // ---------------------------------------------------------------------------
  // TECH EXCELLENCE – DECISIONS – PRIMARY & SECONDARY
  // ---------------------------------------------------------------------------
  // TE_DEC_P1 – % BUs following decision governance (já tínhamos)
  { kpiId: "TE_DEC_P1", month: "2025-12", bu: "Brazil Ops",          function: "BA", value: 40, target: 85 },
  { kpiId: "TE_DEC_P1", month: "2026-01", bu: "Brazil Ops",          function: "BA", value: 55, target: 85 },
  { kpiId: "TE_DEC_P1", month: "2026-02", bu: "Brazil Ops",          function: "BA", value: 65, target: 85 },

  { kpiId: "TE_DEC_P1", month: "2025-12", bu: "Mkt & Growth Mexico", function: "BA", value: 30, target: 80 },
  { kpiId: "TE_DEC_P1", month: "2026-01", bu: "Mkt & Growth Mexico", function: "BA", value: 45, target: 80 },
  { kpiId: "TE_DEC_P1", month: "2026-02", bu: "Mkt & Growth Mexico", function: "BA", value: 55, target: 80 },

  { kpiId: "TE_DEC_P1", month: "2025-12", bu: "Lending",             function: "BA", value: 50, target: 90 },
  { kpiId: "TE_DEC_P1", month: "2026-01", bu: "Lending",             function: "BA", value: 65, target: 90 },
  { kpiId: "TE_DEC_P1", month: "2026-02", bu: "Lending",             function: "BA", value: 75, target: 90 },

  { kpiId: "TE_DEC_P1", month: "2025-12", bu: "NuCel",               function: "BA", value: 20, target: 80 },
  { kpiId: "TE_DEC_P1", month: "2026-01", bu: "NuCel",               function: "BA", value: 35, target: 80 },
  { kpiId: "TE_DEC_P1", month: "2026-02", bu: "NuCel",               function: "BA", value: 50, target: 80 },

  // TE_DEC_P2 – Decision documentation coverage
  { kpiId: "TE_DEC_P2", month: "2025-12", bu: "Brazil Ops",          function: "BA", value: 35, target: 80 },
  { kpiId: "TE_DEC_P2", month: "2026-01", bu: "Brazil Ops",          function: "BA", value: 45, target: 80 },
  { kpiId: "TE_DEC_P2", month: "2026-02", bu: "Brazil Ops",          function: "BA", value: 55, target: 80 },

  { kpiId: "TE_DEC_P2", month: "2025-12", bu: "Mkt & Growth Mexico", function: "BA", value: 25, target: 75 },
  { kpiId: "TE_DEC_P2", month: "2026-01", bu: "Mkt & Growth Mexico", function: "BA", value: 35, target: 75 },
  { kpiId: "TE_DEC_P2", month: "2026-02", bu: "Mkt & Growth Mexico", function: "BA", value: 45, target: 75 },

  { kpiId: "TE_DEC_P2", month: "2025-12", bu: "Lending",             function: "BA", value: 40, target: 85 },
  { kpiId: "TE_DEC_P2", month: "2026-01", bu: "Lending",             function: "BA", value: 50, target: 85 },
  { kpiId: "TE_DEC_P2", month: "2026-02", bu: "Lending",             function: "BA", value: 60, target: 85 },

  { kpiId: "TE_DEC_P2", month: "2025-12", bu: "NuCel",               function: "BA", value: 18, target: 70 },
  { kpiId: "TE_DEC_P2", month: "2026-01", bu: "NuCel",               function: "BA", value: 28, target: 70 },
  { kpiId: "TE_DEC_P2", month: "2026-02", bu: "NuCel",               function: "BA", value: 38, target: 70 },

  // TE_DEC_S1 – # of personalized decisions supported by AI
  { kpiId: "TE_DEC_S1", month: "2025-12", bu: "Brazil Ops",          function: "BA", value: 5,  target: 40 },
  { kpiId: "TE_DEC_S1", month: "2026-01", bu: "Brazil Ops",          function: "BA", value: 9,  target: 40 },
  { kpiId: "TE_DEC_S1", month: "2026-02", bu: "Brazil Ops",          function: "BA", value: 14, target: 40 },

  { kpiId: "TE_DEC_S1", month: "2025-12", bu: "Mkt & Growth Mexico", function: "BA", value: 2,  target: 25 },
  { kpiId: "TE_DEC_S1", month: "2026-01", bu: "Mkt & Growth Mexico", function: "BA", value: 5,  target: 25 },
  { kpiId: "TE_DEC_S1", month: "2026-02", bu: "Mkt & Growth Mexico", function: "BA", value: 9,  target: 25 },

  { kpiId: "TE_DEC_S1", month: "2025-12", bu: "Lending",             function: "BA", value: 6,  target: 45 },
  { kpiId: "TE_DEC_S1", month: "2026-01", bu: "Lending",             function: "BA", value: 11, target: 45 },
  { kpiId: "TE_DEC_S1", month: "2026-02", bu: "Lending",             function: "BA", value: 17, target: 45 },

  { kpiId: "TE_DEC_S1", month: "2025-12", bu: "NuCel",               function: "BA", value: 1,  target: 20 },
  { kpiId: "TE_DEC_S1", month: "2026-01", bu: "NuCel",               function: "BA", value: 3,  target: 20 },
  { kpiId: "TE_DEC_S1", month: "2026-02", bu: "NuCel",               function: "BA", value: 6,  target: 20 },

  // ---------------------------------------------------------------------------
  // TECH EXCELLENCE – MODELS – PRIMARY & SECONDARY
  // ---------------------------------------------------------------------------
  // TE_MOD_P1 – % of BUs following model governance
  { kpiId: "TE_MOD_P1", month: "2025-12", bu: "Brazil Ops",          function: "DS", value: 35, target: 80 },
  { kpiId: "TE_MOD_P1", month: "2026-01", bu: "Brazil Ops",          function: "DS", value: 45, target: 80 },
  { kpiId: "TE_MOD_P1", month: "2026-02", bu: "Brazil Ops",          function: "DS", value: 55, target: 80 },

  { kpiId: "TE_MOD_P1", month: "2025-12", bu: "Mkt & Growth Mexico", function: "DS", value: 25, target: 75 },
  { kpiId: "TE_MOD_P1", month: "2026-01", bu: "Mkt & Growth Mexico", function: "DS", value: 35, target: 75 },
  { kpiId: "TE_MOD_P1", month: "2026-02", bu: "Mkt & Growth Mexico", function: "DS", value: 45, target: 75 },

  { kpiId: "TE_MOD_P1", month: "2025-12", bu: "Lending",             function: "DS", value: 40, target: 85 },
  { kpiId: "TE_MOD_P1", month: "2026-01", bu: "Lending",             function: "DS", value: 52, target: 85 },
  { kpiId: "TE_MOD_P1", month: "2026-02", bu: "Lending",             function: "DS", value: 62, target: 85 },

  { kpiId: "TE_MOD_P1", month: "2025-12", bu: "NuCel",               function: "DS", value: 20, target: 70 },
  { kpiId: "TE_MOD_P1", month: "2026-01", bu: "NuCel",               function: "DS", value: 30, target: 70 },
  { kpiId: "TE_MOD_P1", month: "2026-02", bu: "NuCel",               function: "DS", value: 40, target: 70 },

  // TE_MOD_S1 – % key models with eval + monitoring + tech debt backlog
  { kpiId: "TE_MOD_S1", month: "2025-12", bu: "Brazil Ops",          function: "DS", value: 30, target: 80 },
  { kpiId: "TE_MOD_S1", month: "2026-01", bu: "Brazil Ops",          function: "DS", value: 40, target: 80 },
  { kpiId: "TE_MOD_S1", month: "2026-02", bu: "Brazil Ops",          function: "DS", value: 50, target: 80 },

  { kpiId: "TE_MOD_S1", month: "2025-12", bu: "Mkt & Growth Mexico", function: "DS", value: 22, target: 75 },
  { kpiId: "TE_MOD_S1", month: "2026-01", bu: "Mkt & Growth Mexico", function: "DS", value: 32, target: 75 },
  { kpiId: "TE_MOD_S1", month: "2026-02", bu: "Mkt & Growth Mexico", function: "DS", value: 42, target: 75 },

  { kpiId: "TE_MOD_S1", month: "2025-12", bu: "Lending",             function: "DS", value: 35, target: 85 },
  { kpiId: "TE_MOD_S1", month: "2026-01", bu: "Lending",             function: "DS", value: 45, target: 85 },
  { kpiId: "TE_MOD_S1", month: "2026-02", bu: "Lending",             function: "DS", value: 55, target: 85 },

  { kpiId: "TE_MOD_S1", month: "2025-12", bu: "NuCel",               function: "DS", value: 18, target: 70 },
  { kpiId: "TE_MOD_S1", month: "2026-01", bu: "NuCel",               function: "DS", value: 26, target: 70 },
  { kpiId: "TE_MOD_S1", month: "2026-02", bu: "NuCel",               function: "DS", value: 35, target: 70 },

];

// Export for backwards compatibility and AddKpiModal
export const initialKpis = kpis;
export const initialKpiValues = kpiValues;

// Helper function for AddKpiModal to generate values for new KPIs
export const generateKpiValues = (
  newKpis: Kpi[],
  customTargets?: Record<string, number>
): KpiValue[] => {
  const values: KpiValue[] = [];
  const defaultTarget = 50;

  newKpis.forEach((kpi) => {
    const target = customTargets?.[kpi.id] || defaultTarget;

    MONTHS.forEach((month) => {
      BUS.forEach((bu) => {
        // Generate values around the target with some variance
        const variance = target * 0.15; // ±15% variance
        const randomValue = target + (Math.random() * 2 - 1) * variance;
        
        values.push({
          kpiId: kpi.id,
          month,
          bu,
          function: kpi.function === "Cross" ? "Cross" : kpi.function,
          value: Math.round(randomValue * 10) / 10,
          target,
        });
      });
    });
  });

  return values;
};
