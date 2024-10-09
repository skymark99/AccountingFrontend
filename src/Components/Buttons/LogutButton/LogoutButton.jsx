import { useNavigate } from "react-router-dom";
import "./logoutButton.css";
import { useDispatch } from "react-redux";
import { logout } from "../../../Services/AxiosService";
import {
  setIsLoggedIn,
  setTime,
} from "../../../Global-Variables/features/auth/authSlice";
import { useState } from "react";
import { getInitialTime } from "../../Coundown/countdownActions";
import toast, { Toaster } from "react-hot-toast";

function LogoutButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout(); // Call your logout function
      // Dispatch actions to update the app state
      dispatch(setTime(getInitialTime())); // Assuming this is correct
      dispatch(setIsLoggedIn(false)); // Set logged-in status to false

      // Navigate to the sign-in page
      navigate("/sign-in");
    } catch (e) {
      setError(e.message); // Set the error message
      toast.error("Logout failed", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "white !important",
          color: "red !important",
          fontSize: "1.5rem !important",
          zIndex: "10000 !important",
        },
      });
    } finally {
      setLoading(false); // Always executed after try/catch
    }
  };
  return (
    <div className="logout-button-container">
      <Toaster />
      <button
        className="logout-button"
        onClick={handleLogout}
        style={{ opacity: loading ? "0.5" : "1" }}
        disabled={loading}
      >
        <div className="sign">
          <svg viewBox="0 0 512 512">
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
          </svg>
        </div>

        <div className="text">Logout</div>
      </button>
    </div>
  );
}

export default LogoutButton;
