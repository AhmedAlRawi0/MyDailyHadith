import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function HadithWidget({ theme = 'light', language = 'both' }) {
  const [hadith, setHadith] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHadith = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT/api/hadith/random');
        if (!response.ok) throw new Error('Failed to fetch hadith');
        const data = await response.json();
        setHadith(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHadith();
  }, []);

  if (loading) return <div className="hadith-widget-loading">Loading...</div>;
  if (error) return <div className="hadith-widget-error">{error}</div>;
  if (!hadith) return null;

  return (
    <div className={`hadith-widget hadith-widget-${theme}`}>
      {(language === 'both' || language === 'arabic') && (
        <div className="hadith-arabic">{hadith.arabic_text}</div>
      )}
      {(language === 'both' || language === 'english') && (
        <div className="hadith-english">{hadith.english_text}</div>
      )}
      <div className="hadith-metadata">
        <span className="hadith-narrator">{hadith.narrator}</span>
        <span className="hadith-source">{hadith.source}</span>
        <span className="hadith-number">#{hadith.number}</span>
      </div>
    </div>
  );
}

HadithWidget.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']),
  language: PropTypes.oneOf(['both', 'arabic', 'english'])
};

export default HadithWidget; 