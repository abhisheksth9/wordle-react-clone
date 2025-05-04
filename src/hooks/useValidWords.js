import { useState, useEffect } from 'react';

export const useValidWords = () => {
  const [validWords, setValidWords] = useState([]);

  useEffect(() => {
    fetch('/data/valid_guesses.csv')
      .then(res => res.text())
      .then(text => {
        const words = text.split('\n').map(word => word.trim().toLowerCase());
        setValidWords(words);
      })
        .catch(err => console.error('Failed to load valid words:', err));
      
  }, []);

  return validWords;
};
