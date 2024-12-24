import React from "react";
import "../styling/HadithSections.css";

const NonArabicHadith = ({ hadeeth, language }) => {
  return (
    <section className="english bg-gray-50 p-4 rounded shadow-md">
      <h2 className="text-blue-700 text-xl font-semibold mb-4">
        {language === "English" ? "The Hadith" : "Le Hadith"}
      </h2>
      <p className="text-gray-800 text-sm leading-relaxed mb-4">
        {hadeeth.hadeeth}
      </p>

      <div className="metadata-inline">
        <p className="text-gray-600 text-sm">
          <strong>
            {language === "English" ? "Attribution:" : "Attribution:"}
          </strong>{" "}
          {hadeeth.attribution},{" "}
          <strong>{language === "English" ? "Grade:" : "Classement:"}</strong>{" "}
          {hadeeth.grade}
        </p>
      </div>

      <section className="explanation mt-4">
        <h3 className="text-lg font-medium text-blue-600">
          {language === "English" ? "Explanation" : "Explication"}:
        </h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          {hadeeth.explanation}
        </p>
      </section>

      {hadeeth.hints && hadeeth.hints.length > 0 && (
        <section className="hints mt-4">
          <h3 className="text-lg font-medium text-blue-600">
            {language === "English" ? "Benefits" : "Avantages"}:
          </h3>
          <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
            {hadeeth.hints.map((hint, index) => (
              <li key={index}>{hint}</li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
};

export default NonArabicHadith;
