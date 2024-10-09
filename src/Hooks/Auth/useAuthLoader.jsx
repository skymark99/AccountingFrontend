import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLoggedIn,
  setUser,
} from "../../Global-Variables/features/auth/authSlice";
import toast from "react-hot-toast";

export const useAuthLoader = (loaderData) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, isNewPassword } = useSelector((state) => state.auth);

  // Create a ref to hold the previous login status
  const previousLoginStatus = useRef(null);

  useEffect(() => {
    if (isLoggedIn) return;
    const loginStatus = loaderData?.isLoggedIn;
    const currentUser = loaderData?.currentUser || null;

    // Check if login status has changed
    if (loginStatus !== previousLoginStatus.current) {
      dispatch(setIsLoggedIn(loginStatus));
      dispatch(setUser(currentUser));

      if (!loginStatus) {
        navigate("/sign-in");
        toast.error("Login First");
      } else if (!isNewPassword) {
        toast.success("Login Successful");
      }

      // Update the previous login status
      previousLoginStatus.current = loginStatus;
    }
  }, [loaderData, dispatch, navigate]);
};
