import React, { useState } from "react";
import elementsData from "../Data/elementsData"; // adjust path if needed
import "./compareElements.css";

function CompareElements() {
  const [el1, setEl1] = useState("");
  const [el2, setEl2] = useState("");

  const element1 = elementsData.find(e => e.symbol === el1);
  const element2 = elementsData.find(e => e.symbol === el2);

  return (
    <div className="compare-section">
  <h2>Compare Elements</h2>

  <select onChange={(e) => setEl1(e.target.value)}>
    <option>Select Element 1</option>
    {elementsData.map(el => (
      <option key={el.symbol} value={el.symbol}>
        {el.name}
      </option>
    ))}
  </select>

  <select onChange={(e) => setEl2(e.target.value)}>
    <option>Select Element 2</option>
    {elementsData.map(el => (
      <option key={el.symbol} value={el.symbol}>
        {el.name}
      </option>
    ))}
  </select>

  {element1 && element2 && (
    <div className="compare-container">

      <div className="compare-card">
        <h3>{element1.name}</h3>
        <p>Atomic Mass: {element1.atomic_mass}</p>
        <p>Electronegativity: {element1.electronegativity_pauling ?? "N/A"}</p>
        <p>Density: {element1.density ?? "N/A"}</p>
        <p>Boiling Point: {element1.boil ?? "N/A"} K</p>
      </div>

      <div className="compare-card">
        <h3>{element2.name}</h3>
        <p>Atomic Mass: {element2.atomic_mass}</p>
        <p>Electronegativity: {element2.electronegativity_pauling ?? "N/A"}</p>
        <p>Density: {element2.density ?? "N/A"}</p>
        <p>Boiling Point: {element2.boil ?? "N/A"} K</p>
      </div>

    </div>
  )}
</div>
  );
}

export default CompareElements;