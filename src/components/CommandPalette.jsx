import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { Moon, Sun, FileText, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { SOCIAL_LINKS } from '../data';

const CommandPalette = ({ isDarkMode, toggleTheme }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    const handleOpenCustom = () => setOpen(true);

    document.addEventListener('keydown', down);
    window.addEventListener('open-command-palette', handleOpenCustom);
    return () => {
      document.removeEventListener('keydown', down);
      window.removeEventListener('open-command-palette', handleOpenCustom);
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(SOCIAL_LINKS.email.replace('mailto:', ''));
    setOpen(false);
    alert("Email copied to clipboard!");
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Soumil_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setOpen(false);
  };

  const openLink = (url) => { window.open(url, '_blank'); setOpen(false); };

  const paletteStyle = isDarkMode 
    ? "bg-[#101014]/98 text-zinc-100 border-zinc-800 backdrop-blur-2xl shadow-2xl" 
    : "bg-white/98 text-zinc-900 border-zinc-200 backdrop-blur-2xl shadow-2xl";
  const itemStyle = `flex items-center gap-2 px-3 py-3 text-sm cursor-pointer rounded-lg transition-colors aria-selected:bg-amber-500 aria-selected:text-black aria-selected:font-bold ${isDarkMode ? 'hover:bg-[#16161b] text-zinc-200' : 'hover:bg-amber-50 text-zinc-800'}`;

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Global Command Menu" className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-3 sm:p-4 pt-12 sm:pt-0 bg-black/70 backdrop-blur-md">
      <div className={`w-full max-w-lg rounded-xl shadow-2xl border overflow-hidden ${paletteStyle}`}>
        <div className="flex items-center border-b border-zinc-200 dark:border-zinc-800 px-2">
          <Command.Input placeholder="Type a command or search..." className={`w-full px-3 sm:px-4 py-3.5 sm:py-4 text-sm sm:text-base bg-transparent outline-none ${isDarkMode ? 'placeholder:text-zinc-500 text-white' : 'placeholder:text-zinc-400 text-zinc-900'}`} />
          <button onClick={() => setOpen(false)} className="sm:hidden text-xs font-mono px-2 py-1 text-zinc-400 hover:text-white">✕</button>
        </div>
        <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
          <Command.Empty className="px-4 py-6 text-center text-sm opacity-60 text-zinc-400">No results found.</Command.Empty>
          <Command.Group heading="General" className="px-2 py-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
            <Command.Item onSelect={() => { toggleTheme(); setOpen(false); }} className={itemStyle}>{isDarkMode ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-amber-600" />}<span>Switch to {isDarkMode ? 'Light' : 'Dark'} Mode</span></Command.Item>
            <Command.Item onSelect={handleDownloadResume} className={itemStyle}><FileText size={14} className="text-amber-500 dark:text-amber-400" /><span>Download Resume</span></Command.Item>
            <Command.Item onSelect={handleCopyEmail} className={itemStyle}><Mail size={14} className="text-amber-500 dark:text-amber-400" /><span>Copy Email Address</span></Command.Item>
          </Command.Group>
          <Command.Group heading="Socials" className="px-2 py-1.5 mt-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
            <Command.Item onSelect={() => openLink(SOCIAL_LINKS.github)} className={itemStyle}><Github size={14} className="text-amber-500 dark:text-amber-400" /><span>GitHub</span><ExternalLink size={10} className="ml-auto opacity-70"/></Command.Item>
            <Command.Item onSelect={() => openLink(SOCIAL_LINKS.linkedin)} className={itemStyle}><Linkedin size={14} className="text-amber-500 dark:text-amber-400" /><span>LinkedIn</span><ExternalLink size={10} className="ml-auto opacity-70"/></Command.Item>
          </Command.Group>
        </Command.List>
        <div className={`px-4 py-2 text-[10px] border-t flex justify-end font-mono text-zinc-500 dark:text-zinc-400 font-medium ${isDarkMode ? 'border-zinc-800' : 'border-zinc-100'}`}>Use arrow keys <span className="mx-1 border border-zinc-300 dark:border-zinc-700 rounded px-1">↑</span><span className="border border-zinc-300 dark:border-zinc-700 rounded px-1">↓</span> to navigate</div>
      </div>
    </Command.Dialog>
  );
};
export default CommandPalette;