import React from "react";

const BudgetPlannerData = ({ data }) => {
  return (
    <tr>
      <td>
        <div className="color-circle" style={{ backgroundColor: data.color }} />
        <span className="data-name">{data.name}</span>
      </td>
      <td>{data.amount}</td>
      <td>
        <span
          className={`change ${
            data.change.includes("+") ? "positive" : "negative"
          }`}
        >
          {data.change}
        </span>
      </td>
      <td>{data.amount}</td>
    </tr>
  );
};

export default BudgetPlannerData;
