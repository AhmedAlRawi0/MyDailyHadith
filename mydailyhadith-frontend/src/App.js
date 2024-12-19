import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [hadeeth, setHadeeth] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHadeeth = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/daily-hadeeth'); // Replace with your backend URL
        setHadeeth(response.data);
      } catch (err) {
        setError('Failed to fetch the Hadeeth. Please try again later.');
      }
    };

    fetchHadeeth();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!hadeeth) {
    return <div className="loading">Loading Hadeeth...</div>;
  }

  return (
    <div className="container">
      <header>
        <h1>Hadith of the Day</h1>
      </header>
      <main>
        <div className="hadeeth grid grid-cols-2 gap-4">
          <section className="arabic bg-gray-50 p-4 rounded shadow-md">
            <h2 className="text-green-700 text-xl font-semibold mb-4">الحديث</h2>
            <p className="font-[Amiri] text-lg text-right leading-relaxed text-gray-800 mb-4">{hadeeth.hadeeth_ar}</p>

            <div className="metadata">
              <p className="text-gray-600 text-sm"><strong>التخريج:</strong> {hadeeth.attribution_ar}</p>
              <p className="text-gray-600 text-sm"><strong>الصحة:</strong> {hadeeth.grade_ar}</p>
            </div>

            <section className="explanation mt-4">
              <h3 className="text-lg font-medium text-blue-600">الشرح:</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{hadeeth.explanation_ar}</p>
            </section>

            <h3 className="text-lg font-medium text-green-600 mb-2">الفوائد:</h3>
            <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
              {hadeeth.hints_ar.map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>
            <h3 className="text-lg font-medium text-green-600 mt-4">معاني الكلمات:</h3>
            <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
              {hadeeth.words_meanings_ar.map((item, index) => (
                <li key={index}><strong>{item.word}:</strong> {item.meaning}</li>
              ))}
            </ul>
          </section>
          <section className="english bg-gray-50 p-4 rounded shadow-md">
            <h2 className="text-blue-700 text-xl font-semibold mb-4">Hadith</h2>
            <p className="text-gray-800 text-sm leading-relaxed mb-4">{hadeeth.hadeeth}</p>
            <div className="metadata">
              <p className="text-gray-600 text-sm"><strong>Attribution:</strong> {hadeeth.attribution}</p>
              <p className="text-gray-600 text-sm"><strong>Grade:</strong> {hadeeth.grade}</p>
            </div>
            <section className="explanation mt-4">
              <h3 className="text-lg font-medium text-blue-600">Explanation:</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{hadeeth.explanation}</p>
            </section>
            <section className="hints mt-4">
              <h3 className="text-lg font-medium text-blue-600">Hints:</h3>
              <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                {hadeeth.hints.map((hint, index) => (
                  <li key={index}>{hint}</li>
                ))}
              </ul>
            </section>
          </section>
        </div>
      </main>
      <footer className="text-center mt-8 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Hadith Daily</p>
      </footer>
    </div>
  );
};

export default App;
