import { useDispatch, useSelector } from "react-redux";
import ComDataItems from "./ComDataItems";
import {
  fetchUnivTotals,
  setUniversityAllSelected,
  setUniversityCurrentPage,
  setUniversitySelectedItems,
} from "../../Global-Variables/features/university/universitySlice";
import PageNavigate from "../../Components/PageNavigate/PageNavigate";
import { useEffect } from "react";
import ThertiaryBtn from "../../Components/Buttons/ThertiaryBtn";
import ErrorBoundary from "../../Utils/ErrorBoundary";
import Loader from "../../Components/Loader/Loader";
import { NoData } from "../../assets/images";

export default function ComData() {
  const {
    universities,
    currentPage,
    loading,
    error,
    totalReceived,
    totalPending,
    totalsLoading,
    totalsErr,
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

  useEffect(() => {
    dispatch(fetchUnivTotals());
  }, [dispatch]);

  return (
    <>
      <div className="commition__data-container">
        {loading ? (
          <Loader
            styles={{
              width: "15rem",
              height: "15rem",
            }}
          />
        ) : error ? (
          <div className="error-fullpage"> {error}</div>
        ) : viewSix.length === 0 ? (
          currentPage > 4 ? (
            <div className="no-data-6pack">
              <div className="balance-card page-limit-card">
                <span>⚠</span> You have reached the end of the data
              </div>
            </div>
          ) : (
            <div className="no-data-6pack">
              <img src={NoData} alt="no-data" />
              <span className="text">No data available</span>
            </div>
          )
        ) : (
          viewSix.map((item, i) => {
            return (
              <ErrorBoundary key={i}>
                <ComDataItems item={item} key={item?._id} />
              </ErrorBoundary>
            );
          })
        )}
      </div>

      <div className="daybook__data-footer commition-footer">
        <div className="commition-total-btns">
          <ThertiaryBtn
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {totalsLoading ? "..." : totalReceived}
            <span style={{ fontSize: "1.2rem", opacity: "0.5" }}>Received</span>
          </ThertiaryBtn>
          <ThertiaryBtn
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {totalsLoading ? "..." : totalPending}
            <span style={{ fontSize: "1.2rem", opacity: "0.5" }}>Pendings</span>
          </ThertiaryBtn>
        </div>
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
