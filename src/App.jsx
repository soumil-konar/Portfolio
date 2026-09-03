import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PASTEL_PALETTE, PROJECTS } from './data';

// Import Components
import ThemeToggle from './components/ThemeToggle';
import Header from './components/Header';
import SkillsTicker from './components/SkillsTicker';
import ProjectArchive from './components/ProjectArchive';
import ProjectParticlePortal from './components/ProjectParticlePortal';
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
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track global mouse position for the WebGL Particle Portal
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
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

        {/* WebGL Particle Dispersion Portal tracking cursor */}
        <ProjectParticlePortal 
          activeProject={hoveredProject} 
          mousePos={mousePos} 
          isDarkMode={isDarkMode} 
        />

        <div className="w-full py-2 sm:py-4 flex flex-col min-h-dvh">
          {/* Editorial Museum-Grade Header */}
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
            <Header isDarkMode={isDarkMode} />
          </div>

          {/* Editorial Architectural Project Archive with WebGL Portal */}
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 my-2 sm:my-4">
            <ProjectArchive 
              isDarkMode={isDarkMode}
              theme={theme}
              selectedProject={selectedProject}
              onSelectProject={setSelectedProject}
              onHoverProject={setHoveredProject}
            />
          </div>
          
          {/* Interactive AI Production Architecture Lab */}
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 my-2 sm:my-4">
            <ProductionArchitectureLab theme={theme} isDarkMode={isDarkMode} onSelectProject={setSelectedProject} />
          </div>

          {/* 4-Quadrant System Engineering Bento Matrix */}
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 my-2 sm:my-4">
            <SkillsTicker 
              theme={theme} 
              isDarkMode={isDarkMode} 
              onSelectSkill={setSelectedSkill}
            />
          </div>
          
          {/* Interactive AI Dialogue Console */}
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col flex-1 my-2 sm:my-4">
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