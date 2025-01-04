import React from "react";

const handleNavigate = (url) => {
  window.open(url, "_blank");
};

const Services = () => (
  <section id="services" className="py-16 bg-slate-800">
    <div className="container mx-auto px-4">
      <h2
        className="text-4xl font-bold text-center text-white mb-16"
        data-aos="fade-up"
      >
        Our Services
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {/* MyDailyVerse Card */}
        <div
          className="bg-white rounded-lg shadow-xl overflow-hidden"
          data-aos="fade-up"
        >
          <div className="p-6">
            <img
              src="./KaabaLogo.png"
              alt="MyDailyVerse"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold text-center mb-4">
              MyDailyVerse
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Daily Quranic verses with translations and insights in multiple
              languages.
            </p>
            <button
              onClick={() => handleNavigate("https://verse.mydailyreminder.ca")}
              className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition"
            >
              Visit MyDailyVerse
            </button>
          </div>
        </div>

        {/* MyDailyHadith Card */}
        <div
          className="bg-white rounded-lg shadow-xl overflow-hidden"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="p-6">
            <img
              src="./DotRLogo.png"
              alt="MyDailyHadith"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold text-center mb-4">
              MyDailyHadith
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Authentic hadiths with explanations and insights in multiple
              languages.
            </p>
            <button
              onClick={() => handleNavigate("https://hadith.mydailyreminder.ca")}
              className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition"
            >
              Visit MyDailyHadith
            </button>
          </div>
        </div>

        {/* Mobile App Card */}
        <div
          className="bg-white rounded-lg shadow-xl overflow-hidden"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="p-6">
            <img
              src="./ProphetMosque.png"
              alt="Mobile App"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold text-center mb-4">
              Mobile App
            </h3>
            <p className="text-gray-600 text-center mb-6">
              🚧 In the works, stay tuned! Take your daily reminders wherever
              you go.
            </p>
            <button
              className="w-full bg-gray-500 text-white py-2 rounded cursor-not-allowed"
              disabled
            >
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Services;
