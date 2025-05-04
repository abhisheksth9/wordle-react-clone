  import React, { useEffect, useState, useCallback } from 'react'
  import useWordle from '../hooks/useWordle'

  import Grid from './Grid'
  import Keypad from './Keypad'
  import Modal from './Modal'

  export default function Wordle({ solution }) {
    const {currentGuess, guesses, turn, isCorrect, usedKeys, onKeyPress, showInvalidMessage} = useWordle(solution)

    const [showModal, setShowModal] = useState(false)
    const [showLengthWarning, setShowLengthWarning] = useState(false)

    const handleKeyInput = useCallback((key) => {
      if (isCorrect || turn > 5) return;

      if (key === 'Enter') {
        if (currentGuess.length < 5) {
          setShowLengthWarning(true)
          setTimeout(() => setShowLengthWarning(false), 2000)
          return
        }
      }

      onKeyPress(key)
    }, [currentGuess, onKeyPress, isCorrect, turn])

    useEffect(() => {
      const handlePhysicalKey = (e) => {
        handleKeyInput(e.key)
      }

      window.addEventListener('keyup', handlePhysicalKey)
      return () => window.removeEventListener('keyup', handlePhysicalKey)
    }, [handleKeyInput])

    useEffect(() => {
      if (isCorrect || turn > 5) {
        setTimeout(() => setShowModal(true), 1000)
      }
    }, [isCorrect, turn])

    return (
      <div>
        <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
        <Keypad usedKeys={usedKeys} onKeyPress={handleKeyInput} />
        {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}

        {showLengthWarning && (
          <div className="modal">
            <div className="modal-content">
              <p>Not enough letters</p>
            </div>
          </div>
        )}
        {showInvalidMessage && (
          <div className="modal">
            <div className="modal-content">
              <p>Invalid word</p>
            </div>
          </div>
        )}

      </div>
    )
  }
