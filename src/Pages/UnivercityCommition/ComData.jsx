import { useDispatch, useSelector } from "react-redux";
import ComDataItems from "./ComDataItems";
import {
  setUniversityAllSelected,
  setUniversityCurrentPage,
  setUniversitySelectedItems,
} from "../../Global-Variables/features/university/universitySlice";
import PageNavigate from "../../Components/PageNavigate/PageNavigate";
import { useEffect } from "react";

export default function ComData() {
  const {
    universities,
    currentPage,
    length,
    startPage,
    universitySelectedItems,
    universityAllSelected,
  } = useSelector((state) => state.university);

  const dispatch = useDispatch();

  const viewSix = universities.slice(startPage, startPage + 6);
  const btnDisable = viewSix.length < 6;

  useEffect(() => {
    if (
      universitySelectedItems.length === viewSix.length &&
      viewSix.length > 0
    ) {
      dispatch(setUniversityAllSelected(true));
    } else {
      dispatch(setUniversityAllSelected(false));
    }
  }, [universitySelectedItems.length, viewSix.length, dispatch]);

  useEffect(() => {
    if (universityAllSelected) {
      dispatch(setUniversitySelectedItems(viewSix));
    } else if (universitySelectedItems.length === viewSix.length) {
      dispatch(setUniversitySelectedItems([]));
    }
  }, [universityAllSelected, dispatch]);

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
