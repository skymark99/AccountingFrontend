import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import ErrorPage from "../Layout/Error/ErrorPage";
import Login from "../Layout/LoginPage/Login";
import axios from "axios";

// Directly import the components
import Dashboard from "../Pages/Dashboard/Dashboard";
import DayBook from "../Pages/Daybook/DayBook";
import BalanceSheet from "../Pages/BalanceSheet/BalanceSheet";
import BranchPNL from "../Pages/BranchPNL/BranchPNL";
import Liability from "../Pages/Liability/Liability";
import Outstanding from "../Pages/Outstanding/Outstanding";
import Reminders from "../Pages/Reminders/Reminders";
import BudgetPlanner from "../Pages/BudgetPlanner/BudgetPlanner";
import Commition from "../Pages/UnivercityCommition/Commition";

const URL = import.meta.env.VITE_URL;

async function loader() {
  try {
    const res = await axios.post(
      `${URL}/v1/user/verify`,
      {}, // Assuming you might not need to send data in the body
      {
        withCredentials: true,
      }
    );

    if (res.data.status === "Success") {
      return res.data;
    } else {
      return res.data;
    }
  } catch (e) {
    // Check if e.response exists before accessing e.response.data
    return e.response
      ? e.response.data
      : { error: "An unexpected error occurred" };
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: loader,
    errorElement: <ErrorPage />, // Set ErrorPage as the error element
    children: [
      {
        path: "/",
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "daybook",
        element: <DayBook />,
      },
      {
        path: "balance-sheet",
        element: <BalanceSheet />,
      },
      {
        path: "liability",
        element: <Liability />,
      },
      {
        path: "outstanding",
        element: <Outstanding />,
      },
      {
        path: "reminders",
        element: <Reminders />,
      },
      {
        path: "branch-pnl",
        element: <BranchPNL />,
      },
      {
        path: "budget-planner",
        element: <BudgetPlanner />,
      },
      {
        path: "commition",
        element: <Commition />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
