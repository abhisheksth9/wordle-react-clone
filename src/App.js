import React, { useEffect, useState } from "react";
import Wordle from "./components/wordle";
import ThemeToggle from "./components/ThemeToggle";
import HelpModal from "./components/HelpModal";

export default function App() {
  const [solution, setSolution] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    fetch('/data/valid_solutions.csv')
      .then(res => res.text())
      .then(text => {
        const words = text
          .split('\n')
          .map(word => word.trim().toLowerCase())
          .filter(word => word.length === 5);
          
        const randomSolution = words[Math.floor(Math.random() * words.length)];
        setSolution(randomSolution);
      })
      .catch(err => {
        console.error('Failed to load valid solutions:', err);
      });
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <div className="theme-container">
      <nav className="nav-bar">
        <h1 className="wordle">WORDLE</h1>
        <div className="toggle-wrapper">
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
        <button className="help-btn" onClick={() => setShowHelp(true)}>?</button>
      </nav>
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      {solution && <Wordle solution={solution} />}
    </div>
  );
}
