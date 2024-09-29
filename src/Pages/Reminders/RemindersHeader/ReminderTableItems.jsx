import React, { useCallback, useEffect, useState } from "react";
import dateFormatter from "../../../Services/dateFormatter";
import { useDispatch, useSelector } from "react-redux";
import { setReminderSelectedItems } from "../../../Global-Variables/features/remindersSlice/remindersSlice.";
import { truncateText } from "../../../Services/truncateFormatter";
import { catagoryFinder } from "../../../Services/helperFunctions";

function ReminderTableItems({ item }) {
  const { reminderSelectedItems } = useSelector((state) => state.reminders);
  const dispatch = useDispatch();

  const checkItem = useCallback(() => {
    return reminderSelectedItems.some((sel) => sel._id === item._id);
  }, [reminderSelectedItems, item._id]);

  const [isChecked, setIsChecked] = useState(checkItem());

  const handleChecked = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    if (newCheckedState) {
      dispatch(setReminderSelectedItems([...reminderSelectedItems, item]));
    } else {
      dispatch(
        setReminderSelectedItems(
          reminderSelectedItems.filter((val) => val._id !== item._id)
        )
      );
    }
  };

  useEffect(() => {
    setIsChecked(checkItem());
  }, [checkItem]);

  // Destructure the required fields from the item
  const {
    particular,
    purpose,
    amount,
    remark,
    date,
    branchName,
    status,
    catagory,
  } = item;
  const [formattedDate, time] = dateFormatter(date);
  const { catagories } = useSelector((state) => state.catagories);
  const catagoryName = catagoryFinder(catagories, catagory)?.name;

  return (
    <div
      className={`data-items-container ${isChecked ? "daybook__selected" : ""}`}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChecked}
        style={{ cursor: "pointer" }}
      />
      <div className="data-items particulars">
        <div className="tooltip-container">
          <h4 className="particulars">{truncateText(particular?.name, 18)}</h4>
          <span className="text">
            <span className="particulars-sub">{truncateText(purpose, 18)}</span>
          </span>
          <div className="tooltip">
            <div>Purpose: {purpose}</div>
            <div>Particular: {particular?.name}</div>
            <div>Catagory: {catagoryName}</div>
          </div>
        </div>
      </div>

      <div className="data-items date-time">
        <div>
          <h4>{formattedDate}</h4>
          <span className="text">{time}</span>
        </div>
      </div>
      <div className="data-items Amount">
        <h4>{amount.toLocaleString()}</h4>
      </div>

      <div className="data-items remark-container">
        <div className="tooltip-container">
          <span className="text remark">{truncateText(remark, 38) || ""}</span>
          <div className="tooltip">{remark}</div>
        </div>
      </div>

      <div className="data-items Branch">
        <h4>{branchName}</h4>
      </div>

      <div className="data-items Status">
        <h4>{status}</h4>
      </div>
    </div>
  );
}

export default ReminderTableItems;
