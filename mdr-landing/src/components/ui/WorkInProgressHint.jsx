import React, { useState } from "react";

const WorkInProgressHint = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed right-4 bottom-4 max-w-sm bg-emerald-900/90 backdrop-blur-sm text-white p-4 rounded-lg shadow-lg z-50 animate-fade-in-right">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <svg
            className="w-5 h-5 text-emerald-400 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-semibold text-emerald-400">
            Work in Progress
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="space-y-2 text-sm">
        <p>
          We're continuously working to enhance MyDailyReminder with new
          features and improvements:
        </p>
        <ul className="list-disc list-inside pl-2 space-y-1 text-emerald-200">
          <li>Mobile app development in progress</li>
          <li>General improvements and bug fixes</li>
        </ul>
        <p className="text-emerald-200 italic mt-2">
          Your feedback and suggestions are valuable to us as we grow this
          project for our ummah iA.
        </p>
      </div>
    </div>
  );
};

export default WorkInProgressHint;
