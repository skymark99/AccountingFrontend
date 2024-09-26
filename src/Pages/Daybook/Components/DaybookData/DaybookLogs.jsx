import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { RiExpandDiagonalFill } from "react-icons/ri";
import { GrContract } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogs } from "../../../../Global-Variables/features/auth/authSlice";

const DaybookLog = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { logs, logsLoading, logsError, user } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchLogs({ userId: user._id }));
    }
  }, [dispatch, user?._id]);

  const toggleFullScreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
        setIsFullScreen(true);
      } catch (err) {
        console.error("Error attempting to enable fullscreen:", err);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`daybook-log ${isFullScreen ? "fullscreen" : ""}`}
    >
      <div className="log-head">
        <div
          className="bp-dropdown-container"
          style={{ margin: "1.5rem 0rem" }}
        >
          <div className="bp-select-wrapper">
            <select className="bp-select" disabled>
              <option value="All logs">All logs</option>
              <option value="Edited logs">Edited logs</option>
              <option value="Added logs">Added logs</option>
            </select>
            <IoIosArrowDown className="bp-select-icon" />
          </div>
        </div>
        <div className="log-icons" onClick={toggleFullScreen}>
          {isFullScreen ? <GrContract /> : <RiExpandDiagonalFill />}
        </div>
      </div>
      <div className="log-container">
        {logsLoading ? (
          <p>Loading logs...</p>
        ) : logsError ? (
          <p>Error loading logs: {logsError}</p>
        ) : logs.length > 0 ? (
          logs.map((val, index) => (
            <div key={index} className="log-text">
              {val.log}
            </div>
          ))
        ) : (
          <p>No logs found.</p>
        )}
      </div>
    </div>
  );
};

export default DaybookLog;
