import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDebits } from "../../Global-Variables/features/dayBookSlice/debitSlice";

export function useDebits() {
  const dispatch = useDispatch();
  const {
    debits: data,
    loading,
    page,
    error,
  } = useSelector((state) => state.debit);
  const {
    currentDayBookBranch: branch,
    dayBookStartDate: startDate,
    dayBookEndDate: endDate,
    selectedCatagory,
    selectedParticular,
    query,
  } = useSelector((state) => state.daybook);

  // References to track changes
  const previousPageRef = useRef(page);
  const previousBranchRef = useRef(branch);
  const startDateRef = useRef(startDate);
  const endDateRef = useRef(endDate);
  const selectedCatagoryRef = useRef(selectedCatagory);
  const selectedParticularRef = useRef(selectedParticular);
  const previousQueryRef = useRef(query);
  useEffect(() => {
    // Fetch data only if any of the dependencies have changed
    if (
      previousPageRef.current !== page ||
      previousBranchRef.current !== branch ||
      startDateRef.current !== startDate ||
      endDateRef.current !== endDate ||
      selectedCatagoryRef.current !== selectedCatagory ||
      selectedParticularRef.current !== selectedParticular ||
      previousQueryRef.current !== query ||
      data?.length <= 0
    ) {
      dispatch(fetchDebits());
      startDateRef.current = startDate;
      endDateRef.current = endDate;
      previousPageRef.current = page;
      previousBranchRef.current = branch;
      selectedCatagoryRef.current = selectedCatagory;
      selectedParticularRef.current = selectedParticular;
      previousQueryRef.current = query;
    }
  }, [
    dispatch,
    page,
    data?.length,
    branch,
    startDate,
    endDate,
    selectedCatagory,
    selectedParticular,
    query,
  ]);

  return [loading, error, data];
}
