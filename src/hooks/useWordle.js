import { useCallback, useState } from 'react'
import { useValidWords } from './useValidWords'

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array(6)])
  const [history, setHistory] = useState([])
  const [isCorrect, setIsCorrect] = useState(false)
  const [usedKeys, setUsedKeys] = useState({})
  const [showInvalidMessage, setShowInvalidMessage] = useState(false);


  const validWords = useValidWords()

  const formatGuess = useCallback(() => {
    let solutionArray = [...solution.toLowerCase()]
    let formattedGuess = [...currentGuess.toLowerCase()].map((l) => ({
      key: l,
      color: 'grey',
    }))

    formattedGuess.forEach((l, i) => {
      if (solution[i].toLowerCase() === l.key) {
        formattedGuess[i].color = 'green'
        solutionArray[i] = null
      }
    })

    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== 'green') {
        formattedGuess[i].color = 'yellow'
        solutionArray[solutionArray.indexOf(l.key)] = null
      }
    })

    return formattedGuess
  }, [currentGuess, solution])

  const addNewGuess = useCallback((formattedGuess) => {
    if (currentGuess.toLowerCase() === solution.toLowerCase()) setIsCorrect(true)

    setGuesses((prev) => {
      const updated = [...prev]
      updated[turn] = formattedGuess
      return updated
    })

    setHistory((prev) => [...prev, currentGuess])
    setTurn((prev) => prev + 1)

    setUsedKeys((prev) => {
      const updated = { ...prev }
      formattedGuess.forEach((l) => {
        const currentColor = updated[l.key]

        if (l.color === 'green') {
          updated[l.key] = 'green'
        } else if (l.color === 'yellow' && currentColor !== 'green') {
          updated[l.key] = 'yellow'
        } else if (l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
          updated[l.key] = 'grey'
        }
      })
      return updated
    })

    setCurrentGuess('')
  }, [currentGuess, solution, turn])

  const handleInput = useCallback(({ key }) => {
    if (isCorrect || turn > 5) return
    if (!validWords || validWords.length === 0) return;

    key = key.toLowerCase()

    if (key === 'enter') {
      if (turn > 5 || history.includes(currentGuess) || currentGuess.length !== 5) return;
    
      if (!validWords.includes(currentGuess.toLowerCase())) {
      setShowInvalidMessage(true);
      setTimeout(() => setShowInvalidMessage(false), 2000);
      return;
      }

      const formatted = formatGuess()
      addNewGuess(formatted)
      return
    }

    if (key === 'backspace' || key === '<--') {
      setCurrentGuess((prev) => prev.slice(0, -1))
      return
    }

    if (/^[a-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key)
      }
    }
  }, [turn, currentGuess, history, formatGuess, addNewGuess, isCorrect, validWords])

  const handleKeyup = (e) => handleInput({ key: e.key })

  const onKeyPress = useCallback((key) => {
    setTimeout(() => handleInput({ key }), 0)
  }, [handleInput])

  return {turn, currentGuess, guesses, isCorrect, usedKeys, onKeyPress, handleKeyup, showInvalidMessage }
}

export default useWordle
