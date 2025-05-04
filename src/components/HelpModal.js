import React from 'react'

export default function HelpModal({onClose}) {
  return (
    <div className='modal-overlay' onClick={onClose}>
        <div className='help-modal' onClick={e => e.stopPropagation()}>
            <button className='close-btn' onClick={onClose}>x</button>
            <h2>How To Play</h2>
            <p>Guess the Word in 6 tries</p>
            <ul>
                <li>Each guess must be a 5-letter Word.</li>
                <li>The color of the tiles will show how correct your guess is.</li>
            </ul>

            <h3>Examples</h3>
            <div className='example-row'>
                <div className='example-box green'>H</div>
                <div className='example-box'>E</div>
                <div className='example-box'>L</div>
                <div className='example-box'>L</div>
                <div className='example-box'>O</div>
            </div>
            <p><strong>H</strong> is in right place</p>

            <div className='example-row'>
                <div className='example-box'>W</div>
                <div className='example-box yellow'>O</div>
                <div className='example-box'>R</div>
                <div className='example-box'>L</div>
                <div className='example-box'>D</div>
            </div>
            <p><strong>O</strong> is in wrong place</p>

            <div className='example-row'>
                <div className='example-box'>R</div>
                <div className='example-box'>E</div>
                <div className='example-box'>A</div>
                <div className='example-box'>C</div>
                <div className='example-box grey'>T</div>
            </div>
            <p><strong>T</strong> is not in the word</p>
        </div>
    </div>
  )
}
