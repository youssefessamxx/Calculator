import React, { useContext } from "react";
import { calcContext } from "../context/CalcProvider";

const getStyle = (value) => {
  const className = {
    "=": "equal",
    "/": "opt",
    x: "opt",
    "-": "opt",
    "+": "opt",
  };

  return className[value];
};

function Button({ value }) {
  const { calc, setCalc } = useContext(calcContext);
  console.log(setCalc);

  // click (.)
  const commaClick = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  // click (C)
  const resetClick = () => {
    setCalc({
      sign: "",
      num: 0,
      res: 0,
    });
  };

  // click any num
  const handleClickNum = () => {
    const valueString = value.toString();

    let numValue;

    if (valueString === "0" && calc.num === 0) {
      numValue = "0";
    } else {
      numValue = Number(calc.num + valueString);
    }

    setCalc({
      ...calc,
      num: numValue,
    });
  };
  // User click operation
  const signClick = () => {
    setCalc({
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };
  // User click equals
  const equalsClick = () => {
    if (calc.res && calc.num) {
      const math = (a, b, sign) => {
        const result = {
          "+": (a, b) => a + b,
          "-": (a, b) => a - b,
          x: (a, b) => a * b,
          "/": (a, b) => a / b,
        };
        return result[sign](a, b);
      };
      setCalc({
        res: math(calc.res, calc.num, calc.sign),
        sign: "",
        num: 0,
      });
    }
  };
  // User click persen
  const persenClick = () => {
    setCalc({
      num: calc.num / 100,
      res: calc.res / 100,
      sign: "",
    });
  };
  // User click invert button
  const invertClick = () => {
    setCalc({
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: "",
    });
  };

  const hanldeClick = () => {
    const result = {
      ".": commaClick,
      C: resetClick,
      "/": signClick,
      x: signClick,
      "-": signClick,
      "+": signClick,
      "=": equalsClick,
      "%": persenClick,
      "+-": invertClick,
    };

    if (result[value]) {
      result[value]();
    } else {
      handleClickNum();
    }
  };

  return (
    <button onClick={() => hanldeClick()} className={`${getStyle(value)} btn`}>
      {value}
    </button>
  );
}

export default Button;
