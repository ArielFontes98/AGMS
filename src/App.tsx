/**
 * Analytics Job Family – KPI Dashboard (Prototype)
 * 
 * This is a front-end prototype dashboard to visualize and explore KPIs for
 * the Analytics Job Family (BA, DS, AE) organized by Pillar, Function, and BU.
 * 
 * HOW TO EXTEND THIS PROTOTYPE:
 * 
 * 1. Connecting to Real Data:
 *    - Replace mockData.ts imports with API calls
 *    - Create a data service layer (e.g., api/kpiService.ts)
 *    - Use fetch/axios to query your warehouse API endpoints
 *    - Transform API responses to match Kpi and KpiValue interfaces
 * 
 * 2. Backend Integration:
 *    - Add authentication (e.g., OAuth/JWT tokens)
 *    - Implement state management (Redux/Zustand) for complex data flows
 *    - Add error handling and loading states
 *    - Implement caching for performance
 * 
 * 3. Additional Features:
 *    - Add date range picker instead of month dropdown
 *    - Implement KPI editing/deletion
 *    - Add export functionality (CSV/PDF)
 *    - Add drill-down capabilities (click KPI to see details)
 *    - Add annotations and notes per KPI
 *    - Implement user preferences (saved filters, default views)
 * 
 * 4. Performance Optimizations:
 *    - Virtualize long tables
 *    - Implement pagination for large datasets
 *    - Add memoization for expensive calculations
 *    - Lazy load chart components
 * 
 * 5. Testing:
 *    - Add unit tests for utility functions
 *    - Add integration tests for components
 *    - Add E2E tests for critical user flows
 */

import { useState, useMemo } from "react";
import type { Kpi, KpiValue, FilterState, Pillar } from "./types";
import { initialKpis, initialKpiValues } from "./mockData";
import { Filters } from "./components/Filters";
import { KpiSummaryCards } from "./components/KpiSummaryCards";
import { KpiChart } from "./components/KpiChart";
import { KpiTable } from "./components/KpiTable";
import { KpiByBuView } from "./components/KpiByBuView";
import { AddKpiModal } from "./components/AddKpiModal";
import "./App.css";

function App() {
  const [kpis, setKpis] = useState<Kpi[]>(initialKpis);
  const [kpiValues, setKpiValues] = useState<KpiValue[]>(initialKpiValues);
  const [filters, setFilters] = useState<FilterState>({
    pillar: "All",
    function: "All",
    bu: "All",
    month: "All",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKpiForBuView, setSelectedKpiForBuView] = useState<Kpi | null>(null);

  // Get available filter options from data
  const availablePillars = useMemo(() => {
    const pillars = new Set(kpis.map((k) => k.pillar));
    return Array.from(pillars) as Pillar[];
  }, [kpis]);

  const availableBUs = useMemo(() => {
    const bus = new Set(kpiValues.map((v) => v.bu));
    return Array.from(bus).sort();
  }, [kpiValues]);

  const availableMonths = useMemo(() => {
    const months = new Set(kpiValues.map((v) => v.month));
    return Array.from(months).sort();
  }, [kpiValues]);

  // Filter KPIs based on current filters
  const filteredKpis = useMemo(() => {
    let filtered = kpis;

    if (filters.pillar !== "All") {
      filtered = filtered.filter((k) => k.pillar === filters.pillar);
    }

    if (filters.function !== "All") {
      filtered = filtered.filter((k) => k.function === filters.function);
    }

    return filtered;
  }, [kpis, filters.pillar, filters.function]);

  // Filter KPI values based on current filters
  const filteredKpiValues = useMemo(() => {
    let filtered = kpiValues;

    // Filter by KPI (based on pillar/function filters already applied to filteredKpis)
    const kpiIds = new Set(filteredKpis.map((k) => k.id));
    filtered = filtered.filter((v) => kpiIds.has(v.kpiId));

    if (filters.bu !== "All") {
      filtered = filtered.filter((v) => v.bu === filters.bu);
    }

    if (filters.function !== "All" && filters.function !== "Cross") {
      filtered = filtered.filter((v) => v.function === filters.function);
    }

    if (filters.month !== "All") {
      filtered = filtered.filter((v) => v.month === filters.month);
    }

    return filtered;
  }, [kpiValues, filteredKpis, filters.bu, filters.function, filters.month]);

  const handleAddKpi = (newKpi: Kpi, newValues: KpiValue[]) => {
    setKpis([...kpis, newKpi]);
    setKpiValues([...kpiValues, ...newValues]);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Analytics Job Family – KPI Dashboard</h1>
          <p className="subtitle">Fake data – for design & behavior only</p>
        </div>
        <button className="add-kpi-button" onClick={() => setIsModalOpen(true)}>
          + Add KPI
        </button>
      </header>

      <main className="app-main">
        <Filters
          filters={filters}
          onFilterChange={setFilters}
          availablePillars={availablePillars}
          availableBUs={availableBUs}
          availableMonths={availableMonths}
        />

        <KpiSummaryCards
          kpis={filteredKpis}
          kpiValues={filteredKpiValues}
          selectedMonth={filters.month}
        />

        <KpiChart
          kpis={filteredKpis}
          kpiValues={filteredKpiValues}
          filters={filters}
        />

        <div className="bu-view-section">
          <div className="bu-view-selector">
            <label htmlFor="kpi-selector">Ver KPI por BU:</label>
            <select
              id="kpi-selector"
              value={selectedKpiForBuView?.id || ""}
              onChange={(e) => {
                const kpi = filteredKpis.find((k) => k.id === e.target.value) || null;
                setSelectedKpiForBuView(kpi);
              }}
            >
              <option value="">-- Selecione um KPI --</option>
              {filteredKpis.map((kpi) => (
                <option key={kpi.id} value={kpi.id}>
                  {kpi.name}
                </option>
              ))}
            </select>
          </div>
          <KpiByBuView
            selectedKpi={selectedKpiForBuView}
            kpiValues={filteredKpiValues}
            filters={filters}
          />
        </div>

        <KpiTable
          kpis={filteredKpis}
          kpiValues={filteredKpiValues}
          filters={filters}
        />
      </main>

      <AddKpiModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddKpi}
        existingIds={kpis.map((k) => k.id)}
        availablePillars={availablePillars}
      />
    </div>
  );
}

export default App;
