import React, { useEffect, useState } from 'react';
import './App.css';
import Loading from './components/Loading';
import Error from './components/Error';
import AnnouncementBanner from './components/AnnouncementBanner';
import Footer from './components/Footer';
import useAutoRefresh from './hooks/useAutoRefresh';
import momentHijri from "moment-hijri";
import 'moment-timezone';
import surahNames from './data/surah_names.json'
import { fetchVerse, subscribeToEmails } from './utils/api';

const App = () => {
  const [verse, setVerse] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'English';
  });
  const [isScrolling, setIsScrolling] = useState(() => {
    const savedScrolling = localStorage.getItem('isScrolling');
    return savedScrolling ? savedScrolling === 'true' : true; // Default to true if nothing is saved
  });

  useEffect(() => {
    // Save preferences to localStorage whenever they change
    localStorage.setItem('language', language);
    localStorage.setItem('isScrolling', isScrolling);
  }, [language, isScrolling]);

  const today = new Date();
  const formattedDate = today.toLocaleDateString(language === 'French' ? 'fr-FR' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const capitalizeAndFormatFrenchDate = (str) => {
    if (language === 'French') {
      const parts = str.split(' ');
      const capitalizedParts = parts.map((word, index) =>
        index === 0
          ? word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase('fr-FR')
          : word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase('fr-FR')
      );
      const [weekday, day, month, year] = capitalizedParts;
      return `${weekday}, ${day} ${month}, ${year}`;
    }
  };
  const capitalizedFormattedFrenchDate = capitalizeAndFormatFrenchDate(formattedDate);

  const hijriDate = momentHijri().format("iYYYY/iMMMM/iD"); // Hijri date

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVerse(language);
        setVerse(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [language]);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  useAutoRefresh('America/New_York', fetchVerse, language); // Auto-refresh at 12 AM EST to refresh the Verse

  useEffect(() => {
    const handleMouseClick = (event) => {
      if (event.target.id === 'toggle-scrolling-button') return; // Ignore clicks on the button
      setIsScrolling(false); // Stop scrolling on other clicks
    };

    window.addEventListener('click', handleMouseClick);

    return () => {
      window.removeEventListener('click', handleMouseClick);
    };
  }, []);
  
  useEffect(() => {
    let scrollDirection = 1; // 1 for down, -1 for up
    let scrollInterval;

    if (isScrolling) {
      scrollInterval = setInterval(() => {
        const scrollSpeed = scrollDirection === 1 ? 1 : 10;
        window.scrollBy(0, scrollDirection * scrollSpeed);

        if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
          scrollDirection = -1;
        } else if (window.scrollY <= 0) {
          scrollDirection = 1;
        }
      }, 40);
    }

    return () => clearInterval(scrollInterval);
  }, [isScrolling]);

  const handleToggleScrolling = () => {
    setIsScrolling(!isScrolling);
  };

  const handleSubscription = async () => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validate email syntax using a regular expression

      if (!emailRegex.test(email)) {
        setSubscriptionMessage('⚠️ Please enter a valid email address.');
        return;
      }

      const message = await subscribeToEmails(email);
      setSubscriptionMessage(`✅ ${message}`);
      setEmail('');
    } catch (err) {
      setSubscriptionMessage(`❌ ${err.message}`);
    }
  };

  if (error) {
    return <Error message={error} email="your.daily.verse.reminder@gmail.com" />;
  }

  if (!verse) {
    return <Loading />;
  }

  return (
    <>
      <AnnouncementBanner language={language} />
      <div className="container">
        <header>
          <h1>
            {language === 'English' ? 'Verse of the Day' : 'Verset du Jour'}
          </h1>
          <h2>{language === 'English' ? formattedDate : capitalizedFormattedFrenchDate}{" "} | {hijriDate}</h2>
        </header>
        <main>
          <div className="controls">
            <button
              id="toggle-scrolling-button"
              className={`toggle-button ${isScrolling ? 'enabled' : 'disabled'}`}
              onClick={handleToggleScrolling}
            >
              {language === 'English'
                ? isScrolling
                  ? 'Disable Scrolling'
                  : 'Enable Scrolling'
                : language === 'French'
                ? isScrolling
                  ? 'Désactiver le défilement'
                  : 'Activer le défilement'
                : ''}
            </button>

            <select
              id="language"
              value={language}
              onChange={handleLanguageChange}
              className="language-dropdown"
            >
              <option value="English">English</option>
              <option value="French">French</option>
            </select>
          </div>
          <div className="verse">
            <section className="arabic">
              <strong>الآية:</strong>
              <p>{verse.result.arabic_text}</p>
              <strong>السورة:</strong> {surahNames[verse.result.sura].arabic}،{" "}
              <strong>رقم الآية:</strong> {verse.result.aya}
            </section>

            <section className="english">
              <h2>{language === 'English' ? 'The Verse:' : 'Le Verset:'}</h2>
              <p>{verse.result.translation}</p>
              <strong>Sura:</strong> {surahNames[verse.result.sura].english},{" "}
              <strong>Aya:</strong> {verse.result.aya}
              {verse.result.footnotes && verse.result.footnotes.trim() !== '' && (
                <div className="footnotes-section">
                  <h3>{language === 'English' ? 'Footnotes:' : 'Note de bas de page:'}</h3>
                  <p><i>{verse.result.footnotes}</i></p>
                  </div>
              )}
            </section>
          </div>

          <section className="subscription">
            {language === 'English' ? (
              <>Subscribe to Receive Daily Verse via Email <i>(Check Spam)</i></>
            ) : (
              <>Abonnez-vous pour recevoir le verset quotidien par e-mail <i>(Vérifiez les spams)</i></>
            )}
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === 'English' ? 'Enter your email' : 'Entrez votre e-mail'}
                className="email-input"
              />
              <button onClick={handleSubscription} className="subscribe-button">
                {language === 'English' ? 'Subscribe' : 'S\'abonner'}
              </button>
            </div>
            {subscriptionMessage && <p className="subscription-message">{subscriptionMessage}</p>}
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
