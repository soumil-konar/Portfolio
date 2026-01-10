import React, { useEffect, useState } from 'react';

const Konami = () => {
  const [input, setInput] = useState([]);
  const [isGodMode, setIsGodMode] = useState(false);
  const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    const onKeyUp = (e) => {
      const newInput = [...input, e.key];
      if (newInput.length > 10) newInput.shift();
      setInput(newInput);
      if (JSON.stringify(newInput) === JSON.stringify(code)) {
        toggleGodMode();
        setInput([]); 
      }
    };
    window.addEventListener('keyup', onKeyUp);
    return () => window.removeEventListener('keyup', onKeyUp);
  }, [input, isGodMode]);

  const toggleGodMode = () => {
    const newStatus = !isGodMode;
    setIsGodMode(newStatus);
    if (newStatus) {
      document.body.style.filter = "invert(1) hue-rotate(180deg)";
      document.body.style.transition = "filter 0.5s ease-in-out";
    } else {
      document.body.style.filter = "none";
    }
  };

  const handleManualExit = () => {
    setIsGodMode(false);
    document.body.style.filter = "none";
  };

  if (!isGodMode) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      <button onClick={handleManualExit} className="font-mono text-xs font-bold px-4 py-2 bg-red-600 text-white rounded shadow-[0_0_15px_rgba(255,0,0,0.7)] hover:bg-red-700 active:scale-95 transition-all animate-pulse border-2 border-red-400">
        ⚠ DISABLE GOD MODE
      </button>
    </div>
  );
};
export default Konami;