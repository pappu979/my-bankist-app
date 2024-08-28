import React from "react";

const LogoutTimer = ({ sendTime }) => {
  return (
    <p className="logout-timer">
      You will be logged out in <span className="timer">{sendTime}</span>
    </p>
  );
};

export default LogoutTimer;
