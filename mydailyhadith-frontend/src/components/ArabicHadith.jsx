import React from "react";
import "../styling/HadithSections.css";

const ArabicHadeeth = ({ hadeeth }) => {
  return (
    <section className="arabic bg-gray-50 p-4 rounded shadow-md">
      <h2 className="text-green-700 text-xl font-semibold mb-4">الحديث</h2>
      <p className="font-[Amiri] text-lg text-right leading-relaxed text-gray-800 mb-4">
        {hadeeth.hadeeth_ar}
      </p>

      <div className="metadata-inline">
        <p className="text-gray-600 text-sm" dir="rtl">
          <strong>التخريج:</strong> {hadeeth.attribution_ar}،{" "}
          <strong>الصحة:</strong> {hadeeth.grade_ar}
        </p>
      </div>

      <section className="explanation mt-4">
        <h3 className="text-lg font-medium text-blue-600">الشرح:</h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          {hadeeth.explanation_ar}
        </p>
      </section>

      <h3 className="text-lg font-medium text-green-600 mb-2">الفوائد:</h3>
      <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
        {hadeeth.hints_ar.map((hint, index) => (
          <li key={index}>{hint}</li>
        ))}
      </ul>

      {hadeeth.words_meanings_ar && hadeeth.words_meanings_ar.length > 0 && (
        <>
          <h3 className="text-lg font-medium text-green-600 mt-4">
            معاني الكلمات:
          </h3>
          <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
            {hadeeth.words_meanings_ar.map((item, index) => (
              <li key={index}>
                <strong>{item.word}:</strong> {item.meaning}
              </li>
            ))}
          </ul>
        </>
      )}

      <section className="reference mt-4">
        <h3 className="text-lg font-medium text-blue-600">المصدر:</h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          {hadeeth.reference}
        </p>
      </section>
    </section>
  );
};

export default ArabicHadeeth;
