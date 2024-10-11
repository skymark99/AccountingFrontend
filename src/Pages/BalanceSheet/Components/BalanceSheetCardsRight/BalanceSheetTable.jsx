import React from "react";
import Loader from "../../../../Components/Loader/Loader";
import { useSelector } from "react-redux";

const BalanceSheetTable = ({ data, width }) => {
  const { error, loading } = useSelector((state) => state.balanceSheet);

  // Get the current month index (January = 0, February = 1, etc.)
  // Get the current month index (January = 0, February = 1, etc.)

  const renderCell = (column, item) => {
    switch (column) {
      case "Month":
        return (
          <td
            className="table-items balance-sheet-data-items"
            style={{ paddingLeft: "3rem" }}
          >
            <h4>{item?.month}</h4>
          </td>
        );
      case "Income":
        return (
          <td className="table-items balance-sheet-data-items">
            <h4>{item?.income?.toFixed(2)}</h4>
          </td>
        );
      case "Expense":
        return (
          <td className="table-items balance-sheet-data-items">
            <h4>{item?.expense?.toFixed(2)}</h4>
          </td>
        );
      case "Liability":
        return (
          <td className="table-items balance-sheet-data-items">
            <h4>{item?.liability?.toFixed(2)}</h4>
          </td>
        );
      case "Outstanding":
        return (
          <td className="table-items balance-sheet-data-items">
            <h4>{item?.outstanding?.toFixed(2)}</h4>
          </td>
        );
      case "Profit":
        return (
          <td className="table-items balance-sheet-data-items">
            <h4
              style={{
                color: item.profit < 0 ? "red" : "green",
              }}
            >
              {item?.profit?.toFixed(2)}
            </h4>
          </td>
        );
      default:
        return <td className="table-items balance-sheet-data-items"></td>;
    }
  };

  return (
    <div className="table-container" style={{ width }}>
      <table className="table">
        <thead>
          <tr className="table-head balance-sheet-table-head">
            <th style={{ paddingLeft: "3rem" }}>Month</th>
            <th>Income</th>
            <th>Expense</th>
            <th>Liability</th>
            <th>Outstanding</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="no-data-4pack">
                <Loader />
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={6} className="no-data-4pack">
                <div className="error-for-table">{error}</div>
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((item, rowIndex) => (
              <tr key={rowIndex} className="table-items-container">
                {renderCell("Month", item)}
                {renderCell("Income", item)}
                {renderCell("Expense", item)}
                {renderCell("Liability", item)}
                {renderCell("Outstanding", item)}
                {renderCell("Profit", item)}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="no-data-4pack">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BalanceSheetTable;
