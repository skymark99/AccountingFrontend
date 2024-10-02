import React, { useEffect, useRef, useState } from "react";
import Selector from "../../../Components/Buttons/Selector";
import {
  resetLiability,
  setliabilityEndDate,
  setLiabilityQuery,
  setLiabilitySelectedDate,
  setliabilityStartDate,
  setLiabilityStatus,
  setLiabSelectedCatagory,
  setLiabSelectedParticular,
} from "../../../Global-Variables/features/liabilitySlice/liabilitySlice";
import MaterialDatePicker from "../../../Services/MaterialDatePicker";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../../Components/Search";
import DateModal from "../../../Components/Date/DateModal";
import CatagorySelector from "../../../Components/CatagorySelector/CatagorySelector";
import ParticularSelector from "../../../Components/CatagorySelector/ParticularSelector";
import { useKey } from "../../../Hooks/Gen/useKey";
import SettinsButton from "../../../Components/Buttons/Download/SettinsButton";

const LiabilityHeader = ({ width }) => {
  const Status = ["All Status", "Paid", "Unpaid", "Postponed"];

  const [isOpen, setIsOpen] = useState(false);

  const {
    liabilityStartDate,
    liabilityEndDate,
    selectedDate,
    status,
    dateOptions,
    selectedCatagory,
    selectedParticular,
    query,
  } = useSelector((state) => state.liability);

  const dispatch = useDispatch();
  const prevDate = useRef(selectedDate);

  useEffect(() => {
    if (prevDate.current !== selectedDate) {
      dispatch(resetLiability());
    }
    prevDate.current = selectedDate;
  }, [selectedDate, dispatch, status]);

  const handleCancel = () => {
    setIsOpen((open) => !open);
  };

  const handleSetStartDate = (date) => {
    dispatch(resetLiability());
    dispatch(setliabilityStartDate(date));
  };
  const handleSetEndDate = (date) => {
    dispatch(resetLiability());
    dispatch(setliabilityEndDate(date));
  };
  const handleSelectChange = (range) => {
    return () => dispatch(setLiabilitySelectedDate(range));
  };

  // Search Section
  const searchRef = useRef(null);
  useKey("Escape", () => searchRef.current.blur());
  useKey("Enter", () => {
    searchRef.current.focus();
    if (query) {
      dispatch(setLiabilityQuery(""));
      searchRef.current.blur();
    }
  });
  const handleQuery = (e) => {
    dispatch(setLiabilityQuery(e.target.value));
  };

  return (
    <div className="liability-header" style={{ width }}>
      <Search
        width="30rem"
        value={query}
        handleQuery={handleQuery}
        targetRef={searchRef}
      />
      <div className="filter-section">
        <div className="header-catagory-selectors">
          <Selector
            style={{ width: "12rem" }}
            setter={setLiabilityStatus}
            options={Status}
            buttonText={status}
          />
          <CatagorySelector
            selectedCat={selectedCatagory}
            setSelectedCat={setLiabSelectedCatagory}
          />
          <ParticularSelector
            selectedCat={selectedCatagory}
            selectedParticular={selectedParticular}
            setSelectedParticular={setLiabSelectedParticular}
          />
        </div>

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
                date={liabilityStartDate}
                setDate={handleSetStartDate}
              />
            </div>
            <div className="daybook__datePopup">
              <MaterialDatePicker
                date={liabilityEndDate}
                setDate={handleSetEndDate}
              />
            </div>
          </div>
        </DateModal>
      </div>
    </div>
  );
};

export default LiabilityHeader;
