import React, { useEffect, useState, useRef } from 'react';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const Konami = () => {
  const [isGodMode, setIsGodMode] = useState(false);
  const inputRef = useRef([]);

  const toggleGodMode = () => {
    setIsGodMode(prev => {
      const next = !prev;
      if (next) {
        document.body.style.filter = "invert(1) hue-rotate(180deg)";
        document.body.style.transition = "filter 0.5s ease-in-out";
      } else {
        document.body.style.filter = "none";
      }
      return next;
    });
  };

  const handleManualExit = () => {
    setIsGodMode(false);
    document.body.style.filter = "none";
  };

  useEffect(() => {
    const onKeyUp = (e) => {
      inputRef.current.push(e.key);
      if (inputRef.current.length > 10) inputRef.current.shift();
      if (JSON.stringify(inputRef.current) === JSON.stringify(KONAMI_CODE)) {
        toggleGodMode();
        inputRef.current = [];
      }
    };
    window.addEventListener('keyup', onKeyUp);
    return () => window.removeEventListener('keyup', onKeyUp);
  }, []);

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