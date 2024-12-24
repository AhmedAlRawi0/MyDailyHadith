import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styling/App.css';
import Loading from './components/Loading';
import Error from './components/Error';
import AnnouncementBanner from './components/AnnouncementBanner';
import moment from 'moment';
import 'moment-timezone';
import momentHijri from 'moment-hijri'; // Import Hijri support

const App = () => {
  const [hadeeth, setHadeeth] = useState(null);
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

  useEffect(() => { // Save the current preferences to localStorage whenever they change
    localStorage.setItem('language', language);
    localStorage.setItem('isScrolling', isScrolling);
  }, [language, isScrolling]);

  const bannerMessage = language === 'English' ? '🚀 This website is still being improved. Stay tuned for MyDailyVerse! 🌟' : '🚀 Ce site est encore en cours d\'amélioration. Restez à l\'écoute pour MyDailyVerse! 🌟';

  const today = new Date();
  const formattedDate = today.toLocaleDateString(language === 'French' ? 'fr-FR' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const hijriDate = momentHijri().format('iYYYY/iMMMM/iD'); // Hijri date

  const capitalizeAndFormatFrenchDate = (str) => {
    if (language === 'French') {
      const parts = str.split(' ');

      const capitalizedParts = parts.map((word, index) =>
        index === 0 // Capitalize only the first letter of the first word (weekday)
          ? word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase('fr-FR')
          : word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase('fr-FR')
      );

      const [weekday, day, month, year] = capitalizedParts; // Add commas to separate the parts
      return `${weekday}, ${day} ${month}, ${year}`;
    }
  };
  const capitalizedFormattedFrenchDate = capitalizeAndFormatFrenchDate(formattedDate);

  useEffect(() => {
    const fetchHadeeth = async () => {
      try {
        //const response = await axios.get(`http://127.0.0.1:5000/daily-hadeeth?Language=${language}`);
        const response = await axios.get(`https://mydailyhadith.onrender.com/daily-hadeeth?Language=${language}`);
        setHadeeth(response.data);
      } catch (err) {
        setError('Failed to fetch the Hadeeth. Please try again later.');
      }
    };

    fetchHadeeth();
  }, [language]); // Refetch when the language changes

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  // Auto-refresh at 12 AM EST
  useEffect(() => {
    const timeZone = 'America/New_York'; // EST timezone
    const now = moment.tz(timeZone); // Get current time in EST

    // Calculate milliseconds until the next 12 AM EST
    const nextMidnight = moment.tz(timeZone).endOf('day').add(1, 'second'); // End of today + 1 second
    const timeToMidnight = nextMidnight.diff(now);

    // Set a timeout to refresh the page at 12 AM EST
    const timer = setTimeout(() => {
      window.location.reload(); // Reload the page to refresh all state
    }, timeToMidnight);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseClick = (event) => {
      // Ignore clicks on the button
      if (event.target.id === 'toggle-scrolling-button') return;

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
        const scrollSpeed = scrollDirection === 1 ? 1 : 10; // Down: 1px, Up: 10px
        window.scrollBy(0, scrollDirection * scrollSpeed);

        if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
          scrollDirection = -1; // Reverse direction when reaching the bottom
        } else if (window.scrollY <= 0) {
          scrollDirection = 1; // Reverse direction when reaching the top
        }
      }, 40); // Scrolling speed
    }

    return () => clearInterval(scrollInterval); // Cleanup on component unmount
  }, [isScrolling]);

  const handleToggleScrolling = () => {
    setIsScrolling(!isScrolling);
  };

  const handleSubscription = async () => {
    try {
      // Validate email using a regular expression
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        setSubscriptionMessage('⚠️ Please enter a valid email address.');
        return;
      }

      // Make the API call
      const response = await axios.post('https://mydailyhadith.onrender.com/subscribe', { email });
      //const response = await axios.post('http://127.0.0.1:5000/subscribe', { email });
      setSubscriptionMessage(`✅ ${response.data.message}`);
      setEmail(''); // Clear the email input
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'An unexpected error occurred. Please try again.';
      setSubscriptionMessage(`❌ Failed to subscribe: ${errorMessage}`);
    }
  };

  if (error) {
    return <Error message={error} email="your.daily.hadith.reminder@gmail.com" />;
  }

  if (!hadeeth) {
    return <Loading />;
  }

  return (
    <>
      <AnnouncementBanner message={bannerMessage} />
      <div className="container">
        <header>
          <h1>
            {language === 'English' ? 'Hadith of the Day' : 'Hadith du Jour'}
          </h1>
          <h2>{language === 'English' ? formattedDate : capitalizedFormattedFrenchDate} | {hijriDate}</h2>
        </header>
        <main>
          <div className="controls">
            <button
              id="toggle-scrolling-button" // Add an id to identify the button
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
          <div className="hadeeth grid grid-cols-2 gap-4">
            <section className="arabic bg-gray-50 p-4 rounded shadow-md">
              <h2 className="text-green-700 text-xl font-semibold mb-4">الحديث</h2>
              <p className="font-[Amiri] text-lg text-right leading-relaxed text-gray-800 mb-4">{hadeeth.hadeeth_ar}</p>

              <div className="metadata-inline">
                <p className="text-gray-600 text-sm" dir="rtl">
                  <strong>التخريج:</strong> {hadeeth.attribution_ar}، <strong>الصحة:</strong> {hadeeth.grade_ar}
                </p>
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
              {hadeeth.words_meanings_ar && hadeeth.words_meanings_ar.length > 0 && (
                <>
                  <h3 className="text-lg font-medium text-green-600 mt-4">معاني الكلمات:</h3>
                  <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                    {hadeeth.words_meanings_ar.map((item, index) => (
                      <li key={index}>
                        <strong>{item.word}:</strong> {item.meaning}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>

            <section className="english bg-gray-50 p-4 rounded shadow-md">
              <h2 className="text-blue-700 text-xl font-semibold mb-4">
                {language === 'English' ? 'The Hadith' : 'Le Hadith'}
              </h2>
              <p className="text-gray-800 text-sm leading-relaxed mb-4">
                {hadeeth.hadeeth}
              </p>

              <div className="metadata-inline">
                <p className="text-gray-600 text-sm">
                  <strong>
                    {language === 'English' ? 'Attribution:' : 'Attribution:'}
                  </strong>{' '}
                  {hadeeth.attribution}, <strong>{language === 'English' ? 'Grade:' : 'Classement:'}</strong>{' '}
                  {hadeeth.grade}
                </p>
              </div>

              <section className="explanation mt-4">
                <h3 className="text-lg font-medium text-blue-600">
                  {language === 'English' ? 'Explanation' : 'Explication'}:
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {hadeeth.explanation}
                </p>
              </section>

              {hadeeth.hints && hadeeth.hints.length > 0 && (
                <section className="hints mt-4">
                  <h3 className="text-lg font-medium text-blue-600">
                    {language === 'English' ? 'Benefits' : 'Avantages'}:
                  </h3>
                  <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
                    {hadeeth.hints.map((hint, index) => (
                      <li key={index}>{hint}</li>
                    ))}
                  </ul>
                </section>
              )}

            </section>
          </div>

          <section className="subscription">
            {language === 'English' ? (
              <>
                Subscribe to Receive Daily Hadith via Email <i>(Check Spam)</i>
              </>
            ) : (
              <>
                Abonnez-vous pour recevoir le hadith quotidien par e-mail <i>(Vérifiez les spams)</i>
              </>
            )}
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  language === 'English' ? 'Enter your email' : 'Entrez votre e-mail'
                }
                className="email-input"
              />
              <button onClick={handleSubscription} className="subscribe-button">
                {language === 'English' ? 'Subscribe' : 'S\'abonner'}
              </button>
            </div>
            {subscriptionMessage && (
              <p className="subscription-message">{subscriptionMessage}</p>
            )}
          </section>
        </main>
        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} MyDailyHadith | Powered by {' '}
            <a
              href="https://hadeethenc.com/en/home"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="HadeethEncLogo.png"
                alt="HadeethEnc"
                style={{ height: '20px', verticalAlign: 'middle' }}
              />
            </a>{' '}
            | View on  {' '}
            <a
              href="https://github.com/AhmedAlRawi0/MyDailyHadith"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="GithubLogo.png"
                alt="GitHub Repository"
                style={{ height: '20px', verticalAlign: 'middle' }}
              />
            </a>{' '}
            | <a
              href="https://docs.google.com/document/d/1g4KOyCPDkplTyzxWCJ9GcllIjWUIBsXbHYzUQuxkqyc/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              About & Terms
            </a>{' '}
            | <a
              href="https://forms.gle/k2bmiDgvTahbkGb87"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reach Out
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default App;
