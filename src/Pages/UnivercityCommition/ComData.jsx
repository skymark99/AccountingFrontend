import { useSelector } from "react-redux";
import ComDataItems from "./ComDataItems";

export default function ComData() {
  const {
    universities,
    currentPage,
    length,
    startPage,
    universitySelectedItems,
    universityAllSelecteds,
  } = useSelector((state) => state.university);

  const viewSix = universities.slice(startPage, startPage + 6);

  return (
    <div className="commition__data-container">
      {viewSix.map((item) => (
        <ComDataItems item={item} key={item?._id} />
      ))}
    </div>
  );
}
