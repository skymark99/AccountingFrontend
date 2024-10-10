import { useEffect, useRef } from "react";

function Percentage({ children, size = "1rem", percent = false }) {
  const type = useRef(Number(children) < 0 ? "neg" : "pos");

  useEffect(() => {
    if (Number(children) < 0) type.current = "neg";
    else type.current = "pos";
  }, [children]);

  const symbol = type === "neg" ? "-" : "";
  const paddingSize = parseFloat(size);

  const display = percent ? `${children}%` : `${symbol}₹ ${Math.abs(children)}`;
  const tail = percent ? "than last month" : "Profit";
  return (
    <div>
      <span
        style={{
          color: type.current === "pos" ? "green" : "red",
          fontWeight: "100",
          fontFamily: "Inter",
        }}
      >
        {display}
      </span>
      <span
        style={{
          color: "black",
          fontSize: size,
          fontWeight: "100",
          paddingLeft: paddingSize / 2 + "rem",
        }}
      >
        {tail}
      </span>
    </div>
  );
}

export default Percentage;
