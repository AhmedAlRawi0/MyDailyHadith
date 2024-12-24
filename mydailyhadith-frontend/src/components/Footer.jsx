import React from "react";
import "../styling/Footer.css";

const Footer = () => (
  <footer className="text-center mt-8 text-gray-500 text-sm">
    <p>
      &copy; {new Date().getFullYear()} MyDailyHadith | Powered by{" "}
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
      </a>{" "}
      | View on{" "}
      <a
        href="https://github.com/AhmedAlRawi0/MyDailyHadith"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="GithubLogo.png"
          alt="GitHub Repository"
          style={{ height: "20px", verticalAlign: "middle" }}
        />
      </a>{" "}
      |{" "}
      <a
        href="https://docs.google.com/document/d/1g4KOyCPDkplTyzxWCJ9GcllIjWUIBsXbHYzUQuxkqyc/edit?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
      >
        About & Terms
      </a>{" "}
      |{" "}
      <a
        href="https://forms.gle/k2bmiDgvTahbkGb87"
        target="_blank"
        rel="noopener noreferrer"
      >
        Get In Touch
      </a>
    </p>
  </footer>
);

export default Footer;
