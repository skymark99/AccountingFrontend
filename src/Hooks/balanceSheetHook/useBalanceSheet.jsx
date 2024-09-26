import { useEffect, useRef } from "react";
import { fetchBalanceSheet } from "../../Global-Variables/features/BalancesheetSlice/balanceSheetSlice";
import { fetchTotal } from "../../Global-Variables/features/liabilitySlice/liabilitySlice";
import { useDispatch, useSelector } from "react-redux";

export function useBalanceSheet() {
  const dispatch = useDispatch();

  const { initialStatus } = useSelector((state) => state.balanceSheet);
  const { transactions } = useSelector((state) => state.transactions);

  useEffect(() => {
    if (initialStatus === "Success") return;
    dispatch(fetchBalanceSheet());
    dispatch(fetchTotal());
  }, [dispatch, initialStatus, transactions]);
}
