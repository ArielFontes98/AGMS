import type { Kpi, KpiValue } from "../types";
import "./KpiTable.css";

interface KpiTableProps {
  kpis: Kpi[];
  kpiValues: KpiValue[];
  filters: {
    pillar: string;
    function: string;
    bu: string;
    month: string;
  };
}

interface TableRow {
  kpiId: string;
  kpiName: string;
  pillar: string;
  function: string;
  bu: string;
  latestValue: number;
  target: number;
  delta: number;
}

const formatValue = (value: number, unit: string): string => {
  if (unit === "percent") {
    return `${value.toFixed(1)}%`;
  }
  return value.toFixed(1);
};

export const KpiTable = ({ kpis, kpiValues, filters }: KpiTableProps) => {
  const getTableData = (): TableRow[] => {
    const rows: TableRow[] = [];

    // Filter KPIs
    let filteredKpis = kpis;
    if (filters.pillar !== "All") {
      filteredKpis = filteredKpis.filter((k) => k.pillar === filters.pillar);
    }
    if (filters.function !== "All") {
      filteredKpis = filteredKpis.filter((k) => k.function === filters.function);
    }

    filteredKpis.forEach((kpi) => {
      // Filter values
      let filteredValues = kpiValues.filter((kv) => kv.kpiId === kpi.id);

      if (filters.bu !== "All") {
        filteredValues = filteredValues.filter((kv) => kv.bu === filters.bu);
      }

      if (filters.function !== "All") {
        filteredValues = filteredValues.filter((kv) => kv.function === filters.function);
      }

      if (filters.month !== "All") {
        filteredValues = filteredValues.filter((kv) => kv.month === filters.month);
      }

      if (filters.bu === "All") {
        // Aggregate across all BUs
        const buGroups = new Map<string, KpiValue[]>();
        filteredValues.forEach((kv) => {
          const key = `${kv.month}-${kv.function}`;
          const group = buGroups.get(key) || [];
          group.push(kv);
          buGroups.set(key, group);
        });

        // Get latest month
        const months = [...new Set(filteredValues.map((v) => v.month))].sort();
        const latestMonth = months[months.length - 1] || "";

        const latestValues = filteredValues.filter((v) => v.month === latestMonth);
        if (latestValues.length > 0) {
          const avgValue = latestValues.reduce((sum, v) => sum + v.value, 0) / latestValues.length;
          const avgTarget = latestValues.reduce((sum, v) => sum + v.target, 0) / latestValues.length;

          rows.push({
            kpiId: kpi.id,
            kpiName: kpi.name,
            pillar: kpi.pillar,
            function: kpi.function,
            bu: "All",
            latestValue: avgValue,
            target: avgTarget,
            delta: avgValue - avgTarget,
          });
        }
      } else {
        // Show per BU
        const buGroups = new Map<string, KpiValue[]>();
        filteredValues.forEach((kv) => {
          const group = buGroups.get(kv.bu) || [];
          group.push(kv);
          buGroups.set(kv.bu, group);
        });

        buGroups.forEach((values, bu) => {
          const months = [...new Set(values.map((v) => v.month))].sort();
          const latestMonth = months[months.length - 1] || "";
          const latestValues = values.filter((v) => v.month === latestMonth);

          if (latestValues.length > 0) {
            const avgValue = latestValues.reduce((sum, v) => sum + v.value, 0) / latestValues.length;
            const avgTarget = latestValues.reduce((sum, v) => sum + v.target, 0) / latestValues.length;

            rows.push({
              kpiId: kpi.id,
              kpiName: kpi.name,
              pillar: kpi.pillar,
              function: kpi.function,
              bu,
              latestValue: avgValue,
              target: avgTarget,
              delta: avgValue - avgTarget,
            });
          }
        });
      }
    });

    return rows;
  };

  const tableData = getTableData();

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>KPI Details</h2>
        <span className="table-count">{tableData.length} KPIs</span>
      </div>
      <div className="table-wrapper">
        <table className="kpi-table">
          <thead>
            <tr>
              <th>KPI ID</th>
              <th>KPI Name</th>
              <th>Pillar</th>
              <th>Function</th>
              <th>BU</th>
              <th>Latest Value</th>
              <th>Target</th>
              <th>Delta</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((row, idx) => {
                const kpi = kpis.find((k) => k.id === row.kpiId);
                const unit = kpi?.unit || "count";
                const isPositive = row.delta >= 0 || (row.kpiId === "TF_P2" && row.delta < 0);

                return (
                  <tr key={`${row.kpiId}-${row.bu}-${idx}`}>
                    <td className="kpi-id">{row.kpiId}</td>
                    <td className="kpi-name">{row.kpiName}</td>
                    <td>{row.pillar}</td>
                    <td>{row.function}</td>
                    <td>{row.bu}</td>
                    <td className="value-cell">{formatValue(row.latestValue, unit)}</td>
                    <td className="target-cell">{formatValue(row.target, unit)}</td>
                    <td className={`delta-cell ${isPositive ? "positive" : "negative"}`}>
                      {row.delta >= 0 ? "+" : ""}
                      {formatValue(row.delta, unit)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="table-empty">
                  No data available for selected filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

