/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOutstandingData } from "../Global-Variables/features/liabilitySlice/outstandingSlice";

const URL = import.meta.env.VITE_URL;

export function useOutStandings() {
  const dispatch = useDispatch();
  // Access necessary states using useSelector
  const {
    outStanding: data,
    page,
    outStandingStartDate: startDate,
    outStandingEndDate: endDate,
    status,
    loading,
    error,
    selectedCatagory: category,
    selectedParticular: particular,
    query,
  } = useSelector((state) => state.outstanding);

  // References to track changes
  const previousPageRef = useRef(page);
  const previousStatusRef = useRef(status);
  const previousStartDateRef = useRef(startDate);
  const previousEndDateRef = useRef(endDate);
  const previousCategoryRef = useRef(category);
  const previousParticularRef = useRef(particular);
  const previousQueryRef = useRef(query);
  useEffect(() => {
    // Fetch data only if any of the dependencies have changed

    if (
      previousPageRef.current !== page ||
      previousStatusRef.current !== status ||
      previousStartDateRef.current !== startDate ||
      previousEndDateRef.current !== endDate ||
      previousCategoryRef.current !== category ||
      previousParticularRef.current !== particular ||
      previousQueryRef.current !== query ||
      data?.length <= 0
    ) {
      dispatch(fetchOutstandingData());
      previousPageRef.current = page;
      previousStatusRef.current = status;
      previousStartDateRef.current = startDate;
      previousEndDateRef.current = endDate;
      previousCategoryRef.current = category;
      previousParticularRef.current = particular;
      previousQueryRef.current = query;
    }
  }, [
    dispatch,
    page,
    status,
    startDate,
    endDate,
    category,
    particular,
    data?.length,
    query,
  ]);

  return [loading, error, data];
}
