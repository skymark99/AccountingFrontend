import Search from "../../../../Components/Search";
import Select from "../Select";
import DayBookHeaderNav from "./DayBookHeaderNav";
import MaterialDatePicker from "../../../../Services/MaterialDatePicker";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDayBookEndDate,
  setDayBookQuery,
  setDayBookSelectedDate,
  setDayBookStartDate,
} from "../../../../Global-Variables/features/dayBookSlice/dayBookSlice";

import { resetDayBook } from "../../../../Services/useDayBookActions";
import DateModal from "../../../../Components/Date/DateModal";
import { useKey } from "../../../../Hooks/Gen/useKey";
import SettinsButton from "../../../../Components/Buttons/Download/SettinsButton";

function DayBookHeader({ width }) {
  const { dayBookStartDate, dayBookEndDate, dateOptions, selectedDate, query } =
    useSelector((state) => state.daybook);

  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => {
    setIsOpen((open) => !open);
  };

  const dispatch = useDispatch();
  const prevDate = useRef(selectedDate);

  useEffect(() => {
    if (prevDate.current !== selectedDate) {
      resetDayBook(dispatch);
      prevDate.current = selectedDate;
    }
  }, [selectedDate, dispatch]);

  const handleSetStartDate = (date) => {
    resetDayBook(dispatch);
    dispatch(setDayBookStartDate(date));
  };

  const handleSetEndDate = (date) => {
    resetDayBook(dispatch);
    dispatch(setDayBookEndDate(date));
  };

  const handleSelectChange = (range) => {
    return () => dispatch(setDayBookSelectedDate(range));
  };

  const searchRef = useRef(null);

  //Search Section
  useKey("Escape", () => searchRef.current.blur());
  useKey("Enter", () => {
    searchRef.current.focus();
    if (query) {
      dispatch(setDayBookQuery(""));
      searchRef.current.blur();
    }
  });

  const handleQuery = (e) => {
    resetDayBook(dispatch);
    dispatch(setDayBookQuery(e.target.value));
  };

  return (
    <div className="daybook__header" style={{ width }}>
      <DayBookHeaderNav />
      <div className="search__container">
        <Search
          width="30rem"
          targetRef={searchRef}
          query={query}
          handleQuery={handleQuery}
        />
      </div>
      {/* <div className="select__container"> */}
      <div className="date-section">
        <div className="header-catagory-selectors">
          <Select style={{ width: "12rem" }} />
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
                date={dayBookStartDate}
                setDate={handleSetStartDate}
              />
            </div>
            <div className="daybook__datePopup">
              <MaterialDatePicker
                date={dayBookEndDate}
                setDate={handleSetEndDate}
              />
            </div>
          </div>
        </DateModal>
      </div>
    </div>
  );
}

export default DayBookHeader;
