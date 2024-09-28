import React, { useEffect, useRef, useState } from "react";
import Selector from "../../../Components/Buttons/Selector";
import {
  resetOutStanding,
  setOutSelectedCatagory,
  setOutSelectedParticular,
  setoutStandingEndDate,
  setOutstandingQuery,
  setOutStandingSelectedDate,
  setoutStandingStartDate,
  setOutStandingStatus,
} from "../../../Global-Variables/features/liabilitySlice/outstandingSlice";
import { useDispatch, useSelector } from "react-redux";
import MaterialDatePicker from "../../../Services/MaterialDatePicker";
import DayBookDateSelector from "../../Daybook/Components/DayBookHeader/DayBookDateSelector";
import Search from "../../../Components/Search";
import DateModal from "../../../Components/Date/DateModal";
import CatagorySelector from "../../../Components/CatagorySelector/CatagorySelector";
import ParticularSelector from "../../../Components/CatagorySelector/ParticularSelector";
import { useKey } from "../../../Hooks/Gen/useKey";
import SettinsButton from "../../../Components/Buttons/Download/SettinsButton";

const OutstandingHeader = ({ width }) => {
  const Status = ["All Status", "Paid", "Unpaid", "Postponed", "Pending"];
  const {
    selectedDate,
    status,
    statusOptions,
    outStandingStartDate,
    outStandingEndDate,
    dateOptions,
    selectedCatagory,
    selectedParticular,
    query,
  } = useSelector((state) => state.outstanding);

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  // const prevStatus = useRef(status);
  const prevDate = useRef(selectedDate);

  useEffect(() => {
    if (prevDate.current !== selectedDate) {
      dispatch(resetOutStanding());
    }
    prevDate.current = selectedDate;
    // prevStatus.current = status;
  }, [selectedDate, dispatch]);

  const handleModal = () => {
    setIsOpen((open) => !open);
  };

  const handleSetStartDate = (date) => {
    dispatch(resetOutStanding());
    dispatch(setoutStandingStartDate(date));
  };
  const handleSetEndDate = (date) => {
    dispatch(resetOutStanding());
    dispatch(setoutStandingEndDate(date));
  };

  const handleSelectChange = (range) => {
    return () => dispatch(setOutStandingSelectedDate(range));
  };

  // Search Section
  const searchRef = useRef(null);
  useKey("Escape", () => searchRef.current.blur());
  useKey("Enter", () => {
    searchRef.current.focus();
    if (query) {
      dispatch(setOutstandingQuery(""));
      searchRef.current.blur();
    }
  });
  const handleQuery = (e) => {
    dispatch(setOutstandingQuery(e.target.value));
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
            <Selector
              style={{ width: "12rem" }}
              options={statusOptions}
              buttonText={status}
              setter={setOutStandingStatus}
              resetter={resetOutStanding}
            />
            <CatagorySelector
              selectedCat={selectedCatagory}
              setSelectedCat={setOutSelectedCatagory}
            />
            <ParticularSelector
              selectedCat={selectedCatagory}
              selectedParticular={selectedParticular}
              setSelectedParticular={setOutSelectedParticular}
            />
          </div>
          {/* <DayBookDateSelector onClick={handleModal} /> */}
          <SettinsButton onClick={handleModal} />
          <DateModal
            handleSelectChange={handleSelectChange}
            dateOptions={dateOptions}
            selectedDate={selectedDate}
            isOpen={isOpen}
            handleCancel={handleModal}
          >
            <div className="popupContainer">
              <div className="daybook__datePopup">
                <MaterialDatePicker
                  date={outStandingStartDate}
                  setDate={handleSetStartDate}
                />
              </div>
              <div className="daybook__datePopup">
                <MaterialDatePicker
                  date={outStandingEndDate}
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

export default OutstandingHeader;
