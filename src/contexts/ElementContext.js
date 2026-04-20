import React, { createContext, useContext, useState } from 'react';

const ElementContext = createContext();

export function ElementProvider({ children }) {
  const [selectedElement, setSelectedElement] = useState(null);

  return (
    <ElementContext.Provider value={{ selectedElement, setSelectedElement }}>
      {children}
    </ElementContext.Provider>
  );
}

export function useElement() {
  return useContext(ElementContext);
}
