import { useEffect, useState } from "react";
import ChameleonBtn from "../../Components/Buttons/ChameleonBtn";
import RemindersHeader from "./RemindersHeader/RemindersHeader";
import RemindersActions from "./RemindersHeader/RemindersActions";
import RemindersTable from "./RemindersHeader/RemindersTable";
import Navbar from "../../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  setReminderAllSelected,
  setRemindersCurrentPage,
  setReminderSelectedItems,
} from "../../Global-Variables/features/remindersSlice/remindersSlice.";
import PageNavigate from "../../Components/PageNavigate/PageNavigate";
import ThertiaryBtn from "../../Components/Buttons/ThertiaryBtn";
import DateModal from "../../Components/Date/DateModal";
import { dateOptions } from "../../data/generalDatas";
import MaterialDatePicker from "../../Services/MaterialDatePicker";
import { dateFinder } from "../../Services/helperFunctions";
import toast from "react-hot-toast";
import formatDate from "../../Services/formatDate";
import { today } from "../../Services/dateFormatter";
import { downloadReminderReport } from "../../Services/downloadReports";

function Reminders() {
  const {
    reminders,
    currentPage,
    startPage,
    reminderSelectedItems,
    reminderAllSelected,
  } = useSelector((state) => state.reminders);

  const dispatch = useDispatch();

  const viewSix = reminders.slice(startPage, startPage + 6);
  const btnDisable = viewSix.length < 6;

  useEffect(() => {
    if (reminderSelectedItems.length === viewSix.length && viewSix.length > 0) {
      dispatch(setReminderAllSelected(true));
    } else {
      dispatch(setReminderAllSelected(false));
    }
  }, [reminderSelectedItems.length, viewSix.length, dispatch]);

  useEffect(() => {
    if (reminderAllSelected) {
      dispatch(setReminderSelectedItems(viewSix));
    } else if (reminderSelectedItems.length === viewSix.length) {
      dispatch(setReminderSelectedItems([]));
    }
  }, [reminderAllSelected, dispatch]);

  const total = reminderSelectedItems.reduce((acc, val) => val.amount + acc, 0);

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
  const handleDownloadReport = async () => {
    const toastId = toast.loading("Report will be downloaded shortly...");

    try {
      await downloadReminderReport(startDate, endDate);
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
    <div className="body reminders">
      <div className="responsive-nav">
        <Navbar />
      </div>
      <div className="header">
        <h2>Reminders</h2>
      </div>
      {/* scss styles used from liability & common */}
      <div className="liability_body">
        <RemindersHeader />

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

        <div className="entry_card_data">
          <div className="horizontal-actions">
            <ChameleonBtn className="target_info">
              {total ? total : "Total"} ₹
            </ChameleonBtn>
            <RemindersActions />
          </div>
          <RemindersTable data={viewSix} currentPage={currentPage} />
          <div className="liability_footer">
            <ThertiaryBtn
              style={{ fontSize: "1.2rem" }}
              onClick={handleOpenDownload}
            >
              Download Report
            </ThertiaryBtn>

            <PageNavigate
              setCurrentPage={setRemindersCurrentPage}
              currentPage={currentPage}
              totalPages={length}
              btnDisable={btnDisable}
            />
          </div>
        </div>
        <div className="right_card_group">
          <RemindersActions />
          <div className="items-selected">
            <span>{reminderSelectedItems.length} items Selected</span>
            <ChameleonBtn className="target_info">
              {total ? total : "Total"} ₹
            </ChameleonBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reminders;
