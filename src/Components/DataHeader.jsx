import { useDispatch, useSelector } from "react-redux";
import { setIsAllSelected } from "../Global-Variables/features/dayBookSlice/dayBookSlice";

function DataHeader({ children, style, className }) {
  const { allSelected } = useSelector((state) => state.daybook);
  const dispatch = useDispatch();

  const handleSelect = () => {
    dispatch(setIsAllSelected(!allSelected));
  };

  return (
    <div className={`data-header ${className}`} style={style}>
      <input
        style={{ cursor: "pointer" }}
        checked={allSelected}
        type="checkbox"
        onChange={handleSelect}
      />
      {children}
    </div>
  );
}

export default DataHeader;
