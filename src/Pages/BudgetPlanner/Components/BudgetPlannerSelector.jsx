import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setCurSelectedBranch } from "../../../Global-Variables/features/BudgetPlannerSlice/budgetPlannerSlice";
import { branches } from "../../../data/generalDatas";

function BudgetPlannerSelector({ disabled }) {
  const { curSelectedBranch } = useSelector((state) => state.budget);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setCurSelectedBranch(e.target.value));
  };

  // if (curSelectedBranch === "All branch") no functionality

  return (
    <div className="bp-dropdown-container">
      <div className="bp-select-wrapper">
        <select
          disabled={disabled}
          className="bp-select"
          value={curSelectedBranch}
          onChange={handleChange}
        >
          {branches?.map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>
        <IoIosArrowDown className="bp-select-icon" />
      </div>
    </div>
  );
}

export default BudgetPlannerSelector;
