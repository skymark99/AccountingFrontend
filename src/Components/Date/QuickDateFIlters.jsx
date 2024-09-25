import { CiCalendarDate } from "react-icons/ci";

function QuickDateFIlters({ dateOptions, handleSelectChange, selectedDate }) {
  return (
    <div className="quick-date-filters">
      <span>Filter by:</span>
      <div className="date-grid">
        {dateOptions.map((range, index) => (
          <button
            key={index}
            className={`styled-button ${
              selectedDate === range && range !== "Reset" ? "active" : ""
            }`}
            onClick={handleSelectChange(range)}
          >
            {range}
            <CiCalendarDate className="icon" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickDateFIlters;
