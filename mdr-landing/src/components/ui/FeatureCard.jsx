import React from "react";
import { useApp } from "../../context/AppContext";

function FeatureCard({ feature }) {
  const { theme } = useApp();

  return (
    <div className={`feature-card ${theme}`}>
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
        <div className="bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          {feature.icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          {feature.title}
        </h3>
        <p className="text-gray-400">{feature.description}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
