import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styling/App.css';
import Loading from './components/Loading';
import Error from './components/Error';

const App = () => {
  const [hadeeth, setHadeeth] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [isScrolling, setIsScrolling] = useState(true);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    const fetchHadeeth = async () => {
      try {
        //const response = await axios.get('https://mydailyhadith.onrender.com/daily-hadeeth');
        const response = await axios.get('http://127.0.0.1:5000/daily-hadeeth');
        setHadeeth(response.data);
      } catch (err) {
        setError('Failed to fetch the Hadeeth. Please try again later.');
      }
    };

    fetchHadeeth();
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

  const handleMouseClick = () => {
    setIsScrolling(false); // Stop scrolling on mouse click
  };

  useEffect(() => {
    window.addEventListener('click', handleMouseClick);
    return () => window.removeEventListener('click', handleMouseClick);
  }, []);

  const handleSubscription = async () => {
    try {
      // Validate email using a regular expression
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!emailRegex.test(email)) {
        setSubscriptionMessage('⚠️ Please enter a valid email address.');
        return;
      }
  
      // Make the API call
      //const response = await axios.post('https://mydailyhadith.onrender.com/subscribe', { email });
      const response = await axios.post('http://127.0.0.1:5000/subscribe', { email });
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
    <div className="container">
      <header>
        <h1>Hadith of the Day</h1>
        <h2>{formattedDate}</h2>
        <p className="scroll-note">Click anywhere to stop the scrolling.</p>
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
          </section>

          <section className="english bg-gray-50 p-4 rounded shadow-md">
            <h2 className="text-blue-700 text-xl font-semibold mb-4">The Hadith</h2>
            <p className="text-gray-800 text-sm leading-relaxed mb-4">{hadeeth.hadeeth}</p>

            <div className="metadata">
              <p className="text-gray-600 text-sm"><strong>Attribution:</strong> {hadeeth.attribution}</p>
              <p className="text-gray-600 text-sm"><strong>Grade:</strong> {hadeeth.grade}</p>
            </div>

            <section className="explanation mt-4">
              <h3 className="text-lg font-medium text-blue-600">Explanation:</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{hadeeth.explanation}</p>
            </section>

            {hadeeth.hints && hadeeth.hints.length > 0 && (
              <section className="hints mt-4">
                <h3 className="text-lg font-medium text-blue-600">Benefits:</h3>
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
          Subscribe to Receive Daily Hadith via Email <i>(Check Junk)</i>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="email-input"
            />
            <button onClick={handleSubscription} className="subscribe-button">Subscribe</button>
          </div>
          {subscriptionMessage && <p className="subscription-message">{subscriptionMessage}</p>}
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
          | View on {' '}
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
  );
};

export default App;
