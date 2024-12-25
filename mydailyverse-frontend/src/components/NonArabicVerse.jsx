import React from 'react';
import '../styling/App.css';

const NonArabicVerse = ({ verse, language }) => {
  if (!verse) {
    return <p className="text-gray-600 text-center">Loading verse...</p>;
  }

  return (
    <section className="non-arabic-verse bg-gray-50 p-4 rounded shadow-md">
      <h2 className="text-blue-700 text-xl font-semibold mb-4">
        {language === 'English' ? 'The Verse' : 'Le Verset'}
      </h2>
      <p className="text-gray-800 text-sm leading-relaxed mb-4">{verse.translation}</p>
      <div className="metadata-inline">
        <p className="text-gray-600 text-sm">
          <strong>{language === 'English' ? 'Surah:' : 'Sourate:'}</strong> {verse.sura}
        </p>
        <p className="text-gray-600 text-sm">
          <strong>{language === 'English' ? 'Verse:' : 'Verset:'}</strong> {verse.aya}
        </p>
      </div>
      {verse.footnotes && verse.footnotes.trim() !== '' && ( // Render footnotes only if present
        <>
          <h3 className="text-lg font-medium text-blue-600 mt-4">
            {language === 'English' ? 'Footnotes:' : 'Notes de bas de page:'}
          </h3>
          <p className="text-gray-700 text-sm leading-relaxed">{verse.footnotes}</p>
        </>
      )}
    </section>
  );
};

export default NonArabicVerse;
