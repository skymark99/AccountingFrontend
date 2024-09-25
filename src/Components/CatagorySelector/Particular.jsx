import { Add, Check, Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress"; // Import MUI's spinner
import { addParticular } from "../../Services/catagoryService";
import { fetchCatagory } from "../../Global-Variables/features/catagorySlice/catagorySlice";
import ParticularItemBox from "./Components/ParticularItemBox";
import { resetAll } from "../../Services/useDayBookActions";

function Particular({
  defaultValue = "Select Particular",
  particulars,
  selected,
  catagoryName,
  setParticular,
  setIsCatagory,
}) {
  const [isCat, setIsCat] = useState(false);
  const [curValue, setCurValue] = useState(defaultValue);
  const [stopDropdown, setStopDropdown] = useState(false);
  const [isCurEdit, setIsCurEdit] = useState(false);
  const [curEditValue, setCurEditValue] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const dispatch = useDispatch();

  useEffect(() => {
    setCurValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    const validateName = particulars.find(
      (particular) => particular.name === curValue
    );
    if (validateName) {
      setParticular(curValue);
    } else {
      setParticular("");
    }
  }, [curValue, setParticular, particulars, setIsCatagory]);

  useEffect(() => {
    if (particulars.length === 0 && selected) {
      setCurValue("Add Particular");
    } else if (!selected) {
      setCurValue(defaultValue);
    } else {
      setCurValue(particulars[0]?.name);
    }
  }, [selected, defaultValue, catagoryName]);

  const handleCurValue = (val) => {
    return () => {
      setCurValue(val);
    };
  };

  const handleParticular = (e) => {
    if (curValue === "Add Particular") {
      handleAddParticular(e);
      return;
    }

    if (!stopDropdown) setIsCat((val) => !val);
    setIsCatagory(false);
  };

  const handleAddParticular = (e) => {
    e.stopPropagation();
    setIsCurEdit(true);
    setStopDropdown(false);
    setIsCat(true);
  };

  const handleCurEditValue = (e) => {
    setCurEditValue(e.target.value);
    setStopDropdown(false);
    setIsCat(true);
  };

  const handleSaveParticular = async (e) => {
    e.stopPropagation();
    if (curEditValue === "") {
      toast.error("Particular name is required");
      return;
    }
    try {
      setIsLoading(true); // Start loading
      setCurValue(curEditValue);
      const res = await addParticular(catagoryName, { name: curEditValue });
      resetAll(dispatch);
      dispatch(fetchCatagory());
      setCurValue(res.data.name);
      toast.success("Particular added successfully");
      setIsCurEdit(false);
    } catch (err) {
      setCurValue(defaultValue);
      const message = err.response.data.message || "Network Error";
      toast.error(message);
      setIsCurEdit(true);
      console.error(err);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleDiscard = (e) => {
    e.stopPropagation();
    setCurEditValue("");
    setIsCurEdit(false);
    setIsCat(false);
  };

  return (
    <div className="catagory-creator-box">
      <div className="show-cat" onClick={handleParticular}>
        <Add
          className="show-cat-add-icon"
          style={{
            fontSize: "2.5rem",
            fill: "currentColor",
            strokeWidth: "4",
          }}
          onClick={handleAddParticular}
          disabled={isLoading} // Disable Add button while loading
        />

        {isCurEdit && (
          <input
            className="show-cat-input "
            type="text"
            value={curEditValue}
            onChange={handleCurEditValue}
            onClick={(e) => e.stopPropagation()}
            disabled={isLoading} // Disable input while loading
          />
        )}
        {!isCurEdit && curValue}
        {isCurEdit && (
          <div className="show-cat-icon-box">
            {isLoading ? (
              <CircularProgress
                size={24} // Small spinner size
                className="loading-spinner"
              />
            ) : (
              <Check
                style={{
                  fontSize: "2.5rem",
                  fill: "currentColor",
                  strokeWidth: "4",
                }}
                onClick={handleSaveParticular}
                fontSize="medium"
                className="show-cat-save-icon"
                disabled={isLoading} // Disable Check button while loading
              />
            )}
            <Close
              fontSize="medium"
              className="discard-icon"
              style={{
                fontSize: "2.5rem",
                fill: "currentColor",
                strokeWidth: "4",
              }}
              onClick={handleDiscard}
              disabled={isLoading} // Disable Close button while loading
            />
          </div>
        )}
        <div
          className="cat-items"
          style={
            isCat ? { transform: "scaleY(1)" } : { transform: "scaleY(0)" }
          }
        >
          {particulars.length > 0 &&
            particulars.map((par) => (
              <ParticularItemBox
                key={par._id}
                value={par.name}
                catName={catagoryName}
                onClick={handleCurValue(par.name)}
                setIsCat={setIsCat}
                setStopDropdown={setStopDropdown}
                setCurValue={setCurValue}
                disabled={isLoading}
                setIsCatagory={setIsCatagory}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Particular;
