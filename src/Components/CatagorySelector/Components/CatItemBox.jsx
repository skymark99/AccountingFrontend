import { Check, Close, Edit } from "@mui/icons-material";
import { useState } from "react";
import { editCatagory } from "../../../Services/catagoryService";
import { fetchCatagory } from "../../../Global-Variables/features/catagorySlice/catagorySlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { truncateText } from "../../../Services/truncateFormatter";

function CatItemBox({ value, onClick, setStopDropdown, setCurValue, id }) {
  const [isEdit, setIsEdit] = useState(false);
  const [pastValue, setPastValue] = useState(value); // Store the original value
  const [localCurValue, setLocalCurValue] = useState(value); // Local editable value
  const dispatch = useDispatch();

  const handleEdit = async (e) => {
    e.stopPropagation();
    setStopDropdown(true);
    setIsEdit(true);
    setPastValue(localCurValue); // Capture the current value when entering edit mode
  };

  const handleSave = async (e) => {
    e.stopPropagation();
    setIsEdit(false);
    setStopDropdown(false);

    if (localCurValue === pastValue) return; // If no changes, do nothing

    try {
      const response = await editCatagory(id, { name: localCurValue.trim() });
      setCurValue(response.envelop.data.name); // Set updated value after saving
      setPastValue(localCurValue.trim()); // Update the past value to the new saved value
      dispatch(fetchCatagory()); // Refetch the categories
      toast.success("Category updated successfully");
    } catch (err) {
      toast.error("Duplicate category name or error occurred");

      setCurValue(pastValue); // Revert to the previous value in case of error
      setLocalCurValue(pastValue);
    }
  };

  const handleDiscard = (e) => {
    e.stopPropagation();
    setIsEdit(false);
    setStopDropdown(false);
    setCurValue(pastValue); // Restore to past value
    setLocalCurValue(pastValue); // Reset local value to the original
  };

  const handleChange = (e) => {
    setLocalCurValue(e.target.value); // Track input changes locally
  };

  return (
    <div className="cat-item-box" onClick={onClick}>
      <input
        className="cat-item-input"
        value={truncateText(localCurValue, 25)}
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

export default CatItemBox;
