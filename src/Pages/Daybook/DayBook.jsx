import { useSelector } from "react-redux";
import ThertiaryBtn from "../../Components/Buttons/ThertiaryBtn";
import DaybookActionBtns from "./Components/DaybookActionBtns";
import DaybookData from "./Components/DaybookData/DaybookData";
import DaybookDebit from "./Components/DaybookData/DaybookDebit";
import DayBookHeader from "./Components/DayBookHeader/DayBookHeader";
import DaybookCredit from "./Components/DaybookData/DaybookCredit";
import { useState } from "react";
import Navbar from "../../Components/Navbar";
import DateModal from "../../Components/Date/DateModal";
import MaterialDatePicker from "../../Services/MaterialDatePicker";
import { dateOptions } from "../../data/generalDatas";
import { dateFinder } from "../../Services/helperFunctions";
import formatDate from "../../Services/formatDate";
import { today } from "../../Services/dateFormatter";
import { downloadTransactionReport } from "../../Services/downloadReports";
import toast from "react-hot-toast";
import ErrorBoundary from "../../Utils/ErrorBoundary";

function DayBook() {
  const { currentDayBookState } = useSelector((state) => state.daybook);
  const [total, setTotal] = useState([0, 0]);

  const [selectedDate, setSelectedDate] = useState("All");
  const [startDate, setStartDate] = useState(
    formatDate(new Date(new Date().getFullYear(), 0, 1))
  );
  const [endDate, setEndDate] = useState(today());
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDownload = () => {
    setIsOpen((val) => !val);
  };

  const handleSetStartDate = (value) => {
    setSelectedDate("Custom");
    setStartDate(value);
  };

  const handleSetEndDate = (value) => {
    setSelectedDate("Custom");
    setEndDate(value);
  };

  const handleDownloadReport = () => {
    const toastId = toast.loading("Report will be downloaded shortly...");
    try {
      downloadTransactionReport(startDate, endDate);
      toast.success("Report downloaded successfully", { id: toastId });
    } catch (error) {
      toast.error("Error downloading report", { id: toastId });
    }
  };

  const handleSelectChange = (value) => {
    const { startDate: start, endDate: end } = dateFinder(value);
    return () => {
      setSelectedDate(value);
      setStartDate(start);
      setEndDate(end);
    };
  };

  return (
    <div className="body daybook">
      <div className="responsive-nav">
        <Navbar />
      </div>
      <div className="header">
        <h2>Day book</h2>
      </div>
      <div className="daybook__body">
        <DayBookHeader />

        <DateModal
          handleSelectChange={handleSelectChange}
          dateOptions={dateOptions}
          selectedDate={selectedDate}
          isOpen={isOpen}
          handleCancel={handleOpenDownload}
          isDownload={true}
          handleDownload={handleDownloadReport}
        >
          <div className="popupContainer">
            <div className="daybook__datePopup">
              <MaterialDatePicker
                date={startDate}
                setDate={handleSetStartDate}
              />
            </div>
            <div className="daybook__datePopup">
              <MaterialDatePicker date={endDate} setDate={handleSetEndDate} />
            </div>
          </div>
        </DateModal>

        <ErrorBoundary>
          <div className="daybook__data">
            {currentDayBookState === "all" && (
              <DaybookData
                onSetTotal={setTotal}
                handleOpenDownload={handleOpenDownload}
              />
            )}
            {currentDayBookState === "debit" && (
              <DaybookDebit
                onSetTotal={setTotal}
                handleOpenDownload={handleOpenDownload}
              />
            )}
            {currentDayBookState === "credit" && (
              <DaybookCredit
                onSetTotal={setTotal}
                handleOpenDownload={handleOpenDownload}
              />
            )}
          </div>
        </ErrorBoundary>
        <div className="daybook__actions">
          <div className="items-selected-tablet">
            <span>{total[1]} items Selected</span>
            <ThertiaryBtn>{total[0] ? total[0] : "Total"} ₹</ThertiaryBtn>
          </div>
          <DaybookActionBtns />
          <div className="items-selected">
            <span>{total[1]} items Selected</span>
            <ThertiaryBtn>{total[0] ? total[0] : "Total"} ₹</ThertiaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DayBook;
