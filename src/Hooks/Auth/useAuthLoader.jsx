import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setIsLoggedIn,
  setUser,
} from "../../Global-Variables/features/auth/authSlice";
import toast from "react-hot-toast";

export const useAuthLoader = (loaderData) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const loginStatus = loaderData?.isLoggedIn;
    dispatch(setIsLoggedIn(loginStatus));
    dispatch(setUser(loaderData?.currentUser || null));

    if (!loginStatus) {
      navigate("/sign-in");
      toast.error("Login First");
    } else {
      toast.success("Login Successfull");
    }
  }, [loaderData, dispatch, navigate]);

  useEffect(() => {}, []);
};
