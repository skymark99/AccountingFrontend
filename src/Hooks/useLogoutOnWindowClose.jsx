import { useEffect } from "react";

const URL = import.meta.env.VITE_URL;

export const useLogoutOnWindowClose = () => {
  useEffect(() => {
    let isRefresh = false;

    const handleBeforeUnload = (e) => {
      const confirmationMessage = "Are you sure you want to leave?";
      isRefresh = true;

      // Standard recommends returning the message
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    const handleUnload = () => {
      // Wait a tiny bit to see if it's a refresh
      setTimeout(() => {
        if (!isRefresh) {
          const url = `${URL}/v1/user/logout`;
          const data = new Blob([], { type: "application/json" });
          navigator.sendBeacon(url, data);
        }
      }, 0);
    };

    // For refresh detection
    const handlePageShow = (e) => {
      if (e.persisted) {
        // This is a refresh/back navigation
        isRefresh = true;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);
};
