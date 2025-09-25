import React, { createContext, useContext, useState } from "react";

const BigTargetsContext = createContext();

export function BigTargetsProvider({ children }) {
  const [bigTargets, setBigTargets] = useState(false);
  return (
    <BigTargetsContext.Provider value={{ bigTargets, setBigTargets }}>
      {children}
    </BigTargetsContext.Provider>
  );
}

export function useBigTargets() {
  return useContext(BigTargetsContext);
}
