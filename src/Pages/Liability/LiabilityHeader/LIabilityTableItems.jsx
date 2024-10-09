import React, { useCallback, useEffect, useState } from "react";
import dateFormatter from "../../../Services/dateFormatter";
import { useDispatch, useSelector } from "react-redux";
import { setLaibilitySelectedItems } from "../../../Global-Variables/features/liabilitySlice/liabilitySlice";
import { truncateText } from "../../../Services/truncateFormatter";
import { catagoryFinder } from "../../../Services/helperFunctions";

function LIabilityTableItems({ item }) {
  const { laibilitySelectedItems } = useSelector((state) => state.liability);
  const dispatch = useDispatch();

  const checkItem = useCallback(() => {
    return laibilitySelectedItems.some((sel) => sel._id === item._id);
  }, [laibilitySelectedItems, item._id]);

  const [isChecked, setIsChecked] = useState(checkItem());

  const handleChecked = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    if (newCheckedState) {
      dispatch(setLaibilitySelectedItems([...laibilitySelectedItems, item]));
    } else {
      dispatch(
        setLaibilitySelectedItems(
          laibilitySelectedItems.filter((val) => val._id !== item._id)
        )
      );
    }
  };

  useEffect(() => {
    setIsChecked(checkItem());
  }, [checkItem]);

  const {
    particular,
    purpose,
    amount,
    remark,
    date,
    branches,
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
          <h4 className="particulars">
            {truncateText(particular?.name, 18) || ""}
          </h4>
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
      {/* 
      <div className="data-items Branch">
        <h4>{branch}</h4>
      </div> */}

      <div className="data-items Branch">
        <div className="tooltip-container">
          {branches?.length === 1 ? (
            <h4>{branches[0]?.branchName}</h4>
          ) : (
            <>
              <h4>Mulitple</h4>

              <span className="tooltip text">
                {branches?.map((branch) => branch.branchName).join(", ")}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="data-items Status">
        <h4>{status}</h4>
      </div>
    </div>
  );
}

export default LIabilityTableItems;
