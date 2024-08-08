import React, { createContext, useState } from "react";

export const calcContext = createContext();
function CalcProvider({ children }) {
  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const calcValue = { calc, setCalc };

  return (
    <calcContext.Provider value={calcValue}>{children}</calcContext.Provider>
  );
}

export default CalcProvider;
