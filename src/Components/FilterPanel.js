import React, { useState, useCallback } from "react";
import "./FilterPanel.css";

// Classification helpers
const METAL_CATEGORIES = [
  "alkali metal",
  "alkaline earth metal",
  "transition metal",
  "post-transition metal",
  "lanthanide",
  "actinide",
];

const NONMETAL_CATEGORIES = [
  "diatomic nonmetal",
  "polyatomic nonmetal",
];

const NOBLE_GAS_CATEGORY = "noble gas";
const METALLOID_CATEGORY = "metalloid";

const classifyElement = (category) => {
  if (!category) return "unknown";
  const cat = category.toLowerCase();
  if (cat === NOBLE_GAS_CATEGORY || cat.includes("noble gas")) return "noble-gas";
  if (NONMETAL_CATEGORIES.some((c) => cat.includes(c))) return "nonmetal";
  if (cat === METALLOID_CATEGORY || cat.includes("metalloid")) return "metalloid";
  if (METAL_CATEGORIES.some((c) => cat.includes(c)) || cat.includes("metal")) return "metal";
  return "unknown";
};

const FilterPanel = ({ onFilterChange }) => {
  const [activeType, setActiveType] = useState("all");
  const [activePeriod, setActivePeriod] = useState("all");
  const [activeGroup, setActiveGroup] = useState("all");
  const [isExpanded, setIsExpanded] = useState(false);

  const typeFilters = [
    { key: "all", label: "All", icon: "⚛️" },
    { key: "metal", label: "Metals", icon: "🔩" },
    { key: "nonmetal", label: "Non-metals", icon: "💨" },
    { key: "metalloid", label: "Metalloids", icon: "⚡" },
    { key: "noble-gas", label: "Noble Gases", icon: "✨" },
  ];

  const periods = [1, 2, 3, 4, 5, 6, 7];
  const groups = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  const emitFilterChange = useCallback(
    (type, period, group) => {
      onFilterChange({
        type,
        period,
        group,
        classify: classifyElement,
      });
    },
    [onFilterChange]
  );

  const handleTypeChange = (key) => {
    setActiveType(key);
    emitFilterChange(key, activePeriod, activeGroup);
  };

  const handlePeriodChange = (p) => {
    const val = activePeriod === p ? "all" : p;
    setActivePeriod(val);
    emitFilterChange(activeType, val, activeGroup);
  };

  const handleGroupChange = (g) => {
    const val = activeGroup === g ? "all" : g;
    setActiveGroup(val);
    emitFilterChange(activeType, activePeriod, val);
  };

  const hasActiveFilters =
    activeType !== "all" || activePeriod !== "all" || activeGroup !== "all";

  const clearAllFilters = () => {
    setActiveType("all");
    setActivePeriod("all");
    setActiveGroup("all");
    emitFilterChange("all", "all", "all");
  };

  return (
    <div className={`filter-panel ${isExpanded ? "expanded" : ""}`} id="filter-panel">
      <div className="filter-header">
        <button
          className="filter-toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          id="filter-toggle-btn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <span>Filters</span>
          {hasActiveFilters && <span className="filter-badge">{
            (activeType !== "all" ? 1 : 0) +
            (activePeriod !== "all" ? 1 : 0) +
            (activeGroup !== "all" ? 1 : 0)
          }</span>}
          <svg
            className={`filter-chevron ${isExpanded ? "rotated" : ""}`}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {hasActiveFilters && (
          <button className="filter-clear-all" onClick={clearAllFilters} id="filter-clear-all">
            Clear all
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="filter-body">
          {/* Type Filters */}
          <div className="filter-section">
            <label className="filter-label">Classification</label>
            <div className="filter-chips">
              {typeFilters.map((f) => (
                <button
                  key={f.key}
                  className={`filter-chip ${activeType === f.key ? "active" : ""} chip-${f.key}`}
                  onClick={() => handleTypeChange(f.key)}
                  id={`filter-type-${f.key}`}
                >
                  <span className="chip-icon">{f.icon}</span>
                  <span>{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Period Filters */}
          <div className="filter-section">
            <label className="filter-label">Period</label>
            <div className="filter-number-chips">
              {periods.map((p) => (
                <button
                  key={p}
                  className={`filter-num-chip ${activePeriod === p ? "active" : ""}`}
                  onClick={() => handlePeriodChange(p)}
                  id={`filter-period-${p}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Group Filters */}
          <div className="filter-section">
            <label className="filter-label">Group</label>
            <div className="filter-number-chips">
              {groups.map((g) => (
                <button
                  key={g}
                  className={`filter-num-chip ${activeGroup === g ? "active" : ""}`}
                  onClick={() => handleGroupChange(g)}
                  id={`filter-group-${g}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { classifyElement };
export default FilterPanel;
