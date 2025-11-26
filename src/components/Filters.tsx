import type { FilterState, Pillar } from "../types";
import "./Filters.css";

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availablePillars: Pillar[];
  availableBUs: string[];
  availableMonths: string[];
}

export const Filters = ({
  filters,
  onFilterChange,
  availablePillars,
  availableBUs,
  availableMonths,
}: FiltersProps) => {
  const updateFilter = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="filters-container">
      <div className="filter-group">
        <label htmlFor="pillar-filter">Pillar</label>
        <select
          id="pillar-filter"
          value={filters.pillar}
          onChange={(e) => updateFilter("pillar", e.target.value)}
        >
          <option value="All">All</option>
          {availablePillars.map((pillar) => (
            <option key={pillar} value={pillar}>
              {pillar}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="function-filter">Function</label>
        <select
          id="function-filter"
          value={filters.function}
          onChange={(e) => updateFilter("function", e.target.value)}
        >
          <option value="All">All</option>
          <option value="BA">BA</option>
          <option value="DS">DS</option>
          <option value="AE">AE</option>
          <option value="Cross">Cross</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="bu-filter">Business Unit</label>
        <select
          id="bu-filter"
          value={filters.bu}
          onChange={(e) => updateFilter("bu", e.target.value)}
        >
          <option value="All">All</option>
          {availableBUs.map((bu) => (
            <option key={bu} value={bu}>
              {bu}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="month-filter">Month</label>
        <select
          id="month-filter"
          value={filters.month}
          onChange={(e) => updateFilter("month", e.target.value)}
        >
          <option value="All">All</option>
          {availableMonths.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

