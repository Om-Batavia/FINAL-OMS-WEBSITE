import { useRef, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { Button } from './Button';

const trailNotes = [
  'AI workflow',
  'Prototype',
  'Retail ops',
  'Model routing',
  'Automation',
  'Founder sprint',
  'Product idea',
  'Case study'
];

export function PartnerSection() {
  const ref = useInViewAnimation<HTMLDivElement>(0.1);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSpawnRef = useRef(0);
  const zIndexRef = useRef(10);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastSpawnRef.current < 90) return;
      lastSpawnRef.current = now;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotation = Math.random() * 18 - 9;

      const note = document.createElement('div');
      note.textContent = trailNotes[Math.floor(Math.random() * trailNotes.length)];
      note.className = 'absolute pointer-events-none rounded-2xl shadow-xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-[#051A24]/90 text-[#051A24] dark:text-white px-4 py-3 text-sm font-medium backdrop-blur';
      note.style.left = `${x}px`;
      note.style.top = `${y}px`;
      note.style.transform = `translate(-50%, -50%) scale(1) rotate(${rotation}deg)`;
      note.style.zIndex = zIndexRef.current.toString();
      note.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
      
      zIndexRef.current += 1;
      container.appendChild(note);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          note.style.transform = `translate(-50%, -50%) scale(0.55) rotate(${rotation}deg)`;
          note.style.opacity = '0';
        });
      });

      setTimeout(() => {
        if (container.contains(note)) {
          container.removeChild(note);
        }
      }, 1000);
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="w-full py-12 px-6">
      <div 
        ref={containerRef}
        className="relative max-w-7xl mx-auto py-36 md:py-48 rounded-[40px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:shadow-none bg-white dark:bg-[#0D212C] overflow-hidden flex flex-col items-center justify-center cursor-crosshair transition-colors border border-gray-100 dark:border-white/10"
      >
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 opacity-[0.08] dark:opacity-[0.12]">
          {[...Array(12)].map((_, index) => (
            <span key={index} className="border border-[#051A24] dark:border-white" />
          ))}
        </div>

        <div ref={ref} className="z-50 flex flex-col items-center pointer-events-none px-6 text-center">
          <Sparkles className="w-8 h-8 text-[#051A24] dark:text-white mb-6" />
          <h2 className="font-['PP_Mondwest'] text-[48px] md:text-[64px] lg:text-[80px] text-[#0D212C] dark:text-white mb-6 leading-none">
            Partner with me
          </h2>
          <p className="max-w-xl text-[#051A24]/70 dark:text-[#E0EBF0]/70 mb-10 leading-relaxed">
            Bring a messy workflow, product idea, or AI problem. I will help turn it into a focused prototype or build plan.
          </p>
          <Button variant="primary" href="mailto:ombatavia23@gmail.com" className="pointer-events-auto flex items-center gap-3 !px-4 !py-2">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white/80 dark:bg-[#0D212C] border border-black/5 dark:border-white/10">
              <img 
                src="/Photos/om-vietnam-bridge.jpeg" 
                alt="Om Batavia" 
                loading="lazy"
                decoding="async"
                className="h-9 w-9 rounded-full object-cover bg-gray-200 dark:bg-[#1A3644]"
              />
            </span>
            <span className="pr-4 font-medium">Start chat with Om</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
