import React, { useContext } from "react";
import { calcContext } from "../context/CalcProvider";

function Screen() {
  const { calc } = useContext(calcContext);

  return <div className="screen">{calc.num ? calc.num : calc.res}</div>;
}

export default Screen;
