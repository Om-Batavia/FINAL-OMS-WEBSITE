import React from 'react';
import { Button } from './Button';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

export function PricingSection() {
  const ref1 = useInViewAnimation<HTMLDivElement>(0.1);
  const ref2 = useInViewAnimation<HTMLDivElement>(0.1);

  return (
    <section id="services" className="w-full py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:justify-end md:max-w-4xl mx-auto md:mr-auto">
        {/* Card 1 (Dark) */}
        <div ref={ref1} style={{ animationDelay: '0.1s' }} className="bg-[#051A24] dark:bg-white text-[#E0EBF0] dark:text-[#273C46] rounded-[40px] pl-10 pr-10 md:pr-24 pt-10 pb-10 shadow-inner dark:shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex flex-col h-full transition-colors">
          <h3 className="text-[22px] font-medium text-[#F6FCFF] dark:text-[#0D212C] mb-4">Founder Collaboration</h3>
          <p className="mb-10 text-[15px] leading-relaxed">
            For teams exploring a serious AI workflow, prototype, or automation system with direct founder involvement.
          </p>
          <div className="mt-auto mb-8">
            <span className="text-2xl text-[#F6FCFF] dark:text-[#0D212C]">Selective</span>
            <span className="block mt-1 text-sm opacity-70">Based on fit and scope</span>
          </div>
          <div className="flex gap-4 items-center">
            <Button variant="primary" className="shadow-none border border-white/10 dark:border-[#0D212C]/10" href="#contact">Start a chat</Button>
            <Button variant="tertiary" className="!bg-transparent !text-white dark:!text-[#051A24] !shadow-none border border-white/20 dark:border-[#051A24]/20 hover:!bg-white/10 dark:hover:!bg-black/5" href="#projects">View work</Button>
          </div>
        </div>

        {/* Card 2 (Light) */}
        <div ref={ref2} style={{ animationDelay: '0.2s' }} className="bg-white dark:bg-[#0D212C] rounded-[40px] pl-10 pr-10 md:pr-24 pt-10 pb-10 shadow-[0_4px_16px_rgba(0,0,0,0.08)] dark:shadow-none flex flex-col h-full transition-colors">
          <h3 className="text-[22px] font-medium text-[#0D212C] dark:text-white mb-4">Project Sprint</h3>
          <p className="mb-10 text-[15px] leading-relaxed text-[#273C46] dark:text-[#E0EBF0]">
            A focused build for a clear product idea, internal workflow, or proof-of-concept that needs momentum.
          </p>
          <div className="mt-auto mb-8">
            <span className="text-2xl text-[#0D212C] dark:text-white">Scoped</span>
            <span className="block mt-1 text-sm text-[#273C46] dark:text-[#E0EBF0]">Timeline and deliverables first</span>
          </div>
          <div>
            <Button variant="tertiary" href="#contact">Start a chat</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
