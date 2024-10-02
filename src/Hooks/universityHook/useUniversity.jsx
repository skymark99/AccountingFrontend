import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUniversity } from "../../Global-Variables/features/university/universitySlice";

const URL = import.meta.env.VITE_URL;

export const useUniversity = () => {
  const dispatch = useDispatch();

  const {
    universities: data,
    page,
    universityStartDate: startDate,
    universityEndDate: endDate,
    status,
    loading,
    error,
    query,
  } = useSelector((state) => state.university);

  const previousPageRef = useRef(page);
  const previousStatusRef = useRef(status);
  const previousStartDateRef = useRef(startDate);
  const previousEndDateRef = useRef(endDate);
  const previousQueryRef = useRef(query);

  useEffect(() => {
    if (
      previousPageRef.current !== page ||
      data?.length === 0 ||
      previousStatusRef.current !== status ||
      previousQueryRef.current !== query ||
      previousEndDateRef.current !== endDate ||
      previousStartDateRef.current !== startDate
    ) {
      dispatch(fetchUniversity());
      previousPageRef.current = page;
      previousStatusRef.current = status;
      previousStartDateRef.current = startDate;
      previousEndDateRef.current = endDate;
      previousQueryRef.current = query;
    }
  }, [dispatch, page, status, endDate, startDate, data?.length, query]);

  return [loading, error, data];
};
