import React from 'react'

export default function Modal({ isCorrect, solution}) {
  return (
    <div className='modal'>
          
        {isCorrect && (
            <div className='modal-win'>
                <p>Congratulations</p>
            </div>
        )}

        {!isCorrect && (
            <div className='solution'>
                {solution}
            </div>
        )
        }

    </div>
  )
}
