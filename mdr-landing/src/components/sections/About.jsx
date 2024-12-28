import React from "react";

const About = () => (
  <section id="about" className="py-20 bg-slate-900">
    <div className="container mx-auto px-4">
      <h2
        className="text-4xl font-bold text-center text-white mb-8"
        data-aos="fade-up"
      >
        About Us
      </h2>
      <div
        className="max-w-3xl mx-auto text-center space-y-6"
        data-aos="fade-up"
      >
        <p className="text-gray-300 text-lg">
          MyDailyReminder was born from a shared vision among three McGill
          University software engineers who sought to bridge the gap between
          technology and Islamic knowledge dissemination.
        </p>

        <p className="text-gray-300 text-lg">
          Our journey began with a simple observation: while the digital world
          continues to evolve, accessing authentic Islamic content should be
          seamless and meaningful. As students of knowledge ourselves, we
          understand the importance of reliable sources and the impact of daily
          spiritual reminders.
        </p>

        <p className="text-gray-300 text-lg">
          Through MyDailyReminder, we aim to serve our ummah by leveraging our
          technical expertise to create platforms that make Islamic teachings
          more accessible. Our mission extends beyond mere content delivery – we
          strive to create an ecosystem where every Muslim can connect with the
          teachings of the Quran and Hadith in their daily lives.
        </p>

        <p className="text-gray-300 text-lg">
          What started as a humble initiative has grown into a family of
          applications: MyDailyVerse for Quranic reflections, MyDailyHadith for
          prophetic teachings, and soon, our mobile application to bring these
          blessed reminders to your pocket.
        </p>

        <div className="mt-12 p-6 bg-white/5 rounded-lg">
          <p className="text-emerald-400 text-lg italic">
            "Our goal is simple: to make authentic Islamic knowledge accessible
            to everyone, one reminder at a time, seeking nothing but the
            pleasure of Allah ﷻ inshAllah."
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default About;
