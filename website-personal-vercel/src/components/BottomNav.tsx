import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Moon, Sun } from 'lucide-react';

export function BottomNav() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white dark:bg-[#051A24] rounded-full px-8 py-2 shadow-[0_1px_2px_0_rgba(5,26,36,0.1),0_4px_4px_0_rgba(5,26,36,0.09),0_9px_6px_0_rgba(5,26,36,0.05),0_17px_7px_0_rgba(5,26,36,0.01),0_26px_7px_0_rgba(5,26,36,0)] dark:shadow-[0_1px_2px_0_rgba(0,0,0,0.5),0_4px_4px_0_rgba(0,0,0,0.4)] flex items-center gap-6 border border-gray-100 dark:border-white/10 transition-colors duration-300">
        <span className="font-['PP_Mondwest'] text-2xl font-semibold text-[#051A24] dark:text-white">
          O
        </span>
        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-[#051A24] dark:text-white transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <Button variant="primary" href="mailto:ombatavia23@gmail.com" className="!shadow-none scale-90 origin-right">
          Start a chat
        </Button>
      </div>
    </div>
  );
}
