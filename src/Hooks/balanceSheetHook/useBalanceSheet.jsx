import { useEffect } from "react";
import { fetchBalanceSheet } from "../../Global-Variables/features/BalancesheetSlice/balanceSheetSlice";
import { fetchTotal } from "../../Global-Variables/features/liabilitySlice/liabilitySlice";
import { useDispatch } from "react-redux";

export function useBalanceSheet() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBalanceSheet());
    dispatch(fetchTotal());
  }, [dispatch]);
}
