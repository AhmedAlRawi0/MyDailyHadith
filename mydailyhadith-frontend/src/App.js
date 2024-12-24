import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styling/App.css';
import Loading from './components/Loading';
import Error from './components/Error';
import AnnouncementBanner from './components/AnnouncementBanner';
import moment from 'moment';
import 'moment-timezone';
import Header from './components/Header';
import Controls from './components/Controls';
import SubscriptionForm from './components/SubscriptionForm';
import Footer from './components/Footer';
import ArabicHadeeth from './components/ArabicHadith';
import NonArabicHadith from './components/NonArabicHadith';

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

  // Auto-refresh at 12 AM Sydney time
  useEffect(() => {
    const timeZone = 'Australia/Sydney'; // Sydney timezone
    const now = moment.tz(timeZone); // Get current time in EST

    // Calculate milliseconds until the next 12 AM Sydney
    const nextMidnight = moment.tz(timeZone).endOf('day').add(1, 'second'); // End of today + 1 second
    const timeToMidnight = nextMidnight.diff(now);

    // Set a timeout to refresh the page at 12 AM Sydney
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
