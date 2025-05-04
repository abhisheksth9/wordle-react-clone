import React from 'react';

export default function Keypad({ usedKeys, onKeyPress }) {
  const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(k => ({ key: k }));
  const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(k => ({ key: k }));
  const row3 = ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<--'].map(k => ({ key: k }));

  const handleClick = (key) => {
    onKeyPress(key);
  };

  const renderKey = (k) => {
    const color = usedKeys?.[k.key.toLowerCase()] || '';
    const isEnter = k.key === 'Enter';
    const isDelete = k.key === '<--';
    const extraClass = isEnter ? 'enter' : isDelete ? 'delete' : '';

    return (
      <div
        key={k.key}
        className={`key ${color} ${extraClass}`.trim()}
        onClick={() => handleClick(k.key)}
      >
        {k.key}
      </div>
    );
  };

  return (
    <div className='keypad'>
      <div className='row'>{row1.map(renderKey)}</div>
      <div className='row'>{row2.map(renderKey)}</div>
      <div className='row'>{row3.map(renderKey)}</div>
    </div>
  );
}
