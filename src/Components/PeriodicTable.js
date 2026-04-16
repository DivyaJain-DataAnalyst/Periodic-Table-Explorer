import React, { useState, useCallback, useMemo, useRef } from "react";
import elementsData from "../Data/elementsData";
import "./PeriodicTable.css";
import getBlockColor from "./blockColor";
import { getMainElements, getLanthanides, getActinides } from "./filterBlocks";
import SmallBox from "./SmallBox";
import SearchBar from "./SearchBar";
import FilterPanel, { classifyElement } from "./FilterPanel";

const PeriodicTable = () => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    type: "all",
    period: "all",
    group: "all",
    classify: classifyElement,
  });

  const elementRefs = useRef({});
  const tableRef = useRef(null);

  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleSelectElement = useCallback((element) => {
    setSelectedElement(element);
    // Scroll the element into view with a highlight pulse
    const ref = elementRefs.current[element.number];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
      ref.classList.add("element-pulse");
      setTimeout(() => ref.classList.remove("element-pulse"), 1200);
    }
  }, []);

  // Determine if an element matches current search + filters
  const isElementVisible = useCallback(
    (element) => {
      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          element.name.toLowerCase().includes(q) ||
          element.symbol.toLowerCase().includes(q) ||
          element.number.toString() === q;
        if (!matchesSearch) return false;
      }

      // Type filter
      if (filters.type !== "all") {
        const classification = filters.classify(element.category);
        if (classification !== filters.type) return false;
      }

      // Period filter
      if (filters.period !== "all") {
        if (element.period !== filters.period) return false;
      }

      // Group filter
      if (filters.group !== "all") {
        if (element.group !== filters.group) return false;
      }

      return true;
    },
    [searchQuery, filters]
  );

  // Filter data
  const mainElements = useMemo(() => getMainElements(elementsData), []);
  const lanthanides = useMemo(() => getLanthanides(elementsData), []);
  const actinides = useMemo(() => getActinides(elementsData), []);

  // Count visible
  const visibleCount = useMemo(() => {
    return elementsData.filter(isElementVisible).length;
  }, [isElementVisible]);

  const hasActiveFilters = searchQuery || filters.type !== "all" || filters.period !== "all" || filters.group !== "all";

  // Render element cell
  const renderElement = (element, gridStyle = {}) => {
    const visible = isElementVisible(element);
    const isSelected = selectedElement && selectedElement.number === element.number;

    return (
      <div
        key={element.number}
        ref={(el) => (elementRefs.current[element.number] = el)}
        className={`element ${!visible ? "element-hidden" : ""} ${isSelected ? "element-selected" : ""}`}
        style={{
          ...gridStyle,
          backgroundColor: visible ? getBlockColor(element.block) : undefined,
        }}
        onClick={() => {
          if (visible) handleElementClick(element);
        }}
        title={visible ? `${element.name} (${element.symbol}) - #${element.number}` : ""}
      >
        <strong className={`element-block ${element.block}`}>
          {element.symbol}
        </strong>
        <span className="atomic-number">{element.number}</span>
      </div>
    );
  };

  return (
    <div className="periodic-table-wrapper">
      {/* Controls Bar */}
      <div className="controls-bar">
        <SearchBar
          elements={elementsData}
          onSearch={handleSearch}
          onSelectElement={handleSelectElement}
        />
        <FilterPanel onFilterChange={handleFilterChange} />

        {hasActiveFilters && (
          <div className="results-count">
            <span className="results-count-number">{visibleCount}</span>
            <span className="results-count-label">
              of {elementsData.length} elements
            </span>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="box-container">
        <div className="legend-item">
          <SmallBox color="skyblue" />
          <span>s block</span>
        </div>
        <div className="legend-item">
          <SmallBox color="orange" />
          <span>d block</span>
        </div>
        <div className="legend-item">
          <SmallBox color="#4ade80" />
          <span>p block</span>
        </div>
        <div className="legend-item">
          <SmallBox color="#a78bfa" />
          <span>f block</span>
        </div>
      </div>

      {/* Main Periodic Table */}
      <div className="periodic-table" ref={tableRef}>
        {mainElements.map((element) =>
          renderElement(element, {
            gridColumn: element.group,
            gridRow: element.period,
          })
        )}
      </div>

      {/* Lanthanides Row */}
      <div className="f-block">
        {lanthanides.map((element, index) =>
          renderElement(element, {
            gridColumn: index + 4,
          })
        )}
      </div>

      {/* Actinides Row */}
      <div className="f-block">
        {actinides.map((element, index) =>
          renderElement(element, {
            gridColumn: index + 4,
          })
        )}
      </div>

      {/* Element Information Panel */}
      {selectedElement && (
        <div className="element-details-overlay" onClick={() => setSelectedElement(null)}>
          <div
            className="element-details"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="details-close-btn"
              onClick={() => setSelectedElement(null)}
              aria-label="Close details"
              id="details-close-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            <div className="details-header">
              <div
                className="details-symbol-badge"
                style={{ background: getBlockColor(selectedElement.block) }}
              >
                {selectedElement.symbol}
              </div>
              <div className="details-title">
                <h2>{selectedElement.name}</h2>
                <span className="details-category">{selectedElement.category}</span>
              </div>
            </div>

            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Atomic Number</span>
                <span className="detail-value">{selectedElement.number}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Atomic Mass</span>
                <span className="detail-value">
                  {selectedElement.atomic_mass != null
                    ? parseFloat(selectedElement.atomic_mass).toFixed(4)
                    : "—"}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Group</span>
                <span className="detail-value">{selectedElement.group ?? "—"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Period</span>
                <span className="detail-value">{selectedElement.period}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Block</span>
                <span className="detail-value">{selectedElement.block}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phase</span>
                <span className="detail-value">{selectedElement.phase ?? "—"}</span>
              </div>
              <div className="detail-item detail-item-full">
                <span className="detail-label">Discovered by</span>
                <span className="detail-value">{selectedElement.discovered_by ?? "Unknown"}</span>
              </div>
              {selectedElement.electron_configuration_semantic && (
                <div className="detail-item detail-item-full">
                  <span className="detail-label">Electron Configuration</span>
                  <span className="detail-value detail-value-mono">
                    {selectedElement.electron_configuration_semantic}
                  </span>
                </div>
              )}
            </div>

            {selectedElement.summary && (
              <p className="details-summary">{selectedElement.summary}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PeriodicTable;
