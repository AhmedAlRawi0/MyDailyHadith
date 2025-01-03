import React from "react";
import { Link } from "react-router-dom";

const BackToHome = () => {
  return (
    <Link
      to="/"
      className="fixed top-20 left-4 z-50 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm md:text-base shadow-lg"
    >
      <svg
        className="w-4 h-4 md:w-5 md:h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      <span className="hidden md:inline">Back to Home</span>
    </Link>
  );
};

export default BackToHome;
