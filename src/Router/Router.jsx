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

let cachedVerification = null; // Cache variable to store verification data

async function loader() {
  // Check if we already have cached verification data
  if (cachedVerification) {
    return cachedVerification; // Return cached data
  }

  try {
    const res = await axios.post(
      `${URL}/v1/user/verify`,
      {}, // Assuming you might not need to send data in the body
      {
        withCredentials: true,
      }
    );

    if (res.data.status === "Success") {
      cachedVerification = res.data; // Cache the result

      return res.data;
    } else {
      return res.data;
    }
  } catch (e) {
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
    errorElement: <ErrorPage />,
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
