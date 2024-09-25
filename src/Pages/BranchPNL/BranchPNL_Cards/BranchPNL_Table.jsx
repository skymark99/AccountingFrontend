import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../../Components/Loader/Loader";
import BranchwiseTableHeader from "./BranchwiseTableHeader";
import { NoData } from "../../../assets/images";
import BranchPNLItems from "./BranchPNLItems";

const BranchPNL_Table = ({ data, currentPage }) => {
  const { transactionLoading, transactionError } = useSelector(
    (state) => state.branchwise
  );

  return (
    <div className="branchwise-table-container">
      <BranchwiseTableHeader>
        <span className="particulars">Particulars</span>
        <span className="date-time">Date & time</span>
        <span className="Amount">Amount</span>
        <span className="header-remark">Remark</span>
        <span className="debited">Debited</span>
        <span className="credited">Credited</span>
        <span className="Branch">Branch</span>
      </BranchwiseTableHeader>

      <div className={`datas__container`}>
        {transactionLoading ? (
          <div>
            <div className="no-data-4pack">
              <Loader
                styles={{
                  width: "15rem",
                  height: "15rem",
                }}
              />
            </div>
          </div>
        ) : transactionError ? (
          <div>
            <div className="no-data-4pack">
              <div className="error-for-table">{transactionError}</div>
            </div>
          </div>
        ) : data.length === 0 ? (
          currentPage > 4 ? (
            <div className="no-data-6pack">
              <div className="balance-card page-limit-card">
                <span>⚠</span> You have reached the end of the data
              </div>
            </div>
          ) : (
            <div className="no-data-6pack">
              <img src={NoData} alt="no-data" />
              <span className="text">No data available</span>
            </div>
          )
        ) : (
          data.map((item, rowIndex) => (
            <BranchPNLItems key={rowIndex} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default BranchPNL_Table;
