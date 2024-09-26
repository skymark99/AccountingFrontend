import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../Global-Variables/features/dayBookSlice/transactionSlice";

export function useTransactions() {
  const dispatch = useDispatch();
  const {
    transactions: data,
    loading,
    page,
    error,
  } = useSelector((state) => state.transactions);
  const {
    currentDayBookBranch: branch,
    dayBookStartDate: startDate,
    dayBookEndDate: endDate,
    selectedCatagory: category,
    selectedParticular: particular,
    query,
    initialStatus,
  } = useSelector((state) => state.daybook);

  const prevPageRef = useRef(page);
  const prevBranchRef = useRef(branch);
  const prevStartDateRef = useRef(startDate);
  const prevEndDateRef = useRef(endDate);
  const preCategoryRef = useRef(category);
  const preParticularRef = useRef(particular);
  const preQueryRef = useRef(query);

  useEffect(() => {
    if (initialStatus === "Success") return;
    // Fetch data on initial mount and when dependencies change
    if (
      prevPageRef.current !== page ||
      prevBranchRef.current !== branch ||
      prevStartDateRef.current !== startDate ||
      prevEndDateRef.current !== endDate ||
      preCategoryRef.current !== category ||
      preParticularRef.current !== particular ||
      !data?.length || // Ensure fetch on initial mount when data is empty
      preQueryRef.current !== query
    ) {
      dispatch(fetchTransactions());

      // Update refs to the current values after fetching
      prevPageRef.current = page;
      prevBranchRef.current = branch;
      prevStartDateRef.current = startDate;
      prevEndDateRef.current = endDate;
      preCategoryRef.current = category;
      preParticularRef.current = particular;
      preQueryRef.current = query;
    }
  }, [
    dispatch,
    page,
    branch,
    startDate,
    endDate,
    data?.length,
    category,
    particular,
    query,
    initialStatus,
  ]); // Depend on data length to trigger on initial mount

  return [loading, error, data];
}
