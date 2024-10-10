import { useEffect } from "react";
import { logout } from "../Services/AxiosService";

export const useLogoutOnWindowClose = () => {
  useEffect(() => {
    let isRefreshing = false;

    const handleBeforeUnload = (event) => {
      // Set a flag to track if this is a refresh
      if (event.persisted) {
        isRefreshing = true;
      }
    };

    const handleUnload = async (event) => {
      // Only logout if it's not a refresh
      alert("hey there");
      console.log("is unload");
      if (!isRefreshing) {
        await logout();
      }
    };

    // Listen for page hide event which fires when the window is closed
    window.addEventListener("pagehide", handleUnload);
    // Listen for beforeunload to detect refresh
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("pagehide", handleUnload);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
};
