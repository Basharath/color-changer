import React, { useState } from 'react';

export default function ColorScreen() {
  const [bg, setBg] = useState('');
  const [message, setMessage] = useState('');
  function handleMouseMove({ pageX, pageY }) {
    const r = Math.floor(pageX % 255).toString(16);
    const g = Math.floor(pageY % 255).toString(16);
    const b = Math.floor(((pageX + pageY) / 2) % 255).toString(16);
    const array = [r, g, b];
    const rgb = array.map((i) => ('0' + i).slice(-2)).reduce((i, j) => i + j);

    setBg('#' + rgb);
  }

  async function handleClick() {
    await navigator.clipboard.writeText(bg);
    let array = [];
    array.unshift(
      <div className="copy-message">
        Color "{bg.toUpperCase()}" copied to the clipboard.
      </div>
    );
    setMessage(array[0]);

    setTimeout(() => {
      setMessage('');
    }, 5000);
  }

  return (
    <>
      <div
        className="screen"
        style={{ background: bg }}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        <div className="title-container">
          <h1 className="title">Color changer and picker</h1>
          <span className="subtitle">
            (Move your mouse anywhere and click to copy the color)
          </span>
        </div>
        {message}
      </div>
    </>
  );
}
