import React from "react";

const NotifyBtn = ({ children, style }) => {
  return (
    <button className="btn notify-btn" style={style}>
      {children}
    </button>
  );
};

export default NotifyBtn;
