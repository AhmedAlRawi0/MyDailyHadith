import React from "react";
import "../styling/Error.css";

const Error = ({ message, email }) => {
  return (
    <div className="error-container">
      <div className="error-box">
        <h2 className="error-title">An Error Occurred</h2>
        <p className="error-message">{message}</p>
        <p className="error-contact">
          If the issue persists, please send an email to{" "}
          <strong>{email}</strong>.
        </p>
      </div>
    </div>
  );
};

export default Error;
