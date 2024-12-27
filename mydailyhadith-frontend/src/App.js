import 'moment-timezone';
import React, { useEffect, useState } from 'react';
import AnnouncementBanner from './components/AnnouncementBanner';
import ArabicHadeeth from './components/ArabicHadith';
import Controls from './components/Controls';
import Error from './components/Error';
import Footer from './components/Footer';
import Header from './components/Header';
import Loading from './components/Loading';
import NonArabicHadith from './components/NonArabicHadith';
import SubscriptionForm from './components/SubscriptionForm';
import useAutoRefresh from './hooks/useAutoRefresh';
import './styling/App.css';
import { fetchHadeeth, sendEmail, subscribeToEmails } from './utils/api';

const App = () => {
  const [hadeeth, setHadeeth] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'English'; // Default to English if nothing is saved
  });
  const [isScrolling, setIsScrolling] = useState(() => {
    const savedScrolling = localStorage.getItem('isScrolling');
    return savedScrolling ? savedScrolling === 'true' : true; // Default to true if nothing is saved
  });

  useEffect(() => { // Save the current preferences to localStorage whenever they change (For static displays after refresh)
    localStorage.setItem('language', language);
    localStorage.setItem('isScrolling', isScrolling);
  }, [language, isScrolling]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHadeeth(language);
        setHadeeth(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [language]);

  useAutoRefresh('America/New_York', fetchHadeeth, language); // Auto-refresh at 12 AM EST to refresh the Hadeeth
  useAutoRefresh('Australia/Sydney', sendEmail, language); // Auto-refresh at 12 AM Sydney/8 AM EST to send the email

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

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
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
    return <Error message={error} email="your.daily.hadith.reminder@gmail.com" />;
  }

  if (!hadeeth) {
    return <Loading />;
  }

  return (
    <>
      <AnnouncementBanner language={language} />
      <div className="container">
        <Header language={language} />
        <main>
          <Controls language={language} setLanguage={handleLanguageChange} isScrolling={isScrolling} handleToggleScrolling={handleToggleScrolling} />
          <div className="hadeeth grid grid-cols-2 gap-4">
            <ArabicHadeeth hadeeth={hadeeth} />
            <NonArabicHadith hadeeth={hadeeth} language={language} />
          </div>
          <SubscriptionForm language={language} email={email} setEmail={setEmail} subscriptionMessage={subscriptionMessage} handleSubscription={handleSubscription} />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
