import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReminders } from "../Global-Variables/features/remindersSlice/remindersSlice.";

const URL = import.meta.env.VITE_URL;

export const useReminders = () => {
  const dispatch = useDispatch();

  const {
    reminders: data,
    page,
    reminderStartDate: startDate,
    reminderEndDate: endDate,
    status,
    loading,
    error,
    selectedCatagory,
    selectedParticular,
    query,
  } = useSelector((state) => state.reminders);

  const previousPageRef = useRef(page);
  const previousStatusRef = useRef(status);
  const previousStartDateRef = useRef(startDate);
  const previousEndDateRef = useRef(endDate);
  const previousSelectedCatagoryRef = useRef(selectedCatagory);
  const previousSelectedParticularRef = useRef(selectedParticular);
  const previousQueryRef = useRef(query);
  useEffect(() => {
    if (
      previousPageRef.current !== page ||
      data?.length === 0 ||
      previousStatusRef.current !== status ||
      previousEndDateRef.current !== endDate ||
      previousStartDateRef.current !== startDate ||
      previousSelectedCatagoryRef.current !== selectedCatagory ||
      previousSelectedParticularRef.current !== selectedParticular ||
      previousQueryRef.current !== query
    ) {
      dispatch(fetchReminders());
      previousPageRef.current = page;
      previousStatusRef.current = status;
      previousStartDateRef.current = startDate;
      previousEndDateRef.current = endDate;
      previousSelectedCatagoryRef.current = selectedCatagory;
      previousSelectedParticularRef.current = selectedParticular;
      previousQueryRef.current = query;
    }
  }, [
    dispatch,
    page,
    status,
    endDate,
    startDate,
    data?.length,
    selectedCatagory,
    selectedParticular,
    query,
  ]);

  return [loading, error, data];
};
