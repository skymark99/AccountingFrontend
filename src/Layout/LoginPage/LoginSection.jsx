import React, { useEffect, useState } from "react";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Global-Variables/features/auth/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function LoginSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isLoggedIn } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 3000,
        position: "top-center",
        style: {
          background: "white !important",
          color: "red !important",
          fontSize: "1.5rem !imortant",
          zIndex: "1000 !important",
        },
      });
    }
  }, [error]);

  return (
    <div className="signup-section">
      <form onSubmit={handleSubmit}>
        <label htmlFor="chk" aria-hidden="true">
          Login
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          required
        />
        <button style={loading ? { opacity: ".7" } : {}} type="submit">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginSection;
