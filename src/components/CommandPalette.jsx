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
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
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
    ? "bg-slate-800/60 text-slate-200 border-slate-600/50 backdrop-blur-2xl" 
    : "bg-white/60 text-slate-800 border-slate-200/50 backdrop-blur-2xl";
  const itemStyle = `flex items-center gap-2 px-3 py-3 text-sm cursor-pointer rounded-lg transition-colors aria-selected:bg-indigo-500 aria-selected:text-white ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`;

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Global Command Menu" className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-[20vh] bg-black/60 backdrop-blur-md">
      <div className={`w-full max-w-lg rounded-xl shadow-2xl border overflow-hidden ${paletteStyle}`}>
        <Command.Input placeholder="Type a command or search..." className={`w-full px-4 py-4 text-base bg-transparent outline-none border-b ${isDarkMode ? 'border-slate-600 placeholder:text-slate-500' : 'border-gray-200 placeholder:text-gray-400'}`} />
        <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
          <Command.Empty className="px-4 py-6 text-center text-sm opacity-50">No results found.</Command.Empty>
          <Command.Group heading="General" className="px-2 py-1.5 text-xs font-medium opacity-50 uppercase tracking-widest">
            <Command.Item onSelect={() => { toggleTheme(); setOpen(false); }} className={itemStyle}>{isDarkMode ? <Sun size={14} /> : <Moon size={14} />}<span>Switch to {isDarkMode ? 'Light' : 'Dark'} Mode</span></Command.Item>
            <Command.Item onSelect={handleDownloadResume} className={itemStyle}><FileText size={14} /><span>Download Resume</span></Command.Item>
            <Command.Item onSelect={handleCopyEmail} className={itemStyle}><Mail size={14} /><span>Copy Email Address</span></Command.Item>
          </Command.Group>
          <Command.Group heading="Socials" className="px-2 py-1.5 mt-2 text-xs font-medium opacity-50 uppercase tracking-widest">
            <Command.Item onSelect={() => openLink(SOCIAL_LINKS.github)} className={itemStyle}><Github size={14} /><span>GitHub</span><ExternalLink size={10} className="ml-auto opacity-50"/></Command.Item>
            <Command.Item onSelect={() => openLink(SOCIAL_LINKS.linkedin)} className={itemStyle}><Linkedin size={14} /><span>LinkedIn</span><ExternalLink size={10} className="ml-auto opacity-50"/></Command.Item>
          </Command.Group>
        </Command.List>
        <div className={`px-4 py-2 text-[10px] border-t flex justify-end opacity-50 ${isDarkMode ? 'border-slate-600' : 'border-gray-200'}`}>Use arrow keys <span className="mx-1 border rounded px-1">↑</span><span className="border rounded px-1">↓</span> to navigate</div>
      </div>
    </Command.Dialog>
  );
};
export default CommandPalette;