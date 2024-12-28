import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import About from "../components/sections/About";
import Contact from "../components/sections/Contact";
import Features from "../components/sections/Features";
import Hero from "../components/sections/Hero";
import Partners from "../components/sections/Partners";
import Services from "../components/sections/Services";
import UseCases from "../components/sections/UseCases";
import WorkInProgressHint from "../components/ui/WorkInProgressHint";

const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Hero />
      <About />
      <Services />
      <Features />
      <UseCases />
      <Partners />
      <Contact />
      <WorkInProgressHint />
    </div>
  );
};

export default LandingPage;
