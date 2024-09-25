import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setIsAllSelected,
  setSelected,
} from "../../Global-Variables/features/dayBookSlice/dayBookSlice";
import { useDebits } from "./useDebits";

export function useDebitsManagement(onSetTotal) {
  const [loading, error, debits] = useDebits();
  const { currentPage, startPage } = useSelector((state) => state.debit);
  const { selected, allSelected } = useSelector((state) => state.daybook);

  const dispatch = useDispatch();
  const viewSix = debits.slice(startPage, startPage + 6);

  useEffect(() => {
    if (selected.length === viewSix.length && viewSix.length >= 1) {
      dispatch(setIsAllSelected(true));
      dispatch(setSelected(viewSix));
    } else dispatch(setIsAllSelected(false));
  }, [selected.length]);

  useEffect(() => {
    if (allSelected) {
      dispatch(setSelected(viewSix));
    } else if (
      !allSelected &&
      selected.length === viewSix.length &&
      viewSix.length >= 1
    ) {
      dispatch(setSelected([]));
    }
  }, [allSelected, dispatch]);

  useEffect(() => {
    const total = selected.reduce((acc, val) => val.amount + acc, 0);
    const items = selected.length;
    onSetTotal([total, items]);
  }, [selected]);

  useEffect(() => {
    dispatch(setSelected([]));
  }, [currentPage, dispatch]);

  return {
    currentPage,
    loading,
    error,
    debits,
    viewSix,
  };
}
