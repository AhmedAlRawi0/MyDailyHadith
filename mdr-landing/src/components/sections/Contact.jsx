import React from "react";
import { EmailIcon, LinkedInIcon } from "../Icons";

const Contact = () => (
  <section id="connect" className="py-16 bg-slate-800">
    <div className="container mx-auto px-4">
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
);

export default Contact;
