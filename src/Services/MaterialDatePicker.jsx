import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import formatDate from "./formatDate";

const MaterialDatePicker = ({ date, setDate }) => {
  const initialDate = date ? new Date(date) : new Date();

  const [selected, setSelected] = useState(initialDate);
  const [month, setMonth] = useState(initialDate);

  useEffect(() => {
    const newDate = date ? new Date(date) : new Date();
    setSelected(newDate);
    setMonth(newDate);
  }, [date]);

  const handleYearChange = (e) => {
    const newYear = e.target.value;
    const newDate = new Date(month.setFullYear(newYear));
    setMonth(newDate);
  };

  const handleDateSelect = (date) => {
    setSelected(date);
    setDate(formatDate(date));
  };

  return (
    <div className="my-daypicker">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleDateSelect}
        month={month}
        onMonthChange={setMonth}
        captionLayout="dropdown"
        components={{
          Caption: ({ date, localeUtils }) => (
            <div className="rdp-caption">
              <select
                value={date.getFullYear()}
                onChange={handleYearChange}
                className="rdp-year-dropdown"
              >
                {Array.from(
                  { length: 10 }, // Show 10 years range, you can adjust as needed
                  (_, i) => new Date().getFullYear() - 5 + i
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          ),
        }}
        modifiersclassNames={{
          selected: "rdp-day--selected",
          today: "rdp-day--today",
        }}
      />
    </div>
  );
};

export default MaterialDatePicker;
