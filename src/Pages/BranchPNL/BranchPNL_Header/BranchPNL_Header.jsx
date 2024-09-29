import React, { useEffect, useRef, useState } from "react";
import Selector from "../../../Components/Buttons/Selector";
import { useDispatch, useSelector } from "react-redux";
import {
  resetBranchWise,
  setBranchQuery,
  setBranchSelectedCategory,
  setBranchSelectedParticular,
  setBranchWiseEndDate,
  setBranchWiseSelectedDate,
  setBranchWiseStartDate,
  setCurBranch,
} from "../../../Global-Variables/features/BranchWisePnlSlice/branchWIsePnlSlice";
import Search from "../../../Components/Search";
import ThertiaryBtn from "../../../Components/Buttons/ThertiaryBtn";
import CatagorySelector from "../../../Components/CatagorySelector/CatagorySelector";
import ParticularSelector from "../../../Components/CatagorySelector/ParticularSelector";
import DateModal from "../../../Components/Date/DateModal";
import MaterialDatePicker from "../../../Services/MaterialDatePicker";
import SettinsButton from "../../../Components/Buttons/Download/SettinsButton";
import { useKey } from "../../../Hooks/Gen/useKey";

const BranchPNL_Header = ({ width }) => {
  const {
    branches,
    branchwisePNLSelectedItems,
    selectedCategory,
    selectedParticular,
    dateOptions,
    branchWiseStartDate,
    branchWiseEndDate,
    selectedDate,
    query,
  } = useSelector((state) => state.branchwise);

  const [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => {
    setIsOpen((open) => !open);
  };
  const dispatch = useDispatch();
  const prevDate = useRef(selectedDate);

  useEffect(() => {
    if (prevDate.current !== selectedDate) {
      dispatch(resetBranchWise());
      prevDate.current = selectedDate;
    }
  }, [selectedDate, dispatch]);

  const handleSetStartDate = (date) => {
    dispatch(resetBranchWise());
    dispatch(setBranchWiseStartDate(date));
  };

  const handleSetEndDate = (date) => {
    dispatch(resetBranchWise());
    dispatch(setBranchWiseEndDate(date));
  };
  const handleSelectChange = (range) => {
    return () => dispatch(setBranchWiseSelectedDate(range));
  };

  const total = branchwisePNLSelectedItems.reduce(
    (acc, val) => val.amount + acc,

    0
  );

  const searchRef = useRef(null);
  useKey("Escape", () => searchRef.current.blur());
  useKey("Enter", () => {
    searchRef.current.focus();
    if (query) {
      dispatch(setBranchQuery(""));
      searchRef.current.blur();
    }
  });
  const handleQuery = (e) => {
    dispatch(setBranchQuery(e.target.value));
  };

  return (
    <>
      {/* scss styles used from liability & common */}
      <div className="liability-header" style={{ width }}>
        {/* <SearchBar /> */}
        <Search
          width="30rem"
          value={query}
          handleQuery={handleQuery}
          targetRef={searchRef}
        />
        <div className="branch-wise-filter">
          <div className="filter-section ">
            <div className="header-catagory-selectors">
              <div className="header-catagory-selectors">
                <Selector
                  style={{ width: "12rem" }}
                  resetter="none"
                  setter={setCurBranch}
                  options={branches.slice(1)}
                  buttonText="Branch"
                />
                <CatagorySelector
                  selectedCat={selectedCategory}
                  setSelectedCat={setBranchSelectedCategory}
                />
                <ParticularSelector
                  selectedCat={selectedCategory}
                  selectedParticular={selectedParticular}
                  setSelectedParticular={setBranchSelectedParticular}
                />
              </div>{" "}
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
                      date={branchWiseStartDate}
                      setDate={handleSetStartDate}
                    />
                  </div>

                  <div className="daybook__datePopup">
                    <MaterialDatePicker
                      date={branchWiseEndDate}
                      setDate={handleSetEndDate}
                    />
                  </div>
                </div>
              </DateModal>
            </div>
            <div>
              <div className="branchwise-items-selected">
                <span>{branchwisePNLSelectedItems.length} items Selected</span>
                <ThertiaryBtn>{total ? total : "Total"} ₹</ThertiaryBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BranchPNL_Header;
