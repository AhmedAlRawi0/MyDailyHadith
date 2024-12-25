import React from 'react';
import '../styling/App.css';

const ArabicVerse = ({ verse }) => {
  if (!verse) {
    return <p className="text-gray-600 text-center">Loading verse...</p>;
  }

  return (
    <section className="arabic-verse bg-gray-50 p-4 rounded shadow-md">
      <h2 className="text-green-700 text-xl font-semibold mb-4">الآية</h2>
      <p className="font-[Amiri] text-lg text-right leading-relaxed text-gray-800 mb-4">
        {verse.arabic_text}
      </p>
      <div className="metadata-inline">
        <p className="text-gray-600 text-sm" dir="rtl">
          <strong>السورة:</strong> {verse.sura}
        </p>
      </div>
    </section>
  );
};

export default ArabicVerse;
