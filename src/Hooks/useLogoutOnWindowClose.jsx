import { useEffect } from "react";

const URL = import.meta.env.VITE_URL;
export const useLogoutOnWindowClose = () => {
  useEffect(() => {
    let isRefreshing = false;

    const handleBeforeUnload = (event) => {
      if (event.persisted) {
        isRefreshing = true;
      }
    };

    const handleUnload = (event) => {
      if (!isRefreshing) {
        const url = `${URL}/v1/user/logout`;
        const data = new Blob([], { type: "application/json" });
        navigator.sendBeacon(url, data);
      }
    };

    window.addEventListener("pagehide", handleUnload);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("pagehide", handleUnload);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
};
