import React from "react";
import Loader from "../../../Components/Loader/Loader";
import ReminderTableItems from "./ReminderTableItems";
import ReminderTableHeader from "./ReminderTableHeader";
import { NoData } from "../../../assets/images";
import { useReminders } from "../../../Hooks/useReminders";

const RemindersTable = ({ data, currentPage }) => {
  const [loading, error] = useReminders();

  return (
    <div className="table-container">
      <ReminderTableHeader>
        <span className="particulars">Particulars</span>
        <span className="date-time">Date & time</span>
        <span className="Amount">Amount</span>
        <span className="header-remark">Remark</span>
        <span className="Branch">Branch</span>
        <span className="Status">Status</span>
      </ReminderTableHeader>

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
            <ReminderTableItems key={rowIndex} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default RemindersTable;
