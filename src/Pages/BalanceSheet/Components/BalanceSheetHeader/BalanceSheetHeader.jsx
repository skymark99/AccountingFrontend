import React from "react";
import CommonBtn from "../../../../Components/Buttons/CommonBtn";
import DateFilterBtn from "../../../../Components/Buttons/DateFilterBtn";
import Selector from "../../../../Components/Buttons/Selector";

const BalanceSheetHeader = () => {
  const options = ["1 Month", "2 Month", "3 Month"];
  const buttonText = "Date";
  return (
    <div className="balance-sheet-header">
      <CommonBtn>Monthly PNL</CommonBtn>
      {/* <div className="date-section">
        <Selector options={options} buttonText={buttonText} />
        <DateFilterBtn />
      </div> */}
    </div>
  );
};

export default BalanceSheetHeader;
