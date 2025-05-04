import React from 'react';

export default function ThemeToggle({ darkMode, setDarkMode }) {
  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <label className="switch">
      <input type="checkbox" checked={darkMode} onChange={toggleTheme} />
      <span className="slider">
        <span className={`icon moon ${darkMode ? 'visible' : ''}`}>🌙</span>
        <span className={`icon sun ${!darkMode ? 'visible' : ''}`}>☀️</span>
      </span>
    </label>
  );
}
