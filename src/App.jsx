import { useLoaderData, Outlet } from "react-router-dom";
import SideBar from "./Layout/Sidebar/SideBar";
import { Toaster } from "react-hot-toast";
import { useAuthLoader } from "./Hooks/Auth/useAuthLoader";
import { useFetchCategories } from "./Hooks/Catagories/useFetchCatagories";
import { useDispatch, useSelector } from "react-redux";
import ResetPasswordModal from "./Layout/ResetPasswordForm/ResetPasswordModal";
import { setIsNewPassword } from "./Global-Variables/features/auth/authSlice";
import Countdown from "./Components/Coundown/Countdown";

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

  return (
    <div className="container">
      {/* {isLoggedIn && <Countdown />} */}
      {isLoggedIn && (
        <ResetPasswordModal
          isNewPassword={isNewPassword}
          handleClose={handleClose}
        />
      )}
      <Toaster />
      {isLoggedIn && <SideBar />}
      {isLoggedIn && <Outlet />}
      {/* <SideBar />
      <Outlet /> */}
    </div>
  );
}

export default App;
