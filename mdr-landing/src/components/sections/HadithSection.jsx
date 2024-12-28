import React from "react";

const HadithDisplay = () => {
  return (
    <div className="max-w-3xl mx-auto mt-12 space-y-6 bg-black/30 backdrop-blur-sm p-4 md:p-8 rounded-lg">
      <div className="text-right">
        <p
          className="text-xl md:text-2xl text-white leading-relaxed font-['Amiri']"
          dir="rtl"
        >
          عن ابن مسعود رضي الله عنه قال: سمعت رسول الله ﷺ يقول: «نَضَّرَ اللهُ
          امْرَأً سَمِع مِنَّا شيئا، فَبَلَّغَهُ كما سَمِعَهُ، فَرُبَّ مُبَلَّغٍ
          أوْعَى مِن سَامِعٍ».
        </p>
        <p
          className="text-xs md:text-sm text-gray-400 mt-2 font-['Amiri']"
          dir="rtl"
        >
          [صحيح] - [رواه الترمذي وابن ماجه وأحمد]
        </p>
      </div>

      <div className="text-left border-t border-white/20 pt-6">
        <p className="text-base md:text-lg text-white leading-relaxed font-['Amiri']">
          'Abdullah ibn Mas'ūd (RA) reported: I heard the Prophet ﷺ say: "May
          Allah brighten the person who hears something from us and conveys it
          as he heard it, for perhaps the one to whom it is conveyed is more
          mindful than the hearer."
        </p>
        <p className="text-xs md:text-sm text-gray-400 mt-2 font-['Amiri']">
          [Authentic hadith] - [Narrated by At-Termedhy & Ibn Majah & Ahmad] -
          [Sunan At-Termedhy - 2657]
        </p>
      </div>
    </div>
  );
};

export default HadithDisplay;
