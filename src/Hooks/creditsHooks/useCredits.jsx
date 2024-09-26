import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCredits } from "../../Global-Variables/features/dayBookSlice/creditSlice";

export function useCredits() {
  const dispatch = useDispatch();
  const {
    credits: data,
    loading,
    page,
    error,
  } = useSelector((state) => state.credit);
  const {
    currentDayBookBranch: branch,
    dayBookStartDate: startDate,
    dayBookEndDate: endDate,
    selectedCatagory: catagory,
    selectedParticular: particular,
    query,
  } = useSelector((state) => state.daybook);

  // References to track changes
  const previousPageRef = useRef(page);
  const previousBranchRef = useRef(branch);
  const startDateRef = useRef(startDate);
  const endDateRef = useRef(endDate);
  const selectedCatagoryRef = useRef(catagory);
  const selectedParticularRef = useRef(particular);
  const previousQueryRef = useRef(query);
  useEffect(() => {
    if (
      previousPageRef.current !== page ||
      previousBranchRef.current !== branch ||
      startDateRef.current !== startDate ||
      endDateRef.current !== endDate ||
      selectedCatagoryRef.current !== catagory ||
      selectedParticularRef.current !== particular ||
      previousQueryRef.current !== query ||
      data?.length <= 0
    ) {
      dispatch(fetchCredits());
      startDateRef.current = startDate;
      endDateRef.current = endDate;
      previousPageRef.current = page;
      previousBranchRef.current = branch;
      selectedCatagoryRef.current = catagory;
      selectedParticularRef.current = particular;
      previousQueryRef.current = query;
    }
  }, [
    dispatch,
    page,
    data?.length,
    branch,
    startDate,
    endDate,
    catagory,
    particular,
    query,
  ]);

  return [loading, error, data];
}
