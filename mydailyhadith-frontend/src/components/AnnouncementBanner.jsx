import React, { useState } from "react";
import "../styling/AnnouncementBanner.css";

const AnnouncementBanner = ({ message, onClose }) => {
  const [showBanner, setShowBanner] = useState(true);

  const handleCloseBanner = () => {
    setShowBanner(false);
    if (onClose) onClose(); // Optional callback
  };

  if (!showBanner) return null;

  return (
    <div className="announcement-banner">
      <button className="close-button" onClick={handleCloseBanner}>
        ✖
      </button>
      <span>{message}</span>
    </div>
  );
};

export default AnnouncementBanner;
