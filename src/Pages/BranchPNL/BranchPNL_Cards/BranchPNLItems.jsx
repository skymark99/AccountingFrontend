import React, { useCallback, useEffect, useState } from "react";
import dateFormatter from "../../../Services/dateFormatter";
import { useDispatch, useSelector } from "react-redux";
import { setBranchWisePNLSelectedItems } from "../../../Global-Variables/features/BranchWisePnlSlice/branchWIsePnlSlice";
import { truncateText } from "../../../Services/truncateFormatter";
import { catagoryFinder } from "../../../Services/helperFunctions";

function BranchPNLItems({ item }) {
  const { branchwisePNLSelectedItems, curBranch } = useSelector(
    (state) => state.branchwise
  );
  const dispatch = useDispatch();

  const checkItem = useCallback(() => {
    return branchwisePNLSelectedItems?.some((sel) => sel?._id === item?._id);
  }, [branchwisePNLSelectedItems, item?._id]);

  const [isChecked, setIsChecked] = useState(checkItem());

  const handleChecked = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    if (newCheckedState) {
      dispatch(
        setBranchWisePNLSelectedItems([...branchwisePNLSelectedItems, item])
      );
    } else {
      dispatch(
        setBranchWisePNLSelectedItems(
          branchwisePNLSelectedItems.filter((val) => val?._id !== item?._id)
        )
      );
    }
  };

  useEffect(() => {
    setIsChecked(checkItem());
  }, [checkItem]);

  const { particular, purpose, remark, date, branches, bank, type, catagory } =
    item;

  const [formattedDate, time] = dateFormatter(date);
  const branchAmount = branches.find(
    (branch) => branch.branchName === curBranch
  )?.amount;

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
            <span className="particulars-sub">
              <div>{truncateText(purpose, 25)}</div>
            </span>
          </span>
          <div className="tooltip">
            <div>Particular:{particular?.name}</div>
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
        <h4>{branchAmount?.toLocaleString()}</h4>
      </div>

      <div className="data-items remark-container">
        <div className="tooltip-container">
          <span className="text remark">{truncateText(remark, 25) || ""}</span>
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
            <h4>{branches[0].branchName}</h4>
          ) : (
            <>
              <h4>
                {branches[0]?.branchName}
                {branches?.length > 1 &&
                  `, ${branches[1]?.branchName.slice(0, 2)}..`}
              </h4>

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

export default BranchPNLItems;
