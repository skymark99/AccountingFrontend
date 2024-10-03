import React from "react";
import "./FullScreenLoader.css"; // Updated CSS file name

const FullScreenLoader = () => {
  return (
    <div className="full-screen-loader">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default FullScreenLoader;
