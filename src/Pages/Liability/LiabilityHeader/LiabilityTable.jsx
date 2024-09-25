import React from "react";
import Loader from "../../../Components/Loader/Loader";
import { useLiabilities } from "../../../Hooks/useLiabilities";
import LIabilityTableItems from "./LIabilityTableItems";
import { NoData } from "../../../assets/images";
import LiabilityTableHeader from "./LiabilityTableHeader";

const LiabilityTable = ({ data, currentPage }) => {
  const [loading, error] = useLiabilities();

  return (
    <div className="table-container">
      <LiabilityTableHeader>
        <span className="particulars">Particulars</span>
        <span className="date-time">Date & time</span>
        <span className="Amount">Amount</span>
        <span className="header-remark">Remark</span>
        <span className="Branch">Branch</span>
        <span className="Status">Status</span>
      </LiabilityTableHeader>

      <div className={`datas__container`}>
        {loading ? (
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
        ) : error ? (
          <div>
            <div className="no-data-4pack">
              <div className="error-for-table">{error}</div>
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
            <LIabilityTableItems key={rowIndex} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default LiabilityTable;
