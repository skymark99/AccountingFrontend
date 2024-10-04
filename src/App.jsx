import { useLoaderData, Outlet } from "react-router-dom";
import SideBar from "./Layout/Sidebar/SideBar";
import { Toaster } from "react-hot-toast";
import { useAuthLoader } from "./Hooks/Auth/useAuthLoader";
import { useFetchCategories } from "./Hooks/Catagories/useFetchCatagories";
import { useDispatch, useSelector } from "react-redux";
import ResetPasswordModal from "./Layout/ResetPasswordForm/ResetPasswordModal";
import {
  setIsNewPassword,
  setTime,
} from "./Global-Variables/features/auth/authSlice";
import Countdown from "./Components/Coundown/Countdown";
import { useEffect } from "react";
import { getInitialTime } from "./Components/Coundown/countdownActions";

function App() {
  const loaderData = useLoaderData();
  const { isLoggedIn, isNewPassword } = useSelector((state) => state.auth);

  // Custom hook for authentication
  useAuthLoader(loaderData);
  // Custom hook for fetching categories
  useFetchCategories();

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setIsNewPassword(false));
  };

  useEffect(() => {
    const handleClick = (event) => {
      dispatch(setTime(getInitialTime()));
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="container">
      {isLoggedIn && <Countdown />}
      {isLoggedIn && (
        <ResetPasswordModal
          isNewPassword={isNewPassword}
          handleClose={handleClose}
        />
      )}
      <Toaster />
      {isLoggedIn && <SideBar />}
      {isLoggedIn && <Outlet />}
    </div>
  );
}

export default App;
