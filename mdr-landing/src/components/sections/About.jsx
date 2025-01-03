import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section id="about" className="py-16 bg-slate-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Our Journey
        </h2>
        <div className="max-w-3xl mx-auto text-gray-300 space-y-6">
          <p className="text-lg leading-relaxed">
            MyDailyReminder started as a simple idea during December 2024 - to
            make authentic Islamic content more accessible to everyone. What
            began as a personal project to display daily Hadiths in our
            university MSA has grown into a comprehensive platform to serve
            Muslims worldwide insh'Allah.
          </p>

          <p className="text-lg leading-relaxed">
            Our mission is to help Muslims connect with their faith daily
            through authentic sources. We started with MyDailyHadith and
            expanded to include MyDailyVerse, making both Hadith and Quranic
            verses easily accessible.
          </p>

          <div className="mt-6 text-center">
            <Link
              to="/about"
              className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors group bg-slate-800/50 px-6 py-3 rounded-lg"
            >
              <span className="text-lg">Learn more about our platform</span>
              <svg
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
