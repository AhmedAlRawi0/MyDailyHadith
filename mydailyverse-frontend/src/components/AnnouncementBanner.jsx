import React, { useState } from "react";
import "../styling/AnnouncementBanner.css";

const AnnouncementBanner = ({ language, onClose }) => {
  const [showBanner, setShowBanner] = useState(true);

  const bannerMessage =
    language === "English"
      ? "🚀 This website is still being improved. Stay tuned for MyDailyReminder mobile app! 🌟"
      : "🚀 Ce site est encore en cours d'amélioration. Restez à l'écoute pour l'application mobile MyDailyReminder! 🌟";

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
      <span>{bannerMessage}</span>
    </div>
  );
};

export default AnnouncementBanner;
