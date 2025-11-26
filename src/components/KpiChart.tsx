import { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { Kpi, KpiValue } from "../types";
import "./KpiChart.css";

interface KpiChartProps {
  kpis: Kpi[];
  kpiValues: KpiValue[];
  filters: {
    pillar: string;
    function: string;
    bu: string;
    month: string;
  };
}

interface ChartDataPoint {
  month: string;
  actual: number;
  target: number;
}

export const KpiChart = ({ kpis, kpiValues, filters }: KpiChartProps) => {
  const [selectedKpiId, setSelectedKpiId] = useState<string>(kpis[0]?.id || "");
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  const selectedKpi = kpis.find((k) => k.id === selectedKpiId);

  const getChartData = (): ChartDataPoint[] => {
    if (!selectedKpi) return [];

    // Filter values based on selected KPI and filters
    let filteredValues = kpiValues.filter((kv) => kv.kpiId === selectedKpiId);

    if (filters.bu !== "All") {
      filteredValues = filteredValues.filter((kv) => kv.bu === filters.bu);
    }

    if (filters.function !== "All") {
      filteredValues = filteredValues.filter((kv) => kv.function === filters.function);
    }

    // Group by month and aggregate
    const monthMap = new Map<string, { values: number[]; targets: number[] }>();

    filteredValues.forEach((kv) => {
      const existing = monthMap.get(kv.month) || { values: [], targets: [] };
      existing.values.push(kv.value);
      existing.targets.push(kv.target);
      monthMap.set(kv.month, existing);
    });

    // Convert to chart data format
    const chartData: ChartDataPoint[] = Array.from(monthMap.entries())
      .map(([month, data]) => ({
        month,
        actual: data.values.reduce((a, b) => a + b, 0) / data.values.length,
        target: data.targets[0] || 0, // Targets should be consistent
      }))
      .sort((a, b) => a.month.localeCompare(b.month));

    return chartData;
  };

  const chartData = getChartData();

  const formatValue = (value: number) => {
    if (!selectedKpi) return value.toFixed(1);
    if (selectedKpi.unit === "percent") {
      return `${value.toFixed(1)}%`;
    }
    return value.toFixed(1);
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <div className="chart-controls">
          <div className="control-group">
            <label htmlFor="kpi-select">KPI</label>
            <select
              id="kpi-select"
              value={selectedKpiId}
              onChange={(e) => setSelectedKpiId(e.target.value)}
            >
              {kpis.map((kpi) => (
                <option key={kpi.id} value={kpi.id}>
                  {kpi.name}
                </option>
              ))}
            </select>
          </div>
          <div className="control-group">
            <label htmlFor="chart-type">Chart Type</label>
            <select
              id="chart-type"
              value={chartType}
              onChange={(e) => setChartType(e.target.value as "line" | "bar")}
            >
              <option value="line">Line</option>
              <option value="bar">Bar</option>
            </select>
          </div>
        </div>
      </div>
      <div className="chart-content">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            {chartType === "line" ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" tickFormatter={formatValue} />
                <Tooltip
                  formatter={(value: number) => formatValue(value)}
                  labelStyle={{ color: "#333" }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#820AD1"
                  strokeWidth={3}
                  name="Actual"
                  dot={{ fill: "#820AD1", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#666"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Target"
                  dot={{ fill: "#666", r: 4 }}
                />
              </LineChart>
            ) : (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" tickFormatter={formatValue} />
                <Tooltip
                  formatter={(value: number) => formatValue(value)}
                  labelStyle={{ color: "#333" }}
                />
                <Legend />
                <Bar dataKey="actual" fill="#820AD1" name="Actual" radius={[8, 8, 0, 0]} />
                <Bar dataKey="target" fill="#999" name="Target" radius={[8, 8, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        ) : (
          <div className="chart-empty">No data available for selected filters</div>
        )}
      </div>
    </div>
  );
};

