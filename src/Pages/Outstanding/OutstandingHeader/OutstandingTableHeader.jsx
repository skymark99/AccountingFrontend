import { useDispatch, useSelector } from "react-redux";
import { setOutstandingAllSelected } from "../../../Global-Variables/features/liabilitySlice/outstandingSlice";

function OutstandingTableHeader({ children, style, className }) {
  const { outstatndingAllSelected: allSelected } = useSelector(
    (state) => state.outstanding
  );

  const dispatch = useDispatch();

  const handleSelect = () => {
    dispatch(setOutstandingAllSelected(!allSelected));
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

export default OutstandingTableHeader;
