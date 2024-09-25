import { useDispatch, useSelector } from "react-redux";
import { setBranchWisePNLAllSelected } from "../../../Global-Variables/features/BranchWisePnlSlice/branchWIsePnlSlice";

function BranchwiseTableHeader({ children, style, className }) {
  const { branchWisePNLAllSelected: allSelected } = useSelector(
    (state) => state.branchwise
  );

  const dispatch = useDispatch();

  const handleSelect = () => {
    dispatch(setBranchWisePNLAllSelected(!allSelected));
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

export default BranchwiseTableHeader;
