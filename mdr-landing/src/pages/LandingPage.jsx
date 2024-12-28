// src/components/LandingPage.jsx
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import FeatureCard from "../components/ui/FeatureCard";
import {
  AuthenticIcon,
  EmailIcon,
  FreeIcon,
  LinkedInIcon,
  MultilingualIcon,
  PersonalGrowthIcon,
  RegularUpdatesIcon,
  UserFriendlyIcon,
} from "../components/Icons";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHintVisible, setIsHintVisible] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleNavigate = (url) => {
    window.open(url, "_blank");
  };

  // Navigation links
  const navLinks = [
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "features", label: "Features" },
    { id: "use", label: "Who Can Use MyDailyReminder?" },
    { id: "contact", label: "Contact" },
  ];

  // Use cases data
  const useCases = [
    {
      title: "Muslim Student Associations (MSAs)",
      description:
        "Perfect for displaying Islamic content during events and in prayer rooms",
    },
    {
      title: "Mosques & Islamic Centers",
      description:
        "Enhance your digital displays with authentic, regularly updated content",
    },
    {
      title: "Individuals & Businesses",
      description:
        "Access daily reminders and add a spiritual touch to any environment with beautiful verses and insights",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/islamic.jpg"
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
                Access authentic Islamic resources for personal growth,
                education, and daily spiritual enhancement through Quran verses
                and Hadith
              </strong>
            </p>

            {/* Hadith Section */}
            <div className="max-w-3xl mx-auto mt-12 space-y-6 bg-black/30 backdrop-blur-sm p-4 md:p-8 rounded-lg">
              <div className="text-right">
                <p
                  className="text-xl md:text-2xl text-white leading-relaxed font-['Amiri']"
                  dir="rtl"
                >
                  عن ابن مسعود رضي الله عنه قال: سمعت رسول الله ﷺ يقول: «نَضَّرَ
                  اللهُ امْرَأً سَمِع مِنَّا شيئا، فَبَلَّغَهُ كما سَمِعَهُ،
                  فَرُبَّ مُبَلَّغٍ أوْعَى مِن سَامِعٍ».
                </p>
                <p
                  className="text-xs md:text-sm text-gray-400 mt-2 font-['Amiri']"
                  dir="rtl"
                >
                  [صحيح] - [رواه الترمذي وابن ماجه وأحمد]
                </p>
              </div>

              <div className="text-left border-t border-white/20 pt-6">
                <p className="text-base md:text-lg text-white leading-relaxed font-['Amiri']">
                  'Abdullah ibn Mas'ūd (RA) reported: I heard the Prophet ﷺ say:
                  "May Allah brighten the person who hears something from us and
                  conveys it as he heard it, for perhaps the one to whom it is
                  conveyed is more mindful than the hearer."
                </p>
                <p className="text-xs md:text-sm text-gray-400 mt-2 font-['Amiri']">
                  [Authentic hadith] - [Narrated by At-Termedhy & Ibn Majah &
                  Ahmad] - [Sunan At-Termedhy - 2657]
                </p>
              </div>
            </div>
          </div>

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

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <h2
            className="text-4xl font-bold text-center text-white mb-8"
            data-aos="fade-up"
          >
            About Us
          </h2>
          <div
            className="max-w-3xl mx-auto text-center space-y-6"
            data-aos="fade-up"
          >
            <p className="text-gray-300 text-lg">
              MyDailyReminder was born from a shared vision among three McGill
              University software engineers who sought to bridge the gap between
              technology and Islamic knowledge dissemination.
            </p>

            <p className="text-gray-300 text-lg">
              Our journey began with a simple observation: while the digital
              world continues to evolve, accessing authentic Islamic content
              should be seamless and meaningful. As students of knowledge
              ourselves, we understand the importance of reliable sources and
              the impact of daily spiritual reminders.
            </p>

            <p className="text-gray-300 text-lg">
              Through MyDailyReminder, we aim to serve our ummah by leveraging
              our technical expertise to create platforms that make Islamic
              teachings more accessible. Our mission extends beyond mere content
              delivery – we strive to create an ecosystem where every Muslim can
              connect with the teachings of the Quran and Hadith in their daily
              lives.
            </p>

            <p className="text-gray-300 text-lg">
              What started as a humble initiative has grown into a family of
              applications: MyDailyVerse for Quranic reflections, MyDailyHadith
              for prophetic teachings, and soon, our mobile application to bring
              these blessed reminders to your pocket.
            </p>

            <div className="mt-12 p-6 bg-white/5 rounded-lg">
              <p className="text-emerald-400 text-lg italic">
                "Our goal is simple: to make authentic Islamic knowledge
                accessible to everyone, one reminder at a time, seeking nothing
                but the pleasure of Allah ﷻ inshAllah."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-800">
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
                  src="/KaabaLogo.png"
                  alt="MyDailyVerse"
                  className="w-20 h-20 mx-auto mb-4"
                />
                <h3 className="text-2xl font-semibold text-center mb-4">
                  MyDailyVerse
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Daily Quranic verses with translations and insights in
                  multiple languages.
                </p>
                <button
                  onClick={() =>
                    handleNavigate("https://my-daily-verse.vercel.app/")
                  }
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
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
                  src="/DotRLogo.png"
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
                  onClick={() =>
                    handleNavigate("https://my-daily-hadith.vercel.app/")
                  }
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
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
                  src="/ProphetMosque.png"
                  alt="Mobile App"
                  className="w-20 h-20 mx-auto mb-4"
                />
                <h3 className="text-2xl font-semibold text-center mb-4">
                  Mobile App
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  🚧 In the works, stay tuned! Take your daily reminders
                  wherever you go.
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
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-white">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FreeIcon />}
              title="100% Free"
              description="Access all resources completely free of charge, making Islamic knowledge accessible to everyone"
            />
            <FeatureCard
              icon={<AuthenticIcon />}
              title="Authentic Sources"
              description="All content is verified from authentic Islamic sources and scholarly interpretations"
            />
            <FeatureCard
              icon={<PersonalGrowthIcon />}
              title="Personal Growth"
              description="Enhance your Islamic knowledge at your own pace for personal development and spiritual growth"
            />
            <FeatureCard
              icon={<MultilingualIcon />}
              title="Multilingual Support"
              description="Access content in multiple languages to better understand Islamic teachings"
            />
            <FeatureCard
              icon={<UserFriendlyIcon />}
              title="User-Friendly Interface"
              description="Easy-to-navigate platform designed for seamless learning experience"
            />
            <FeatureCard
              icon={<RegularUpdatesIcon />}
              title="Regular Updates"
              description="Continuously updated content to provide comprehensive Islamic knowledge"
            />
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use" className="py-20 bg-slate-800">
        <div className="container mx-auto px-4">
          <h2
            className="text-2xl md:text-4xl font-bold text-center text-white mb-16"
            data-aos="fade-up"
          >
            Who Can Use MyDailyReminder?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-lg p-6"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3 className="text-xl font-semibold text-emerald-400 mb-4">
                  {useCase.title}
                </h3>
                <p className="text-gray-300">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-slate-700">
        <div className="container mx-auto px-4">
          <h2
            className="text-2xl md:text-4xl font-bold text-center text-white mb-16"
            data-aos="fade-up"
          >
            Powered By
          </h2>
          <div
            className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12"
            data-aos="fade-up"
          >
            <a
              href="https://hadeethenc.com/en/home"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-105 transition bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg"
            >
              <img
                src="/HadeethEncLogo.png"
                alt="HadeethEnc"
                className="h-12 md:h-16"
              />
            </a>
            <a
              href="https://quranenc.com/en/home"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-105 transition bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-lg"
            >
              <img
                src="/QuranEncLogo.png"
                alt="QuranEnc"
                className="h-12 md:h-16"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Connect With Us
          </h2>
          <div className="flex flex-col items-center space-y-6">
            <a
              href="https://www.linkedin.com/company/mydailyreminder"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 text-xl"
            >
              <LinkedInIcon className="w-8 h-8" />
              <span>Follow us on LinkedIn</span>
            </a>
            <a
              href="mailto:mydailyreminder24@gmail.com"
              className="flex items-center space-x-2 text-gray-300 hover:text-gray-200 text-xl"
            >
              <EmailIcon className="w-8 h-8" />
              <span>mydailyreminder24@gmail.com</span>
            </a>
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

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img
                  src="/KaabaLogo.png"
                  alt="MyDailyReminder Logo"
                  className="h-8 w-8"
                />
                <div className="text-xl md:text-2xl font-bold">
                  MyDaily<span className="text-emerald-600">Reminder</span>
                </div>
              </div>
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-700 hover:text-emerald-500"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
            {/* Navigation links */}
            <div
              className={`${
                isMenuOpen ? "block" : "hidden"
              } md:block mt-4 md:mt-0`}
            >
              <div className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className="text-lg font-semibold text-gray-700 hover:text-emerald-500 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {isHintVisible && (
        <div className="fixed right-4 bottom-4 max-w-sm bg-emerald-900/90 backdrop-blur-sm text-white p-4 rounded-lg shadow-lg z-50 animate-fade-in-right">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-emerald-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-semibold text-emerald-400">Work in Progress</span>
            </div>
            <button 
              onClick={() => setIsHintVisible(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <p>
              We're continuously working to enhance MyDailyReminder with new features and improvements:
            </p>
            <ul className="list-disc list-inside pl-2 space-y-1 text-emerald-200">
              <li>Mobile app development in progress</li>
              <li>Miscellaneous features and improvements</li>
            </ul>
            <p className="text-emerald-200 italic mt-2">
              Your feedback and suggestions are valuable to us as we grow this project for our Ummah iA.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
