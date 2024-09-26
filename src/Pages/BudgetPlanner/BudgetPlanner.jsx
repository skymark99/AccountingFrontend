import { useEffect } from "react";
import Navbar from "../../Components/Navbar";
import BudgetPlannerHeader from "./BudgetPlannerHeader/BudgetPlannerHeader";
import { useDispatch, useSelector } from "react-redux";
import { getCalcBudget } from "../../Global-Variables/features/BudgetPlannerSlice/budgetPlannerSlice";
import { useBudgetPlanner } from "../../Hooks/useBudgetPlanner/useBudgetPlanner";

function BudgetPlanner() {
  useBudgetPlanner();

  return (
    <div className="scroll-body budgetplanner">
      <div className="responsive-nav">
        <Navbar />
      </div>
      <div className="header">
        <h2>Budget Planner</h2>
      </div>
      <div className="entry_card_data">
        <BudgetPlannerHeader />
      </div>
    </div>
  );
}

export default BudgetPlanner;
