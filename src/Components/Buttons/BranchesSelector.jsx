import React from "react";

const BranchesSelector = ({ children, onClick, isActive }) => {
  return (
    <button
      className={`branches-selector ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default BranchesSelector;
