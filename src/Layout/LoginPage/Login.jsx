import React from "react";
import "./login.css";
import { Toaster } from "react-hot-toast";
import LoginSection from "./LoginSection";
import ForgotPassword from "./ForgotPassword";
import { useAllFetch } from "../../Hooks/useAllFetch/useAllFetch";
import { useSelector } from "react-redux";

function Login() {
  useAllFetch();

  // const { income, expense, profit, initialStatus } = useSelector(
  //   (state) => state.dashboard
  // );
  const { transactions, initialStatus } = useSelector(
    (state) => state.transactions
  );
  console.log(transactions, "transaction");
  console.log(initialStatus, "initialStatus");

  return (
    <div className="app-container">
      <Toaster />
      <div className="auth-box">
        <input
          type="checkbox"
          id="chk"
          className="hidden-checkbox"
          aria-hidden="true"
        />

        <LoginSection />
        <ForgotPassword />
      </div>
    </div>
  );
}

export default Login;
