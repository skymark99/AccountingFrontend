import { useDispatch } from "react-redux";
import { fetchDashboardData } from "../../Global-Variables/features/dashBoardSlice/dashBoardSlice";
import { fetchBankDetails } from "../../Global-Variables/fetch/details";
import { useEffect } from "react";
import { useTransactions } from "../transactionsHooks/useTransactions";
import { useDebits } from "../debitsHooks/useDebits";
import { useCredits } from "../creditsHooks/useCredits";
import { useLiabilities } from "../useLiabilities";
import { useOutStandings } from "../useOutstandings";
import { useReminders } from "../useReminders";
import { useBalanceSheet } from "../balanceSheetHook/useBalanceSheet";
import { useBranchWise } from "../useBranchWise/useBranchwise";
import { useBudgetPlanner } from "../useBudgetPlanner/useBudgetPlanner";

export const useAllFetch = () => {
  const dispatch = useDispatch();

  useTransactions();
  useDebits();
  useCredits();
  useLiabilities();
  useOutStandings();
  useReminders();
  useBalanceSheet();
  useBranchWise();
  useBudgetPlanner();

  useEffect(() => {
    dispatch(fetchDashboardData());
    dispatch(fetchBankDetails());
  }, [dispatch]);
};
