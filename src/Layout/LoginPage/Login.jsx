import React from "react";
import "./login.css";
import { Toaster } from "react-hot-toast";
import LoginSection from "./LoginSection";
import ForgotPassword from "./ForgotPassword";

function Login() {
  // useAllFetch();

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
