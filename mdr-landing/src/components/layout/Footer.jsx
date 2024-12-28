import React from "react";

const Footer = () => (
  <footer className="py-8 bg-slate-900 border-t border-slate-800">
    <div className="container mx-auto px-4 text-center">
      <p className="text-gray-400">
      © {new Date().getFullYear()} MyDailyReminder. All rights reserved.
    </p>
  </div>
</footer>
);

export default Footer;
