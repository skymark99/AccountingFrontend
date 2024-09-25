import { BsChevronDown } from "react-icons/bs";

function DateSelector({ style, onHandleChange, options, value }) {
  return (
    <div className="selector" style={style}>
      <div className="custom-dropdown">
        <select
          className="styled-select"
          value={value}
          onChange={onHandleChange}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <BsChevronDown className="icon" />
      </div>
    </div>
  );
}

export default DateSelector;
