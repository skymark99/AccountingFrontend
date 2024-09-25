import { Check, Close, Edit } from "@mui/icons-material";
import { useState } from "react";
import { updateParticular } from "../../../Services/catagoryService";
import { fetchCatagory } from "../../../Global-Variables/features/catagorySlice/catagorySlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { truncateText } from "../../../Services/truncateFormatter";

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
        name: localCurValue,
      });
      setCurValue(res.data.name);
      setPastValue(localCurValue);

      dispatch(fetchCatagory());
      toast.success("updated successfully");
    } catch (err) {
      setLocalCurValue(pastValue);
      setCurValue(pastValue);
      toast.error("Duplicate category name or error occurred");
      console.error(err);
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
