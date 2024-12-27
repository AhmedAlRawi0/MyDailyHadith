// src/components/LandingPage.jsx
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleNavigate = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/islamic.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10" data-aos="fade-up">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            MyDaily<span className="text-emerald-500">Reminder</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Enriching lives with daily doses of wisdom from the Quran and Hadith. 
            A spiritual companion for your daily journey of faith and reflection.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => handleNavigate('#products')} 
                    className="bg-emerald-500 text-white px-8 py-3 rounded-full hover:bg-emerald-600 transition">
              Explore Our Products
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-16" data-aos="fade-up">
            Our Products
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* MyDailyVerse Card */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden" data-aos="fade-up">
              <div className="p-6">
                <img src="/KaabaLogo.png" alt="MyDailyVerse" className="w-20 h-20 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-center mb-4">MyDailyVerse</h3>
                <p className="text-gray-600 text-center mb-6">
                  Daily Quranic verses with translations and insights in multiple languages.
                </p>
                <button
                  onClick={() => handleNavigate('https://my-daily-verse.vercel.app/')}
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                  Visit MyDailyVerse
                </button>
              </div>
            </div>

            {/* MyDailyHadith Card */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden" data-aos="fade-up" data-aos-delay="100">
              <div className="p-6">
                <img src="/DotRLogo.png" alt="MyDailyHadith" className="w-20 h-20 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-center mb-4">MyDailyHadith</h3>
                <p className="text-gray-600 text-center mb-6">
                  Authentic hadiths with explanations in Arabic, English, and French.
                </p>
                <button
                  onClick={() => handleNavigate('https://my-daily-hadith.vercel.app/')}
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                >
                  Visit MyDailyHadith
                </button>
              </div>
            </div>

            {/* Mobile App Card */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden" data-aos="fade-up" data-aos-delay="200">
              <div className="p-6">
                <img src="/mobile-app-icon.png" alt="Mobile App" className="w-20 h-20 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-center mb-4">Mobile App</h3>
                <p className="text-gray-600 text-center mb-6">
                  Coming soon! Take your daily reminders wherever you go.
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

      {/* Features Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-16" data-aos="fade-up">
            Main Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-16" data-aos="fade-up">
            Who Can Use MyDailyReminder?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} 
                   className="bg-white/10 backdrop-blur-lg rounded-lg p-6" 
                   data-aos="fade-up" 
                   data-aos-delay={index * 100}>
                <h3 className="text-xl font-semibold text-emerald-400 mb-4">{useCase.title}</h3>
                <p className="text-gray-300">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-8" data-aos="fade-up">
            About Us
          </h2>
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <p className="text-gray-300 mb-6">
              MyDailyReminder was born from a desire to make Islamic knowledge more accessible and 
              engaging for everyone. Our mission is to help people connect with the teachings of 
              the Quran and Hadith in their daily lives.
            </p>
            <p className="text-gray-300">
              We strive to provide authentic content, verified translations, and meaningful insights 
              that can benefit both individuals and communities.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-16" data-aos="fade-up">
            Powered By
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-12" data-aos="fade-up">
            <img src="/HadeethEncLogo.png" alt="HadeethEnc" className="h-16" />
            <img src="/QuranEncLogo.png" alt="QuranEnc" className="h-16" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-16" data-aos="fade-up">
            Contact Us
          </h2>
          <div className="max-w-xl mx-auto">
            <form className="space-y-6" data-aos="fade-up">
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} MyDailyReminder. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Features data
const features = [
  {
    icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>,
    title: "Daily Updates",
    description: "Fresh content every day, automatically updated at midnight"
  },
  {
    icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>,
    title: "Multi-language Support",
    description: "Content available in Arabic, English, and French"
  },
  // Add more features...
];

// Use cases data
const useCases = [
  {
    title: "Muslim Student Associations (MSAs)",
    description: "Perfect for displaying Islamic content during events and in prayer rooms"
  },
  {
    title: "Mosques & Islamic Centers",
    description: "Enhance your digital displays with authentic, regularly updated content"
  },
  {
    title: "Business Establishments",
    description: "Add a spiritual touch to your environment with beautiful verses and hadith displays"
  },
  // Add more use cases...
];

export default LandingPage;