import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PASTEL_PALETTE } from './data';

// Import Components
import ThemeToggle from './components/ThemeToggle';
import Header from './components/Header';
import SkillsTicker from './components/SkillsTicker'; // Newly Added
import ProjectCarousel from './components/ProjectCarousel';
import ChatInterface from './components/ChatInterface';
import EasterEgg from './components/EasterEgg';
import StatusFooter from './components/StatusFooter';
import CommandPalette from './components/CommandPalette';
import Konami from './components/Konami';
import ThemeTransition from './components/ThemeTransition';
import GradientMesh from './components/GradientMesh';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Transition Logic States
  const [transitionMode, setTransitionMode] = useState(0); 
  const [isTransitioning, setIsTransitioning] = useState(false);

  // The active theme applied to the UI
  const theme = isDarkMode ? PASTEL_PALETTE.dark : PASTEL_PALETTE.light;

  // --- 1. DevTools Console Easter Egg ---
  useEffect(() => {
    const styles = [
      'font-size: 12px', 
      'font-family: monospace', 
      'background: #2D3748', 
      'color: #fff', 
      'padding: 10px 20px', 
      'border-radius: 5px',
      'border: 1px solid #63B3ED'
    ].join(';');

    const successStyle = 'color: #48BB78; font-weight: bold; font-size: 12px;';

    console.clear(); // Clear default browser noise
    console.log('%cHello! If you are looking here, we should probably talk. Email me: soumil@example.com', styles);
    console.log('%cSystem Status: [OK] 🟢', successStyle);
    console.log('%cSecret Code: Try the Konami Code (↑↑↓↓←→←→BA)', 'color: #A0AEC0; font-style: italic; font-size: 10px;');
  }, []);

  // --- 2. Theme Toggle Logic (Synced with Animation) ---
  const handleThemeToggle = () => {
    if (isTransitioning) return; // Prevent double-clicking

    // Pick a random transition (0, 1, or 2)
    setTransitionMode(Math.floor(Math.random() * 3));

    // Start the overlay animation
    setIsTransitioning(true);

    // WAIT 700ms (duration of enter animation)
    setTimeout(() => {
      // Switch the actual theme behind the scenes
      setIsDarkMode(prev => !prev);
      
      // Trigger the "Exit" (Fade Out) animation
      setIsTransitioning(false);
    }, 700); 
  };

  return (
    <div className={`min-h-dvh ${theme.bg} ${theme.text} overflow-x-hidden font-mono selection:bg-teal-200 selection:text-teal-900 relative`}>
      
      {/* --- Gradient Mesh Background --- */}
      <GradientMesh isDarkMode={isDarkMode} />
      
      {/* --- Background Grid Overlay --- */}
      <div className="fixed inset-0 z-[1] pointer-events-none transition-opacity duration-1000">
         <div className="absolute inset-0 bg-grid opacity-[0.3]"></div>
      </div>

      {/* --- The Transition Overlay (with AnimatePresence) --- */}
      <AnimatePresence>
        {isTransitioning && (
          <ThemeTransition key="overlay" isTargetDark={!isDarkMode} mode={transitionMode} />
        )}
      </AnimatePresence>

      {/* --- Main Content --- */}
      <div className="relative z-10">
        <CommandPalette isDarkMode={isDarkMode} toggleTheme={handleThemeToggle} />
        <Konami />
        
        <ThemeToggle 
          isDarkMode={isDarkMode} 
          toggleTheme={handleThemeToggle} 
        />

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 flex flex-col min-h-dvh">
          <Header theme={theme} />
          
          {/* New Skills Ticker */}
          <SkillsTicker theme={theme} isDarkMode={isDarkMode} />

          {/* Project Carousel (Now receives isDarkMode for styling) */}
          <ProjectCarousel theme={theme} isDarkMode={isDarkMode} />
          
          <ChatInterface isDarkMode={isDarkMode} theme={theme} />
          <StatusFooter theme={theme} />
          <EasterEgg isDarkMode={isDarkMode} />
        </div>
      </div>
      
    </div>
  );
};

export default App;