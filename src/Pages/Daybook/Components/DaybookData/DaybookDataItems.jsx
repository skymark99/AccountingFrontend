/* eslint-disable react-hooks/exhaustive-deps */

import { useDispatch, useSelector } from "react-redux";
import dateFormatter from "../../../../Services/dateFormatter";
import { setSelected } from "../../../../Global-Variables/features/dayBookSlice/dayBookSlice";
import { useEffect, useState } from "react";
import { truncateText } from "../../../../Services/truncateFormatter";
import { catagoryFinder } from "../../../../Services/helperFunctions";

function DaybookDataItems({ transaction }) {
  const {
    particular,
    purpose,
    amount,
    bank,
    remark,
    type,
    date,
    branches,
    catagory,
    _id,
  } = transaction;

  const { catagories } = useSelector((state) => state.catagories);

  const [formattedDate, time] = dateFormatter(date);
  const { selected } = useSelector((state) => state.daybook);
  const dispatch = useDispatch();
  const catagoryName = catagoryFinder(catagories, catagory)?.name;
  // Initialize isSelected based on whether the transaction is in the selected list
  const [isSelected, setIsSelectedLocal] = useState(
    selected.some((trans) => trans?._id === _id)
  );

  useEffect(() => {
    setIsSelectedLocal(selected.some((trans) => trans?._id === _id));
  }, [selected]);

  const handleChange = () => {
    setIsSelectedLocal((prevSelected) => !prevSelected); // Toggle local selection state

    if (!isSelected) {
      // If the item is not selected, add it to the selected list
      dispatch(setSelected([...selected, transaction]));
    } else {
      // If the item is already selected, remove it from the selected list
      dispatch(setSelected(selected.filter((trans) => trans?._id !== _id)));
    }
  };

  return (
    <div
      className={`data-items-container ${
        isSelected ? "daybook__selected" : ""
      }`} // Use isSelected for CSS className
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleChange}
        style={{ cursor: "pointer" }}
      />
      <div className="data-items particulars">
        <div className="tooltip-container">
          <h4 className="particulars">{truncateText(particular?.name, 15)}</h4>
          <span className="text">
            <span className="particulars-sub">{truncateText(purpose, 15)}</span>
          </span>
          <div className="tooltip">
            <div>Particular: {particular?.name}</div>
            <div>Purpuse: {purpose}</div>
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
        <h4>{amount}</h4>
      </div>

      <div className="data-items remark-container">
        <div className="tooltip-container">
          <span className="text remark">{remark || ""}</span>
          <div className="tooltip">{remark}</div>
        </div>
      </div>
      {type === "Debit" ? (
        <>
          <div className="data-items debited">
            <h4>{bank}</h4>
          </div>
          <div className="data-items credited"></div>
        </>
      ) : (
        <>
          <div className="data-items debited"></div>
          <div className="data-items credited">
            <h4>{bank}</h4>
          </div>
        </>
      )}

      <div className="data-items">
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
    </div>
  );
}

export default DaybookDataItems;
