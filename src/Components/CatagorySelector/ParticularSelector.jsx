import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { truncateText } from "../../Services/truncateFormatter";

function ParticularSelector({
  style,
  selectedCat = "All Catagories",
  selectedParticular = "All Particulars",
  setSelectedParticular,
}) {
  const { catagories } = useSelector((state) => state.catagories);
  const dispatch = useDispatch();

  const allParticular = (catagories) =>
    catagories
      ?.map((cat) => cat.particulars)
      .flat()
      .map((par) => par.name) || [];

  const [particulars, setParticulars] = useState(["All Particulars"]);

  useEffect(() => {
    if (selectedCat === "All Categories") {
      setParticulars(["All Particulars", ...allParticular(catagories)]);
    } else {
      const selectedCategory = catagories.find(
        (cat) => cat.name === selectedCat
      );
      if (selectedCategory) {
        setParticulars([
          "All Particulars",
          ...selectedCategory.particulars.map((par) => par.name),
        ]);
      } else {
        setParticulars(["All Particulars", ...allParticular(catagories)]);
      }
    }
  }, [selectedCat, catagories]);

  const handleSelected = (e) => {
    dispatch(setSelectedParticular(e.target.value));
  };

  const disabled = selectedCat === "All Categories";

  return (
    <div
      className="catagory-selector"
      style={disabled ? { opacity: "0.5", ...style } : style}
    >
      <div className="cat-custom-dropdown">
        <select
          value={selectedParticular}
          onChange={handleSelected}
          disabled={disabled}
        >
          {particulars.map((particular, i) => (
            <option key={i} value={particular}>
              {truncateText(particular, 15)}
            </option>
          ))}
        </select>
        <BsChevronDown className="icon cat-icon" />
      </div>
    </div>
  );
}

export default ParticularSelector;
