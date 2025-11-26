import type { Kpi, KpiValue } from "../types";
import "./KpiByBuView.css";

interface KpiByBuViewProps {
  selectedKpi: Kpi | null;
  kpiValues: KpiValue[];
  filters: {
    function: string;
    month: string;
  };
}

interface BuPerformance {
  bu: string;
  latestValue: number;
  target: number;
  previousValue: number | null;
  trend: "up" | "down" | "stable" | "n/a";
  trendPercent: number | null;
}

const formatValue = (value: number, unit: string): string => {
  if (unit === "percent") {
    return `${value.toFixed(1)}%`;
  }
  return value.toFixed(1);
};

const formatTrend = (trend: BuPerformance["trend"], percent: number | null): string => {
  if (trend === "n/a") return "N/A";
  const arrow = trend === "up" ? "↑" : trend === "down" ? "↓" : "→";
  const sign = percent !== null && percent > 0 ? "+" : "";
  return `${arrow} ${percent !== null ? `${sign}${percent.toFixed(1)}%` : ""}`;
};

export const KpiByBuView = ({ selectedKpi, kpiValues, filters }: KpiByBuViewProps) => {
  if (!selectedKpi) {
    return (
      <div className="kpi-by-bu-container">
        <div className="empty-state">Selecione um KPI para ver a visão por BU</div>
      </div>
    );
  }

  const getBuPerformance = (): BuPerformance[] => {
    // Filter values for selected KPI
    let filteredValues = kpiValues.filter((kv) => kv.kpiId === selectedKpi.id);

    if (filters.function !== "All" && filters.function !== "Cross") {
      filteredValues = filteredValues.filter((kv) => kv.function === filters.function);
    }

    // Get unique BUs
    const bus = [...new Set(filteredValues.map((v) => v.bu))];

    return bus.map((bu) => {
      const buValues = filteredValues.filter((v) => v.bu === bu);
      const months = [...new Set(buValues.map((v) => v.month))].sort();

      // Get latest month
      const latestMonth = months[months.length - 1];
      const previousMonth = months.length > 1 ? months[months.length - 2] : null;

      const latestValues = buValues.filter((v) => v.month === latestMonth);
      const previousValues = previousMonth
        ? buValues.filter((v) => v.month === previousMonth)
        : [];

      // Average if multiple values (different functions)
      const latestValue =
        latestValues.reduce((sum, v) => sum + v.value, 0) / latestValues.length;
      const target = latestValues[0]?.target || 0;
      const previousValue =
        previousValues.length > 0
          ? previousValues.reduce((sum, v) => sum + v.value, 0) / previousValues.length
          : null;

      // Calculate trend
      let trend: BuPerformance["trend"] = "n/a";
      let trendPercent: number | null = null;

      if (previousValue !== null) {
        const change = latestValue - previousValue;
        const percentChange = previousValue !== 0 ? (change / previousValue) * 100 : 0;

        if (Math.abs(percentChange) < 1) {
          trend = "stable";
        } else if (change > 0) {
          trend = "up";
        } else {
          trend = "down";
        }
        trendPercent = percentChange;
      }

      return {
        bu,
        latestValue,
        target,
        previousValue,
        trend,
        trendPercent,
      };
    });
  };

  const performances = getBuPerformance();

  const isGoodPerformance = (value: number, target: number): boolean => {
    const { targetDirection } = selectedKpi;
    const delta = Math.abs(value - target);
    const tolerance = target * 0.05; // 5% tolerance for "near"

    if (targetDirection === "above") {
      return value >= target;
    } else if (targetDirection === "below") {
      return value <= target;
    } else {
      return delta <= tolerance;
    }
  };

  return (
    <div className="kpi-by-bu-container">
      <div className="kpi-by-bu-header">
        <h2>{selectedKpi.name}</h2>
        <span className="kpi-id">{selectedKpi.id}</span>
      </div>

      <div className="kpi-by-bu-table-wrapper">
        <table className="kpi-by-bu-table">
          <thead>
            <tr>
              <th>Business Unit</th>
              <th>Valor Atual</th>
              <th>Target</th>
              <th>Delta</th>
              <th>Tendência</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {performances.map((perf) => {
              const isGood = isGoodPerformance(perf.latestValue, perf.target);
              const delta = perf.latestValue - perf.target;
              const deltaPercent =
                perf.target > 0 ? (delta / perf.target) * 100 : 0;

              return (
                <tr key={perf.bu}>
                  <td className="bu-name">{perf.bu}</td>
                  <td className="value-cell">
                    {formatValue(perf.latestValue, selectedKpi.unit)}
                  </td>
                  <td className="target-cell">
                    {formatValue(perf.target, selectedKpi.unit)}
                  </td>
                  <td className={`delta-cell ${delta >= 0 ? "positive" : "negative"}`}>
                    {delta >= 0 ? "+" : ""}
                    {formatValue(delta, selectedKpi.unit)} ({deltaPercent >= 0 ? "+" : ""}
                    {deltaPercent.toFixed(1)}%)
                  </td>
                  <td
                    className={`trend-cell ${perf.trend === "up" ? "trend-up" : perf.trend === "down" ? "trend-down" : perf.trend === "stable" ? "trend-stable" : ""}`}
                  >
                    {formatTrend(perf.trend, perf.trendPercent)}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${isGood ? "above-target" : "below-target"}`}
                    >
                      {isGood ? "✓" : "⚠"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

