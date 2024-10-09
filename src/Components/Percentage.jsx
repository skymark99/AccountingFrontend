import { useEffect, useRef } from "react";

function Percentage({ children, size = "1rem", percent = false }) {
  const type = useRef(null);

  useEffect(() => {
    if (children < 0) type.current = "neg";
    else type.current = "pos";
  }, [children]);
  // Handle the number and symbol logic in a more explicit way
  const number = Math.abs(children); // Use absolute value to avoid confusion
  const symbol = type === "neg" ? "-" : ""; // Show '-' for negative numbers
  // Convert size to a numeric value for padding calculation
  const paddingSize = parseFloat(size);

  const display = percent ? `${children}%` : `${symbol}₹ ${number}`;
  const tail = percent ? "than last month" : "Profit";

  return (
    <div>
      <span
        style={{
          color: type === "pos" ? "green" : "red", // Color based on the type
          fontSize: size,
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
          paddingLeft: paddingSize / 2 + "rem", // Dynamically adjust padding
        }}
      >
        {tail}
      </span>
    </div>
  );
}

export default Percentage;
