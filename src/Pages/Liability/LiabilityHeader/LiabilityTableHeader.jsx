import { useDispatch, useSelector } from "react-redux";
import { setLiabilityAllSelected } from "../../../Global-Variables/features/liabilitySlice/liabilitySlice";

function LiabilityTableHeader({ children, style, className }) {
  const { liabilityAllSelected: allSelected } = useSelector(
    (state) => state.liability
  );

  const dispatch = useDispatch();

  const handleSelect = () => {
    dispatch(setLiabilityAllSelected(!allSelected));
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

export default LiabilityTableHeader;
