import { Activity, Music, Timer } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

const hobbies = [
  {
    title: "Go-Karting",
    description: "High-speed racing that trains reflexes, precision, and quick decision-making under pressure.",
    icon: Timer,
    tone: "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-200",
    href: "#karting-photos"
  },
  {
    title: "Basketball",
    description: "Teamwork, strategy, and staying sharp on the court. It builds endurance and competitive focus.",
    icon: Activity,
    tone: "bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-200"
  },
  {
    title: "Music",
    description: "Playing, composing, and exploring creative expression as a balance to analytical technology work.",
    icon: Music,
    tone: "bg-lime-50 dark:bg-lime-950/30 text-lime-700 dark:text-lime-200"
  }
];

export function HobbiesSection() {
  const refHeader = useInViewAnimation<HTMLHeadingElement>(0.1);
  const ref1 = useInViewAnimation<HTMLDivElement>(0.2);
  const ref2 = useInViewAnimation<HTMLDivElement>(0.3);
  const ref3 = useInViewAnimation<HTMLDivElement>(0.4);
  const cardRefs = [ref1, ref2, ref3];

  return (
    <section className="w-full py-24 px-6 bg-white dark:bg-[#051A24] border-t border-gray-100 dark:border-white/10 transition-colors">
      <div className="max-w-6xl mx-auto">
        <h2 ref={refHeader} className="font-['PP_Mondwest'] text-[40px] md:text-[56px] text-[#0D212C] dark:text-white mb-16 text-center">
          Beyond the Screen
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {hobbies.map((hobby, i) => {
            const Icon = hobby.icon;
            return (
              <div 
                key={hobby.title} 
                ref={cardRefs[i]}
                role={hobby.href ? "link" : undefined}
                tabIndex={hobby.href ? 0 : undefined}
                aria-label={hobby.href ? "View Om's karting photos" : undefined}
                onClick={() => {
                  if (hobby.href) window.location.hash = hobby.href;
                }}
                onKeyDown={(event) => {
                  if (hobby.href && (event.key === 'Enter' || event.key === ' ')) {
                    event.preventDefault();
                    window.location.hash = hobby.href;
                  }
                }}
                className={`group relative flex flex-col rounded-[32px] overflow-hidden shadow-sm dark:shadow-none hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#0D212C] ${hobby.href ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#051A24] dark:focus:ring-white/60 focus:ring-offset-4 dark:focus:ring-offset-[#051A24]' : ''}`}
              >
                <div className={`min-h-56 p-6 flex flex-col justify-between ${hobby.tone}`}>
                  <div className="w-14 h-14 rounded-2xl bg-white/80 dark:bg-white/10 flex items-center justify-center">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="grid grid-cols-4 gap-2 opacity-60">
                    {[...Array(8)].map((_, dotIndex) => (
                      <span key={dotIndex} className="h-2 rounded-full bg-current" />
                    ))}
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-grow z-10 relative">
                  <h3 className="font-semibold text-2xl text-[#051A24] dark:text-white mb-4">
                    {hobby.title}
                  </h3>
                  <p className="text-sm text-[#051A24]/70 dark:text-[#E0EBF0]/70 leading-relaxed">
                    {hobby.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
