import { configureStore } from "@reduxjs/toolkit";
import bankReducer from "./features/bankSlice";
import transactionReducer from "./features/dayBookSlice/transactionSlice";
import paginationSlice from "./features/paginationSlice";
import debitReducer from "./features/dayBookSlice/debitSlice";
import dayBookReducer from "./features/dayBookSlice/dayBookSlice";
import creditReducer from "./features/dayBookSlice/creditSlice";
import liabilityReducer from "./features/liabilitySlice/liabilitySlice";
import outstandinReducer from "./features/liabilitySlice/outstandingSlice";
import dashBoardReducer from "./features/dashBoardSlice/dashBoardSlice";
import remindersReducer from "./features/remindersSlice/remindersSlice.";
import balanceSheetReducer from "./features/BalancesheetSlice/balanceSheetSlice";
import branchWisePnlReducer from "./features/BranchWisePnlSlice/branchWIsePnlSlice";
import authSlice from "./features/auth/authSlice";
import budgetPlannerReducer from "./features/BudgetPlannerSlice/budgetPlannerSlice";
import catagorySlice from "./features/catagorySlice/catagorySlice";
import universitySlice from "./features/university/universitySlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    bank: bankReducer,
    daybook: dayBookReducer,
    transactions: transactionReducer,
    pagination: paginationSlice,
    debit: debitReducer,
    credit: creditReducer,
    liability: liabilityReducer,
    outstanding: outstandinReducer,
    dashboard: dashBoardReducer,
    reminders: remindersReducer,
    university: universitySlice,
    balanceSheet: balanceSheetReducer,
    branchwise: branchWisePnlReducer,
    budget: budgetPlannerReducer,
    catagories: catagorySlice,
  },
});
