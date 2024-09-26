import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLiability } from "../Global-Variables/features/liabilitySlice/liabilitySlice";

const URL = import.meta.env.VITE_URL;

export const useLiabilities = () => {
  const dispatch = useDispatch();

  const {
    liability: data,
    page,
    liabilityStartDate: startDate,
    liabilityEndDate: endDate,
    status,
    loading,
    error,
    selectedCatagory,
    selectedParticular,
    query,
  } = useSelector((state) => state.liability);

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
      previousQueryRef.current !== query ||
      previousEndDateRef.current !== endDate ||
      previousStartDateRef.current !== startDate ||
      previousSelectedCatagoryRef.current !== selectedCatagory ||
      previousSelectedParticularRef.current !== selectedParticular
    ) {
      dispatch(fetchLiability());
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
