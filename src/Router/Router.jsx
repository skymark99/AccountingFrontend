import React, { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import ErrorPage from "../Layout/Error/ErrorPage";
import Login from "../Layout/LoginPage/Login";
import axios from "axios";

// Lazy load the components
const Dashboard = lazy(() => import("../Pages/Dashboard/Dashboard"));
const DayBook = lazy(() => import("../Pages/Daybook/DayBook"));
const BalanceSheet = lazy(() => import("../Pages/BalanceSheet/BalanceSheet"));
const BranchPNL = lazy(() => import("../Pages/BranchPNL/BranchPNL"));
const Liability = lazy(() => import("../Pages/Liability/Liability"));
const Outstanding = lazy(() => import("../Pages/Outstanding/Outstanding"));
const Reminders = lazy(() => import("../Pages/Reminders/Reminders"));
const BudgetPlanner = lazy(() =>
  import("../Pages/BudgetPlanner/BudgetPlanner")
);
const Commition = lazy(() => import("../Pages/UnivercityCommition/Commition"));

import FullScreenLoader from "../Components/Loader/FullScreenLoader";

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
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "daybook",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <DayBook />
          </Suspense>
        ),
      },
      {
        path: "balance-sheet",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <BalanceSheet />
          </Suspense>
        ),
      },
      {
        path: "liability",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <Liability />
          </Suspense>
        ),
      },
      {
        path: "outstanding",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <Outstanding />
          </Suspense>
        ),
      },
      {
        path: "reminders",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <Reminders />
          </Suspense>
        ),
      },
      {
        path: "branch-pnl",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <BranchPNL />
          </Suspense>
        ),
      },
      {
        path: "budget-planner",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <BudgetPlanner />
          </Suspense>
        ),
      },
      {
        path: "commition",
        element: (
          <Suspense fallback={<FullScreenLoader />}>
            <Commition />
          </Suspense>
        ),
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
