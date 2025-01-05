import React from "react";

const Partners = () => (
  <section className="py-20 bg-slate-800">
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
            src="./HadeethEncLogo.png"
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
            src="./QuranEncLogo.png"
            alt="QuranEnc"
            className="h-12 md:h-16"
          />
        </a>
      </div>
    </div>
  </section>
);

export default Partners;
