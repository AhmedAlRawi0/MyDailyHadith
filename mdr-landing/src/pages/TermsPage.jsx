import React from "react";
import BackToHome from "../components/ui/BackToHome";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <BackToHome />
      <div className="container mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-gray-300">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-8 md:mb-12 px-4">
            Terms & Conditions of Usage
          </h1>

          <div className="space-y-6 md:space-y-12">
            <section className="bg-slate-800/50 rounded-lg p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-semibold text-emerald-400 mb-3 md:mb-4">
                Non-Commercial Use
              </h2>
              <div className="prose prose-invert">
                <p className="text-base md:text-lg leading-relaxed">
                  This platform is for educational and non-commercial purposes
                  only. Any form of monetization or commercial usage requires
                  explicit permission.
                </p>
              </div>
            </section>

            <section className="bg-slate-800/50 rounded-lg p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-semibold text-emerald-400 mb-3 md:mb-4">
                Authenticity of Content
              </h2>
              <div className="prose prose-invert">
                <p className="text-base md:text-lg leading-relaxed">
                  All content is directly sourced from{" "}
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
                  </a>
                  . While we ensure that the sources are authentic, we cannot
                  take responsibility for the interpretations or understandings
                  of individual users.
                </p>
              </div>
            </section>

            <section className="bg-slate-800/50 rounded-lg p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-semibold text-emerald-400 mb-3 md:mb-4">
                No Alteration of Content
              </h2>
              <div className="prose prose-invert">
                <p className="text-base md:text-lg leading-relaxed">
                  Users are not permitted to alter, modify, or misrepresent the
                  content displayed on this platform.
                </p>
              </div>
            </section>

            <section className="bg-slate-800/50 rounded-lg p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-semibold text-emerald-400 mb-3 md:mb-4">
                How to Use
              </h2>
              <div className="prose prose-invert">
                <ul className="list-disc pl-4 md:pl-6 space-y-2 md:space-y-3 text-base md:text-lg">
                  <li>
                    <strong className="text-emerald-400">Display:</strong>{" "}
                    Use the website on digital screens in your mosque, MSA, or
                    community center.
                  </li>
                  <li>
                    <strong className="text-emerald-400">Advertise:</strong>{" "}
                    Share the link on your social media platforms to engage your
                    community.
                  </li>
                  <li>
                    <strong className="text-emerald-400">Learn Daily:</strong>{" "}
                    Visit the platform daily to gain knowledge and insight into
                    the Sunnah and Quran.
                  </li>
                </ul>
              </div>
            </section>

            <section className="bg-slate-800/50 rounded-lg p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-semibold text-emerald-400 mb-3 md:mb-4">
                Feedback & Suggestions
              </h2>
              <div className="prose prose-invert">
                <p className="text-base md:text-lg leading-relaxed">
                  We value your feedback! If you have suggestions or require
                  technical assistance, please{" "}
                  <a
                    href="mailto:mydailyreminder24@gmail.com"
                    className="text-emerald-400 hover:underline"
                  >
                    contact us
                  </a>
                  . Your input helps us improve and serve the Ummah better iA.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
