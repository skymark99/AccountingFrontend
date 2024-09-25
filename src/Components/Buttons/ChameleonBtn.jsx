import React from "react";

const ChameleonBtn = ({
  children,
  className = "",
  backgroundColor,
  textColor,
  width,
}) => {
  const hasIcon = React.Children.toArray(children).some(
    (child) => typeof child === "object"
  );

  return (
    <button
      className={`chameleon-btn ${hasIcon ? "" : "no-icon"} ${className}`}
      style={{
        "--background-color": backgroundColor,
        "--text-color": textColor || "#fff",
      }}
    >
      {children}
    </button>
  );
};

export default ChameleonBtn;
