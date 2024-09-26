import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCalcBudget } from "../../Global-Variables/features/BudgetPlannerSlice/budgetPlannerSlice";

export const useBudgetPlanner = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.budget);

  useEffect(() => {
    if (data.length >= 1) return;
    dispatch(getCalcBudget());
  }, [dispatch, data.length]);
};
