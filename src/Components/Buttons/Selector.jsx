import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { resetLiability } from "../../Global-Variables/features/liabilitySlice/liabilitySlice";

function Selector({
  setter,
  options,
  buttonText = "Select",
  style,
  resetter = "none",
  arrowNone = false,
}) {
  const [selectedOption, setSelectedOption] = useState(buttonText);
  const dispatch = useDispatch();

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    dispatch(setter(e.target.value));
    dispatch(resetLiability());
    if (typeof resetter === "function") {
      dispatch(resetter());
    } else if (resetter === "none") {
      return;
    } else {
      dispatch(resetLiability());
    }
  };

  return (
    <div className="catagory-selector" style={style}>
      <div className="custom-dropdown">
        <select value={selectedOption} onChange={handleSelectChange}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {arrowNone || <BsChevronDown className="icon cat-icon" />}
      </div>
    </div>
  );
}

export default Selector;
