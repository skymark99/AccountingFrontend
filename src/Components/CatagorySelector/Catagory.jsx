import { useEffect, useState } from "react";
import Particular from "./Particular";
import CatItemBox from "./Components/CatItemBox";
import { useDispatch, useSelector } from "react-redux";
import { Add, Check, Close } from "@mui/icons-material";
import { addCatagory } from "../../Services/catagoryService";
import toast from "react-hot-toast";
import {
  fetchCatagory,
  resetCatagory,
} from "../../Global-Variables/features/catagorySlice/catagorySlice";
import CircularProgress from "@mui/material/CircularProgress"; // Import MUI's spinner
import { truncateText } from "../../Services/truncateFormatter";

function Catagory({
  defaultValue = "Select Category",
  setCatagory,
  setParticular,
  defaultParticular,
}) {
  const [isCat, setIsCat] = useState(false);
  const [curValue, setCurValue] = useState(defaultValue);
  const { catagories } = useSelector((state) => state.catagories);
  const [stopDropdown, setStopDropdown] = useState(false);
  const [isCurEdit, setIsCurEdit] = useState(false);
  const [curEditValue, setCurEditValue] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const dispatch = useDispatch();

  useEffect(() => {
    setCurValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    const id = catagories.find((cat) => cat.name === curValue)?._id;
    setCatagory(id);
  }, [curValue, setCatagory, catagories, defaultValue]);

  const handleCurValue = (val) => {
    return () => setCurValue(val);
  };

  const handleCatagory = () => {
    if (!stopDropdown) setIsCat((val) => !val);
  };

  const handleAddCatagory = (e) => {
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

  const handleSaveCatagory = async (e) => {
    e.stopPropagation();
    if (curEditValue === "") {
      toast.error("Catagory name is required");
      return;
    }
    try {
      setIsLoading(true);
      setCurValue(curEditValue);
      const response = await addCatagory({ name: curEditValue });
      dispatch(resetCatagory);
      dispatch(fetchCatagory());
      setCurValue(response.envelop.data.name);
      toast.success("Catagory added successfully");
      setIsCurEdit(false);
    } catch (err) {
      toast.error("Catagory added failed");
      setCurValue(defaultValue);
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

  const particulars = (
    catagories.find((cat) => cat.name === curValue)?.particulars || []
  )
    .slice()
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  return (
    <div className="catagory">
      <div className="catagory-creator-box">
        <div className="show-cat" onClick={handleCatagory}>
          <Add
            className="show-cat-add-icon"
            style={{
              fontSize: "2.5rem",
              fill: "currentColor",
              strokeWidth: "4",
            }}
            onClick={handleAddCatagory}
            disabled={isLoading}
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
          {!isCurEdit && truncateText(curValue, 20)}

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
                  onClick={handleSaveCatagory}
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
                disabled={isLoading}
              />
            </div>
          )}

          <div
            className="cat-items"
            style={
              isCat ? { transform: "scaleY(1)" } : { transform: "scaleY(0)" }
            }
          >
            {catagories.map((cat) => (
              <CatItemBox
                key={cat._id}
                id={cat._id}
                value={cat.name}
                onClick={handleCurValue(cat.name)}
                setIsCat={setIsCat}
                setStopDropdown={setStopDropdown}
                setCurValue={setCurValue}
                type="catagory"
                disabled={isLoading} // Disable category items while loading
              />
            ))}
          </div>
        </div>
      </div>
      <Particular
        particulars={particulars}
        selected={curValue !== defaultValue}
        catagoryName={curValue}
        setParticular={setParticular}
        defaultValue={defaultParticular}
        setIsCatagory={setIsCat}
        disabled={isLoading} // Disable Particular component while loading
      />
    </div>
  );
}

export default Catagory;
