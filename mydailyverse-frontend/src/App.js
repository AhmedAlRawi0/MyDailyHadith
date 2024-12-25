import React, { useEffect, useState } from 'react';
import ArabicVerse from './components/ArabicVerse';
import NonArabicVerse from './components/NonArabicVerse';
import './styling/App.css';
import { fetchVerse } from './utils/api';

const App = () => {
  const [verse, setVerse] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'english_rwwad'; // Default to English if not saved
  });
  const [isScrolling, setIsScrolling] = useState(() => {
    const savedScrolling = localStorage.getItem('isScrolling');
    return savedScrolling ? savedScrolling === 'true' : true; // Default to true if not saved
  });

  useEffect(() => {
    // Save preferences to localStorage whenever they change
    localStorage.setItem('language', language);
    localStorage.setItem('isScrolling', isScrolling);
  }, [language, isScrolling]);

  useEffect(() => {
    const loadVerse = async () => {
      try {
        const response = await fetchVerse(language);
        setVerse(response); // Store the `result` object directly
      } catch (error) {
        console.error('Failed to fetch the verse:', error.message);
      }
    };

    loadVerse();
  }, [language]);

  useEffect(() => {
    const handleMouseClick = (event) => {
      if (event.target.id === 'toggle-scrolling-button') return; // Ignore button clicks
      setIsScrolling(false); // Stop scrolling on other clicks
    };

    window.addEventListener('click', handleMouseClick);
    return () => window.removeEventListener('click', handleMouseClick);
  }, []);

  useEffect(() => {
    let scrollInterval;
    if (isScrolling) {
      scrollInterval = setInterval(() => {
        window.scrollBy(0, 1); // Auto-scroll
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
          window.scrollTo(0, 0); // Reset scroll to the top
        }
      }, 40);
    }
    return () => clearInterval(scrollInterval);
  }, [isScrolling]);

  const handleToggleScrolling = () => {
    setIsScrolling(!isScrolling);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <>
      <div className="container">
        <main>
          <div className="verse-container">
            <ArabicVerse verse={verse} />
            <NonArabicVerse verse={verse} language={language} />
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
