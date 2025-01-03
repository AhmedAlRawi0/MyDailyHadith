import React, { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import AboutPage from "../../pages/AboutPage";
import LandingPage from "../../pages/LandingPage";
import TermsPage from "../../pages/TermsPage";
import { scrollToTop } from "../../utils/scrollUtils";
import { GitHubIcon } from "../Icons";

const Footer = () => {
  const location = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>

      <footer className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-emerald-400">
                Services
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://verse.mydailyreminder.ca"
                    className="hover:text-emerald-400 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MyDailyVerse
                  </a>
                </li>
                <li>
                  <a
                    href="https://hadith.mydailyreminder.ca"
                    className="hover:text-emerald-400 transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MyDailyHadith
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-emerald-400">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-emerald-400 transition"
                    onClick={scrollToTop}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="hover:text-emerald-400 transition"
                    onClick={scrollToTop}
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-emerald-400">
                Contribute
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/AhmedAlRawi0/MyDailyReminder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition flex items-center gap-2"
                  >
                    <GitHubIcon className="w-5 h-5" />
                    <span>GitHub Repository</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-slate-800">
            <p className="text-gray-400">
              © {new Date().getFullYear()} MyDailyReminder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
