import React from 'react';
import { Quote } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

const TEC_TEEN_SHOP_URL = 'https://tecteenshop.com/';

export function TestimonialSection() {
  const ref1 = useInViewAnimation<HTMLDivElement>(0.1);
  const ref2 = useInViewAnimation<HTMLHeadingElement>(0.1);
  const ref3 = useInViewAnimation<HTMLParagraphElement>(0.1);
  const ref4 = useInViewAnimation<HTMLDivElement>(0.1);
  const ref5 = useInViewAnimation<HTMLDivElement>(0.1);
  
  return (
    <section className="py-12 px-6 max-w-2xl mx-auto flex flex-col items-center text-center">
      <div ref={ref1} style={{ animationDelay: '0.1s' }} className="mb-6">
        <Quote className="w-6 h-6 text-slate-900 dark:text-white" />
      </div>
      
      <h2 ref={ref2} style={{ animationDelay: '0.2s' }} className="text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-[#0D212C] dark:text-white tracking-tight mb-6">
        "Not every task needs <span className="font-['PP_Mondwest']">expensive AI.</span> Optimize performance and cost."
      </h2>
      
      <p ref={ref3} style={{ animationDelay: '0.3s' }} className="italic text-sm text-[#273C46] dark:text-[#E0EBF0] mb-10">
        Om Batavia
      </p>
      
      <div ref={ref4} style={{ animationDelay: '0.4s' }} className="flex gap-6 md:gap-10 items-center justify-center font-medium text-slate-900 dark:text-white text-[20px] md:text-[24px] mb-16 flex-wrap">
        <a href={TEC_TEEN_SHOP_URL} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">Tec Teen Shop</a>
        <span>ALTSELF</span>
        <span>Smart Kirana</span>
      </div>
      
      <div ref={ref5} style={{ animationDelay: '0.5s' }} className="w-full max-w-[300px] overflow-hidden rounded-[28px] shadow-lg aspect-[3/4] bg-white/90 dark:bg-[#0D212C]/90 border border-black/5 dark:border-white/10 p-2">
        <div className="h-full w-full overflow-hidden rounded-[22px] bg-gray-200 dark:bg-[#1A3644]">
          <img 
            src="/Photos/om-lanterns.png" 
            alt="Om Batavia"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
