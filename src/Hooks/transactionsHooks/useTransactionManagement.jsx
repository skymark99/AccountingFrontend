// hooks/useTransactionManagement.js

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useTransactions } from "./useTransactions";
import {
  setIsAllSelected,
  setSelected,
} from "../../Global-Variables/features/dayBookSlice/dayBookSlice";

export function useTransactionManagement(onSetTotal) {
  const [loading, error, transactions] = useTransactions();

  const { currentPage, startPage } = useSelector((state) => state.transactions);
  const { selected, allSelected } = useSelector((state) => state.daybook);

  const viewSix = transactions.slice(startPage, startPage + 6);

  const dispatch = useDispatch();

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
  }, [allSelected]);

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
    transactions,
    viewSix,
  };
}
