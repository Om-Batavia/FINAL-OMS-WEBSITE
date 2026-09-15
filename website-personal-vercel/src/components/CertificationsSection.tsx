import { Clock, Cpu } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

const certificationsData = [
  {
    title: "JuniorMBA in Data Analytics",
    issuer: "Clever Harvey (Samsonite Project)",
    image: "/certificates/clever-harvey.jpg",
    description: "Completed the JuniorMBA in Data Analytics with a Samsonite project."
  },
  {
    title: "Junior MBA Foundation Year",
    issuer: "Growth Valley Community",
    image: "/certificates/growth-valley.jpg",
    description: "Completed year one of the Teen Entrepreneur Club program with distinction."
  },
  {
    title: "Blue Ocean Student Entrepreneurs",
    issuer: "Blue Ocean Competition",
    image: "/certificates/blue-ocean.png",
    description: "Studied Blue Ocean Strategy and business pitch development."
  },
  {
    title: "Letter of Academic Achievement",
    issuer: "Ashoka University (Prof. Debayan Gupta)",
    image: "/certificates/ashoka-letter.jpg",
    description: "Received a letter of academic achievement for 'AI for Tomorrow's World'."
  },
  {
    title: "Horizons Achievers Programme",
    issuer: "Ashoka University",
    image: "/certificates/ashoka-poster.jpg",
    description: "Selected for the Ashoka Horizons Achievers Programme in Computer Science."
  },
  {
    title: "Technology Certificate",
    issuer: "Pending",
    image: null,
    status: "Pending",
    description: "Technology certification is currently pending. The final certificate image can be added here once issued."
  }
];

export function CertificationsSection() {
  const refHeader = useInViewAnimation<HTMLHeadingElement>(0.1);

  return (
    <section className="w-full py-24 px-6 bg-white dark:bg-[#051A24] transition-colors border-t border-gray-100 dark:border-white/10">
      <div className="max-w-6xl mx-auto">
        <h2 ref={refHeader} className="font-['PP_Mondwest'] text-[40px] md:text-[56px] text-[#0D212C] dark:text-white mb-16 md:ml-[calc((100vw-896px)/2)] ml-0">
          Certifications
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {certificationsData.map((cert) => (
            <div 
              key={cert.title}
              className="group relative flex flex-col bg-gray-50/90 dark:bg-[#0D212C]/90 rounded-[32px] overflow-hidden shadow-sm dark:shadow-none hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 border border-gray-100 dark:border-white/5 p-2"
            >
              <div className="w-full aspect-[3/4] sm:aspect-square md:aspect-[4/5] bg-gray-200 dark:bg-black/20 overflow-hidden relative rounded-[24px] border border-black/5 dark:border-white/10">
                {cert.image ? (
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain bg-white dark:bg-[#07141C] p-3 group-hover:scale-[1.025] transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-100 via-cyan-50 to-emerald-100 dark:from-slate-900 dark:via-cyan-950/40 dark:to-emerald-950/40 p-8 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#273C46]/60 dark:text-[#E0EBF0]/60">
                        Awaiting issue
                      </span>
                      <Clock className="w-5 h-5 text-cyan-700 dark:text-cyan-300" />
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-24 h-24 rounded-[28px] bg-white/80 dark:bg-white/10 border border-white/70 dark:border-white/10 flex items-center justify-center shadow-sm">
                        <Cpu className="w-12 h-12 text-cyan-700 dark:text-cyan-300" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 opacity-60">
                      {[...Array(9)].map((_, index) => (
                        <span key={index} className="h-3 rounded-full bg-cyan-700/30 dark:bg-cyan-300/30" />
                      ))}
                    </div>
                  </div>
                )}
                {cert.status && (
                  <span className="absolute top-4 right-4 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-300/20 dark:text-amber-200 px-3 py-1 text-xs font-medium">
                    {cert.status}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow bg-white/95 dark:bg-[#0D212C]/95 z-10 relative rounded-b-[24px]">
                <h3 className="font-semibold text-lg md:text-xl text-[#051A24] dark:text-white mb-2 leading-snug">
                  {cert.title}
                </h3>
                <p className="text-sm font-medium text-[#273C46] dark:text-[#E0EBF0] mb-4">
                  {cert.issuer}
                </p>
                <p className="text-sm text-[#051A24]/70 dark:text-[#E0EBF0]/70 mt-auto leading-relaxed">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
