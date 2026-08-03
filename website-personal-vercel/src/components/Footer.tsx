import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Button } from './Button';

export function Footer() {
  return (
    <footer className="w-full max-w-[1200px] mx-auto py-12 px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
      <div>
        <Button variant="primary" href="mailto:ombatavia23@gmail.com">Start a chat</Button>
      </div>
      
      <div className="flex gap-12 md:gap-24">
        <ArrowUpRight className="w-6 h-6 text-[#051A24] dark:text-white" />
        
        <div className="flex flex-col gap-3">
          <a href="#services" className="text-base text-[#051A24] dark:text-white hover:opacity-70 transition-opacity">Services</a>
          <a href="#projects" className="text-base text-[#051A24] dark:text-white hover:opacity-70 transition-opacity">Work</a>
          <a href="#about" className="text-base text-[#051A24] dark:text-white hover:opacity-70 transition-opacity">About</a>
          <a href="/Om_AI_Profile.md" target="_blank" rel="noopener noreferrer" className="text-base text-[#051A24] dark:text-white hover:opacity-70 transition-opacity">AI Profile</a>
        </div>
        
        <div className="flex flex-col gap-3">
          <a href="https://x.com" target="_blank" rel="noreferrer" className="text-base text-[#051A24] dark:text-white hover:opacity-70 transition-opacity">x.com</a>
          <a href="https://www.linkedin.com/in/om-batavia-071bb0346/" target="_blank" rel="noopener noreferrer" className="text-base text-[#051A24] dark:text-white hover:opacity-70 transition-opacity">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
