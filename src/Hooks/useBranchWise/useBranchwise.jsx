import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBranchChart,
  fetchBranchTransaction,
  fetchBranchYearlyPnl,
} from "../../Global-Variables/features/BranchWisePnlSlice/branchWIsePnlSlice";

export const useBranchWise = () => {
  const {
    transactionData,
    curBranch,
    page,
    selectedCategory,
    selectedParticular,
    branchWiseStartDate,
    branchWiseEndDate,
    query,
  } = useSelector((state) => state.branchwise);

  const dispatch = useDispatch();

  const prevBranch = useRef(curBranch);
  const prevPage = useRef(page);
  const prevCategory = useRef(selectedCategory);
  const prevParticular = useRef(selectedParticular);
  const prevStartDate = useRef(branchWiseStartDate);
  const prevEndDate = useRef(branchWiseEndDate);

  useEffect(() => {
    if (
      prevBranch.current !== curBranch ||
      prevPage.current !== page ||
      prevCategory.current !== selectedCategory ||
      prevParticular.current !== selectedParticular ||
      prevStartDate.current !== branchWiseStartDate ||
      prevEndDate.current !== branchWiseEndDate ||
      transactionData.length <= 0 ||
      query !== ""
    ) {
      dispatch(fetchBranchTransaction());
      dispatch(fetchBranchChart());
      dispatch(fetchBranchYearlyPnl());
      prevBranch.current = curBranch;
      prevPage.current = page;
      prevCategory.current = selectedCategory;
      prevParticular.current = selectedParticular;
      prevStartDate.current = branchWiseStartDate;
      prevEndDate.current = branchWiseEndDate;
    }
  }, [
    dispatch,
    curBranch,
    page,
    selectedCategory,
    selectedParticular,
    transactionData.length,
    branchWiseStartDate,
    branchWiseEndDate,
    query,
  ]);
};
