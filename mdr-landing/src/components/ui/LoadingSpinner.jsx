import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500"></div>
        <p className="mt-4 text-emerald-500 text-lg font-semibold">
          Loading, spend this moment sending Salutations to the Prophet ﷺ
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
