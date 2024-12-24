import React from 'react';
import '../styling/Controls.css';

const Controls = ({ language, setLanguage, isScrolling, handleToggleScrolling }) => (
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
      onChange={(e) => setLanguage(e)}
      className="language-dropdown"
    >
      <option value="English">English</option>
      <option value="French">French</option>
    </select>
  </div>
);

export default Controls;
