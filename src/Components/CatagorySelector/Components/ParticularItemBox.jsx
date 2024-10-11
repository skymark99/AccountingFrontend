import { Check, Close, Edit } from "@mui/icons-material";
import { useState } from "react";
import { updateParticular } from "../../../Services/catagoryService";
import { fetchCatagory } from "../../../Global-Variables/features/catagorySlice/catagorySlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { truncateText } from "../../../Services/truncateFormatter";
import { fetchTransaction } from "../../../Global-Variables/fetch/details";
import { fetchCredits } from "../../../Global-Variables/features/dayBookSlice/creditSlice";
import { fetchDebits } from "../../../Global-Variables/features/dayBookSlice/debitSlice";
import { resetAll } from "../../../Services/useDayBookActions";
import { resetBranchWise } from "../../../Global-Variables/features/BranchWisePnlSlice/branchWIsePnlSlice";
import { resetLiability } from "../../../Global-Variables/features/liabilitySlice/liabilitySlice";
import { resetOutStanding } from "../../../Global-Variables/features/liabilitySlice/outstandingSlice";
import { resetReminders } from "../../../Global-Variables/features/remindersSlice/remindersSlice.";

function ParticularItemBox({
  value,
  onClick,
  setStopDropdown,
  setCurValue,
  catName,
  setIsCatagory,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [pastValue, setPastValue] = useState(value); // Store the original value before editing
  const [localCurValue, setLocalCurValue] = useState(value); // Store the local edit value
  const dispatch = useDispatch();

  const handleEdit = async (e) => {
    e.stopPropagation();
    setStopDropdown(true);
    setIsEdit(true);
    setPastValue(localCurValue);
  };

  const handleSave = async (e) => {
    e.stopPropagation();
    setIsEdit(false);
    setStopDropdown(false);

    if (localCurValue === pastValue) return; // No changes, no need to update

    try {
      const res = await updateParticular(catName, pastValue, {
        name: localCurValue?.trim(),
      });
      setCurValue(res.data.name?.trim());
      setPastValue(localCurValue?.trim());
      dispatch(fetchCatagory());
      toast.success("updated successfully");
      resetAll(dispatch);
      dispatch(resetBranchWise());
      dispatch(resetLiability());
      dispatch(resetOutStanding());
      dispatch(resetReminders());
    } catch (err) {
      setLocalCurValue(pastValue);
      setCurValue(pastValue);
      toast.error("Duplicate category name or error occurred");
    }
  };

  const handleDiscard = (e) => {
    e.stopPropagation();
    setIsEdit(false);
    setStopDropdown(false);
    setLocalCurValue(pastValue); // Reset to past value when discarding
    setCurValue(pastValue);
  };

  const handleChange = (e) => {
    setLocalCurValue(e.target.value);
  };

  return (
    <div className="cat-item-box" onClick={onClick}>
      <input
        className="cat-item-input"
        value={truncateText(localCurValue, 23)}
        readOnly={!isEdit}
        style={isEdit ? { backgroundColor: "white" } : {}}
        onChange={handleChange}
      />
      <div className="cat-icon-box">
        {isEdit ? (
          <>
            <Check
              fontSize="medium"
              className="save-icon"
              onClick={handleSave}
            />
            <Close
              fontSize="medium"
              className="discard-icon"
              onClick={handleDiscard}
            />
          </>
        ) : (
          <Edit fontSize="medium" className="edit-icon" onClick={handleEdit} />
        )}
      </div>
    </div>
  );
}

export default ParticularItemBox;
