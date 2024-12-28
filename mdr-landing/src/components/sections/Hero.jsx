import React from "react";
import HadithDisplay from "../sections/HadithSection";

const Hero = () => {
  return (
    <section className="min-h-screen relative flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="./islamic.jpg"
          alt="Islamic Architecture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            MyDaily<span className="text-emerald-400">Reminder</span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
            Enhance Your Islamic Knowledge Journey
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto px-4">
            <strong>
              Access authentic Islamic resources for personal growth, education,
              and daily spiritual enhancement through Quran verses and Hadith
            </strong>
          </p>
        </div>

        {/* Hadith Section */}
        <HadithDisplay />

        {/* Scroll Prompt */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
