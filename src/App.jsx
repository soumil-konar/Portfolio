// src/App.jsx
import React, { useState } from 'react';
import { PASTEL_PALETTE } from './data';

// Import Components
import ThemeToggle from './components/ThemeToggle';
import Header from './components/Header';
import ProjectCarousel from './components/ProjectCarousel';
import ChatInterface from './components/ChatInterface';
import EasterEgg from './components/EasterEgg';
import StatusFooter from './components/StatusFooter'
import CommandPalette from './components/CommandPalette';
import Konami from './components/Konami';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? PASTEL_PALETTE.dark : PASTEL_PALETTE.light;

  return (
    <div className={`min-h-screen transition-colors duration-700 ease-in-out ${theme.bg} ${theme.text} overflow-hidden font-mono selection:bg-teal-200 selection:text-teal-900`}>
    
      <CommandPalette isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />
      
      <ThemeToggle 
        isDarkMode={isDarkMode} 
        toggleTheme={() => setIsDarkMode(!isDarkMode)} 
      />

      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col h-screen">
        <Header theme={theme} />
        <ProjectCarousel theme={theme} />
        <ChatInterface isDarkMode={isDarkMode} theme={theme} />
        <EasterEgg isDarkMode={isDarkMode} />
        <StatusFooter isDarkMode={isDarkMode} theme={theme}/>
        <Konami isDarkMode={isDarkMode}/>
      </div>
      
    </div>
  );
};

export default App;