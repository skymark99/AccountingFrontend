import React, { useState } from "react";
import { SlEqualizer } from "react-icons/sl";

const DateFilterBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleInput = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="icon-wrapper" onClick={toggleInput}>
      <SlEqualizer className="rotated-icon" />
      {isOpen && (
        <input
          type="date"
          className="date-input"
          onClick={(e) => e.stopPropagation()} // Prevent click from closing input
        />
      )}
    </div>
  );
};

export default DateFilterBtn;
