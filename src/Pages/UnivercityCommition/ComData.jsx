import { useSelector } from "react-redux";
import ComDataItems from "./ComDataItems";
import { setUniversityCurrentPage } from "../../Global-Variables/features/university/universitySlice";
import PageNavigate from "../../Components/PageNavigate/PageNavigate";

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

  const btnDisable = viewSix.length < 6;

  return (
    <>
      <div className="commition__data-container">
        {viewSix.map((item) => (
          <ComDataItems item={item} key={item?._id} />
        ))}
      </div>

      <div className="daybook__data-footer commition-footer">
        <div></div>
        <PageNavigate
          setCurrentPage={setUniversityCurrentPage}
          currentPage={currentPage}
          btnDisable={btnDisable}
          key={4}
        />
      </div>
    </>
  );
}
