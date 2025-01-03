import React from "react";
import BackToHome from "../components/ui/BackToHome";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <BackToHome />
      <div className="container mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-gray-300">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-8 md:mb-12 px-4">
            About MyDailyReminder
          </h1>

          <div className="space-y-12">
            <section className="bg-slate-800/50 rounded-lg p-6 md:p-8">
              <p className="text-base md:text-lg leading-relaxed">
                MyDailyReminder is a platform designed to share daily authentic
                Prophetic sayings (Hadiths/Hadeeths) and Quranic verses along
                with their translations and explanations. Our goal is to spread
                beneficial knowledge about Islam and the Sunnah of the Prophet
                Muhammad (ﷺ) in an accessible and user-friendly manner.
              </p>
            </section>

            <section className="bg-slate-800/50 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-emerald-400 mb-6">
                Features
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      Daily Hadith
                    </h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300">
                      <li>Daily authentic Hadiths in multiple languages</li>
                      <li>Support for Arabic, English, and French</li>
                      <li>Auto-refresh at midnight EST</li>
                      <li>Detailed explanations and references</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      Daily Quranic Verse
                    </h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300">
                      <li>Quranic verses with translations</li>
                      <li>Comprehensive Tafseer and footnotes</li>
                      <li>Enhanced readability and engagement</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      Interactive UI
                    </h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300">
                      <li>Responsive design for all devices</li>
                      <li>Seamless scrolling experience</li>
                      <li>Persistent user preferences</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      Ease of Access
                    </h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-300">
                      <li>Global accessibility 24/7</li>
                      <li>Email subscription service</li>
                      <li>Mobile-friendly interface</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-slate-800/50 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-emerald-400 mb-4">
                Who Can Use This?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
                <div className="bg-slate-700/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Mosques
                  </h3>
                  <p className="text-gray-300">
                    Display the website on digital screens to engage congregants
                    daily with authentic Islamic content.
                  </p>
                </div>

                <div className="bg-slate-700/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    MSAs
                  </h3>
                  <p className="text-gray-300">
                    Use as an educational tool during events or share on social
                    media platforms.
                  </p>
                </div>

                <div className="bg-slate-700/50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Individuals
                  </h3>
                  <p className="text-gray-300">
                    Learn and benefit from daily Quranic verses and Hadiths at
                    your own pace.
                  </p>
                </div>
              </div>
              <p className="mt-6 text-gray-300 italic">
                No prior permissions needed for non-commercial use.
              </p>
            </section>

            <section className="bg-slate-800/50 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-emerald-400 mb-4">
                Source of Content
              </h2>
              <p className="text-base md:text-lg leading-relaxed">
                All content is sourced from the reputable{" "}
                <a
                  href="https://hadeethenc.com/en/home"
                  className="text-emerald-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  HadeethEnc
                </a>{" "}
                and{" "}
                <a
                  href="https://quranenc.com/en/home"
                  className="text-emerald-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  QuraanEnc
                </a>{" "}
                platforms. These platforms follow the Ahlus-Sunnah Wal-Jama'ah
                Manhaj to ensure authenticity. We transmit this content as-is,
                without alteration, and do not have control over the content
                provided by these platforms.
              </p>
            </section>

            <section className="bg-slate-800/50 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-emerald-400 mb-4">
                Connect With Us
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
                <a
                  href="https://github.com/AhmedAlRawi0/MyDailyReminder"
                  className="bg-slate-700/50 p-6 rounded-lg hover:bg-slate-700 transition-colors group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-400">
                    GitHub
                  </h3>
                  <p className="text-gray-300">
                    Contribute to the development and improvement of our
                    platform.
                  </p>
                </a>

                <a
                  href="https://www.linkedin.com/company/mydailyreminder"
                  className="bg-slate-700/50 p-6 rounded-lg hover:bg-slate-700 transition-colors group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-400">
                    LinkedIn
                  </h3>
                  <p className="text-gray-300">
                    Follow us for updates and announcements about new features.
                  </p>
                </a>

                <a
                  href="mailto:mydailyreminder24@gmail.com"
                  className="bg-slate-700/50 p-6 rounded-lg hover:bg-slate-700 transition-colors group"
                >
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-emerald-400">
                    Email
                  </h3>
                  <p className="text-gray-300">
                    Contact us for inquiries, feedback, and suggestions.
                  </p>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
