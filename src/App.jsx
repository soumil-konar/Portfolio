import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PASTEL_PALETTE, PROJECTS, SKILLS } from './data';

// Import Components
import ThemeToggle from './components/ThemeToggle';
import Header from './components/Header';
import SkillsTicker from './components/SkillsTicker';
import ProjectCarousel from './components/ProjectCarousel';
import ProductionArchitectureLab from './components/ProductionArchitectureLab';
import ChatInterface from './components/ChatInterface';
import EasterEgg from './components/EasterEgg';
import StatusFooter from './components/StatusFooter';
import CommandPalette from './components/CommandPalette';
import Konami from './components/Konami';
import ThemeTransition from './components/ThemeTransition';
import GradientMesh from './components/GradientMesh';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import SkillModal from './components/SkillModal';
import { ToastProvider } from './components/Toast';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode by default
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Sync dark class with document root for Tailwind class strategy
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

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
    console.log('%cHello! If you are looking here, we should probably talk. Email me: soumil.konar2001@gmail.com', styles);
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
    <ToastProvider isDarkMode={isDarkMode}>
      <div className={`min-h-dvh ${theme.bg} ${theme.text} overflow-x-hidden font-sans selection:bg-indigo-500/30 selection:text-indigo-200 relative`}>
        
        {/* --- Desktop Custom Cursor --- */}
        <CustomCursor />

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

      {/* --- Scroll Progress Bar --- */}
      <ScrollProgress />

      {/* --- Main Content --- */}
      <div className="relative z-10">
        <CommandPalette isDarkMode={isDarkMode} toggleTheme={handleThemeToggle} />
        <Konami />
        
        <ThemeToggle 
          isDarkMode={isDarkMode} 
          toggleTheme={handleThemeToggle} 
        />

        <div className="w-full py-3 sm:py-6 flex flex-col min-h-dvh">
          {/* Centered Hero Header */}
          <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 md:px-8">
            <Header theme={theme} isDarkMode={isDarkMode} />
          </div>
          
          {/* Expanded Full-Width Marquee Skills Ticker */}
          <div className="w-full max-w-[1440px] mx-auto px-1 sm:px-4 md:px-6 my-1 sm:my-2">
            <SkillsTicker 
              theme={theme} 
              isDarkMode={isDarkMode} 
              onSelectSkill={setSelectedSkill}
            />
          </div>

          {/* Expanded Full-Width Project Carousel */}
          <div className="w-full max-w-[1440px] mx-auto px-1 sm:px-4 md:px-6 my-1 sm:my-2">
            <ProjectCarousel 
              theme={theme} 
              isDarkMode={isDarkMode} 
              selectedProject={selectedProject}
              onSelectProject={setSelectedProject}
            />
          </div>
          
          {/* Main Focused Content Section */}
          <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 md:px-8 flex flex-col flex-1">
            {/* Interactive AI Production Architecture Lab */}
            <ProductionArchitectureLab theme={theme} isDarkMode={isDarkMode} onSelectProject={setSelectedProject} />
            
            {/* Interactive AI Terminal */}
            <ChatInterface isDarkMode={isDarkMode} theme={theme} />

            {/* Footer & Easter Egg */}
            <StatusFooter theme={theme} />
            <EasterEgg isDarkMode={isDarkMode} />
          </div>
        </div>

        {/* Interactive Skill Inspector Drawer */}
        <SkillModal
          skill={selectedSkill}
          isOpen={!!selectedSkill}
          onClose={() => setSelectedSkill(null)}
          onSelectProject={(proj) => {
            setSelectedSkill(null);
            setSelectedProject(proj);
          }}
          projects={PROJECTS}
          isDarkMode={isDarkMode}
        />
      </div>
      
    </div>
  </ToastProvider>
  );
};

export default App;