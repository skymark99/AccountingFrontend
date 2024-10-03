import React, { useEffect } from "react";
import { addTimer, getInitialTime } from "./countdownActions";
import { logout } from "../../Services/AxiosService";
import { useDispatch, useSelector } from "react-redux";
import { setTime } from "../../Global-Variables/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Countdown = () => {
  const navigate = useNavigate();
  const { time, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    let interval = null;

    if (time > 0) {
      interval = setInterval(() => {
        const newTime = time - 1;
        dispatch(setTime(newTime));
      }, 1000);
    } else if (time <= 0) {
      toast.error("Timer is over, please log in again.");
      logout();
      navigate("/sign-in");
      dispatch(setTime(0));
    }

    return () => clearInterval(interval);
  }, [time, dispatch, navigate, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(setTime(getInitialTime()));
      addTimer();
    }
  }, [isLoggedIn, dispatch]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  return (
    <h1 className="time-display" style={{ opacity: "0.3" }}>
      {formatTime(time)}
    </h1>
  );
};

export default Countdown;
