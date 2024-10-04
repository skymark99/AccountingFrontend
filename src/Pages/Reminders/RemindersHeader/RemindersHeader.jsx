import React, { useEffect, useRef, useState } from "react";
import Search from "../../../Components/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  resetReminders,
  setReminderEndDate,
  setReminderQuery,
  setReminderSelectedCatagory,
  setReminderSelectedDate,
  setReminderSelectedParticular,
  setReminderStartDate,
} from "../../../Global-Variables/features/remindersSlice/remindersSlice.";
import DateModal from "../../../Components/Date/DateModal";
import MaterialDatePicker from "../../../Services/MaterialDatePicker";
import CatagorySelector from "../../../Components/CatagorySelector/CatagorySelector";
import ParticularSelector from "../../../Components/CatagorySelector/ParticularSelector";
import { useKey } from "../../../Hooks/Gen/useKey";
import SettinsButton from "../../../Components/Buttons/Download/SettinsButton";

const RemindersHeader = ({ width }) => {
  const {
    reminderStartDate,
    reminderEndDate,
    selectedDate,
    dateOptions,
    selectedCatagory,
    selectedParticular,
    query,
  } = useSelector((state) => state.reminders);

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const prevDate = useRef(selectedDate);

  useEffect(() => {
    if (prevDate.current !== selectedDate) {
      dispatch(resetReminders());
    }
    prevDate.current = selectedDate;
  }, [selectedDate, dispatch]);

  const handleCancel = () => {
    setIsOpen((open) => !open);
  };
  const handleSetStartDate = (date) => {
    dispatch(resetReminders());
    dispatch(setReminderStartDate(date));
  };

  const handleSetEndDate = (date) => {
    dispatch(resetReminders());
    dispatch(setReminderEndDate(date));
  };

  const handleSelectChange = (range) => {
    return () => dispatch(setReminderSelectedDate(range));
  };

  // Search section
  const searchRef = useRef(null);
  useKey("Escape", () => searchRef.current.blur());
  useKey("Enter", () => {
    searchRef.current.focus();
    if (query) {
      dispatch(setReminderQuery(""));
      searchRef.current.blur();
    }
  });

  const handleQuery = (e) => {
    dispatch(setReminderQuery(e.target.value));
  };

  return (
    <>
      {/* scss styles used from liability & common */}
      <div className="liability-header" style={{ width }}>
        {/* <SearchBar /> */}
        <Search
          width="30rem"
          targetRef={searchRef}
          query={query}
          handleQuery={handleQuery}
        />
        <div className="filter-section">
          <div className="header-catagory-selectors">
            <CatagorySelector
              selectedCat={selectedCatagory}
              setSelectedCat={setReminderSelectedCatagory}
            />
            <ParticularSelector
              selectedCat={selectedCatagory}
              selectedParticular={selectedParticular}
              setSelectedParticular={setReminderSelectedParticular}
            />
          </div>

          {/* <DayBookDateSelector onClick={handleCancel} /> */}
          <SettinsButton onClick={handleCancel} />
          <DateModal
            handleSelectChange={handleSelectChange}
            dateOptions={dateOptions}
            selectedDate={selectedDate}
            isOpen={isOpen}
            handleCancel={handleCancel}
          >
            <div className="popupContainer">
              <div className="daybook__datePopup">
                <MaterialDatePicker
                  date={reminderStartDate}
                  setDate={handleSetStartDate}
                />
              </div>
              <div className="daybook__datePopup">
                <MaterialDatePicker
                  date={reminderEndDate}
                  setDate={handleSetEndDate}
                />
              </div>
            </div>
          </DateModal>
        </div>
      </div>
    </>
  );
};

export default RemindersHeader;
