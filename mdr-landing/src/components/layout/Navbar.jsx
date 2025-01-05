import React, { memo, useState } from "react";

const Navbar = memo(function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { id: "journey", label: "Journey" },
    { id: "services", label: "Services" },
    { id: "features", label: "Features" },
    { id: "uses", label: "Uses" },
    { id: "subscribe", label: "Subscribe" },
    { id: "connect", label: "Connect" },
  ];

  return (
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
              aria-label="Toggle menu"
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
  );
});

export default Navbar;
