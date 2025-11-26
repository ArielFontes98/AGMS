import type { Kpi, KpiValue } from "../types";
import "./KpiByFunctionView.css";

interface KpiByFunctionViewProps {
  selectedKpi: Kpi | null;
  kpiValues: KpiValue[];
  filters: {
    bu: string;
    month: string;
  };
}

interface FunctionPerformance {
  function: string;
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

const formatTrend = (trend: FunctionPerformance["trend"], percent: number | null): string => {
  if (trend === "n/a") return "N/A";
  const arrow = trend === "up" ? "↑" : trend === "down" ? "↓" : "→";
  const sign = percent !== null && percent > 0 ? "+" : "";
  return `${arrow} ${percent !== null ? `${sign}${percent.toFixed(1)}%` : ""}`;
};

export const KpiByFunctionView = ({ selectedKpi, kpiValues, filters }: KpiByFunctionViewProps) => {
  if (!selectedKpi) {
    return (
      <div className="kpi-by-function-container">
        <div className="empty-state">Selecione um KPI para ver a visão por Function</div>
      </div>
    );
  }

  const getFunctionPerformance = (): FunctionPerformance[] => {
    // Filter values for selected KPI
    let filteredValues = kpiValues.filter((kv) => kv.kpiId === selectedKpi.id);

    if (filters.bu !== "All") {
      filteredValues = filteredValues.filter((kv) => kv.bu === filters.bu);
    }

    // Get unique functions (excluding Cross as it's aggregated)
    const functions = [...new Set(filteredValues.map((v) => v.function))].filter(
      (f) => f !== "Cross"
    );

    return functions.map((func) => {
      const funcValues = filteredValues.filter((v) => v.function === func);
      const months = [...new Set(funcValues.map((v) => v.month))].sort();

      // Get latest month
      const latestMonth = months[months.length - 1];
      const previousMonth = months.length > 1 ? months[months.length - 2] : null;

      const latestValues = funcValues.filter((v) => v.month === latestMonth);
      const previousValues = previousMonth
        ? funcValues.filter((v) => v.month === previousMonth)
        : [];

      // Average if multiple values (different BUs)
      const latestValue =
        latestValues.reduce((sum, v) => sum + v.value, 0) / latestValues.length;
      const target = latestValues[0]?.target || 0;
      const previousValue =
        previousValues.length > 0
          ? previousValues.reduce((sum, v) => sum + v.value, 0) / previousValues.length
          : null;

      // Calculate trend
      let trend: FunctionPerformance["trend"] = "n/a";
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
        function: func,
        latestValue,
        target,
        previousValue,
        trend,
        trendPercent,
      };
    });
  };

  const performances = getFunctionPerformance();

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

  const getFunctionLabel = (func: string): string => {
    const labels: Record<string, string> = {
      BA: "Business Analytics",
      DS: "Data Science",
      AE: "Analytics Engineering",
    };
    return labels[func] || func;
  };

  return (
    <div className="kpi-by-function-container">
      <div className="kpi-by-function-header">
        <h2>{selectedKpi.name}</h2>
        <span className="kpi-id">{selectedKpi.id}</span>
      </div>

      <div className="kpi-by-function-table-wrapper">
        <table className="kpi-by-function-table">
          <thead>
            <tr>
              <th>Function</th>
              <th>Valor Atual</th>
              <th>Target</th>
              <th>Delta</th>
              <th>Tendência</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {performances.length > 0 ? (
              performances.map((perf) => {
                const isGood = isGoodPerformance(perf.latestValue, perf.target);
                const delta = perf.latestValue - perf.target;
                const deltaPercent =
                  perf.target > 0 ? (delta / perf.target) * 100 : 0;

                return (
                  <tr key={perf.function}>
                    <td className="function-name">
                      <span className="function-badge">{perf.function}</span>
                      <span className="function-label">{getFunctionLabel(perf.function)}</span>
                    </td>
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
              })
            ) : (
              <tr>
                <td colSpan={6} className="empty-state">
                  Nenhum dado disponível para as functions selecionadas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

