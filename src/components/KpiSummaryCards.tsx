import type { Kpi, KpiValue } from "../types";
import "./KpiSummaryCards.css";

interface KpiSummaryCardsProps {
  kpis: Kpi[];
  kpiValues: KpiValue[];
  selectedMonth: string;
}

interface KpiSummary {
  kpi: Kpi;
  latestValue: number;
  target: number;
}

const formatValue = (value: number, unit: string): string => {
  if (unit === "percent") {
    return `${value.toFixed(1)}%`;
  }
  return value.toFixed(1);
};

export const KpiSummaryCards = ({
  kpis,
  kpiValues,
  selectedMonth,
}: KpiSummaryCardsProps) => {
  // Get latest values for each KPI
  const getLatestValues = (): KpiSummary[] => {
    const summaries: KpiSummary[] = [];

    kpis.forEach((kpi) => {
      // Filter values for this KPI
      let relevantValues = kpiValues.filter((kv) => kv.kpiId === kpi.id);

      // Filter by month if not "All"
      if (selectedMonth !== "All") {
        relevantValues = relevantValues.filter((kv) => kv.month === selectedMonth);
      }

      if (relevantValues.length === 0) return;

      // Get the latest month's values (or average if multiple BUs/functions)
      const latestMonth = [...new Set(relevantValues.map((v) => v.month))].sort().pop();
      const latestMonthValues = relevantValues.filter((v) => v.month === latestMonth || !latestMonth);

      // Average across all BUs and functions
      const avgValue =
        latestMonthValues.reduce((sum, v) => sum + v.value, 0) / latestMonthValues.length;
      const avgTarget =
        latestMonthValues.reduce((sum, v) => sum + v.target, 0) / latestMonthValues.length;

      summaries.push({
        kpi,
        latestValue: avgValue,
        target: avgTarget,
      });
    });

    return summaries.slice(0, 4); // Show max 4 cards
  };

  const summaries = getLatestValues();

  const isAboveTarget = (value: number, target: number, kpiId: string): boolean => {
    // For turnover rate (TF_P2), lower is better
    if (kpiId === "TF_P2") {
      return value < target;
    }
    return value >= target;
  };

  return (
    <div className="summary-cards-container">
      {summaries.map((summary) => {
        const aboveTarget = isAboveTarget(summary.latestValue, summary.target, summary.kpi.id);
        const delta = summary.latestValue - summary.target;
        const deltaPercent = summary.target > 0 ? (delta / summary.target) * 100 : 0;

        return (
          <div key={summary.kpi.id} className="summary-card">
            <div className="card-header">
              <h3 className="card-title">{summary.kpi.name}</h3>
              <span
                className={`status-badge ${aboveTarget ? "above-target" : "below-target"}`}
              >
                {aboveTarget ? "✓ Above target" : "⚠ Below target"}
              </span>
            </div>
            <div className="card-content">
              <div className="value-display">
                <span className="value">{formatValue(summary.latestValue, summary.kpi.unit)}</span>
                <span className="target">Target: {formatValue(summary.target, summary.kpi.unit)}</span>
              </div>
              <div className={`delta ${aboveTarget ? "positive" : "negative"}`}>
                {delta >= 0 ? "+" : ""}
                {formatValue(delta, summary.kpi.unit)} ({deltaPercent >= 0 ? "+" : ""}
                {deltaPercent.toFixed(1)}%)
              </div>
            </div>
            <div className="card-footer">
              <span className="pillar-tag">{summary.kpi.pillar}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

