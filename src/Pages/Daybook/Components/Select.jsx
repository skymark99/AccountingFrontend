import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetTransactions } from "../../../Global-Variables/features/dayBookSlice/transactionSlice";
import { setCurrentDayBookBranch } from "../../../Global-Variables/features/dayBookSlice/dayBookSlice";
import { resetDebits } from "../../../Global-Variables/features/dayBookSlice/debitSlice";
import { resetCredits } from "../../../Global-Variables/features/dayBookSlice/creditSlice";
import { BsChevronDown } from "react-icons/bs";

function Select({ style }) {
  const dispatch = useDispatch();

  const { branches, currentDayBookBranch } = useSelector(
    (state) => state.daybook
  );

  const handleChange = (event) => {
    dispatch(resetTransactions());
    dispatch(resetDebits());
    dispatch(resetCredits());
    dispatch(setCurrentDayBookBranch(event.target.value));
  };

  return (
    <div className="catagory-selector" style={style}>
      <div className="custom-dropdown">
        <select value={currentDayBookBranch} onChange={handleChange}>
          {branches.map((val, i) => (
            <option key={i} value={val}>
              {val}
            </option>
          ))}
        </select>
        <BsChevronDown className="icon cat-icon" />
      </div>
    </div>
  );
}

export default Select;
