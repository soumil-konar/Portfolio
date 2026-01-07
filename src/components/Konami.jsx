import React, { useEffect, useState } from 'react';

const Konami = () => {
  const [input, setInput] = useState([]);
  const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    const onKeyUp = (e) => {
      const newInput = [...input, e.key];
      // Keep only the last 10 keystrokes
      if (newInput.length > 10) newInput.shift();
      setInput(newInput);

      // Check if the last 10 match the code
      if (JSON.stringify(newInput) === JSON.stringify(code)) {
        alert("GOD MODE ENABLED: unlimited_coffee = true");
        document.body.style.filter = "invert(1) hue-rotate(180deg)";
        // You can add more complex logic here (like confetti)
      }
    };
    window.addEventListener('keyup', onKeyUp);
    return () => window.removeEventListener('keyup', onKeyUp);
  }, [input]);

  return null; // This component renders nothing visible
};

export default Konami;