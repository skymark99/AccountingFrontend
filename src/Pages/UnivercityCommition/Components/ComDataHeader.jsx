import { useDispatch, useSelector } from "react-redux";
import { setUniversityAllSelected } from "../../../Global-Variables/features/university/universitySlice";

export default function ComDataHeader() {
  const { universityAllSelected } = useSelector((state) => state.university);
  const dispatch = useDispatch();

  const handleSelect = () => {
    dispatch(setUniversityAllSelected(!universityAllSelected));
  };

  return (
    <div className="commition__data-header">
      <input
        style={{ cursor: "pointer" }}
        checked={universityAllSelected}
        type="checkbox"
        onChange={handleSelect}
      />
      <span className="commition__data-headerItems commitionDate">Date</span>
      <span className="commition__data-headerItems commition__student">
        Student
      </span>
      <span className="commition__data-headerItems">Branch</span>
      <span className="commition__data-headerItems">Course Fee</span>
      <span className="commition__data-headerItems">Receivable</span>
      <span className="commition__data-headerItems">Status</span>
      <span className="commition__data-headerItems">Agent</span>
    </div>
  );
}
