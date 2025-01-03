import React from "react";
import "../styling/Footer.css";

const Footer = () => (
  <footer className="text-center mt-8 text-gray-500 text-sm">
    <p>
      &copy; {new Date().getFullYear()} MyDailyHadith | A service of{" "}
      <a
        href="https://mydailyreminder.ca"
        target="_blank"
        rel="noopener noreferrer"
      >
        MyDailyReminder
      </a>{" "}
      | Powered by{" "}
      <a
        href="https://hadeethenc.com/en/home"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="HadeethEncLogo.png"
          alt="HadeethEnc"
          style={{ height: "20px", verticalAlign: "middle" }}
        />
      </a>
    </p>
  </footer>
);

export default Footer;
