import elementsData from '../../Data/elementsData';

// Map property user-facing names to data keys
export const propertyKeys = {
  electronegativity: 'electronegativity_pauling',
  ionization: 'ionization_energies',
  mass: 'atomic_mass',
  density: 'density'
};

export const propertyLabels = {
  electronegativity: 'Electronegativity (Pauling)',
  ionization: '1st Ionization Energy (kJ/mol)',
  mass: 'Atomic Mass (u)',
  density: 'Density (g/cm³)'
};

/**
 * Filter and map data for the chart based on chosen parameters
 * @param {string} propertyKey - one of propertyKeys values
 * @param {string} viewMode - 'period' or 'group'
 * @param {number} selectedValue - integer value of period or group
 * @returns {Array<{element: Object, value: number, label: string}>}
 */
export const getTrendData = (propertyKey, viewMode, selectedValue) => {
  // Filter elements matching the period/group
  const filtered = elementsData.filter(el => {
    if (viewMode === 'period') return el.period === parseInt(selectedValue);
    if (viewMode === 'group') return el.group === parseInt(selectedValue);
    return false;
  });

  // Sort by atomic number to ensure correct X axis order
  filtered.sort((a, b) => a.number - b.number);

  // Map to format for chart
  const data = filtered.map(el => {
    let rawVal = null;
    
    // special handling for ionization which is an array
    if (propertyKey === 'ionization_energies') {
      rawVal = el[propertyKey] && el[propertyKey].length > 0 ? el[propertyKey][0] : null;
    } else {
      rawVal = el[propertyKey];
    }

    return {
      element: el,
      label: `${el.symbol} (${el.number})`,
      value: rawVal !== null && rawVal !== undefined ? parseFloat(rawVal) : null,
      fullTitle: el.name
    };
  });

  return data;
};
