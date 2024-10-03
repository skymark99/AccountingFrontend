import { useRef } from "react";
import {
  setIntake,
  setUnivCurBranch,
  setUniversityQuery,
  setUniversityStatus,
} from "../../Global-Variables/features/university/universitySlice";
import { useDispatch, useSelector } from "react-redux";
import { useKey } from "../../Hooks/Gen/useKey";
import Search from "../../Components/Search";
import ComActionsBtns from "./Components/ComActionBtns";
import Selector from "../../Components/Buttons/Selector";
import { branches } from "../../data/generalDatas";

export default function ComHeader() {
  const Status = [
    "All Status",
    "Invoice Shared",
    "Mail Pending",
    "Pending",
    "Received",
  ];
  const Intakes = ["All Intakes", "April-October", "November-March"];
  const { query, intake, universitySelectedItems, status, curBranch } =
    useSelector((state) => state.university);
  const dispatch = useDispatch();

  // Search Section
  const searchRef = useRef(null);
  useKey("Escape", () => searchRef.current.blur());

  useKey("Enter", () => {
    searchRef.current.focus();
    if (query !== "") {
      dispatch(setUniversityQuery(""));
      searchRef.current.blur();
    }
  });
  const handleQuery = (e) => {
    dispatch(setUniversityQuery(e.target.value));
  };

  return (
    <div className="commition__header-container">
      <div className="commition-search-container">
        <Search
          width="30rem"
          value={query}
          handleQuery={handleQuery}
          targetRef={searchRef}
        />
      </div>
      <div className="commition__header-bottom">
        <ComActionsBtns />

        <div className="commition__filter-container">
          <Selector
            style={{ width: "15rem" }}
            setter={setUniversityStatus}
            options={Status}
            buttonText={status}
            arrowNone={true}
          />
          <Selector
            style={{ width: "15rem" }}
            setter={setUnivCurBranch}
            options={branches}
            buttonText={curBranch}
            arrowNone={true}
          />
          <Selector
            style={{ width: "15rem" }}
            setter={setIntake}
            options={Intakes}
            buttonText={intake}
            arrowNone={true}
          />
        </div>
      </div>
    </div>
  );
}
