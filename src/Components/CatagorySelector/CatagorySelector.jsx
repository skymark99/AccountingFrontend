import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { truncateText } from "../../Services/truncateFormatter";

function CatagorySelector({ style, selectedCat, setSelectedCat, className }) {
  const { catagories } = useSelector((state) => state.catagories);
  const updatedCatagories = ["All Categories", ...catagories];
  const dispatch = useDispatch();

  const handleSelectedCat = (e) => {
    dispatch(setSelectedCat(e.target.value));
  };
  return (
    <div className={`catagory-selector ${className}`} style={style}>
      <div className="cat-custom-dropdown">
        <select value={selectedCat} onChange={handleSelectedCat}>
          {updatedCatagories.map((cat, i) => (
            <option key={i} value={cat.name || cat}>
              {/* {cat?.name || cat} */}
              {truncateText(cat?.name, 15) || truncateText(cat, 15)}
            </option>
          ))}
        </select>
        <BsChevronDown className="icon cat-icon" />
      </div>
    </div>
  );
}

export default CatagorySelector;
