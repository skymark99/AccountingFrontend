import React, { useEffect, useState } from "react";
import dateFormatter from "../../../Services/dateFormatter";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { setOutstandingSelectedItems } from "../../../Global-Variables/features/liabilitySlice/outstandingSlice";
import { truncateText } from "../../../Services/truncateFormatter";
import { catagoryFinder } from "../../../Services/helperFunctions";

function OutstandingTableItems({ item }) {
  const { outstandingSelectedItems } = useSelector(
    (state) => state.outstanding
  );
  const dispatch = useDispatch();

  const checkItem = useCallback(() => {
    return outstandingSelectedItems.some((sel) => sel._id === item._id);
  }, [outstandingSelectedItems, item._id]);

  const [isChecked, setIsChecked] = useState(checkItem());

  const handleChecked = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    if (newCheckedState) {
      dispatch(
        setOutstandingSelectedItems([...outstandingSelectedItems, item])
      );
    } else {
      dispatch(
        setOutstandingSelectedItems(
          outstandingSelectedItems.filter((val) => val._id !== item._id)
        )
      );
    }
  };

  useEffect(() => {
    setIsChecked(checkItem());
  }, [checkItem]);

  // Destructure the required fields from the item
  const {
    purpose,
    particular,
    amount,
    remark,
    date,
    branch,
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
          <h4 className="particulars">{particular?.name || ""}</h4>
          <span className="text">
            <span className="particulars-sub">{truncateText(purpose, 25)}</span>
          </span>
          <div className="tooltip">
            <div>Purpose: {purpose}</div>
            <div>Particular: {particular?.name || ""}</div>
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
          <span className="text remark">{truncateText(remark, 25) || ""}</span>
          <div className="tooltip">{remark}</div>
        </div>
      </div>

      <div className="data-items Branch">
        <h4>{branch}</h4>
      </div>

      <div className="data-items Status">
        <h4>{status}</h4>
      </div>
    </div>
  );
}

export default OutstandingTableItems;
